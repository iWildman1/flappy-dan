import { Bird } from "@/src/entities/Bird";
import { Floor } from "@/src/entities/Floor";
import { CollisionManager } from "@/src/managers/CollisionManager";
import { PipeManager } from "@/src/managers/PipeManager"
import { RenderManager } from "@/src/managers/RenderManager";
import { ScoreManager } from '@/src/managers/ScoreManager';
import { setupCanvas } from "@/src/utils/canvas";

import { StartScene } from "@/src/scenes/StartScene";
import { MainScene } from "@/src/scenes/MainScene";
import { GameOverScene } from "@/src/scenes/GameOverScene";

import type { Scene } from "@/src/types";

export class GameManager {
    private readonly canvas;
    private readonly ctx;
    private readonly collisionManager;
    private readonly pipeManager;
    private readonly renderManager;
    private readonly scoreManager;
    private readonly floor;

    private currentScene: Scene;
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

        this.currentScene = new StartScene(this.bird, this.floor, this.canvas);

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
        if (this.currentScene instanceof MainScene) {
            this.bird.jump();
        }

        if (this.currentScene instanceof StartScene || this.currentScene instanceof GameOverScene) {
            this.resetGame();
        }
    }

    private resetGame() {
        this.bird = new Bird(this.canvas);
        this.pipeManager.reset();
        this.scoreManager.reset();
        this.lastTickTime = performance.now();

        this.currentScene = new MainScene(this.bird, this.floor, this.pipeManager, this.scoreManager, this.collisionManager);
    }

    private update(deltaTime: number) {
        this.currentScene.update(deltaTime);

        if (this.currentScene instanceof MainScene && this.currentScene.getIsGameOver()) {
            this.currentScene = new GameOverScene(this.canvas, this.scoreManager.getScore())
        }
    }

    private gameLoop(timestamp: number) {
        const deltaTime = timestamp - this.lastTickTime;
        this.lastTickTime = timestamp;

        this.update(deltaTime);
        this.renderManager.draw(this.currentScene, this.floor, this.bird, this.pipeManager);

        // Always continue the animation frame
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    start() {
        this.lastTickTime = performance.now();
        requestAnimationFrame((time) => this.gameLoop(time));
    }
}