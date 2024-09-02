// This represent a wave of enemy.

import Enemy from "./Enemy";
import BeetleMorph from "./enemyType/Beetlemorph";
import Entity2D from "./Entity2D";
import Game from "./Game";

class Wave extends Entity2D {
    game: Game;
    enemies: Array<Enemy>;
    speedX: number;
    speedY: number;
    triggerNextWave: boolean;

    constructor(game: Game) {
        const width = game.enemyColunm * game.enemySize;
        super(width, game.enemyRow * game.enemySize, (game.width - width) * 0.5 , -game.enemyRow * game.enemySize);
        this.game = game;
        this.speedX = Math.random() < 0.5 ? -1 : 1;
        this.speedY = 0;
        this.enemies = [];
        this.createEnemies();
        this.triggerNextWave = false;
    }

    createEnemies() {
        for(let y = 0; y < this.game.enemyRow; y++) {
            for(let x = 0; x < this.game.enemyColunm; x++) {
                this.enemies.push(new BeetleMorph(this.game, x, y));
            }
        }
    }

    render(context: CanvasRenderingContext2D) {
        this.enemies.forEach(e => {
            e.render(context)
        });
    }

    update() {
        if(this.y < 0) this.y += 5;
        this.x += this.speedX;
        if(this.x < 0 || this.x > this.game.width - this.width) { 
            this.speedX = -this.speedX; 
            this.y += this.game.enemySize;
        }
        this.enemies.forEach(e => e.update(this.x, this.y));
        this.enemies = this.enemies.filter(object => !object.markedForRemove);
    }
}

export default Wave;