import { Bird } from "@/src/entities/Bird";
import { Floor } from "@/src/entities/Floor";
import { CollisionManager } from "@/src/managers/CollisionManager";
import { PipeManager } from "@/src/managers/PipeManager";
import { ScoreManager } from "@/src/managers/ScoreManager";

import type { GameState, Scene } from "@/src/types";

export class MainScene implements Scene {
    private readonly bird: Bird;
    private readonly floor: Floor;
    private readonly pipeManager: PipeManager;
    private readonly scoreManager: ScoreManager;
    private readonly collisionManager: CollisionManager;

    constructor(bird: Bird, floor: Floor, pipeManager: PipeManager, scoreManager: ScoreManager, collisionManager: CollisionManager) {
        this.bird = bird;
        this.floor = floor;
        this.pipeManager = pipeManager;
        this.scoreManager = scoreManager;
        this.collisionManager = collisionManager;
    }

    update(deltaTime: number) {
        this.bird.update(deltaTime);
        this.floor.update(deltaTime);
        this.pipeManager.update(deltaTime);
        this.scoreManager.update(this.bird, this.pipeManager.getPipes())

        this.collisionManager.checkCollisions(this.bird, this.pipeManager.getPipes());

        if (this.collisionManager.checkCollisions(this.bird, this.pipeManager.getPipes())) {
            // TODO: Transition scene and reset the game   
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.bird.draw(ctx);
        this.floor.draw(ctx);
        this.pipeManager.draw(ctx);
        this.scoreManager.draw(ctx);
    }

    handleInput() {
        this.bird.jump();
    }

    getCurrentScene(): GameState {
        return 'RUNNING';
    }
}


// if (this.gameState !== 'OVER') {
//     this.floor.update(deltaTime);
// }

// if (this.gameState !== 'RUNNING') {
//     return;
// }

// this.bird.update(deltaTime);
// this.pipeManager.update(deltaTime);
// this.scoreManager.update(this.bird, this.pipeManager.getPipes());

// if (this.collisionManager.checkCollisions(this.bird, this.pipeManager.getPipes())) {
//     this.gameState = 'OVER';
// }