class Point {
  constructor(x, y) { this.move(x, y); }
  move(x, y) { this.x = x; this.y = y; }
  moveBy(x, y) { this.x += x; this.y += y; }
}

class Rectangle {
  constructor(x, y, w, h) {
    this.position = new Point(x, y);
    this.size = new Point(w, h);
  }
  move(x, y) { this.position.move(x, y); }
  moveBy(x, y) { this.position.moveBy(x, y); }
}

class Container {
  constructor(x = 0, y = 0) {
    this.position = new Point(x, y);
    this.figures = [];
  }

  add(figure) {
    if (figure && figure.position instanceof Point) {
      figure.move(this.position.x, this.position.y);
      this.figures.push(figure);
    }
  }

  move(x, y) {
    const dx = x - this.position.x;
    const dy = y - this.position.y;
    this.figures.forEach(fig => fig.moveBy(dx, dy));
  }

  moveBy(x, y) {
    this.figures.forEach(fig => fig.moveBy(x, y));
  }
}
