import { config } from "@/src/config";

export type GameState = 'START' | 'RUNNING' | 'OVER';

export type GameConfig = typeof config;

export interface GameObject {
    update(deltaTime: number, timestamp?: number): void;
    draw(ctx: CanvasRenderingContext2D): void;
}

export interface Scene {
    update(deltaTime: number, timestamp: number): void;
    draw(ctx: CanvasRenderingContext2D): void;
    getCurrentScene(): GameState;
}