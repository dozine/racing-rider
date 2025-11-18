import RacingGame from "./RacingGame.js";

export default class GameController {
  constructor(sceneManager, riderManager, uiManager, config) {
    this.sceneManager = sceneManager;
    this.riderManager = riderManager;
    this.uiManager = uiManager;
    this.config = config;

    this.racingGame = null;
    this.lastUpdateTime = 0;
    this.winnerDeclared = false;
  }

  async init() {
    await this.riderManager.loadAllRiders();

    const riderNames = this.riderManager.getRiderNames();
    this.racingGame = new RacingGame(
      riderNames,
      this.config.shouldMove,
      this.config.finishDistance
    );

    this.uiManager.enableStartButton();
    this.uiManager.setOnStartCallback(() => this.startGame());
  }

  startGame() {
    if (this.racingGame && this.racingGame.gameStatus === "READY") {
      this.racingGame.startGame();
      this.uiManager.hideStartButton();
    }
  }

  update(currentTime) {
    if (!this.racingGame) return;

    if (this.racingGame.gameStatus === "RUNNING") {
      if (currentTime - this.lastUpdateTime > this.config.turnInterval) {
        this.racingGame.playTurn();

        if (this.racingGame.finish()) {
          console.log("경주 종료! 우승자를 확인합니다.");
        }

        this.lastUpdateTime = currentTime;
      }

      this.riderManager.updateRiderPositions(this.racingGame.cars);
    } else if (
      this.racingGame.gameStatus === "FINISHED" &&
      !this.winnerDeclared
    ) {
      const results = this.racingGame.getRaceResults();
      this.uiManager.showResults(results);
      this.winnerDeclared = true;
    }
  }

  animate(currentTime) {
    requestAnimationFrame((time) => this.animate(time));

    this.update(currentTime);
    this.sceneManager.render();
  }
}
