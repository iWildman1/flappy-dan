import { config } from '@/src/config';

import { type GameObject } from '@/src/types';

export class Pipe implements GameObject {
    private x;
    private width;
    private topHeight;
    private bottomY;

    constructor() {
        this.x = config.canvas.width;
        this.width = config.pipes.width;
        this.topHeight = Math.random() * (config.canvas.height - config.pipes.gapHeight - 100) + 50;
        this.bottomY = this.topHeight + config.pipes.gapHeight;
    }

    update(deltaTime: number) {
        const deltaSeconds = deltaTime / 1000;
        this.x -= config.pipes.speed * deltaSeconds;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, 0, this.width, this.topHeight);
        ctx.fillRect(this.x, this.bottomY, this.width, config.canvas.height - this.bottomY);
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