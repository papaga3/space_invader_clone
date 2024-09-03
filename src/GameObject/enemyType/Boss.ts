import { collisionDetection } from "../../helperFunctions/physics";
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

    hit(damage: number) {
        this.lives -= damage;
        if(this.lives > 0) this.frameX = 1;
    }

    update() {

        if(this.game.spriteUpdate && this.lives > 0) this.frameX = 0;

        this.speedY = 0;
        if(this.y < 0) {
            this.y += 4;
        }        

        if(this.x < 0 || this.x > this.game.width - this.width) {
            this.speedX = -this.speedX;
            this.speedY = 200;
        }
        this.x += this.speedX;
        this.y += this.speedY;

        // Check collision between boss and bullet
        this.game.projectilePool.forEach((p => {
            if(collisionDetection(this, p) && !p.free && this.lives > 0) {
                this.hit(1);
                p.reset();
            }
        }));
        // Check if boss collision with player
        if(collisionDetection(this, this.game.player) && this.lives > 0) {
            this.game.gameOver = true;
            this.lives = 0;
        }

        // boss destroyed
        if(this.lives < 1 && this.game.spriteUpdate) {
            this.frameX++;
            
            if(this.frameX > this.maxFrame) {
                this.markForRemove = true;
                if(!this.game.gameOver) this.game.newWave();
                this.game.score += this.maxLives;
            }
        }
    }

    render(context: CanvasRenderingContext2D) {
        context.drawImage(
            this.image,
            this.frameX * this.height, 
            this.frameY * this.height,
            this.width,
            this.height,
            this.x,
            this.y,
            this.width,
            this.height
        );

        // Drawing boss health
        if(this.lives > 0) {
            context.save();
            context.textAlign = "center";
            context.shadowColor = "black";
            context.shadowOffsetX = 3;
            context.shadowOffsetY = 3;
            context.fillText(this.lives.toString(), this.x + this.width * 0.5, this.y + 40);

            context.restore();
        }
    }
}

export default Boss;