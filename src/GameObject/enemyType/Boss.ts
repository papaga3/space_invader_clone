import Entity2D from "../Entity2D";
import Game from "../Game";

class Boss extends Entity2D {
    game: Game;
    image: HTMLImageElement;
    speedX: number;
    speedY: number;
    lives: number;
    maxLives: number;
    markForRemove: boolean;
    frameX: number;
    frameY: number;
    maxFrame: number;

    constructor(game: Game) {
        super(200, 200, game.width * 0.5 - 100, -200);
        this.game = game;
        this.image = document.getElementById("boss_sprite_sheet") as HTMLImageElement;
        this.speedX = (Math.random() < 0.5) ? -1 : 1
        this.speedY = 0;

        this.lives = 10;
        this.maxLives = this.lives;
        this.markForRemove = false;

        this.frameX = 0;
        this.frameY = Math.floor((Math.random() * 4));
        this.maxFrame = 11;
    }

    update() {

    }

    render() {

    }
}

export default Boss;