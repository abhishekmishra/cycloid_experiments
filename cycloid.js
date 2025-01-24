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
    p,
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
    this.p = p; // Store the p5 object
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.theta = p.radians(theta); // Convert theta to radians using p5 method
    this.colours = colours; // Store the colours
  }

  draw() {
    // draw a circle in blue
    this.p.stroke(...this.colours.circle);
    this.p.strokeWeight(2);
    this.p.noFill();
    this.p.ellipse(this.centerX, this.centerY, this.radius * 2, this.radius * 2);

    // draw a point at the center of the circle
    this.p.fill(...this.colours.centerPoint);
    this.p.ellipse(this.centerX, this.centerY, 5, 5);

    // draw the radius of the circle in red
    this.p.stroke(...this.colours.radius);
    this.p.strokeWeight(2);
    let radiusRimPoint = this.getRadiusRimPoint();
    this.p.line(this.centerX, this.centerY, radiusRimPoint.x, radiusRimPoint.y);

    // draw a point where the radius meets the circle
    this.p.stroke(...this.colours.rimPoint);
    this.p.fill(...this.colours.rimPoint);
    this.p.ellipse(radiusRimPoint.x, radiusRimPoint.y, 5, 5);
  }

  getRadiusRimPoint() {
    return {
      x: this.centerX + this.radius * this.p.cos(this.theta),
      y: this.centerY + this.radius * this.p.sin(this.theta),
    };
  }

  setTheta(theta) {
    this.theta = this.p.radians(theta); // Convert theta to radians using p5 method
  }

  rotate(delta_theta) {
    this.theta += this.p.radians(delta_theta); // Update theta by delta_theta in radians using p5 method
    this.centerX += this.radius * this.p.radians(delta_theta); // Update centerX based on the rotation
  }
}
