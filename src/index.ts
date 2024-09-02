import "./index.css";
import Game from "./GameObject/Game";
import BeetleMorphImg from "./asset/beetlemorph.png";

// Initialize game when the page first loaded
window.addEventListener("load", function() {

    // Initialize asset onload
    let img = new Image();
    img.src = BeetleMorphImg;
    img.id = "beetle_morph_sprite_sheet";
    const asset = document.getElementById('asset') as HTMLDivElement;
    asset.appendChild(img);

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

