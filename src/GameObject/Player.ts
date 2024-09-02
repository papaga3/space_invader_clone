import Entity2D from "./Entity2D";
import Game from "./Game";
import Projectile from "./Projectile";

class Player extends Entity2D {
 
    speed: number;
    game: Game;
    lives: number;
    maxLives: number;
    basicAtkFired: boolean;
    image: HTMLImageElement;
    jets_image: HTMLImageElement;
    frameX: number;
    jetFrameX: number;

    constructor(game: Game) {
        super(140, 120, game.width * 0.5 - 140 * 0.5, game.height - 120);
        this.game = game;
        this.speed = 5;
        this.lives = 3;
        this.maxLives = 10;
        this.basicAtkFired = false;
        this.image = document.getElementById("player_sprite_sheet") as HTMLImageElement;
        this.jets_image = document.getElementById("player_jets") as HTMLImageElement;
        this.frameX = 0;
        this.jetFrameX = 1;
    }

    // shoot a projectile
    shoot() {
        const projectile = this.game.getProjectile();
        if(projectile) projectile.start(this.x + this.width * 0.5, this.y);
    }

    render(context: CanvasRenderingContext2D) {
        if(this.game.keys.indexOf('q') > -1 || this.game.keys.indexOf('Q') > -1) {
            this.frameX = 1;
        } else {
            this.frameX = 0;
        }

        context.drawImage(
            this.image, 
            this.frameX * this.width, 
            0, 
            this.width,
            this.height,
            this.x, 
            this.y , 
            this.width, 
            this.height
        );

        context.drawImage(
            this.jets_image,
            this.jetFrameX * this.width,
            0,
            this.width,
            this.height,
            this.x,
            this.y ,
            this.width,
            this.height
        );
    }

    update() {
        // horizontal movement
        if(this.game.keys.indexOf("ArrowLeft") > -1) {
            this.x -= this.speed;
            this.jetFrameX = 0;
        } else if(this.game.keys.indexOf("ArrowRight") > -1) {
            this.x += this.speed;
            this.jetFrameX = 2;
        } else {
            this.jetFrameX = 1;
        }

        // horizontal boundary
        // this will allow the player to move half its with to either side.
        // which will allow it to shoot enemy at the edge of the screen.
        if(this.x < -this.width * 0.5) this.x = -this.width * 0.5;
        else if(this.x > this.game.width - this.width * 0.5) this.x = this.game.width - this.width * 0.5;
    }

    restart() {
        // reset player positon
        this.x = this.game.width * 0.5 - 100 * 0.5;
        this.y = this.game.height - 100;

        this.lives = 3;
    }
}

export default Player;