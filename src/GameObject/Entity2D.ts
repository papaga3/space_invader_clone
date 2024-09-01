// Base interface for entities in the game

class Entity2D {
    width: number;
    height: number;
    x: number;
    y: number;

    /**
     * 
     * @param width : width of the entity
     * @param height height of the entity
     * @param x x position of the entity
     * @param y y position of the entity
     */
    constructor(width: number, height: number, x: number, y: number) {
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }
}

export default Entity2D;