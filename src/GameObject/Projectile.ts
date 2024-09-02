import Entity2D from "./Entity2D";

class Projectile extends Entity2D {

    speed: number;
    free: boolean;

    constructor() {
        super(3, 20, 0, 0);
        this.speed = 20;
        this.free = true;
    }

    // The projectile will only be update and render when it is in the active pool
    render(context: CanvasRenderingContext2D) {
        if(!this.free) {
            context.save();
            context.fillStyle = "yellow";
            context.fillRect(this.x, this.y, this.width, this.height);
            context.restore();

        }
    }

    update() {
        if(!this.free) {
            this.y -= this.speed;
            // reset the projectile when it goes out of screen
            if(this.y < -this.height) this.reset();
        }
    }


    // Object pool management
    /**
     * start a projectile at the player position
     * @param x x coordinate of the player
     * @param y y cooridnat of the player
     */
    start(x: number, y: number) {
        this.x = x - 0.5 * this.width; this.y = y;
        this.free = false;
    }

    reset() {
        this.free = true;
    }
}

export default Projectile;