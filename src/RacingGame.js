import Car from "./Car.js";

export default class RacingGame {
  constructor(carNames, moveConditionFn, finishDistance) {
    this.cars = carNames.map((name) => new Car(name));
    this.moveConditionFn = moveConditionFn;
    this.finishDistance = finishDistance;
    this.gameStatus = "READY";
  }
  startGame() {
    this.gameStatus = "RUNNING";
    console.log("경기 시작");
  }

  playTurn() {
    if (this.gameStatus !== "RUNNING") return this.cars;
    this.cars.forEach((car) => {
      const hasFinished = car.distance >= this.finishDistance;
      if (!hasFinished) {
        const isMovable = this.moveConditionFn();
        car.move(isMovable);
      }
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

  finish() {
    const isFinished = this.cars.every(
      (car) => car.distance >= this.finishDistance
    );
    if (isFinished) {
      this.gameStatus = "FINISHED";
      return true;
    }
    return false;
  }

  getRaceResults() {
    if (this.gameStatus !== "FINISHED") return [];
    const results = this.cars.map((car) => ({
      name: car.name,
      distance: car.distance,
    }));
    results.sort((a, b) => b.distance - a.distance);
    return results;
  }
}
