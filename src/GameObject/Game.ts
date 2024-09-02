import Player from "./Player";
import Projectile from "./Projectile";
import Wave from "./Wave";

class Game {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    keys: Array<string>;
    numberOfProjectTiles: number;
    projectilePool: Array<Projectile>;

    // Enemy wave variables
    enemyColunm: number;
    enemyRow: number;
    enemySize: number;
    waves: Array<Wave>;

    // Game status
    score: number;

    player: Player;
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.keys = [];
        this.player = new Player(this);

        // initialize projectile object pool
        this.projectilePool = [];
        this.numberOfProjectTiles = 10;
        this.createProjectilePool();

        // initialize enemy wave
        this.enemyColunm = 7;
        this.enemyRow = 3;
        this.enemySize = 60;

        this.waves = [];
        this.waves.push(new Wave(this));

        // initialize status
        this.score = 0;

        window.addEventListener("keydown", e => {
            // only add key if the key pressed is not in the array
            if(this.keys.indexOf(e.key) === -1) this.keys.push(e.key);

            // shooting
            if(e.key === 'q') this.player.shoot(); 
        });

        window.addEventListener("keyup", e => {
            const index = this.keys.indexOf(e.key);
            if(index > -1 ) this.keys.splice(index, 1);
        });
    }

    /************ OBJECT POOL HELPERS **************/
    // create projectile object pool
    createProjectilePool() {
        for(let i = 0; i < this.numberOfProjectTiles; i++) {
            this.projectilePool.push(new Projectile());
        }
    }
    getProjectile() {
        for(let i = 0; i < this.numberOfProjectTiles; i++) {
            if(this.projectilePool[i].free) return this.projectilePool[i];
        }
    }

    /****** Draw status text *********/
    drawStatusText(context: CanvasRenderingContext2D) {
        context.fillText(`Score: ${this.score}`, 20, 40);
    }


    /********** RENDER AND UPDATE GAME  ***********/
    update() {
        this.player.update();
        this.projectilePool.forEach(p => p.update());
        this.waves.forEach(w => w.update());
    }

    render(context: CanvasRenderingContext2D) {
        this.drawStatusText(context);
        this.player.render(context);
        this.projectilePool.forEach(p => p.render(context));
        this.waves.forEach(w => w.render(context));
    }
}

export default Game;