import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: "./src/library/index.ts",
            name: "rex-progress",
            fileName: (format) => `rex-progress.${format}.js`,
        },
        sourcemap: true,
    },
});
