import { config } from '@/src/config';

import { type GameObject } from '@/src/types';

export class Bird implements GameObject {
    private x;
    private y;
    private readonly width;
    private readonly height;
    private velocity = 0;

    constructor() {
        this.x = config.bird.startX;
        this.y = config.bird.startY;
        this.width = config.bird.width;
        this.height = config.bird.height;
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
        return this.y >= config.canvas.height - this.height
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