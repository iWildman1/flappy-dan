export class Sprite {
    private static instance: Sprite;
    private image: HTMLImageElement | null = null;

    private constructor() {
        this.load();
    }

    static getInstance(): Sprite {
        if (!Sprite.instance) {
            Sprite.instance = new Sprite();
        }
        return Sprite.instance;
    }

    private load(): void {
        this.image = new Image();
        this.image.src = '/images/sprites.png';
    }

    draw(ctx: CanvasRenderingContext2D, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void {
        if (this.image) {
            ctx.drawImage(this.image, sx, sy, sw, sh, dx, dy, dw, dh);
        }
    }
}

export const sprite = Sprite.getInstance();