// const r = new Rectangle(10, 10, 4, 6);
class Point {
  constructor(x, y) { this.move(x, y); }
  move(x, y) { this.x = x; this.y = y; }
  moveBy(x, y) { this.x += x; this.y += y; }
  mirror(x, y) { this.x += 2 * (x - this.x); this.y += 2 * (y - this.y); }
}

class Rectangle {
  constructor(x, y, w, h) {
    this.position = new Point(x, y);
    this.size = new Point(w, h);
  }
  move(x, y) {
    this.position.move(x, y);
  }
  points() {
    const { x: x1, y: y1 } = this.position;
    const x2 = x1 + this.size.x;
    const y2 = y1 + this.size.y;
    const l = Math.min(x1, x2), r = Math.max(x1, x2);
    const t = Math.min(y1, y2), b = Math.max(y1, y2);

    return [
      [ l, t ], [ r, t ], [ r, b ], [ l, b ]
    ];
  }
  moveBy(x, y) {
    this.position.moveBy(x, y);
  }

  mirror(x, y) {
    this.position.mirror(x, y);
    this.size.x = -this.size.x;
    this.size.y = -this.size.y;
  }
}
