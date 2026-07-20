import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: "/cinematic-carousel-ui/",
    build: {
        target: "es2019",
        cssCodeSplit: true,
        sourcemap: false,
    },
});
