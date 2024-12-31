import { Bird } from "@/src/entities/Bird";
import { CollisionManager } from "@/src/managers/CollisionManager";
import { PipeManager } from "@/src/managers/PipeManager"
import { RenderManager } from "@/src/managers/RenderManager";
import { setupCanvas } from "@/src/utils/canvas";

import type { GameState } from "@/src/types";

export class GameManager {
    private readonly canvas;
    private readonly ctx;
    private readonly collisionManager;
    private readonly pipeManager;
    private readonly renderManager;

    private gameState: GameState = 'RUNNING';
    private bird;
    private lastTickTime = 0;

    constructor() {
        this.canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
        this.ctx = setupCanvas(this.canvas);

        this.bird = new Bird();
        this.collisionManager = new CollisionManager();
        this.pipeManager = new PipeManager();
        this.renderManager = new RenderManager(this.ctx);

        this.setupEventListeners();
    }

    private setupEventListeners() {
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                this.handleInput();
            }
        })

        document.addEventListener('mousedown', () => this.handleInput());
    }

    private handleInput() {
        if (this.gameState === 'RUNNING') {
            this.bird.jump();
        }

        if (this.gameState === "OVER" || this.gameState === 'START') {
            this.resetGame();
        }
    }

    private resetGame() {
        this.gameState = 'RUNNING';
        this.bird = new Bird();
        this.pipeManager.reset();
        this.lastTickTime = performance.now();
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    private update(deltaTime: number) {
        if (this.gameState !== 'RUNNING') {
            return;
        }

        this.bird.update(deltaTime);
        this.pipeManager.update(deltaTime);

        if (this.collisionManager.checkCollisions(this.bird, this.pipeManager.getPipes())) {
            this.gameState = 'OVER';
        }
    }

    private gameLoop(timestamp: number) {
        const deltaTime = timestamp - this.lastTickTime;
        this.lastTickTime = timestamp;

        this.update(deltaTime);
        this.renderManager.draw(this.bird, this.pipeManager, this.gameState);

        if (this.gameState === 'RUNNING') {
            requestAnimationFrame((time) => this.gameLoop(time))
        }
    }

    start() {
        this.gameState = 'RUNNING';
        this.lastTickTime = performance.now();
        requestAnimationFrame((time) => this.gameLoop(time));
    }
}