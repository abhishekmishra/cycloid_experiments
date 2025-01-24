/**
 * The CycloidWheel class represents the position of a cycloid wheel.
 * The cycloid wheel is a circle that follows a path.
 * This class holds the current position of the wheel and draws it.
 *
 * The cycloid wheel is defined by:
 * - the center of the circle (centerX, centerY)
 * - the radius of the circle (radius)
 * - the angle of the wheel (theta)
 */
class CycloidWheel {
  constructor(
    centerX,
    centerY,
    radius,
    theta,
    colours = {
      circle: [0, 0, 200],
      radius: [200, 0, 0],
      centerPoint: [0, 255, 0],
      rimPoint: [255, 100, 250],
    }
  ) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.theta = radians(theta); // Convert theta to radians
    this.colours = colours; // Store the colours
  }

  draw() {
    // draw a circle in blue
    stroke(...this.colours.circle);
    strokeWeight(2);
    noFill();
    ellipse(this.centerX, this.centerY, this.radius * 2, this.radius * 2);

    // draw a point at the center of the circle
    fill(...this.colours.centerPoint);
    ellipse(this.centerX, this.centerY, 5, 5);

    // draw the radius of the circle in red
    stroke(...this.colours.radius);
    strokeWeight(2);
    let radiusRimPoint = this.getRadiusRimPoint();
    line(this.centerX, this.centerY, radiusRimPoint.x, radiusRimPoint.y);

    // draw a point where the radius meets the circle
    stroke(...this.colours.rimPoint);
    fill(...this.colours.rimPoint);
    ellipse(radiusRimPoint.x, radiusRimPoint.y, 5, 5);
  }

  getRadiusRimPoint() {
    return {
      x: this.centerX + this.radius * cos(this.theta),
      y: this.centerY + this.radius * sin(this.theta),
    };
  }

  setTheta(theta) {
    this.theta = radians(theta); // Convert theta to radians
  }
}
