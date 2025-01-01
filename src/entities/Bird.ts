import { config } from '@/src/config';
import { getCanvasDimensions } from '@/src/utils/canvas';

import { type GameObject } from '@/src/types';

export class Bird implements GameObject {
    private x;
    private y;
    private readonly width;
    private readonly height;
    private velocity = 0;
    private readonly canvas;

    constructor(canvas: HTMLCanvasElement) {
        this.x = config.bird.startX;
        this.y = config.bird.startY;
        this.width = config.bird.width;
        this.height = config.bird.height;
        this.canvas = canvas;
    }

    jump() {
        this.velocity = config.bird.jumpStrength;
    }

    update(deltaTime: number) {
        const deltaSeconds = deltaTime / 1000;

        this.velocity += config.physics.gravity * deltaSeconds;
        this.y += this.velocity * deltaSeconds;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'red';
        ctx.fillRect(config.bird.startX, this.y, this.width, this.height);
    }

    isOutOfBounds() {
        const dimensions = getCanvasDimensions(this.canvas);

        return this.y >= dimensions.height - this.height
    }

    getBird() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            velocity: this.velocity
        }
    }
}