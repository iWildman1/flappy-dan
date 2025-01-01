import { Bird } from "@/src/entities/Bird";
import { PipeManager } from "@/src/managers/PipeManager";
import { ScoreManager } from '@/src/managers/ScoreManager';
import { config } from "@/src/config";
import { getCanvasDimensions } from '@/src/utils/canvas';

import type { GameState } from "@/src/types";

export class RenderManager {
    private readonly ctx;
    private readonly canvas;

    constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        this.ctx = ctx;
        this.canvas = canvas;
    }

    draw(bird: Bird, pipeManager: PipeManager, scoreManager: ScoreManager, gameState: GameState) {
        this.drawBackground();

        bird.draw(this.ctx);
        pipeManager.draw(this.ctx);
        scoreManager.draw(this.ctx);

        if (gameState === 'OVER') {
            this.drawGameOver(scoreManager.getScore());
        }
    }

    private drawBackground() {
        const dimensions = getCanvasDimensions(this.canvas);

        this.ctx.fillStyle = "#70c5ce";
        this.ctx.fillRect(0, 0, dimensions.width, dimensions.height);
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