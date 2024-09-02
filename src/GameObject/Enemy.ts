import { collisionDetection } from "../helperFunctions/physics";
import Entity2D from "./Entity2D";
import Game from "./Game";

class Enemy extends Entity2D {
    game: Game;
    wavePosX: number;
    wavePosY: number;
    markedForRemove: boolean;
    image: HTMLImageElement | undefined;


    lives: number;
    maxFrame: number;
    maxLives: number;
    frameX: number;
    frameY: number;

    constructor(game: Game, row: number, column: number) {
        super(game.enemySize, game.enemySize ,row * game.enemySize, column * game.enemySize);
        this.game = game;
        this.wavePosX = row * game.enemySize;
        this.wavePosY = column * game.enemySize;
        this.markedForRemove = false;
        this.image = undefined;

        // default lives and frame value of enemy
        this.lives = 0;
        this.maxFrame = 0;
        this.maxLives = 0;
        this.frameX = 0;
        this.frameY = 0;
    }

    render(context: CanvasRenderingContext2D) {
        context.strokeRect(this.x, this.y, this.width, this.height);
    }

    hit(damage: number) {
        this.lives -= damage;

    }

    update(waveX: number, waveY: number) {
        this.x = waveX + this.wavePosX;
        this.y = waveY + this.wavePosY;

        // check collision between projectile and enemy
        this.game.projectilePool.forEach(p => {
            if(collisionDetection(this, p) && !p.free && this.lives > 0) {
                console.log(this.lives);
                this.hit(1);
                p.reset();
            }
        });

        if(this.lives < 1) {
            // console.log("update");
            if(this.game.spriteUpdate) {
                this.frameX++;
            }
            if(this.frameX > this.maxFrame) {
                if(!this.game.gameOver) this.game.score += this.maxLives;
                this.markedForRemove = true;
            }
        }

        // Check collision between enemy and player
        if(collisionDetection(this, this.game.player)) {
            this.markedForRemove = true;
            if(!this.game.gameOver && this.game.score > 0) this.game.score--;
            this.game.player.lives--;
            if(this.game.player.lives < 1) this.game.gameOver = true;
        }

        // If the enemy reach the end of the screen => game over
        if(this.y + this.height > this.game.height) {
            this.game.gameOver = true;
            this.markedForRemove = true;
        }
    }
}

export default Enemy;