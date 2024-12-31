import { config } from "@/src/config";

export type GameState = 'START' | 'RUNNING' | 'OVER';

export type GameConfig = typeof config;

export interface GameObject {
    update(deltaTime: number): void;
    draw(ctx: CanvasRenderingContext2D): void;
}