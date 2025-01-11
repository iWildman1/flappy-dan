import { sprite } from '@/src/utils/Sprite'
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
        const floorHeight = 55;
        const usableHeight = dimensions.height - floorHeight;
        
        this.x = dimensions.width;
        this.width = config.pipes.width;
        this.topHeight = Math.random() * (usableHeight - config.pipes.gapHeight - 100) + 50;
        this.bottomY = this.topHeight + config.pipes.gapHeight;
    }

    update(deltaTime: number) {
        const deltaSeconds = deltaTime / 1000;
        this.x -= config.pipes.speed * deltaSeconds;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const dimensions = getCanvasDimensions(this.canvas);

        // Draw top pipe
        this.drawPipe(ctx, this.x, 0, this.topHeight, true);

        // Draw bottom pipe
        this.drawPipe(ctx, this.x, this.bottomY, dimensions.height - this.bottomY, false);
    }

    private drawPipe(ctx: CanvasRenderingContext2D, x: number, y: number, height: number, isTop: boolean) {
        const pipeWidth = 26;
        const pipeBodyHeight = 1;
        const pipeCapHeight = 13;
        const pipeBodyY = 323;
        const pipeCapY = 470;

        if (isTop) {
            // Draw the body
            for (let i = 0; i < height - pipeCapHeight; i++) {
                sprite.draw(ctx, 56, pipeBodyY, pipeWidth, pipeBodyHeight, x, y + i, this.width, pipeBodyHeight);
            }

            // Draw the cap
            sprite.draw(ctx, 56, pipeCapY, pipeWidth, pipeCapHeight, x, y + height - pipeCapHeight, this.width, pipeCapHeight);
        } else {
            // Draw the cap
            sprite.draw(ctx, 56, pipeCapY, pipeWidth, pipeCapHeight, x, y, this.width, pipeCapHeight);

            // Draw the body
            for (let i = pipeCapHeight; i < height; i++) {
                sprite.draw(ctx, 56, pipeBodyY, pipeWidth, pipeBodyHeight, x, y + i, this.width, pipeBodyHeight);
            }
        }
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