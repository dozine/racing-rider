import Car from "./Car.js";

export default class RacingGame {
  constructor(carNames, moveConditionFn) {
    this.cars = carNames.map((name) => new Car(name));
    this.moveConditionFn = moveConditionFn;
  }

  playTurn() {
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
}
