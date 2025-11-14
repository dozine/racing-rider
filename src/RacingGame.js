import Car from "./Car.js";

export default class RacingGame {
  constructor(carNames, moveConditionFn) {
    this.cars = carNames.map((name) => new Car(name));
    this.moveConditionFn = moveConditionFn;
    this.gameStatus = "RUNNING";
  }

  playTurn() {
    if (this.gameStatus !== "RUNNING") return this.cars;
    this.cars.forEach((car) => {
      const isMovable = this.moveConditionFn();
      car.move(isMovable);
    });

    return this.cars.map((car) => ({
      name: car.name,
      distance: car.distance,
    }));
  }

  getCarPositions() {
    return this.cars.map((car) => ({
      name: car.name,
      distance: car.distance,
    }));
  }

  finish(distance) {
    const isFinished = this.cars.some((car) => car.distance >= distance);
    if (isFinished) {
      this.gameStatus = "FINISHED";
      return true;
    }
    return false;
  }

  getWinner() {
    if (this.gameStatus !== "FINISHED") return null;
    return this.cars.reduce((a, b) => (a.distance > b.distance ? a : b));
  }
}
