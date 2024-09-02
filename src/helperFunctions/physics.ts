// Physics helper function for the game

import Entity2D from "../GameObject/Entity2D";

export function collisionDetection(a: Entity2D, b: Entity2D): boolean {
    if(
        a.x < b.x + b.width &&
        a.x + a.width > b.x &&
        a.y + a.height > b.y &&
        a.y < b.y + b.height

    ) {
        return true;
    } else {
        return false;
    }
}
