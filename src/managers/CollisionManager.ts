import { Bird } from "@/src/entities/Bird";
import { Pipe } from "@/src/entities/Pipe";


export class CollisionManager {
    constructor() { };

    checkCollisions(bird: Bird, pipes: Pipe[]) {
        return this.checkBoundaryCollision(bird) || this.checkPipeCollision(bird, pipes);
    }

    private checkBoundaryCollision(bird: Bird) {
        return bird.isOutOfBounds();
    }

    private checkPipeCollision(_bird: Bird, pipes: Pipe[]) {
        const bird = _bird.getBird();

        for (let _pipe of pipes) {
            const pipe = _pipe.getPipe();

            // Top pipe collision
            if (bird.x < pipe.x + pipe.width && bird.x + bird.width > pipe.x && bird.y < pipe.topHeight) {
                return true;
            }

            // Bottom pipe collision
            if (bird.x < pipe.x + pipe.width && bird.x + bird.width > pipe.x && bird.y + bird.height > pipe.bottomY) {
                return true;
            }
        }

        return false;
    }
}



