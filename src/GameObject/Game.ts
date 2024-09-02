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
    gameOver: boolean;
    waveCount: number;

    player: Player;

    // Sprite animation variables
    spriteUpdate: boolean;
    spriteTimer: number;
    spriteInterval: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.keys = [];
        this.player = new Player(this);

        // initialize projectile object pool
        this.projectilePool = [];
        this.numberOfProjectTiles = 15;
        this.createProjectilePool();

        // initialize enemy wave
        this.enemyColunm = 2;
        this.enemyRow = 2;
        this.enemySize = 80;

        this.waves = [];
        this.waves.push(new Wave(this));

        // initialize status
        this.score = 0;
        this.gameOver = false;
        this.waveCount = 1;

        // initialize sprite animation timer
        this.spriteUpdate = false;
        this.spriteTimer = 0;
        this.spriteInterval = 150; // only update sprite every 120ms

        
        /**************** GAME EVENTS *************/
        window.addEventListener("keydown", e => {
            // only add key if the key pressed is not in the array
            if(this.keys.indexOf(e.key) === -1) this.keys.push(e.key);

            // shooting
            if((e.key === 'q' || e.key === 'Q') && !this.player.basicAtkFired) {
                this.player.shoot();
                this.player.basicAtkFired = true;
            }

            // restart game
            if((e.key === 'r' || e.key === 'R') && this.gameOver) this.restart();
        });

        window.addEventListener("keyup", e => {
            const index = this.keys.indexOf(e.key);
            if(index > -1 ) this.keys.splice(index, 1);

            // shooting release
            // to prevent the player from holding down basic attack button
            if(e.key === 'q' || e.key === 'Q') {
                this.player.basicAtkFired = false;
            }

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
        // save canvas state
        context.save();

        context.fillText(`Score: ${this.score}`, 20, 40);
        context.fillText(`Wave: ${this.waveCount}`, 20, 80);
        for(let i = 0; i < this.player.lives; i++) {
            context.fillRect(20 + 10 * i, 100, 5, 20)
        }
        if(this.gameOver) {
            context.textAlign = "center";
            context.font = "100px Impact";
            context.fillText("Game over", this.width * 0.5, this.height * 0.5);
            context.font = "30px Impact";
            context.fillText("Press R to reload", this.width * 0.5, this.height * 0.5 + 30);
        }

        // restore canvas state
        context.restore();
    }


    /**** Spawn new enemy wave *****/
    newWave() {
        if(Math.random() < 0.5 && this.enemyColunm * this.enemySize < this.width * 0.8) {
            this.enemyColunm++;
        } else if(this.enemyRow * this.enemySize < this.height * 0.6){
            this.enemyRow++;
        }
        this.waves.push(new Wave(this));
    }



    /********** RENDER AND UPDATE GAME  ***********/
    update() {
        this.player.update();
        this.projectilePool.forEach(p => p.update());
        this.waves.forEach(w => {
            w.update();
            if(w.enemies.length === 0 && !w.triggerNextWave && !this.gameOver) {
                this.waveCount++;
                this.newWave();
                w.triggerNextWave = true;
                this.player.lives++;
            }
        });
    }

    render(context: CanvasRenderingContext2D, deltaTime: number) {
        if(this.spriteTimer > this.spriteInterval) {
            this.spriteUpdate = true;
            this.spriteTimer = 0;
        } else {
            this.spriteTimer += deltaTime;
            this.spriteUpdate = false;
        }
        this.drawStatusText(context);
        this.projectilePool.forEach(p => p.render(context));
        this.player.render(context);
        this.waves.forEach(w => w.render(context));
    }

    /***** RESTART THE GAME ******/
    restart() {
        this.player.restart();
        this.enemyColunm = 2;
        this.enemyRow = 2;

        this.waves = [];
        this.waves.push(new Wave(this));

        // initialize status
        this.score = 0;
        this.gameOver = false;
        this.waveCount = 1;
    }
}

export default Game;