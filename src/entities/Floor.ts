import { sprite } from '@/src/utils/Sprite';
import { getCanvasDimensions } from '@/src/utils/canvas';
import { type GameObject } from '@/src/types';

export class Floor implements GameObject {
    private x = 0;
    private readonly canvas;
    private readonly speed = 200;
    private static readonly SPRITE_WIDTH = 168;
    private static readonly SPRITE_HEIGHT = 55;
    private static readonly SPRITE_X = 292;
    private static readonly SPRITE_Y = 0;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    update(deltaTime: number) {
        const deltaSeconds = deltaTime / 1000;
        this.x = (this.x - this.speed * deltaSeconds) % Floor.SPRITE_WIDTH;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const dimensions = getCanvasDimensions(this.canvas);
        const y = dimensions.height - Floor.SPRITE_HEIGHT;
        
        // Draw multiple floor segments to cover the entire width
        for (let x = this.x; x < dimensions.width + Floor.SPRITE_WIDTH; x += Floor.SPRITE_WIDTH) {
            sprite.draw(
                ctx,
                Floor.SPRITE_X,
                Floor.SPRITE_Y,
                Floor.SPRITE_WIDTH,
                Floor.SPRITE_HEIGHT,
                x,
                y,
                Floor.SPRITE_WIDTH,
                Floor.SPRITE_HEIGHT
            );
        }
    }

    getFloorY(): number {
        const dimensions = getCanvasDimensions(this.canvas);
        return dimensions.height - Floor.SPRITE_HEIGHT;
    }
}