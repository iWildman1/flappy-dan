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
    private currentTime = 0;

    private currentFrame = 0;
    private lastFrameUpdate = 0;
    private readonly FRAME_INTERVAL = 100
    private readonly SPRITE_X_POSITIONS = [3, 31, 59, 31];

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

    update(deltaTime: number, timestamp: number) {
        this.currentTime = timestamp;
        const deltaSeconds = deltaTime / 1000;

        this.velocity += config.physics.gravity * deltaSeconds;
        this.y += this.velocity * deltaSeconds;
    }

    oscillate(timestamp: number) {
        const elapsedTime = (timestamp - this.startTime) / 1000;
        const amplitude = 3; // pixels
        const frequency = 1; // oscillations per second
        this.y = this.baseY + amplitude * Math.sin(frequency * elapsedTime * Math.PI * 2);
    }

    private getAnimationX(): number {
        return this.SPRITE_X_POSITIONS[this.currentFrame];
    }

    draw(ctx: CanvasRenderingContext2D) {
        // Use stored timestamp for animation
        if (this.currentTime - this.lastFrameUpdate > this.FRAME_INTERVAL) {
            this.currentFrame = (this.currentFrame + 1) % this.SPRITE_X_POSITIONS.length;
            this.lastFrameUpdate = this.currentTime;
        }

        // Calculate the rotation angle based on the velocity
        const angle = Math.atan2(this.velocity, 200);

        // Save the current context state
        ctx.save();

        // Translate to the bird's position
        ctx.translate(config.bird.startX + this.width / 2, this.y + this.height / 2);

        // Rotate the context
        ctx.rotate(angle);

        // Use getAnimationX() for the sprite's X position
        this.sprite.draw(
            ctx, 
            this.getAnimationX(), 
            488, 
            17, 
            15, 
            -this.width / 2, 
            -this.height / 2, 
            this.width, 
            this.height
        );

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