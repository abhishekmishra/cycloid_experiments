let cycloid_circle_sketch = function (p) {
  let outerCycloidWheel;
  let outerCycloidCenter = {
    x: 200,
    y: 100,
  };
  let outerCycloidRadius = 50;
  let outerRotationSpeed = 180;

  let innerCycloidRadius = 20;
  let innerCycloidWheel;
  let previousOuterRimPoint;
  let currentOuterRimPoint;
  let path = [];

  let innerCycloidRadiusRatio = 0.10;
  let innerCycloidRadiusIncrement = 0.05;

  let numRotations = 5;

  p.setup = function () {
    let canvas = p.createCanvas(400, 200);
    canvas.parent("sketch0-cycloid-on-circle");

    outerCycloidCenter = {
      x: p.width / 2,
      y: p.height / 2,
    }

    outerCycloidRadius = p.min(p.width, p.height) / 2 - 10;

    innerCycloidRadius = outerCycloidRadius * innerCycloidRadiusRatio;

    p.resetOuterWheel();
    p.resetInnerWheel();
  };

  p.draw = function () {
    p.background(220);

    // rotate the outer wheel
    let outerDeltaTheta = outerRotationSpeed * p.deltaTime / 1000;
    outerCycloidWheel.rotateInPlace(outerDeltaTheta);

    outerCycloidWheel.draw();

    currentOuterRimPoint = outerCycloidWheel.getRadiusRimPoint();

    let newCenter = {
      x: currentOuterRimPoint.x - innerCycloidRadius * p.cos(outerCycloidWheel.theta),
      y: currentOuterRimPoint.y - innerCycloidRadius * p.sin(outerCycloidWheel.theta),
    }

    let oldCenter = innerCycloidWheel.getCenter();

    // calculate distance and angle between the current and previous center points
    let distance = p.dist(
      newCenter.x,
      newCenter.y,
      oldCenter.x,
      oldCenter.y
    );

    let angleInDegrees = p.degrees(p.atan2(
      currentOuterRimPoint.y - previousOuterRimPoint.y,
      currentOuterRimPoint.x - previousOuterRimPoint.x
    ));

    // roll the inner wheel on the path traced by the outer wheel
    innerCycloidWheel.rollOnPath(distance, angleInDegrees);

    // update the previous outer rim point
    previousOuterRimPoint = currentOuterRimPoint;

    // draw the inner wheel
    innerCycloidWheel.draw();

    // get the rim point of the inner wheel
    let innerRimPoint = innerCycloidWheel.getRadiusRimPoint();

    path.push(innerRimPoint);

    // draw the path traced by the inner wheel
    p.stroke(0, 200, 100);
    p.strokeWeight(3);
    p.noFill();
    p.beginShape();
    path.forEach(point => {
      p.vertex(point.x, point.y);
    });
    p.endShape();

    // if the outer wheel has completed numRotations full rotations, reset the wheels
    if (p.degrees(outerCycloidWheel.theta) >= 360 * numRotations) {
      innerCycloidRadiusRatio += innerCycloidRadiusIncrement;
      innerCycloidRadius = outerCycloidRadius * innerCycloidRadiusRatio;

      p.resetOuterWheel();
      p.resetInnerWheel();
    }

    // draw the rotation number in the bottom right corner
    p.fill(0);
    p.noStroke();
    p.textSize(12);
    p.textAlign(p.RIGHT, p.BOTTOM);
    // draw the inner radius ratio just below the rotation number
    p.text(`Inner Radius Ratio: ${innerCycloidRadiusRatio.toFixed(2)}`, p.width - 10, p.height - 10);
    p.text(`Rotation: ${p.floor(p.degrees(outerCycloidWheel.theta) / 360)}`, p.width - 10, p.height - 30);
  };

  p.resetOuterWheel = function () {
    theta = 0; // Initial theta in degrees
    outerCycloidWheel = new CycloidWheel(p, outerCycloidCenter.x, outerCycloidCenter.y, outerCycloidRadius, theta);
  };

  p.resetInnerWheel = function () {
    let outerRimPoint = outerCycloidWheel.getRadiusRimPoint();

    // center is innerCycloidRadius away from the outer rim point
    // towards the outerCyloidCenter   
    let center = {
      x: outerRimPoint.x - innerCycloidRadius * p.cos(outerCycloidWheel.theta),
      y: outerRimPoint.y - innerCycloidRadius * p.sin(outerCycloidWheel.theta),
    };

    innerCycloidWheel = new CycloidWheel(p, center.x, center.y, innerCycloidRadius, 0);

    previousOuterRimPoint = outerRimPoint;

    path = [];
  };
};

new p5(cycloid_circle_sketch);
