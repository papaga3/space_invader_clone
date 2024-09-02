import Enemy from "../Enemy";
import Game from "../Game";

class BeetleMorph extends Enemy {

    constructor(game: Game, row: number, column: number) {
        super(game, row, column);
        this.image = document.getElementById("beetle_morph_sprite_sheet") as HTMLImageElement;
        this.frameX = 0;
        this.frameY = Math.floor((Math.random() * 4));

        this.lives = 1;
        this.maxFrame = 2;
        this.maxLives = this.lives;
    }
    override render(context: CanvasRenderingContext2D): void {
        if(this.image === undefined) {
            super.render(context);
        } else {
            context.drawImage(
                this.image, 
                this.frameX * this.width, 
                this.frameY * this.height, 
                this.width,
                this.height,
                this.x, 
                this.y, 
                this.width, 
                this.height
            );
        }
    }

}

export default BeetleMorph