import { getCanvasDimensions } from "@/src/utils/canvas";
import type { GameState, Scene } from "@/src/types";

export class GameOverScene implements Scene {
    private readonly canvas: HTMLCanvasElement;
    private readonly finalScore: number;
    private startTime: number;
    
    // Animation values for each element
    private gameOverOpacity = 0;
    private scoreOpacity = 0;
    private instructionsOpacity = 0;
    
    private gameOverOffsetY = 20;
    private scoreOffsetY = 20;
    private instructionsOffsetY = 20;

    constructor(canvas: HTMLCanvasElement, finalScore: number) {
        this.canvas = canvas;
        this.finalScore = finalScore;
        this.startTime = performance.now();
    }

    update(_deltaTime: number, timestamp: number) {
        const elapsed = timestamp - this.startTime;
        
        // Game Over text animation
        this.gameOverOpacity = Math.min(1, elapsed / 500);
        this.gameOverOffsetY = Math.max(0, 20 * (1 - elapsed / 500));
        
        // Score animation
        if (elapsed > 400) {
            this.scoreOpacity = Math.min(1, (elapsed - 400) / 500);
            this.scoreOffsetY = Math.max(0, 20 * (1 - (elapsed - 400) / 500));
        }
        
        // Instructions animation
        if (elapsed > 800) {
            this.instructionsOpacity = Math.min(1, (elapsed - 800) / 500);
            this.instructionsOffsetY = Math.max(0, 20 * (1 - (elapsed - 800) / 500));
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        const dimensions = getCanvasDimensions(this.canvas);
        const centerX = dimensions.width / 2;
        const baseY = dimensions.height / 2;

        // Draw semi-transparent overlay
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, dimensions.width, dimensions.height);

        // Draw Game Over text
        ctx.fillStyle = `rgba(255, 255, 255, ${this.gameOverOpacity})`;
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", centerX, baseY + this.gameOverOffsetY);

        // Draw final score
        ctx.fillStyle = `rgba(255, 255, 255, ${this.scoreOpacity})`;
        ctx.font = "30px Arial";
        ctx.fillText(
            `Final Score: ${this.finalScore}`,
            centerX,
            baseY + 50 + this.scoreOffsetY
        );

        // Draw restart instruction
        ctx.fillStyle = `rgba(255, 255, 255, ${this.instructionsOpacity})`;
        ctx.font = "20px Arial";
        ctx.fillText(
            "Click or press Space to restart",
            centerX,
            baseY + 90 + this.instructionsOffsetY
        );
    }

    getCurrentScene(): GameState {
        return 'OVER';
    }
}