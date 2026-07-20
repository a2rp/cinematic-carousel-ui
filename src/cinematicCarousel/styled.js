import styled, { keyframes } from "styled-components";

const contentEnterNext = keyframes`
    from {
        opacity: 0;
        filter: blur(8px);
        transform: translate3d(42px, 18px, 0);
    }

    to {
        opacity: 1;
        filter: blur(0);
        transform: translate3d(0, 0, 0);
    }
`;

const contentEnterPrevious = keyframes`
    from {
        opacity: 0;
        filter: blur(8px);
        transform: translate3d(-42px, 18px, 0);
    }

    to {
        opacity: 1;
        filter: blur(0);
        transform: translate3d(0, 0, 0);
    }
`;

const backgroundEnterNext = keyframes`
    from {
        opacity: 0;
        transform: scale(1.08) translate3d(2.5%, 0, 0);
    }

    to {
        opacity: 1;
        transform: scale(1.02) translate3d(0, 0, 0);
    }
`;

const backgroundEnterPrevious = keyframes`
    from {
        opacity: 0;
        transform: scale(1.08) translate3d(-2.5%, 0, 0);
    }

    to {
        opacity: 1;
        transform: scale(1.02) translate3d(0, 0, 0);
    }
`;

const imageDrift = keyframes`
    from {
        transform: scale(1.02);
    }

    to {
        transform: scale(1.08);
    }
`;

const progressAnimation = keyframes`
    from {
        transform: scaleX(0);
    }

    to {
        transform: scaleX(1);
    }
`;

const glowPulse = keyframes`
    0%,
    100% {
        opacity: 0.42;
        transform: translate3d(0, 0, 0) scale(1);
    }

    50% {
        opacity: 0.72;
        transform: translate3d(2%, -2%, 0) scale(1.08);
    }
`;

const modalBackdropEnter = keyframes`
    from {
        opacity: 0;
        backdrop-filter: blur(0);
    }

    to {
        opacity: 1;
        backdrop-filter: blur(24px);
    }
`;

const modalEnter = keyframes`
    from {
        opacity: 0;
        filter: blur(12px);
        transform: translate3d(0, 34px, 0) scale(0.94);
    }

    to {
        opacity: 1;
        filter: blur(0);
        transform: translate3d(0, 0, 0) scale(1);
    }
`;

export const Styled = {
    Wrapper: styled.section`
        --accent: #a9d8ff;
        --accent-strong: #d9efff;
        --accent-soft: rgba(110, 190, 255, 0.18);
        --ambient-glow: rgba(65, 165, 255, 0.34);

        position: relative;
        width: 100%;
        min-height: 100vh;
        overflow: hidden;
        color: #ffffff;
        background: #030405;
        isolation: isolate;
        outline: none;

        &.theme-ice {
            --accent: #a9d8ff;
            --accent-strong: #d9efff;
            --accent-soft: rgba(110, 190, 255, 0.18);
            --ambient-glow: rgba(65, 165, 255, 0.34);
        }

        &.theme-silver {
            --accent: #d5d9de;
            --accent-strong: #ffffff;
            --accent-soft: rgba(220, 225, 230, 0.16);
            --ambient-glow: rgba(190, 205, 220, 0.28);
        }

        &.theme-amber {
            --accent: #ffc76b;
            --accent-strong: #ffe2a6;
            --accent-soft: rgba(255, 169, 58, 0.18);
            --ambient-glow: rgba(255, 144, 31, 0.32);
        }

        &.theme-ocean {
            --accent: #74e0db;
            --accent-strong: #b4fff9;
            --accent-soft: rgba(48, 205, 197, 0.16);
            --ambient-glow: rgba(25, 190, 182, 0.3);
        }

        &.theme-violet {
            --accent: #c5a7ff;
            --accent-strong: #e5d7ff;
            --accent-soft: rgba(155, 104, 255, 0.18);
            --ambient-glow: rgba(125, 65, 245, 0.32);
        }

        &.theme-forest {
            --accent: #a5d9b4;
            --accent-strong: #d7ffe1;
            --accent-soft: rgba(90, 190, 120, 0.16);
            --ambient-glow: rgba(45, 155, 85, 0.3);
        }

        &:focus-visible {
            box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.82);
        }
    `,

    Backgrounds: styled.div`
        position: absolute;
        inset: 0;
        z-index: -1;
        overflow: hidden;
        background: #030405;
        pointer-events: none;
    `,

    Background: styled.div`
        position: absolute;
        inset: 0;
        overflow: hidden;
        opacity: 0;
        pointer-events: none;

        &.is-active {
            opacity: 1;
        }

        &.is-active.move-next {
            animation: ${backgroundEnterNext} 1.3s cubic-bezier(0.16, 1, 0.3, 1)
                both;
        }

        &.is-active.move-previous {
            animation: ${backgroundEnterPrevious} 1.3s
                cubic-bezier(0.16, 1, 0.3, 1) both;
        }
    `,

    BackgroundImage: styled.img`
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
        filter: saturate(0.78) contrast(1.08) brightness(0.76);
        animation: ${imageDrift} 18s ease-in-out alternate infinite;
        will-change: transform;
    `,

    BackgroundShade: styled.div`
        position: absolute;
        inset: 0;
        background:
            linear-gradient(
                90deg,
                rgba(2, 3, 4, 0.97) 0%,
                rgba(2, 3, 4, 0.89) 25%,
                rgba(2, 3, 4, 0.56) 53%,
                rgba(2, 3, 4, 0.26) 76%,
                rgba(2, 3, 4, 0.52) 100%
            ),
            linear-gradient(
                180deg,
                rgba(2, 3, 4, 0.74) 0%,
                transparent 24%,
                transparent 62%,
                rgba(2, 3, 4, 0.96) 100%
            ),
            radial-gradient(
                circle at 70% 42%,
                transparent 0%,
                rgba(2, 3, 4, 0.12) 45%,
                rgba(2, 3, 4, 0.82) 100%
            );

        @media (max-width: 900px) {
            background:
                linear-gradient(
                    180deg,
                    rgba(2, 3, 4, 0.62) 0%,
                    rgba(2, 3, 4, 0.3) 27%,
                    rgba(2, 3, 4, 0.84) 67%,
                    rgba(2, 3, 4, 0.98) 100%
                ),
                linear-gradient(
                    90deg,
                    rgba(2, 3, 4, 0.84) 0%,
                    rgba(2, 3, 4, 0.28) 100%
                );
        }
    `,

    AmbientGlow: styled.div`
        position: absolute;
        top: 5%;
        right: 7%;
        width: min(46vw, 720px);
        aspect-ratio: 1;
        border-radius: 50%;
        background: radial-gradient(
            circle,
            var(--ambient-glow) 0%,
            transparent 68%
        );
        filter: blur(38px);
        mix-blend-mode: screen;
        animation: ${glowPulse} 8s ease-in-out infinite;
    `,

    Noise: styled.div`
        position: absolute;
        inset: 0;
        opacity: 0.065;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.75'/%3E%3C/svg%3E");
        mix-blend-mode: soft-light;
    `,

    Shell: styled.div`
        display: flex;
        width: min(100%, 1680px);
        min-height: 100vh;
        margin: 0 auto;
        padding: clamp(22px, 2.8vw, 48px) clamp(20px, 4vw, 72px);
        flex-direction: column;
    `,

    TopBar: styled.header`
        position: relative;
        z-index: 10;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
    `,

    Brand: styled.button`
        display: inline-flex;
        width: fit-content;
        padding: 0;
        border: 0;
        align-items: center;
        gap: 13px;
        color: inherit;
        text-align: left;
        background: transparent;
        cursor: pointer;

        &:hover > span:first-child {
            border-color: var(--accent);
            box-shadow:
                0 0 28px var(--accent-soft),
                inset 0 1px 0 rgba(255, 255, 255, 0.16);
            transform: rotate(-4deg) scale(1.05);
        }

        &:hover img {
            transform: scale(1.08);
        }

        &:focus-visible {
            border-radius: 16px;
            outline: 2px solid var(--accent-strong);
            outline-offset: 6px;
        }
    `,

    BrandMark: styled.span`
        display: grid;
        width: 48px;
        height: 48px;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.24);
        border-radius: 15px;
        background: #050607;
        box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.1),
            0 12px 32px rgba(0, 0, 0, 0.32);
        place-items: center;
        transition:
            border-color 220ms ease,
            box-shadow 220ms ease,
            transform 320ms cubic-bezier(0.16, 1, 0.3, 1);
        padding: 3px;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            transition: transform 420ms cubic-bezier(0.16, 1, 0.3, 1);
        }
    `,

    BrandCopy: styled.span`
        display: flex;
        flex-direction: column;
        gap: 2px;
    `,

    BrandName: styled.span`
        color: #ffffff;
        font-size: 0.92rem;
        font-weight: 700;
        letter-spacing: 0.035em;
    `,

    BrandTagline: styled.span`
        color: rgba(255, 255, 255, 0.48);
        font-size: 0.62rem;
        font-weight: 600;
        letter-spacing: 0.16em;
        text-transform: uppercase;
    `,

    AutoPlayButton: styled.button`
        display: inline-flex;
        min-height: 42px;
        padding: 7px 14px 7px 8px;
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 99px;
        align-items: center;
        gap: 10px;
        color: rgba(255, 255, 255, 0.72);
        background: rgba(5, 7, 9, 0.36);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07);
        backdrop-filter: blur(18px);
        transition:
            border-color 180ms ease,
            color 180ms ease,
            background 180ms ease,
            transform 180ms ease;

        &:hover {
            border-color: rgba(255, 255, 255, 0.28);
            color: #ffffff;
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-2px);
        }

        &.is-paused {
            color: rgba(255, 255, 255, 0.48);
        }

        &.is-paused > span:first-child {
            color: #ffffff;
            background: rgba(255, 255, 255, 0.16);
            box-shadow: none;
        }
    `,

    AutoPlayIcon: styled.span`
        display: grid;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        color: #050607;
        background: var(--accent-strong);
        box-shadow: 0 0 22px var(--accent-soft);
        place-items: center;
        font-size: 0.62rem;
        font-weight: 900;
        transition:
            color 180ms ease,
            background 180ms ease,
            box-shadow 180ms ease;
    `,

    AutoPlayText: styled.span`
        font-size: 0.66rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        text-transform: uppercase;

        @media (max-width: 480px) {
            display: none;
        }
    `,

    Main: styled.main`
        display: flex;
        flex: 1;
        align-items: center;
        padding: clamp(56px, 8vh, 110px) 0 clamp(44px, 6vh, 82px);
        touch-action: pan-y;
        user-select: none;
    `,

    Hero: styled.div`
        display: grid;
        width: 100%;
        min-width: 0;
        grid-template-columns: minmax(0, 1fr) minmax(300px, 390px);
        align-items: center;
        gap: clamp(42px, 7vw, 120px);

        @media (max-width: 1120px) {
            grid-template-columns: minmax(0, 1fr) 310px;
            gap: 46px;
        }

        @media (max-width: 900px) {
            grid-template-columns: 1fr;
            align-items: initial;
            gap: 54px;
        }
    `,

    Content: styled.div`
        width: min(100%, 780px);

        &.move-next {
            animation: ${contentEnterNext} 920ms cubic-bezier(0.16, 1, 0.3, 1)
                both;
        }

        &.move-previous {
            animation: ${contentEnterPrevious} 920ms
                cubic-bezier(0.16, 1, 0.3, 1) both;
        }
    `,

    EyebrowRow: styled.div`
        display: flex;
        align-items: center;
        gap: 13px;
        margin-bottom: clamp(18px, 2.5vw, 28px);
    `,

    EyebrowLine: styled.span`
        width: 38px;
        height: 1px;
        background: linear-gradient(90deg, var(--accent), transparent);
        box-shadow: 0 0 16px var(--accent-soft);
    `,

    Eyebrow: styled.p`
        color: var(--accent);
        font-size: clamp(0.65rem, 0.8vw, 0.76rem);
        font-weight: 700;
        letter-spacing: 0.2em;
        text-transform: uppercase;
    `,

    Title: styled.h1`
        display: flex;
        margin-bottom: clamp(24px, 3vw, 36px);
        padding: 0.08em 0 0.12em;
        flex-direction: column;
        font-size: clamp(4rem, 8vw, 9.2rem);
        font-weight: 700;
        letter-spacing: -0.075em;
        line-height: 0.88;
        text-shadow: 0 20px 60px rgba(0, 0, 0, 0.42);

        @media (max-width: 600px) {
            font-size: clamp(3.2rem, 18vw, 5.7rem);
            line-height: 0.9;
        }
    `,

    TitleLine: styled.span`
        color: #ffffff;
    `,

    TitleAccent: styled.span`
        display: block;
        margin-top: -0.04em;
        margin-left: clamp(34px, 7vw, 110px);
        padding-bottom: 0.16em;
        color: transparent;
        background: linear-gradient(
            110deg,
            var(--accent-strong) 0%,
            var(--accent) 48%,
            rgba(255, 255, 255, 0.44) 100%
        );
        background-clip: text;
        -webkit-background-clip: text;
        filter: drop-shadow(0 0 28px var(--accent-soft));
        line-height: 0.96;

        @media (max-width: 600px) {
            margin-left: 20px;
            padding-bottom: 0.18em;
            line-height: 0.98;
        }
    `,

    MetaList: styled.ul`
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 9px;
        margin-bottom: 22px;
    `,

    MetaItem: styled.li`
        display: inline-flex;
        min-height: 29px;
        padding: 5px 10px;
        border: 1px solid rgba(255, 255, 255, 0.16);
        border-radius: 7px;
        align-items: center;
        color: rgba(255, 255, 255, 0.7);
        background: rgba(5, 7, 9, 0.24);
        backdrop-filter: blur(12px);
        font-size: 0.68rem;
        font-weight: 700;
        letter-spacing: 0.035em;

        &.is-highlighted {
            border-color: var(--accent);
            color: var(--accent-strong);
            background: var(--accent-soft);
        }
    `,

    Description: styled.p`
        max-width: 640px;
        margin-bottom: 21px;
        color: rgba(255, 255, 255, 0.68);
        font-size: clamp(0.88rem, 1.2vw, 1.05rem);
        line-height: 1.78;
        text-shadow: 0 4px 22px rgba(0, 0, 0, 0.5);

        @media (max-width: 540px) {
            display: -webkit-box;
            overflow: hidden;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 4;
            line-height: 1.65;
        }
    `,

    GenreList: styled.ul`
        display: flex;
        flex-wrap: wrap;
        gap: 8px 20px;
        margin-bottom: clamp(28px, 4vw, 42px);
    `,

    Genre: styled.li`
        position: relative;
        color: rgba(255, 255, 255, 0.52);
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.055em;

        &:not(:last-child)::after {
            position: absolute;
            top: 50%;
            right: -12px;
            width: 3px;
            height: 3px;
            border-radius: 50%;
            background: var(--accent);
            content: "";
            transform: translateY(-50%);
        }
    `,

    Actions: styled.div`
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 12px;
    `,

    PrimaryButton: styled.button`
        display: inline-flex;
        min-height: 52px;
        padding: 12px 21px;
        border: 1px solid var(--accent-strong);
        border-radius: 99px;
        align-items: center;
        justify-content: center;
        gap: 11px;
        color: #050607;
        background: var(--accent-strong);
        box-shadow:
            0 14px 34px var(--accent-soft),
            inset 0 1px 0 rgba(255, 255, 255, 0.72);
        font-size: 0.73rem;
        font-weight: 800;
        letter-spacing: 0.07em;
        text-transform: uppercase;
        transition:
            box-shadow 220ms ease,
            transform 220ms cubic-bezier(0.16, 1, 0.3, 1);

        &:hover {
            box-shadow:
                0 18px 45px var(--accent-soft),
                inset 0 1px 0 rgba(255, 255, 255, 0.82);
            transform: translateY(-3px) scale(1.015);
        }

        &:active {
            transform: translateY(0) scale(0.98);
        }
    `,

    ButtonIcon: styled.span`
        display: inline-grid;
        min-width: 18px;
        place-items: center;
        font-size: 0.72rem;
        line-height: 1;
    `,

    SecondaryButton: styled.button`
        display: inline-flex;
        min-height: 52px;
        padding: 12px 19px;
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 99px;
        align-items: center;
        justify-content: center;
        gap: 11px;
        color: rgba(255, 255, 255, 0.78);
        background: rgba(7, 9, 11, 0.32);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.07);
        backdrop-filter: blur(16px);
        font-size: 0.72rem;
        font-weight: 700;
        letter-spacing: 0.065em;
        text-transform: uppercase;
        transition:
            border-color 200ms ease,
            color 200ms ease,
            background 200ms ease,
            transform 200ms ease;

        &:hover {
            border-color: rgba(255, 255, 255, 0.36);
            color: #ffffff;
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-3px);
        }
    `,

    PreviewRail: styled.aside`
        width: 100%;
        min-width: 0;

        @media (max-width: 900px) {
            width: min(100%, 760px);
        }
    `,

    PreviewHeader: styled.div`
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        margin-bottom: 14px;
        padding-right: 12px;
    `,

    PreviewLabel: styled.p`
        color: rgba(255, 255, 255, 0.48);
        font-size: 0.64rem;
        font-weight: 700;
        letter-spacing: 0.19em;
        text-transform: uppercase;
    `,

    PreviewCount: styled.p`
        color: #ffffff;
        font-size: 0.72rem;
        font-weight: 800;
        letter-spacing: 0.05em;

        span {
            color: rgba(255, 255, 255, 0.36);
            font-weight: 600;
        }
    `,

    PreviewList: styled.div`
        display: grid;
        max-height: clamp(350px, 49vh, 520px);
        padding: 2px 10px 2px 2px;
        overflow-x: hidden;
        overflow-y: auto;
        gap: 11px;
        overscroll-behavior: contain;
        scrollbar-color: var(--accent) rgba(255, 255, 255, 0.08);
        scrollbar-gutter: stable;
        scrollbar-width: thin;

        &::-webkit-scrollbar {
            width: 7px;
        }

        &::-webkit-scrollbar-track {
            border-radius: 99px;
            background: rgba(255, 255, 255, 0.07);
        }

        &::-webkit-scrollbar-thumb {
            border: 2px solid transparent;
            border-radius: 99px;
            background: var(--accent);
            background-clip: padding-box;
        }

        &::-webkit-scrollbar-thumb:hover {
            background: var(--accent-strong);
            background-clip: padding-box;
        }

        @media (max-width: 900px) {
            max-height: 430px;
        }

        @media (max-width: 620px) {
            max-height: 410px;
            padding-right: 8px;
        }
    `,

    PreviewButton: styled.button`
        position: relative;
        width: 100%;
        min-height: 112px;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.13);
        border-radius: 19px;
        flex: 0 0 auto;
        text-align: left;
        background: rgba(8, 10, 12, 0.4);
        box-shadow:
            0 16px 40px rgba(0, 0, 0, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
        isolation: isolate;
        transition:
            border-color 240ms ease,
            box-shadow 240ms ease,
            transform 340ms cubic-bezier(0.16, 1, 0.3, 1);

        &::after {
            position: absolute;
            top: 18px;
            bottom: 18px;
            left: 0;
            width: 3px;
            border-radius: 0 99px 99px 0;
            background: var(--accent-strong);
            box-shadow: 0 0 18px var(--accent);
            opacity: 0;
            content: "";
            transform: scaleY(0.35);
            transition:
                opacity 240ms ease,
                transform 360ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        &:hover {
            border-color: var(--accent);
            box-shadow:
                0 24px 52px rgba(0, 0, 0, 0.34),
                0 0 28px var(--accent-soft);
            transform: translate3d(-6px, 0, 0);
        }

        &:hover img {
            filter: saturate(0.92) brightness(0.9);
            transform: scale(1.08);
        }

        &.is-active {
            border-color: var(--accent);
            background: var(--accent-soft);
            box-shadow:
                0 22px 48px rgba(0, 0, 0, 0.34),
                0 0 30px var(--accent-soft),
                inset 0 1px 0 rgba(255, 255, 255, 0.16);
        }

        &.is-active::after {
            opacity: 1;
            transform: scaleY(1);
        }

        &.is-active img {
            filter: saturate(1) contrast(1.04) brightness(0.94);
            transform: scale(1.045);
        }

        &.is-active > span:nth-of-type(3) {
            color: var(--accent-strong);
        }

        &:focus-visible {
            border-color: var(--accent-strong);
            outline: 2px solid var(--accent-strong);
            outline-offset: -4px;
        }

        @media (max-width: 900px) {
            min-height: 140px;

            &:hover {
                transform: translate3d(-4px, 0, 0);
            }
        }

        @media (max-width: 620px) {
            min-height: 132px;
            border-radius: 17px;
        }
    `,

    PreviewImage: styled.img`
        position: absolute;
        inset: 0;
        z-index: -2;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
        filter: saturate(0.72) brightness(0.8);
        transition:
            filter 420ms ease,
            transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
    `,

    PreviewOverlay: styled.span`
        position: absolute;
        inset: 0;
        z-index: -1;
        background:
            linear-gradient(
                90deg,
                rgba(4, 6, 8, 0.88) 0%,
                rgba(4, 6, 8, 0.42) 58%,
                rgba(4, 6, 8, 0.16) 100%
            ),
            linear-gradient(180deg, transparent 20%, rgba(4, 6, 8, 0.72) 100%);
    `,

    PreviewIndex: styled.span`
        position: absolute;
        top: 14px;
        right: 15px;
        color: rgba(255, 255, 255, 0.44);
        font-size: 0.62rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        transition: color 220ms ease;
    `,

    PreviewContent: styled.span`
        position: absolute;
        right: 18px;
        bottom: 17px;
        left: 18px;
        display: block;
    `,

    PreviewEyebrow: styled.span`
        display: block;
        margin-bottom: 5px;
        color: var(--accent);
        font-size: 0.56rem;
        font-weight: 700;
        letter-spacing: 0.13em;
        text-transform: uppercase;
    `,

    PreviewTitle: styled.span`
        display: block;
        max-width: 220px;
        color: #ffffff;
        font-size: clamp(0.82rem, 1.2vw, 1rem);
        font-weight: 700;
        letter-spacing: -0.025em;
        line-height: 1.2;
        text-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
    `,

    BottomBar: styled.footer`
        position: relative;
        z-index: 10;
        display: grid;
        grid-template-columns: minmax(130px, 1fr) minmax(220px, 360px) auto;
        align-items: center;
        gap: clamp(24px, 4vw, 62px);
        padding-top: 21px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);

        @media (max-width: 720px) {
            grid-template-columns: 1fr auto;
        }
    `,

    Pagination: styled.nav`
        display: flex;
        align-items: center;
        gap: 7px;

        @media (max-width: 720px) {
            grid-column: 1 / -1;
            grid-row: 2;
        }
    `,

    PaginationButton: styled.button`
        display: grid;
        width: 18px;
        height: 22px;
        place-items: center;
        transition: width 380ms cubic-bezier(0.16, 1, 0.3, 1);

        span {
            display: block;
            width: 100%;
            height: 2px;
            border-radius: 99px;
            background: rgba(255, 255, 255, 0.24);
            transition:
                background 220ms ease,
                box-shadow 220ms ease,
                transform 220ms ease;
        }

        &.is-active {
            width: 34px;
        }

        &.is-active span {
            background: var(--accent-strong);
            box-shadow: 0 0 14px var(--accent-soft);
        }

        &:hover span {
            background: #ffffff;
            transform: scaleY(2);
        }
    `,

    ProgressArea: styled.div`
        display: grid;
        grid-template-columns: auto minmax(110px, 1fr);
        align-items: center;
        gap: 14px;

        @media (max-width: 720px) {
            grid-column: 1;
            grid-row: 1;
        }

        @media (max-width: 470px) {
            grid-template-columns: 1fr;
            gap: 7px;
        }
    `,

    ProgressLabel: styled.p`
        color: rgba(255, 255, 255, 0.42);
        font-size: 0.58rem;
        font-weight: 700;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        white-space: nowrap;
    `,

    ProgressTrack: styled.span`
        position: relative;
        display: block;
        width: 100%;
        height: 2px;
        overflow: hidden;
        border-radius: 99px;
        background: rgba(255, 255, 255, 0.14);
    `,

    ProgressFill: styled.span`
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: linear-gradient(90deg, var(--accent), var(--accent-strong));
        box-shadow: 0 0 16px var(--accent-soft);
        animation: ${progressAnimation} 7s linear both;
        transform-origin: left center;

        &.is-paused {
            animation-play-state: paused;
        }
    `,

    Navigation: styled.nav`
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 9px;

        @media (max-width: 720px) {
            grid-column: 2;
            grid-row: 1;
        }
    `,

    NavButton: styled.button`
        display: grid;
        width: 45px;
        height: 45px;
        border: 1px solid rgba(255, 255, 255, 0.16);
        border-radius: 50%;
        color: rgba(255, 255, 255, 0.72);
        background: rgba(6, 8, 10, 0.38);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
        backdrop-filter: blur(14px);
        place-items: center;
        font-size: 1.05rem;
        transition:
            border-color 220ms ease,
            color 220ms ease,
            background 220ms ease,
            box-shadow 220ms ease,
            transform 260ms cubic-bezier(0.16, 1, 0.3, 1);

        &:hover {
            border-color: var(--accent);
            color: #050607;
            background: var(--accent-strong);
            box-shadow: 0 0 24px var(--accent-soft);
            transform: translateY(-3px);
        }

        &:active {
            transform: translateY(0) scale(0.94);
        }
    `,

    DeveloperModalBackdrop: styled.div`
        position: fixed;
        inset: 0;
        z-index: 1000;
        display: grid;
        padding: clamp(18px, 4vw, 56px);
        overflow-x: hidden;
        overflow-y: auto;
        background:
            radial-gradient(
                circle at 50% 20%,
                var(--accent-soft),
                transparent 38%
            ),
            rgba(1, 2, 3, 0.78);
        backdrop-filter: blur(24px);
        place-items: center;
        animation: ${modalBackdropEnter} 320ms ease both;
    `,

    DeveloperModal: styled.div`
        position: relative;
        width: min(100%, 760px);
        overflow: hidden;
        padding: clamp(24px, 4vw, 44px);
        border: 1px solid rgba(255, 255, 255, 0.16);
        border-radius: clamp(24px, 4vw, 38px);
        background:
            linear-gradient(
                145deg,
                rgba(255, 255, 255, 0.1),
                rgba(255, 255, 255, 0.025) 44%,
                rgba(255, 255, 255, 0.06)
            ),
            rgba(4, 6, 8, 0.92);
        box-shadow:
            0 40px 120px rgba(0, 0, 0, 0.72),
            0 0 80px var(--accent-soft),
            inset 0 1px 0 rgba(255, 255, 255, 0.14);
        isolation: isolate;
        animation: ${modalEnter} 560ms cubic-bezier(0.16, 1, 0.3, 1) both;

        &::before {
            position: absolute;
            top: -180px;
            right: -140px;
            z-index: -1;
            width: 380px;
            height: 380px;
            border-radius: 50%;
            background: radial-gradient(
                circle,
                var(--ambient-glow),
                transparent 68%
            );
            filter: blur(26px);
            content: "";
            pointer-events: none;
        }

        &::after {
            position: absolute;
            inset: 0;
            z-index: -1;
            opacity: 0.045;
            background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.88' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='.75'/%3E%3C/svg%3E");
            content: "";
            pointer-events: none;
        }

        @media (max-width: 520px) {
            padding: 22px;
            border-radius: 24px;
        }
    `,

    DeveloperModalHeader: styled.header`
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 24px;
        margin-bottom: 26px;
    `,

    DeveloperIdentity: styled.div`
        display: flex;
        min-width: 0;
        align-items: center;
        gap: clamp(16px, 3vw, 24px);

        @media (max-width: 520px) {
            align-items: flex-start;
        }
    `,

    DeveloperLogo: styled.div`
        display: grid;
        width: clamp(70px, 10vw, 96px);
        height: clamp(70px, 10vw, 96px);
        flex: 0 0 auto;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.18);
        border-radius: 25px;
        background: #050607;
        box-shadow:
            0 20px 48px rgba(0, 0, 0, 0.38),
            0 0 34px var(--accent-soft),
            inset 0 1px 0 rgba(255, 255, 255, 0.12);
        place-items: center;
        padding: 3px;

        img {
            width: 100%;
            height: 100%;
            object-fit: contain;
        }

        @media (max-width: 520px) {
            border-radius: 20px;
        }
    `,

    DeveloperIntro: styled.div`
        min-width: 0;
    `,

    DeveloperKicker: styled.p`
        margin-bottom: 8px;
        color: var(--accent);
        font-size: 0.62rem;
        font-weight: 700;
        letter-spacing: 0.18em;
        text-transform: uppercase;
    `,

    DeveloperName: styled.h2`
        padding-bottom: 0.08em;
        color: #ffffff;
        font-size: clamp(2rem, 5vw, 4.2rem);
        font-weight: 700;
        letter-spacing: -0.06em;
        line-height: 0.95;
    `,

    DeveloperRole: styled.p`
        margin-top: 9px;
        color: rgba(255, 255, 255, 0.54);
        font-size: clamp(0.72rem, 1.2vw, 0.9rem);
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    `,

    DeveloperCloseButton: styled.button`
        display: grid;
        width: 44px;
        height: 44px;
        flex: 0 0 auto;
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 50%;
        color: rgba(255, 255, 255, 0.7);
        background: rgba(255, 255, 255, 0.06);
        backdrop-filter: blur(14px);
        place-items: center;
        font-size: 1.5rem;
        font-weight: 300;
        line-height: 1;
        transition:
            border-color 200ms ease,
            color 200ms ease,
            background 200ms ease,
            box-shadow 200ms ease,
            transform 220ms ease;

        &:hover {
            border-color: var(--accent);
            color: #050607;
            background: var(--accent-strong);
            box-shadow: 0 0 24px var(--accent-soft);
            transform: rotate(90deg);
        }

        &:focus-visible {
            outline: 2px solid var(--accent-strong);
            outline-offset: 4px;
        }
    `,

    DeveloperLocation: styled.p`
        display: inline-flex;
        min-height: 30px;
        margin-bottom: 20px;
        padding: 6px 11px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 99px;
        align-items: center;
        color: var(--accent-strong);
        background: var(--accent-soft);
        font-size: 0.66rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
    `,

    DeveloperDescription: styled.p`
        max-width: 650px;
        margin-bottom: clamp(26px, 4vw, 38px);
        color: rgba(255, 255, 255, 0.66);
        font-size: clamp(0.88rem, 1.4vw, 1.03rem);
        line-height: 1.8;
    `,

    DeveloperRepositoryCard: styled.section`
        position: relative;
        margin-bottom: clamp(26px, 4vw, 38px);
        padding: clamp(18px, 3vw, 26px);
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 22px;
        background:
            linear-gradient(135deg, var(--accent-soft), transparent 48%),
            rgba(255, 255, 255, 0.035);
        box-shadow:
            0 18px 48px rgba(0, 0, 0, 0.26),
            inset 0 1px 0 rgba(255, 255, 255, 0.06);
        isolation: isolate;

        &::before {
            position: absolute;
            top: -80px;
            right: -60px;
            z-index: -1;
            width: 190px;
            height: 190px;
            border-radius: 50%;
            background: radial-gradient(
                circle,
                var(--ambient-glow),
                transparent 70%
            );
            filter: blur(20px);
            content: "";
            pointer-events: none;
        }

        @media (max-width: 520px) {
            padding: 18px;
            border-radius: 18px;
        }
    `,

    DeveloperRepositoryHeader: styled.header`
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 24px;
        margin-bottom: 22px;

        > div {
            min-width: 0;
        }

        @media (max-width: 560px) {
            flex-direction: column;
            gap: 14px;
        }
    `,

    DeveloperRepositoryKicker: styled.p`
        margin-bottom: 6px;
        color: var(--accent);
        font-size: 0.58rem;
        font-weight: 700;
        letter-spacing: 0.18em;
        text-transform: uppercase;
    `,

    DeveloperRepositoryName: styled.h3`
        overflow: hidden;
        color: #ffffff;
        font-size: clamp(1.05rem, 2vw, 1.35rem);
        font-weight: 700;
        letter-spacing: -0.035em;
        line-height: 1.2;
        text-overflow: ellipsis;
        white-space: nowrap;

        @media (max-width: 560px) {
            white-space: normal;
        }
    `,

    DeveloperRepositoryLink: styled.a`
        display: inline-flex;
        min-height: 38px;
        padding: 8px 13px;
        border: 1px solid rgba(255, 255, 255, 0.14);
        border-radius: 99px;
        flex: 0 0 auto;
        align-items: center;
        justify-content: center;
        gap: 8px;
        color: rgba(255, 255, 255, 0.68);
        background: rgba(5, 7, 9, 0.34);
        backdrop-filter: blur(14px);
        font-size: 0.62rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        transition:
            border-color 200ms ease,
            color 200ms ease,
            background 200ms ease,
            box-shadow 200ms ease,
            transform 220ms ease;

        span {
            color: var(--accent);
            font-size: 0.82rem;
            transition: transform 220ms ease;
        }

        &:hover {
            border-color: var(--accent);
            color: #ffffff;
            background: var(--accent-soft);
            box-shadow: 0 0 24px var(--accent-soft);
            transform: translateY(-2px);
        }

        &:hover span {
            transform: translate3d(2px, -2px, 0);
        }

        &:focus-visible {
            outline: 2px solid var(--accent-strong);
            outline-offset: 3px;
        }

        @media (max-width: 560px) {
            width: fit-content;
        }
    `,

    DeveloperRepositoryMessage: styled.p`
        min-height: 54px;
        padding: 16px;
        border: 1px dashed rgba(255, 255, 255, 0.13);
        border-radius: 15px;
        color: rgba(255, 255, 255, 0.48);
        background: rgba(3, 5, 7, 0.28);
        font-size: 0.72rem;
        font-weight: 600;
        letter-spacing: 0.035em;
        line-height: 1.55;
    `,

    DeveloperRepositoryGrid: styled.div`
        display: grid;
        grid-template-columns: minmax(120px, 0.7fr) minmax(220px, 1.5fr);
        gap: 10px;

        @media (max-width: 620px) {
            grid-template-columns: 1fr;
        }
    `,

    DeveloperRepositoryItem: styled.div`
        display: flex;
        min-width: 0;
        min-height: 82px;
        padding: 15px 16px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 16px;
        flex-direction: column;
        justify-content: space-between;
        gap: 10px;
        background: rgba(3, 5, 7, 0.32);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);

        span {
            color: rgba(255, 255, 255, 0.4);
            font-size: 0.56rem;
            font-weight: 700;
            letter-spacing: 0.14em;
            text-transform: uppercase;
        }

        strong {
            overflow-wrap: anywhere;
            color: var(--accent-strong);
            font-size: clamp(0.78rem, 1.4vw, 0.92rem);
            font-weight: 700;
            letter-spacing: 0.025em;
            line-height: 1.5;
        }

        &:first-child strong {
            font-size: clamp(1.35rem, 3vw, 2rem);
            letter-spacing: -0.04em;
            line-height: 1;
        }
    `,

    DeveloperLinks: styled.div`
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
        margin-bottom: clamp(28px, 4vw, 38px);

        @media (max-width: 560px) {
            grid-template-columns: 1fr;
        }
    `,

    DeveloperLink: styled.a`
        display: flex;
        min-height: 58px;
        padding: 14px 17px;
        border: 1px solid rgba(255, 255, 255, 0.12);
        border-radius: 17px;
        align-items: center;
        justify-content: space-between;
        gap: 18px;
        color: rgba(255, 255, 255, 0.76);
        background: rgba(255, 255, 255, 0.045);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
        font-size: 0.74rem;
        font-weight: 700;
        letter-spacing: 0.045em;
        transition:
            border-color 220ms ease,
            color 220ms ease,
            background 220ms ease,
            box-shadow 220ms ease,
            transform 260ms cubic-bezier(0.16, 1, 0.3, 1);

        span:last-child {
            color: var(--accent);
            font-size: 0.9rem;
            transition: transform 240ms ease;
        }

        &:hover {
            border-color: var(--accent);
            color: #ffffff;
            background: var(--accent-soft);
            box-shadow:
                0 14px 34px rgba(0, 0, 0, 0.26),
                0 0 24px var(--accent-soft);
            transform: translateY(-3px);
        }

        &:hover span:last-child {
            transform: translate3d(3px, -3px, 0);
        }

        &:focus-visible {
            outline: 2px solid var(--accent-strong);
            outline-offset: 3px;
        }
    `,

    DeveloperFooter: styled.footer`
        display: flex;
        padding-top: 19px;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        color: rgba(255, 255, 255, 0.34);
        font-size: 0.62rem;
        font-weight: 700;
        letter-spacing: 0.11em;
        text-transform: uppercase;

        span {
            color: rgba(255, 255, 255, 0.52);
        }
    `,

    LiveRegion: styled.span`
        position: absolute;
        width: 1px;
        height: 1px;
        overflow: hidden;
        margin: -1px;
        padding: 0;
        border: 0;
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        white-space: nowrap;
    `,
};
