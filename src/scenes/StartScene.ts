import { Bird } from "@/src/entities/Bird";
import { Floor } from "@/src/entities/Floor";
import { Sprite } from "@/src/utils/Sprite";
import { getCanvasDimensions } from "@/src/utils/canvas";

import type { GameState, Scene } from "@/src/types";

export class StartScene implements Scene {
  private readonly bird: Bird;
  private readonly floor: Floor;
  private readonly canvas: HTMLCanvasElement;
  private readonly sprite: Sprite;

  constructor(bird: Bird, floor: Floor, canvas: HTMLCanvasElement) {
    this.bird = bird;
    this.floor = floor;
    this.canvas = canvas;

    this.sprite = new Sprite("/images/sprites.png");
  }

  update(deltaTime: number, timestamp: number) {
    this.bird.oscillate(timestamp);
    this.floor.update(deltaTime);
  }

  draw(ctx: CanvasRenderingContext2D) {
    const dimensions = getCanvasDimensions(this.canvas);
    const centerX = dimensions.width / 2;

    // Draw "Get Ready"
    const getReadyWidth = 92;
    const getReadyHeight = 25;
    const getReadyX = 295;
    const getReadyY = 59;
    const getReadyDestX = centerX - getReadyWidth / 2;
    const getReadyDestY = dimensions.height / 3;

    this.sprite.draw(
      ctx,
      getReadyX,
      getReadyY,
      getReadyWidth,
      getReadyHeight,
      getReadyDestX,
      getReadyDestY,
      getReadyWidth,
      getReadyHeight
    );

    // Draw "Start Button"
    const startButtonWidth = 52;
    const startButtonHeight = 29;
    const startButtonX = 354;
    const startButtonY = 118;
    const startButtonDestX = centerX - startButtonWidth / 2;
    const startButtonDestY = getReadyDestY + getReadyHeight + 20;

    this.sprite.draw(
      ctx,
      startButtonX,
      startButtonY,
      startButtonWidth,
      startButtonHeight,
      startButtonDestX,
      startButtonDestY,
      startButtonWidth,
      startButtonHeight
    );
  }

  getCurrentScene(): GameState {
    return "START";
  }
}
