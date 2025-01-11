import { getCanvasDimensions } from "@/src/utils/canvas";

import type { GameState, Scene } from "@/src/types";

export class GameOverScene implements Scene {
    private readonly canvas: HTMLCanvasElement;
    private readonly finalScore: number;

    constructor(canvas: HTMLCanvasElement, finalScore: number) {
        this.canvas = canvas;
        this.finalScore = finalScore;
    }

    update(_deltaTime: number) {}

    draw(ctx: CanvasRenderingContext2D) {
        const dimensions = getCanvasDimensions(this.canvas);
        const centerX = dimensions.width / 2;

        // Draw semi-transparent overlay
        ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
        ctx.fillRect(0, 0, dimensions.width, dimensions.height);

        // Draw Game Over text
        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", centerX, dimensions.height / 2);

        // Draw final score
        ctx.font = "30px Arial";
        ctx.fillText(
            `Final Score: ${this.finalScore}`,
            centerX,
            dimensions.height / 2 + 50
        );

        // Draw restart instruction
        ctx.font = "20px Arial";
        ctx.fillText(
            "Click or press Space to restart",
            centerX,
            dimensions.height / 2 + 90
        );
    }

    getCurrentScene(): GameState {
        return 'OVER';
    }
}