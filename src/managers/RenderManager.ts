import { Bird } from "@/src/entities/Bird";
import { Floor } from "@/src/entities/Floor";
import { PipeManager } from "@/src/managers/PipeManager";
import { ScoreManager } from '@/src/managers/ScoreManager';
import { StartScreen } from '@/src/states/StartScreenState';
import { getCanvasDimensions } from '@/src/utils/canvas';

import type { GameState } from "@/src/types";

export class RenderManager {
    private readonly ctx;
    private readonly canvas;
    private image: HTMLImageElement | null = null;
    private readonly startScreen;
    private startTime: number = performance.now();

    constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        this.ctx = ctx;
        this.canvas = canvas;

        const image = new Image();
        image.src = '/images/sprites.png';

        image.onload = () => {
            this.image = image;
        }

        this.startScreen = new StartScreen(this.canvas);
    }

    draw(bird: Bird, pipeManager: PipeManager, scoreManager: ScoreManager, gameState: GameState, floor: Floor) {
        this.drawBackground();
        bird.draw(this.ctx);
        pipeManager.draw(this.ctx);
        floor.draw(this.ctx); // Draw floor after pipes but before UI
        scoreManager.draw(this.ctx);

        if (gameState === 'OVER') {
            this.drawGameOver(scoreManager.getScore());
        }

        if (gameState === 'START') {
            bird.oscillate();
            this.startScreen.draw(this.ctx);
        }
    }

    private drawBackground() {
        const dimensions = getCanvasDimensions(this.canvas);

        if (this.image) {
            this.ctx.imageSmoothingEnabled = true;
            this.ctx.imageSmoothingQuality = 'high';
            this.ctx.drawImage(this.image, 0, 0, 144, 255, 0, 0, dimensions.width, dimensions.height);
        }
    }

    private drawGameOver(finalScore: number) {
        const dimensions = getCanvasDimensions(this.canvas);

        this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        this.ctx.fillRect(0, 0, dimensions.width, dimensions.height);
        this.ctx.fillStyle = "white";
        this.ctx.font = "40px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Game Over", dimensions.width / 2, dimensions.height / 2);
        this.ctx.font = "30px Arial";
        this.ctx.fillText(
            `Final Score: ${finalScore}`, 
            dimensions.width / 2, 
            dimensions.height / 2 + 20
        );
        this.ctx.font = "20px Arial";
        this.ctx.fillText("Click or press Space to restart", dimensions.width / 2, dimensions.height / 2 + 40);
    }
}