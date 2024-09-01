import Player from "./Player";
import Projectile from "./Projectile";

class Game {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    keys: Array<string>;
    numberOfProjectTiles: number;
    projectilePool: Array<Projectile>;

    player: Player;
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.keys = [];
        this.player = new Player(this);
        this.projectilePool = [];
        this.numberOfProjectTiles = 10;
        this.createProjectilePool();

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


    /********** RENDER AND UPDATE GAME  ***********/
    update() {
        this.player.update();
        this.projectilePool.forEach(p => p.update());
    }

    render(context: CanvasRenderingContext2D) {
        this.player.render(context);
        this.projectilePool.forEach(p => p.render(context));
    }
}

export default Game;