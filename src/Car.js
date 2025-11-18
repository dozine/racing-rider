export default class Car {
  constructor(name) {
    this.name = name;
    this.distance = 0;
    this.finishTurn = Infinity;
  }

  move(isMovable) {
    if (isMovable) {
      this.distance += 1;
    }
  }
}
