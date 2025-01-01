import { Pipe } from '@/src/entities/Pipe';
import { Bird } from '@/src/entities/Bird';

export class ScoreManager {
    private score = 0;
    private highScore = 0;
    private passedPipes = new Set<Pipe>();

    constructor() {}

    update(bird: Bird, pipes: Pipe[]) {
        pipes.forEach((pipe) => {
            if (this.hasPipeBeenPassed(bird, pipe) && !this.passedPipes.has(pipe)) {
                this.incrementScore();
                this.passedPipes.add(pipe);
            }
        })
    }

    private hasPipeBeenPassed(_bird: Bird, _pipe: Pipe) {
        const bird = _bird.getBird();
        const pipe = _pipe.getPipe();

        return bird.x > pipe.x + pipe.width && !this.passedPipes.has(_pipe);
    }

    private incrementScore() {
        this.score++;

        if (this.score > this.highScore) {
            this.highScore = this.score;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "white";
        ctx.font = "24px Arial";
        ctx.textAlign = "left";
        ctx.fillText(`Score: ${this.score}`, 10, 30);
        ctx.fillText(`High Score: ${this.highScore}`, 10, 60);
    }

    getScore() {
        return this.score;
    }

    reset() {
        this.score = 0;
        this.passedPipes.clear();
    }
}