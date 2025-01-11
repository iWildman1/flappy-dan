import { Sprite } from '@/src/utils/Sprite';
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
    private sprite: Sprite;
    private baseY: number;
    private startTime: number;

    constructor(canvas: HTMLCanvasElement) {
        this.x = config.bird.startX;
        this.y = config.bird.startY;
        this.width = config.bird.width;
        this.height = config.bird.height;
        this.canvas = canvas;
        this.baseY = config.bird.startY;
        this.startTime = performance.now();

        this.sprite = new Sprite('/images/sprites.png');
    }

    jump() {
        this.velocity = config.bird.jumpStrength;
    }

    update(deltaTime: number) {
        const deltaSeconds = deltaTime / 1000;

        this.velocity += config.physics.gravity * deltaSeconds;
        this.y += this.velocity * deltaSeconds;
    }

    oscillate() {
        const elapsedTime = (performance.now() - this.startTime) / 1000;
        const amplitude = 3; // pixels
        const frequency = 1; // oscillations per second
        this.y = this.baseY + amplitude * Math.sin(frequency * elapsedTime * Math.PI * 2);
    }

    draw(ctx: CanvasRenderingContext2D) {
            // Calculate the rotation angle based on the velocity
            const angle = Math.atan2(this.velocity, 200);

            // Save the current context state
            ctx.save();

            // Translate to the bird's position
            ctx.translate(config.bird.startX + this.width / 2, this.y + this.height / 2);

            // Rotate the context
            ctx.rotate(angle);

            // Draw the bird image with the rotation applied
            this.sprite.draw(ctx, 3, 488, 17, 15, -this.width / 2, -this.height / 2, this.width, this.height);

            // Restore the context state
            ctx.restore();
    }

    isOutOfBounds() {
        const dimensions = getCanvasDimensions(this.canvas);
        const floorY = dimensions.height - 55; // TODO: Make this some kind of config
        return this.y >= floorY - this.height;
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