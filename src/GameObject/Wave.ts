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
        super(game.enemyColunm * game.enemySize, game.enemyRow * game.enemySize, 0, -game.enemyRow * game.enemySize);
        this.game = game;
        this.speedX = 3;
        this.speedY = 0;
        this.enemies = [];
        this.createEnemies();
        console.log(this.enemies);
    }

    createEnemies() {
        for(let y = 0; y < this.game.enemyRow; y++) {
            for(let x = 0; x < this.game.enemyColunm; x++) {
                this.enemies.push(new Enemy(this.game, x, y));
            }
        }
    }

    render(context: CanvasRenderingContext2D) {
        context.strokeRect(this.x, this.y, this.width, this.height);
        this.enemies.forEach(e => e.render(context));
    }

    update() {
        if(this.y < 0) this.y += 5;
        this.x += this.speedX;
        if(this.x < 0 || this.x > this.game.width - this.width) { 
            this.speedX = -this.speedX; 
            this.y += this.game.enemySize;
        }
        this.enemies.forEach(e => e.update(this.x, this.y));
    }
}

export default Wave;