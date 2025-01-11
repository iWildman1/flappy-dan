import { config } from '@/src/config';

export function setupCanvas(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    const scale = window.devicePixelRatio;

    if (!ctx) {
        throw new Error("Failed to find canvas context");
    }

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    if (width / height > config.canvas.aspectRatio) {
        width = height * config.canvas.aspectRatio;
    } else {
        height = width / config.canvas.aspectRatio;
    }


    // 430 x 600 <-- base and aspect ratio

    canvas.width = width * scale;
    canvas.height = height * scale;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(scale, scale);

    return ctx;
}

export function getCanvasDimensions(canvas: HTMLCanvasElement) {
    const scale = window.devicePixelRatio;

    return {
        width: canvas.width / scale,
        height: canvas.height / scale
    }
}