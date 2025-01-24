let cycloidWheel;

function setup() {
    let canvas = createCanvas(200, 200);
    canvas.parent('sketch0-cycloid-only');

    let centerX = 100;
    let centerY = 100;
    let radius = 50;
    let theta = 0; // Initial theta in degrees

    cycloidWheel = new CycloidWheel(centerX, centerY, radius, theta);
}

function draw() {
    background(220);
    let theta = (millis() / 5000) * 360 % 360; // Animate theta from 0 to 360 every 5 seconds
    cycloidWheel.setTheta(theta);
    cycloidWheel.draw();
}