import Entity2D from "./Entity2D";
import Game from "./Game";
import Projectile from "./Projectile";

class Player extends Entity2D {
 
    speed: number;
    game: Game;
    lives: number;

    constructor(game: Game) {
        super(100, 100, game.width * 0.5 - 100 * 0.5, game.height - 100);
        this.game = game;
        this.speed = 5;
        this.lives = 3;
    }

    // shoot a projectile
    shoot() {
        const projectile = this.game.getProjectile();
        if(projectile) projectile.start(this.x + this.width * 0.5, this.y);
    }

    render(context: CanvasRenderingContext2D) {
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        // horizontal movement
        if(this.game.keys.indexOf("ArrowLeft") > -1) this.x -= this.speed;
        if(this.game.keys.indexOf("ArrowRight") > -1) this.x += this.speed;

        // horizontal boundary
        // this will allow the player to move half its with to either side.
        // which will allow it to shoot enemy at the edge of the screen.
        if(this.x < -this.width * 0.5) this.x = -this.width * 0.5;
        else if(this.x > this.game.width - this.width * 0.5) this.x = this.game.width - this.width * 0.5;
    }
}

export default Player;