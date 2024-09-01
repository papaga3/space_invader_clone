import "./index.css";
import Game from "./GameObject/Game";

window.addEventListener("load", function() {
    const canvas: HTMLCanvasElement = document.getElementById("gameCanvas") as HTMLCanvasElement;
    const context = canvas.getContext("2d") as CanvasRenderingContext2D;
    canvas.width = 600;
    canvas.height = 800;

    const game = new Game(canvas);

    function animate() {
        // clear canvas
        context.clearRect(0, 0, canvas.width, canvas.height);

        // update game logic
        game.update();

        // render scene
        game.render(context);

        // request redraw
        window.requestAnimationFrame(animate);
    }

    animate();
});

