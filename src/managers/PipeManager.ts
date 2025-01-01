import { Pipe } from "@/src/entities/Pipe";
import { config } from "@/src/config";

export class PipeManager {
    private pipes: Pipe[] = [];
    private pipeSpawnTimer = 0;
    private readonly canvas;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    };

    update(deltaTime: number) {
        this.updateExistingPipes(deltaTime);
        this.handlePipeSpawning(deltaTime);
        this.removeOffScreenPipes();
    }

    private updateExistingPipes(deltaTime: number) {
        this.pipes.forEach(pipe => pipe.update(deltaTime));
    }

    private handlePipeSpawning(deltaTime: number) {
        this.pipeSpawnTimer += deltaTime;

        if (this.pipeSpawnTimer >= config.pipes.spawnInterval) {
            this.spawnPipe();
            this.pipeSpawnTimer = 0;
        }
    }

    private spawnPipe() {
        this.pipes.push(new Pipe(this.canvas));
    }

    private removeOffScreenPipes() {
        this.pipes = this.pipes.filter((pipe) => !pipe.isOffScreen())
    }

    getPipes() {
        return this.pipes;
    }

    reset() {
        this.pipes = [];
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.pipes.forEach(pipe => pipe.draw(ctx))
    }
}