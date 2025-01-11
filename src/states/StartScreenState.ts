import { Sprite } from '@/src/utils/Sprite';
import { getCanvasDimensions } from '@/src/utils/canvas';

import { type GameObject } from '@/src/types';

export class StartScreen implements GameObject {
    private readonly canvas;
    private sprite: Sprite;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.sprite = new Sprite('/images/sprites.png');
    }

    update(deltaTime: number) {
        // No update logic needed for the start screen
    }

    draw(ctx: CanvasRenderingContext2D) {
        const dimensions = getCanvasDimensions(this.canvas);
        const centerX = dimensions.width / 2;

        // Draw "Get Ready"
        const getReadyWidth = 92;
        const getReadyHeight = 25;
        const getReadyX = 295;
        const getReadyY = 59;
        const getReadyDestX = centerX - getReadyWidth / 2;
        const getReadyDestY = dimensions.height / 3;

        this.sprite.draw(ctx, getReadyX, getReadyY, getReadyWidth, getReadyHeight, getReadyDestX, getReadyDestY, getReadyWidth, getReadyHeight);

        // Draw "Start Button"
        const startButtonWidth = 52;
        const startButtonHeight = 29;
        const startButtonX = 354;
        const startButtonY = 118;
        const startButtonDestX = centerX - startButtonWidth / 2;
        const startButtonDestY = getReadyDestY + getReadyHeight + 20;

        this.sprite.draw(ctx, startButtonX, startButtonY, startButtonWidth, startButtonHeight, startButtonDestX, startButtonDestY, startButtonWidth, startButtonHeight);
    }
}