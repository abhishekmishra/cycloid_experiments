let cycloid_sloped_sketch = function (p) {
  let cycloidWheel;
  let theta;
  let path = [];
  let startPointX = 0;
  let startPointY = 75;
  let currentPointX = startPointX;
  let currentPointY = startPointY;
  let slope = 0.25;
  let slopeInDegrees = Math.atan(slope) * (180 / Math.PI);
  let cycloidRadius = 25;
  let speed = 5;
  // calculate the speed in the x and y direction using the slope
  let speedX = speed / Math.sqrt(1 + slope * slope);
  let speedY = speedX * slope;

  p.setup = function () {
    let canvas = p.createCanvas(400, 200);
    canvas.parent("sketch1-cycloid-on-sloped-line");
    p.resetWheel();
  };

  p.draw = function () {
    p.background(220);

    // Draw a sloped line from (0, y+radius) with slope
    p.stroke(0);
    p.strokeWeight(2);
    p.line(startPointX, startPointY, p.width, slope * p.width + startPointY);

    // Get the current point of the wheel on the line
    let deltaX = (speedX * p.deltaTime) / 100;
    currentPointX += deltaX;
    let deltaY = (speedY * p.deltaTime) / 100;
    currentPointY += deltaY;

    // get the distance travelled
    let distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Move the wheel along the line
    cycloidWheel.rollOnPath(distance, slopeInDegrees);

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
    p.ellipse(currentPointX, currentPointY, 2, 2);

    // Reset position and rotation if the wheel goes past the canvas
    if (cycloidWheel.centerX > p.width) {
      p.resetWheel();
    }
  };

  p.resetWheel = function () {
    let centerX = startPointX;
    let centerY = startPointY - cycloidRadius;
    let radius = cycloidRadius;
    theta = -90; // Initial theta in degrees

    cycloidWheel = new CycloidWheel(p, centerX, centerY, radius, theta);

    path = [];
    currentPointX = startPointX;
    currentPointY = startPointY
  };
};

new p5(cycloid_sloped_sketch);
