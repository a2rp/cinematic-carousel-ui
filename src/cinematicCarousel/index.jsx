import { useCallback, useEffect, useRef, useState } from "react";
import { carouselSlides } from "./data";
import { developerDetails } from "./developer";
import { Styled } from "./styled";

const LOGO_URL = `${import.meta.env.BASE_URL}images/logoBlackBg.png`;
const AUTO_PLAY_DELAY = 7000;
const SWIPE_THRESHOLD = 60;

const INTERACTIVE_SELECTOR = [
    "button",
    "a",
    "input",
    "textarea",
    "select",
    "[role='button']",
].join(", ");

const MODAL_FOCUSABLE_SELECTOR = [
    "a[href]",
    "button:not([disabled])",
    "input:not([disabled])",
    "textarea:not([disabled])",
    "select:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
].join(", ");

const getDatePart = (parts, type) => {
    return parts.find((part) => part.type === type)?.value || "";
};

const formatRepositoryPush = (dateValue, timeZone) => {
    const date = new Date(dateValue);

    if (Number.isNaN(date.getTime())) {
        return null;
    }

    const formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone,
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23",
    });

    const parts = formatter.formatToParts(date);

    const day = getDatePart(parts, "day");
    const month = getDatePart(parts, "month");
    const year = getDatePart(parts, "year");
    const hour = getDatePart(parts, "hour");
    const minute = getDatePart(parts, "minute");
    const second = getDatePart(parts, "second");

    return {
        year,
        formattedDate:
            `${day}-${month}-${year} ` +
            `${hour}:${minute}:${second} hrs (IST)`,
    };
};

const useReducedMotion = () => {
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        );

        const updatePreference = () => {
            setPrefersReducedMotion(mediaQuery.matches);
        };

        updatePreference();

        mediaQuery.addEventListener("change", updatePreference);

        return () => {
            mediaQuery.removeEventListener("change", updatePreference);
        };
    }, []);

    return prefersReducedMotion;
};

const CinematicCarousel = ({ onPrimaryAction, onSecondaryAction }) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState("next");
    const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);
    const [isDeveloperModalOpen, setIsDeveloperModalOpen] = useState(false);

    const [repositoryActivity, setRepositoryActivity] = useState({
        status: "idle",
        lastUpdatedYear: "",
        lastPushDate: "",
    });

    const pointerStartXRef = useRef(null);
    const previewListRef = useRef(null);
    const previewButtonRefs = useRef([]);
    const developerButtonRef = useRef(null);
    const developerModalRef = useRef(null);
    const developerCloseButtonRef = useRef(null);

    const prefersReducedMotion = useReducedMotion();

    const slideCount = carouselSlides.length;
    const activeSlide = carouselSlides[activeIndex];

    const isAutoPlayPaused = !isAutoPlayEnabled || prefersReducedMotion;

    const showNext = useCallback(() => {
        setDirection("next");

        setActiveIndex((currentIndex) => {
            return (currentIndex + 1) % slideCount;
        });
    }, [slideCount]);

    const showPrevious = useCallback(() => {
        setDirection("previous");

        setActiveIndex((currentIndex) => {
            return (currentIndex - 1 + slideCount) % slideCount;
        });
    }, [slideCount]);

    const showSlide = useCallback(
        (slideIndex) => {
            if (slideIndex === activeIndex) return;

            const forwardDistance =
                (slideIndex - activeIndex + slideCount) % slideCount;

            const backwardDistance =
                (activeIndex - slideIndex + slideCount) % slideCount;

            setDirection(
                forwardDistance <= backwardDistance ? "next" : "previous",
            );

            setActiveIndex(slideIndex);
        },
        [activeIndex, slideCount],
    );

    const openDeveloperModal = () => {
        setIsDeveloperModalOpen(true);

        setRepositoryActivity((currentValue) => {
            if (currentValue.status !== "idle") {
                return currentValue;
            }

            return {
                ...currentValue,
                status: "loading",
            };
        });
    };

    const closeDeveloperModal = useCallback(() => {
        setIsDeveloperModalOpen(false);

        window.requestAnimationFrame(() => {
            developerButtonRef.current?.focus();
        });
    }, []);

    useEffect(() => {
        carouselSlides.forEach((slide) => {
            const image = new Image();

            image.src = slide.image;
        });
    }, []);

    useEffect(() => {
        if (isAutoPlayPaused || slideCount <= 1) {
            return undefined;
        }

        const timer = window.setTimeout(showNext, AUTO_PLAY_DELAY);

        return () => {
            window.clearTimeout(timer);
        };
    }, [activeIndex, isAutoPlayPaused, showNext, slideCount]);

    useEffect(() => {
        const previewList = previewListRef.current;
        const activeButton = previewButtonRefs.current[activeIndex];

        if (!previewList || !activeButton) {
            return undefined;
        }

        const animationFrame = window.requestAnimationFrame(() => {
            const listRect = previewList.getBoundingClientRect();

            const buttonRect = activeButton.getBoundingClientRect();

            const isAboveVisibleArea = buttonRect.top < listRect.top;

            const isBelowVisibleArea = buttonRect.bottom > listRect.bottom;

            if (!isAboveVisibleArea && !isBelowVisibleArea) {
                return;
            }

            let scrollAmount = 0;

            if (isAboveVisibleArea) {
                scrollAmount = buttonRect.top - listRect.top - 8;
            }

            if (isBelowVisibleArea) {
                scrollAmount = buttonRect.bottom - listRect.bottom + 8;
            }

            previewList.scrollBy({
                top: scrollAmount,
                behavior: prefersReducedMotion ? "auto" : "smooth",
            });
        });

        return () => {
            window.cancelAnimationFrame(animationFrame);
        };
    }, [activeIndex, prefersReducedMotion]);

    useEffect(() => {
        if (!isDeveloperModalOpen || repositoryActivity.status !== "loading") {
            return undefined;
        }

        const controller = new AbortController();

        fetch(developerDetails.repository.apiUrl, {
            signal: controller.signal,
            headers: {
                Accept: "application/vnd.github+json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Repository activity could not be loaded.");
                }

                return response.json();
            })
            .then((repository) => {
                const pushDetails = formatRepositoryPush(
                    repository.pushed_at,
                    developerDetails.repository.timeZone,
                );

                if (!pushDetails) {
                    throw new Error("Repository push date is unavailable.");
                }

                setRepositoryActivity({
                    status: "success",
                    lastUpdatedYear: pushDetails.year,
                    lastPushDate: pushDetails.formattedDate,
                });
            })
            .catch((error) => {
                if (error.name === "AbortError") {
                    return;
                }

                setRepositoryActivity({
                    status: "error",
                    lastUpdatedYear: "",
                    lastPushDate: "",
                });
            });

        return () => {
            controller.abort();
        };
    }, [isDeveloperModalOpen, repositoryActivity.status]);

    useEffect(() => {
        if (!isDeveloperModalOpen) return undefined;

        const previousBodyOverflow = document.body.style.overflow;

        const previousHtmlOverflow = document.documentElement.style.overflow;

        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        const focusFrame = window.requestAnimationFrame(() => {
            developerCloseButtonRef.current?.focus();
        });

        const handleModalKeyDown = (event) => {
            if (event.key === "Escape") {
                event.preventDefault();
                closeDeveloperModal();
                return;
            }

            if (event.key !== "Tab") return;

            const modal = developerModalRef.current;

            if (!modal) return;

            const focusableElements = Array.from(
                modal.querySelectorAll(MODAL_FOCUSABLE_SELECTOR),
            );

            if (focusableElements.length === 0) return;

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
                return;
            }

            if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        };

        window.addEventListener("keydown", handleModalKeyDown);

        return () => {
            window.cancelAnimationFrame(focusFrame);

            window.removeEventListener("keydown", handleModalKeyDown);

            document.body.style.overflow = previousBodyOverflow;

            document.documentElement.style.overflow = previousHtmlOverflow;
        };
    }, [closeDeveloperModal, isDeveloperModalOpen]);

    const handleKeyDown = (event) => {
        if (event.target !== event.currentTarget) return;

        if (event.key === "ArrowLeft") {
            event.preventDefault();
            showPrevious();
        }

        if (event.key === "ArrowRight") {
            event.preventDefault();
            showNext();
        }

        if (event.key === "Home") {
            event.preventDefault();
            showSlide(0);
        }

        if (event.key === "End") {
            event.preventDefault();
            showSlide(slideCount - 1);
        }

        if (event.key === " ") {
            event.preventDefault();

            setIsAutoPlayEnabled((currentValue) => !currentValue);
        }
    };

    const handlePointerDown = (event) => {
        const interactiveElement = event.target.closest?.(INTERACTIVE_SELECTOR);

        if (interactiveElement) {
            pointerStartXRef.current = null;
            return;
        }

        pointerStartXRef.current = event.clientX;

        if (event.currentTarget.setPointerCapture) {
            event.currentTarget.setPointerCapture(event.pointerId);
        }
    };

    const handlePointerUp = (event) => {
        if (pointerStartXRef.current === null) return;

        const movement = event.clientX - pointerStartXRef.current;

        pointerStartXRef.current = null;

        if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }

        if (Math.abs(movement) < SWIPE_THRESHOLD) return;

        if (movement < 0) {
            showNext();
            return;
        }

        showPrevious();
    };

    const handlePointerCancel = (event) => {
        pointerStartXRef.current = null;

        if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
            event.currentTarget.releasePointerCapture(event.pointerId);
        }
    };

    if (!activeSlide) return null;

    return (
        <Styled.Wrapper
            id="cinematic-carousel"
            className={`theme-${activeSlide.theme}`}
            aria-label="Featured cinematic stories"
            aria-roledescription="carousel"
            tabIndex={0}
            onKeyDown={handleKeyDown}
        >
            <Styled.Backgrounds aria-hidden="true">
                {carouselSlides.map((slide, slideIndex) => {
                    const backgroundClasses = [
                        slideIndex === activeIndex ? "is-active" : "",
                        direction === "previous"
                            ? "move-previous"
                            : "move-next",
                    ]
                        .filter(Boolean)
                        .join(" ");

                    return (
                        <Styled.Background
                            key={slide.id}
                            className={backgroundClasses}
                        >
                            <Styled.BackgroundImage
                                src={slide.image}
                                alt=""
                                loading={slideIndex === 0 ? "eager" : "lazy"}
                            />
                        </Styled.Background>
                    );
                })}

                <Styled.BackgroundShade />
                <Styled.AmbientGlow />
                <Styled.Noise />
            </Styled.Backgrounds>

            <Styled.Shell>
                <Styled.TopBar>
                    <Styled.Brand
                        ref={developerButtonRef}
                        type="button"
                        aria-label="Open developer details"
                        aria-haspopup="dialog"
                        aria-expanded={isDeveloperModalOpen}
                        onClick={openDeveloperModal}
                    >
                        <Styled.BrandMark aria-hidden="true">
                            <img src={LOGO_URL} alt="" />
                        </Styled.BrandMark>

                        <Styled.BrandCopy>
                            <Styled.BrandName>Ashish Ranjan</Styled.BrandName>

                            <Styled.BrandTagline>
                                Full-Stack Developer
                            </Styled.BrandTagline>
                        </Styled.BrandCopy>
                    </Styled.Brand>

                    <Styled.AutoPlayButton
                        type="button"
                        className={
                            isAutoPlayEnabled ? "is-playing" : "is-paused"
                        }
                        aria-pressed={isAutoPlayEnabled}
                        aria-label={
                            isAutoPlayEnabled
                                ? "Pause automatic slide playback"
                                : "Start automatic slide playback"
                        }
                        onClick={() => {
                            setIsAutoPlayEnabled(
                                (currentValue) => !currentValue,
                            );
                        }}
                    >
                        <Styled.AutoPlayIcon aria-hidden="true">
                            {isAutoPlayEnabled ? "Ⅱ" : "▶"}
                        </Styled.AutoPlayIcon>

                        <Styled.AutoPlayText>
                            {isAutoPlayEnabled ? "Playing" : "Paused"}
                        </Styled.AutoPlayText>
                    </Styled.AutoPlayButton>
                </Styled.TopBar>

                <Styled.Main
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={handlePointerCancel}
                >
                    <Styled.Hero>
                        <Styled.Content
                            key={activeSlide.id}
                            className={
                                direction === "previous"
                                    ? "move-previous"
                                    : "move-next"
                            }
                        >
                            <Styled.EyebrowRow>
                                <Styled.EyebrowLine />

                                <Styled.Eyebrow>
                                    {activeSlide.eyebrow}
                                </Styled.Eyebrow>
                            </Styled.EyebrowRow>

                            <Styled.Title>
                                <Styled.TitleLine>
                                    {activeSlide.title}
                                </Styled.TitleLine>

                                <Styled.TitleAccent>
                                    {activeSlide.titleAccent}
                                </Styled.TitleAccent>
                            </Styled.Title>

                            <Styled.MetaList aria-label="Title information">
                                <Styled.MetaItem>
                                    {activeSlide.year}
                                </Styled.MetaItem>

                                <Styled.MetaItem>
                                    {activeSlide.duration}
                                </Styled.MetaItem>

                                <Styled.MetaItem>
                                    {activeSlide.rating}
                                </Styled.MetaItem>

                                <Styled.MetaItem className="is-highlighted">
                                    {activeSlide.quality}
                                </Styled.MetaItem>
                            </Styled.MetaList>

                            <Styled.Description>
                                {activeSlide.description}
                            </Styled.Description>

                            <Styled.GenreList aria-label="Genres">
                                {activeSlide.genres.map((genre) => (
                                    <Styled.Genre key={genre}>
                                        {genre}
                                    </Styled.Genre>
                                ))}
                            </Styled.GenreList>

                            <Styled.Actions>
                                <Styled.PrimaryButton
                                    type="button"
                                    onClick={() => {
                                        onPrimaryAction?.(activeSlide);
                                    }}
                                >
                                    <Styled.ButtonIcon aria-hidden="true">
                                        ▶
                                    </Styled.ButtonIcon>

                                    {activeSlide.primaryAction}
                                </Styled.PrimaryButton>

                                <Styled.SecondaryButton
                                    type="button"
                                    onClick={() => {
                                        onSecondaryAction?.(activeSlide);
                                    }}
                                >
                                    {activeSlide.secondaryAction}

                                    <Styled.ButtonIcon aria-hidden="true">
                                        ↗
                                    </Styled.ButtonIcon>
                                </Styled.SecondaryButton>
                            </Styled.Actions>
                        </Styled.Content>

                        <Styled.PreviewRail id="cinematic-previews">
                            <Styled.PreviewHeader>
                                <Styled.PreviewLabel>
                                    All stories
                                </Styled.PreviewLabel>

                                <Styled.PreviewCount>
                                    {String(activeIndex + 1).padStart(2, "0")}

                                    <span>
                                        / {String(slideCount).padStart(2, "0")}
                                    </span>
                                </Styled.PreviewCount>
                            </Styled.PreviewHeader>

                            <Styled.PreviewList ref={previewListRef}>
                                {carouselSlides.map((slide, slideIndex) => (
                                    <Styled.PreviewButton
                                        key={slide.id}
                                        ref={(element) => {
                                            previewButtonRefs.current[
                                                slideIndex
                                            ] = element;
                                        }}
                                        type="button"
                                        className={
                                            slideIndex === activeIndex
                                                ? "is-active"
                                                : ""
                                        }
                                        aria-current={
                                            slideIndex === activeIndex
                                                ? "true"
                                                : undefined
                                        }
                                        aria-label={`Show ${slide.title} ${slide.titleAccent}`}
                                        onClick={() => {
                                            showSlide(slideIndex);
                                        }}
                                    >
                                        <Styled.PreviewImage
                                            src={slide.image}
                                            alt=""
                                            loading="lazy"
                                        />

                                        <Styled.PreviewOverlay />

                                        <Styled.PreviewIndex>
                                            {String(slideIndex + 1).padStart(
                                                2,
                                                "0",
                                            )}
                                        </Styled.PreviewIndex>

                                        <Styled.PreviewContent>
                                            <Styled.PreviewEyebrow>
                                                {slideIndex === activeIndex
                                                    ? "Now showing"
                                                    : slide.eyebrow}
                                            </Styled.PreviewEyebrow>

                                            <Styled.PreviewTitle>
                                                {slide.title}{" "}
                                                {slide.titleAccent}
                                            </Styled.PreviewTitle>
                                        </Styled.PreviewContent>
                                    </Styled.PreviewButton>
                                ))}
                            </Styled.PreviewList>
                        </Styled.PreviewRail>
                    </Styled.Hero>
                </Styled.Main>

                <Styled.BottomBar>
                    <Styled.Pagination aria-label="Choose a slide">
                        {carouselSlides.map((slide, slideIndex) => (
                            <Styled.PaginationButton
                                key={slide.id}
                                type="button"
                                className={
                                    slideIndex === activeIndex
                                        ? "is-active"
                                        : ""
                                }
                                aria-current={
                                    slideIndex === activeIndex
                                        ? "true"
                                        : undefined
                                }
                                aria-label={`Show slide ${slideIndex + 1}: ${slide.title} ${slide.titleAccent}`}
                                onClick={() => {
                                    showSlide(slideIndex);
                                }}
                            >
                                <span />
                            </Styled.PaginationButton>
                        ))}
                    </Styled.Pagination>

                    <Styled.ProgressArea>
                        <Styled.ProgressLabel>
                            {isAutoPlayPaused ? "Paused" : "Next story"}
                        </Styled.ProgressLabel>

                        <Styled.ProgressTrack aria-hidden="true">
                            <Styled.ProgressFill
                                key={`${activeIndex}-${isAutoPlayPaused}`}
                                className={isAutoPlayPaused ? "is-paused" : ""}
                            />
                        </Styled.ProgressTrack>
                    </Styled.ProgressArea>

                    <Styled.Navigation aria-label="Carousel navigation">
                        <Styled.NavButton
                            type="button"
                            aria-label="Show previous slide"
                            onClick={showPrevious}
                        >
                            ←
                        </Styled.NavButton>

                        <Styled.NavButton
                            type="button"
                            aria-label="Show next slide"
                            onClick={showNext}
                        >
                            →
                        </Styled.NavButton>
                    </Styled.Navigation>
                </Styled.BottomBar>
            </Styled.Shell>

            {isDeveloperModalOpen && (
                <Styled.DeveloperModalBackdrop
                    onClick={(event) => {
                        if (event.target === event.currentTarget) {
                            closeDeveloperModal();
                        }
                    }}
                >
                    <Styled.DeveloperModal
                        ref={developerModalRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="developer-modal-title"
                        aria-describedby="developer-modal-description"
                    >
                        <Styled.DeveloperModalHeader>
                            <Styled.DeveloperIdentity>
                                <Styled.DeveloperLogo>
                                    <img src={LOGO_URL} alt="" />
                                </Styled.DeveloperLogo>

                                <Styled.DeveloperIntro>
                                    <Styled.DeveloperKicker>
                                        Designed and developed by
                                    </Styled.DeveloperKicker>

                                    <Styled.DeveloperName id="developer-modal-title">
                                        {developerDetails.name}
                                    </Styled.DeveloperName>

                                    <Styled.DeveloperRole>
                                        {developerDetails.role}
                                    </Styled.DeveloperRole>
                                </Styled.DeveloperIntro>
                            </Styled.DeveloperIdentity>

                            <Styled.DeveloperCloseButton
                                ref={developerCloseButtonRef}
                                type="button"
                                aria-label="Close developer details"
                                onClick={closeDeveloperModal}
                            >
                                ×
                            </Styled.DeveloperCloseButton>
                        </Styled.DeveloperModalHeader>

                        <Styled.DeveloperLocation>
                            {developerDetails.location}
                        </Styled.DeveloperLocation>

                        <Styled.DeveloperDescription id="developer-modal-description">
                            {developerDetails.description}
                        </Styled.DeveloperDescription>

                        <Styled.DeveloperRepositoryCard aria-live="polite">
                            <Styled.DeveloperRepositoryHeader>
                                <div>
                                    <Styled.DeveloperRepositoryKicker>
                                        Repository activity
                                    </Styled.DeveloperRepositoryKicker>

                                    <Styled.DeveloperRepositoryName>
                                        {developerDetails.repository.name}
                                    </Styled.DeveloperRepositoryName>
                                </div>

                                <Styled.DeveloperRepositoryLink
                                    href={developerDetails.repository.url}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    View repository
                                    <span aria-hidden="true">↗</span>
                                </Styled.DeveloperRepositoryLink>
                            </Styled.DeveloperRepositoryHeader>

                            {repositoryActivity.status === "loading" && (
                                <Styled.DeveloperRepositoryMessage>
                                    Loading latest repository activity...
                                </Styled.DeveloperRepositoryMessage>
                            )}

                            {repositoryActivity.status === "error" && (
                                <Styled.DeveloperRepositoryMessage>
                                    Repository activity is temporarily
                                    unavailable.
                                </Styled.DeveloperRepositoryMessage>
                            )}

                            {repositoryActivity.status === "success" && (
                                <Styled.DeveloperRepositoryGrid>
                                    <Styled.DeveloperRepositoryItem>
                                        <span>Last updated</span>

                                        <strong>
                                            {repositoryActivity.lastUpdatedYear}
                                        </strong>
                                    </Styled.DeveloperRepositoryItem>

                                    <Styled.DeveloperRepositoryItem>
                                        <span>Last repository push</span>

                                        <strong>
                                            {repositoryActivity.lastPushDate}
                                        </strong>
                                    </Styled.DeveloperRepositoryItem>
                                </Styled.DeveloperRepositoryGrid>
                            )}
                        </Styled.DeveloperRepositoryCard>

                        <Styled.DeveloperLinks>
                            {developerDetails.links.map((link) => (
                                <Styled.DeveloperLink
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <span>{link.label}</span>

                                    <span aria-hidden="true">↗</span>
                                </Styled.DeveloperLink>
                            ))}
                        </Styled.DeveloperLinks>

                        <Styled.DeveloperFooter>
                            Cinematic Carousel UI
                            <span>© {new Date().getFullYear()}</span>
                        </Styled.DeveloperFooter>
                    </Styled.DeveloperModal>
                </Styled.DeveloperModalBackdrop>
            )}

            <Styled.LiveRegion aria-live="polite" aria-atomic="true">
                Slide {activeIndex + 1} of {slideCount}: {activeSlide.title}{" "}
                {activeSlide.titleAccent}
            </Styled.LiveRegion>
        </Styled.Wrapper>
    );
};

export default CinematicCarousel;
