// This represent a wave of enemy.

import Enemy from "./Enemy";
import Entity2D from "./Entity2D";
import Game from "./Game";

class Wave extends Entity2D {
    game: Game;
    enemies: Array<Enemy>;
    speedX: number;
    speedY: number;

    constructor(game: Game) {
        super(game.enemyColunm * game.enemySize, game.enemyRow * game.enemySize, 0, 0);
        this.game = game;
        this.speedX = 3;
        this.speedY = 0;

        this.enemies = [];
        this.createEnemies();
    }

    createEnemies() {
        for(let i = 0; i < this.game.enemyRow; i++) {
            for(let j = 0; j < this.game.enemyColunm; j++) {
                this.enemies.push(new Enemy(this.game, i, j));
            }
        }
    }

    render(context: CanvasRenderingContext2D) {
        context.strokeRect(this.x, this.y, this.width, this.height);
        this.enemies.forEach(e => e.render(context));
    }

    update() {
        this.x += this.speedX;
        if(this.x < 0 || this.x > this.game.width - this.width) { 
            this.speedX = -this.speedX; 
            this.y += this.game.enemySize;
        }
        this.enemies.forEach(e => e.update(this.x, this.y));
        console.log(this.enemies);
    }
}

export default Wave;