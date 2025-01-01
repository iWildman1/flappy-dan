import { config } from '@/src/config';
import { getCanvasDimensions } from '@/src/utils/canvas';

import { type GameObject } from '@/src/types';

export class Pipe implements GameObject {
    private x;
    private width;
    private topHeight;
    private bottomY;
    private readonly canvas;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        const dimensions = getCanvasDimensions(this.canvas);
        
        this.x = dimensions.width;
        this.width = config.pipes.width;
        this.topHeight = Math.random() * (dimensions.height - config.pipes.gapHeight - 100) + 50;
        this.bottomY = this.topHeight + config.pipes.gapHeight;
    }

    update(deltaTime: number) {
        const deltaSeconds = deltaTime / 1000;
        this.x -= config.pipes.speed * deltaSeconds;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const dimensions = getCanvasDimensions(this.canvas);

        ctx.fillStyle = "green";
        ctx.fillRect(this.x, 0, this.width, this.topHeight);
        ctx.fillRect(this.x, this.bottomY, this.width, dimensions.height - this.bottomY);
    }

    isOffScreen() {
        return this.x + this.width < 0;
    }

    getPipe() {
        return {
            x: this.x,
            width: this.width,
            topHeight: this.topHeight,
            bottomY: this.bottomY
        }
    }
}