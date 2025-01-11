import { Bird } from "@/src/entities/Bird";
import { Floor } from "@/src/entities/Floor";
import { PipeManager } from "@/src/managers/PipeManager";
import { getCanvasDimensions } from '@/src/utils/canvas';
import { sprite } from "@/src/utils/Sprite";

import type { Scene } from "@/src/types";

export class RenderManager {
    private readonly ctx;
    private readonly canvas;

    constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        this.ctx = ctx;
        this.canvas = canvas;
    }

    draw(currentScene: Scene, floor: Floor, bird: Bird, pipeManager: PipeManager) {
        // Draw elements across all scenes
        this.drawBackground();
        bird.draw(this.ctx);
        floor.draw(this.ctx);
        pipeManager.draw(this.ctx);
        
        // Draw current scene
        currentScene.draw(this.ctx);
    }

    private drawBackground() {
        const dimensions = getCanvasDimensions(this.canvas);

        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
        sprite.draw(
            this.ctx,
            0,
            0,
            144,
            255,
            0,
            0,
            dimensions.width,
            dimensions.height
        );
    }
}