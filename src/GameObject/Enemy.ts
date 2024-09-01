import Entity2D from "./Entity2D";
import Game from "./Game";

class Enemy extends Entity2D {
    game: Game;
    wavePosX: number;
    wavePosY: number;

    constructor(game: Game, row: number, column: number) {
        super(game.enemySize, game.enemySize ,row * game.enemySize, column * game.enemySize);
        this.game = game;
        this.wavePosX = row * game.enemySize;
        this.wavePosY = column * game.enemySize;
        console.log(`x: ${this.x} ; y: ${this.y}`);
    }

    render(context: CanvasRenderingContext2D) {
        context.strokeRect(this.x, this.y, this.width, this.height);
    }

    update(waveX: number, waveY: number) {
        this.x = waveX + this.wavePosX;
        this.y = waveY + this.wavePosY;
    }
}

export default Enemy;