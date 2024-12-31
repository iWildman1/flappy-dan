import type { UserConfig } from 'vite'
import path from "path";

export default {
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./")
        }
    }
} satisfies UserConfig;