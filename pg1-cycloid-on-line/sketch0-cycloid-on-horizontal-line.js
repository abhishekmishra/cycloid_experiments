let cycloid_horiz_sketch = function (p) {
  let cycloidWheel;
  let theta;
  let path = [];
  let currentPointX = 0;
  let cycloidRadius = 40;
  let speedX = 5;

  p.setup = function () {
    let canvas = p.createCanvas(400, 200);
    canvas.parent("sketch0-cycloid-on-horizontal-line");
    p.resetWheel();
  };

  p.draw = function () {
    p.background(220);

    // Draw a horizontal line from (0, y+radius) to (width, y+radius)
    p.stroke(0);
    p.strokeWeight(2);
    p.line(0, 100 + cycloidRadius, p.width, 100 + cycloidRadius);

    // Get the current point of the wheel on the line
    let deltaX = (speedX * p.deltaTime) / 100;
    currentPointX += deltaX;

    // Move the wheel along the line
    cycloidWheel.rollOnPath(deltaX, 0);

    // get the cycloid rim point and add it to the path
    path.push(cycloidWheel.getRadiusRimPoint());

    // draw the path
    // magenta colour
    p.stroke(255, 0, 255);
    p.strokeWeight(2);
    p.noFill();
    p.beginShape();
    for (let i = 0; i < path.length; i++) {
      p.vertex(path[i].x, path[i].y);
    }
    p.endShape();

    cycloidWheel.draw();

    // draw dot at the current point
    p.stroke(200, 255, 0);
    p.fill(200, 255, 0);
    p.ellipse(currentPointX, 100 + cycloidRadius, 2, 2);

    // Reset position and rotation if the wheel goes past the canvas
    if (cycloidWheel.centerX > p.width) {
      p.resetWheel();
    }
  };

  p.resetWheel = function () {
    let centerX = 0;
    let centerY = 100;
    let radius = cycloidRadius;
    theta = -90; // Initial theta in degrees

    cycloidWheel = new CycloidWheel(p, centerX, centerY, radius, theta);

    path = [];
    currentPointX = 0;
  };
};

new p5(cycloid_horiz_sketch);
