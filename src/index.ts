import "./index.css";
import Game from "./GameObject/Game";
// import Player from "./asset/player.png";
// import PlayerJet from "./asset/player_jets.png";

// Initialize game when the page first loaded
window.addEventListener("load", function() {

    const canvas: HTMLCanvasElement = document.getElementById("gameCanvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    canvas.width = 600;
    canvas.height = 800;
    context.fillStyle = "white";
    context.strokeStyle = "white";
    context.font = "30px Impact"

    const game = new Game(canvas);

    let lastTime = 0;

    function animate(timeStamp: number) {
        let deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;

        // clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // update game logic
        game.update();

        // render scene
        game.render(context, deltaTime);

        // request redraw
        window.requestAnimationFrame(animate);
    }

    animate(lastTime);
});

