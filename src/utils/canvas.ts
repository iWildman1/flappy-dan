export function setupCanvas(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d');
    const scale = window.devicePixelRatio;

    if (!ctx) {
        throw new Error("Failed to find canvas context");
    }

    const width = window.innerWidth;
    const height = window.innerHeight;

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