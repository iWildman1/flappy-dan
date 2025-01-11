import { Bird } from "@/src/entities/Bird";
import { Floor } from "@/src/entities/Floor";
import { CollisionManager } from "@/src/managers/CollisionManager";
import { PipeManager } from "@/src/managers/PipeManager"
import { RenderManager } from "@/src/managers/RenderManager";
import { ScoreManager } from '@/src/managers/ScoreManager';
import { setupCanvas } from "@/src/utils/canvas";

import type { GameState } from "@/src/types";

export class GameManager {
    private readonly canvas;
    private readonly ctx;
    private readonly collisionManager;
    private readonly pipeManager;
    private readonly renderManager;
    private readonly scoreManager;
    private readonly floor;

    private gameState: GameState = 'START';
    private bird;
    private lastTickTime = 0;

    constructor() {
        this.canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
        this.ctx = setupCanvas(this.canvas);

        this.bird = new Bird(this.canvas);
        this.collisionManager = new CollisionManager();
        this.pipeManager = new PipeManager(this.canvas);
        this.renderManager = new RenderManager(this.ctx, this.canvas);
        this.scoreManager = new ScoreManager();
        this.floor = new Floor(this.canvas);

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
        this.bird = new Bird(this.canvas);
        this.pipeManager.reset();
        this.scoreManager.reset();
        this.lastTickTime = performance.now();
    }

    private update(deltaTime: number) {
        if (this.gameState !== 'OVER') {
            this.floor.update(deltaTime);
        }
        
        if (this.gameState !== 'RUNNING') {
            return;
        }
        
        this.bird.update(deltaTime);
        this.pipeManager.update(deltaTime);
        this.scoreManager.update(this.bird, this.pipeManager.getPipes());

        if (this.collisionManager.checkCollisions(this.bird, this.pipeManager.getPipes())) {
            this.gameState = 'OVER';
        }
    }

    private gameLoop(timestamp: number) {
        const deltaTime = timestamp - this.lastTickTime;
        this.lastTickTime = timestamp;

        this.update(deltaTime);
        this.renderManager.draw(this.bird, this.pipeManager, this.scoreManager, this.gameState, this.floor);

        // Always continue the animation frame
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    start() {
        this.gameState = 'START';
        this.lastTickTime = performance.now();
        requestAnimationFrame((time) => this.gameLoop(time));
    }
}