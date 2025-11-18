import Car from "./Car.js";

export default class RacingGame {
  constructor(carNames, moveConditionFn, finishDistance) {
    this.cars = carNames.map((name) => new Car(name));
    this.moveConditionFn = moveConditionFn;
    this.finishDistance = finishDistance;
    this.gameStatus = "READY";
    this.currentTurn = 0;
  }
  startGame() {
    this.gameStatus = "RUNNING";
    console.log("경기 시작");
  }

  playTurn() {
    if (this.gameStatus !== "RUNNING") return this.cars;
    this.currentTurn++;
    this.cars.forEach((car) => {
      const hasFinished = car.distance >= this.finishDistance;
      if (!hasFinished) {
        const isMovable = this.moveConditionFn();
        car.move(isMovable);
        if (car.distance >= this.finishDistance) {
          car.finishedTurn = this.currentTurn;
        }
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
      finishedTurn: car.finishedTurn,
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
      finishedTurn: car.finishedTurn,
    }));
    results.sort((a, b) => {
      if (a.finishedTurn !== b.finishedTurn) {
        return a.finishedTurn - b.finishedTurn; // 턴이 빠를수록(숫자가 작을수록) 위로
      }
      return b.distance - a.distance; // 턴이 같다면, 거리가 길수록 위로
    });
    return results;
  }
}
