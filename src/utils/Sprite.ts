export class Sprite {
    private image: HTMLImageElement | null = null;

    constructor(src: string) {
        const image = new Image();
        image.src = src;

        image.onload = () => {
            this.image = image;
        }
    }

    draw(ctx: CanvasRenderingContext2D, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number) {
        if (this.image) {
            ctx.drawImage(this.image, sx, sy, sw, sh, dx, dy, dw, dh);
        }
    }
}