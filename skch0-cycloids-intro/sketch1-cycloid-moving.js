let cycloid_moving_sketch = function(p) {
    let cycloidWheel;
    let theta;

    p.setup = function() {
        let canvas = p.createCanvas(200, 200);
        canvas.parent('sketch1-cycloid-moving');

        let centerX = 100;
        let centerY = 100;
        let radius = 50;
        theta = 0; // Initial theta in degrees

        cycloidWheel = new CycloidWheel(p, centerX, centerY, radius, theta);
    };

    p.draw = function() {
        p.background(220);
        // Animate theta from 0 to 360 every 5 seconds
        let delta = (p.millis() / 50000) * 360 % 360 - theta; 

        cycloidWheel.rotate(delta);
        cycloidWheel.draw();
    };
};

new p5(cycloid_moving_sketch);