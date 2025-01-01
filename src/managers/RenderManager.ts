import { Bird } from "@/src/entities/Bird";
import { PipeManager } from "@/src/managers/PipeManager";
import { ScoreManager } from '@/src/managers/ScoreManager';
import { config } from "@/src/config";

import type { GameState } from "@/src/types";

export class RenderManager {
    private readonly ctx;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
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
        this.ctx.fillStyle = "#70c5ce";
        this.ctx.fillRect(0, 0, config.canvas.width, config.canvas.height);
    }

    private drawGameOver(finalScore: number) {
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        this.ctx.fillRect(0, 0, config.canvas.width, config.canvas.height);
        this.ctx.fillStyle = "white";
        this.ctx.font = "40px Arial";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Game Over", config.canvas.width / 2, config.canvas.height / 2);
        this.ctx.font = "30px Arial";
        this.ctx.fillText(
            `Final Score: ${finalScore}`, 
            config.canvas.width / 2, 
            config.canvas.height / 2 + 20
        );
        this.ctx.font = "20px Arial";
        this.ctx.fillText("Click or press Space to restart", config.canvas.width / 2, config.canvas.height / 2 + 40);
    }
}