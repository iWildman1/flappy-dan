import { config } from "@/src/config";

export function setupCanvas(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    const scale = window.devicePixelRatio;

    if (!ctx) {
        throw new Error("Failed to find canvas context");
    }

    canvas.width = config.canvas.width * scale;
    canvas.height = config.canvas.height * scale;
    canvas.style.width = `${config.canvas.width}px`;
    canvas.style.height = `${config.canvas.height}px`;
    ctx.scale(scale, scale);

    return ctx;
}