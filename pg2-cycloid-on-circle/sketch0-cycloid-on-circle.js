let cycloid_circle_sketch = function (p) {
  let cycloidWheel;
  let theta;
  let path = [];
  let pathCircleCenterX = p.width / 2;
  let pathCircleCenterY = p.height / 2;
  let pathCircleRadius = 80;
  let startPointX = pathCircleCenterX;
  let startPointY = pathCircleCenterY + pathCircleRadius;
  let currentPointX = startPointX;
  let currentPointY = startPointY;
  let cycloidRadius = 25;
  let speed = 10;

  p.setup = function () {
    let canvas = p.createCanvas(400, 200);
    canvas.parent("sketch0-cycloid-on-circle");

    pathCircleCenterX = p.width / 2;
    pathCircleCenterY = p.height / 2;
    startPointX = pathCircleCenterX;
    startPointY = pathCircleCenterY + pathCircleRadius;
    currentPointX = startPointX;
    currentPointY = startPointY;

    p.resetWheel();
  };

  p.draw = function () {
    p.background(220);

    // Draw a circle for the path with the given center and radius
    p.stroke(0);
    p.noFill();
    p.strokeWeight(2);
    p.circle(pathCircleCenterX, pathCircleCenterY, pathCircleRadius * 2);

    // The distance travelled along the circular path
    // is the speed multiplied by the delta time
    let distanceOnCircle = (speed * p.deltaTime) / 100;

    // This distance corresponds to an angle in radians
    // as a raiio of the circle circumference
    let angleInRadians = distanceOnCircle / pathCircleRadius;

    // The angle in degrees
    let angleInDegrees = p.degrees(angleInRadians);
    // console.log(p.sin(angleInDegrees));

    // Move the distance along the circle
    currentPointX = currentPointX + distanceOnCircle * p.cos(angleInRadians);
    currentPointY = currentPointY + distanceOnCircle * p.sin(angleInRadians);

    // get the distance travelled
    // Move the wheel along the line
    cycloidWheel.rollOnPath(distanceOnCircle, angleInDegrees);

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
    currentPointY = startPointY;
  };
};

new p5(cycloid_circle_sketch);
