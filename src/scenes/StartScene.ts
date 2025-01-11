import { Bird } from "@/src/entities/Bird"
import { Floor } from "@/src/entities/Floor"

import type { GameState, Scene } from "@/src/types";

export class StartScene implements Scene {
    private readonly bird: Bird;
    private readonly floor: Floor;

    constructor(bird: Bird, floor: Floor) {
        this.bird = bird;
        this.floor = floor;
    }

    update(deltaTime: number) {
        this.bird.oscillate();
        this.floor.update(deltaTime);
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.bird.draw(ctx);
        this.floor.draw(ctx);
    }

    getCurrentScene(): GameState {
        return 'START';
    }
}