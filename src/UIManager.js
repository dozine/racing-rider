export default class UIManager {
  constructor() {
    this.startButton = null;
    this.resultOverlay = null;
    this.winnerMessage = null;
    this.onStartCallback = null;
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.startButton = document.getElementById("startButton");
      this.resultOverlay = document.getElementById("resultOverlay");
      this.winnerMessage = document.getElementById("winnerMessage");

      if (this.startButton) {
        this.startButton.disabled = true;
        this.startButton.addEventListener("click", () => {
          if (this.onStartCallback) {
            this.onStartCallback();
          }
        });
      }
    });
  }

  enableStartButton() {
    if (this.startButton) {
      this.startButton.disabled = false;
      console.log("시작 버튼을 눌러주세요.");
    }
  }

  hideStartButton() {
    if (this.startButton) {
      this.startButton.style.display = "none";
    }
  }

  // showResults(results, turnInterval) {
  //   if (!this.resultOverlay || !this.winnerMessage) return;

  //   const olElement = document.createElement("ol");
  //   olElement.style.cssText =
  //     "list-style-type: none; padding-left: 0; text-align: left; margin-top: 15px;";

  //   results.forEach((car, index) => {
  //     const rank = index + 1;
  //     const rankPrefix = `${rank}등`;

  //     const li = document.createElement("li");
  //     li.style.cssText = "font-size: 24px; margin-bottom: 8px;";
  //     let displayTime;

  //     if (car.finishedTurn === Infinity) {
  //       displayTime = "미도착";
  //     } else {
  //       const timeInSeconds = (car.finishedTurn * turnInterval) / 1000;

  //       displayTime = `${timeInSeconds.toFixed(2)}초`;
  //     }
  //     li.textContent = `${rankPrefix}: ${car.name} (${displayTime})`;

  //     olElement.appendChild(li);
  //   });

  //   this.winnerMessage.innerHTML = "";
  //   this.winnerMessage.appendChild(olElement);
  //   this.resultOverlay.style.display = "flex";
  // }

  // UIManager.js (showResults 메서드 수정)

  // turnInterval 매개변수 유지
  showResults(results, turnInterval) {
    if (!this.resultOverlay || !this.winnerMessage) return;

    const olElement = document.createElement("ol");
    olElement.style.cssText =
      "list-style-type: none; padding-left: 0; text-align: left; margin-top: 15px;";

    let currentRank = 0;
    let previousTime = -1;

    results.forEach((car, index) => {
      let displayTime;
      const currentTimeValue = car.finishedTurn;

      if (currentTimeValue === Infinity) {
        displayTime = "미도착";
      } else {
        const timeInSeconds = (currentTimeValue * turnInterval) / 1000;
        displayTime = `${timeInSeconds.toFixed(1)}초`;
      }

      if (currentTimeValue !== previousTime) {
        currentRank = index + 1;
      }

      previousTime = currentTimeValue;

      const rankPrefix = `${currentRank}등`;
      const li = document.createElement("li");
      li.style.cssText = "font-size: 24px; margin-bottom: 8px;";
      li.textContent = `${rankPrefix}: ${car.name} (${displayTime})`;

      olElement.appendChild(li);
    });

    this.winnerMessage.innerHTML = "";
    this.winnerMessage.appendChild(olElement);
    this.resultOverlay.style.display = "flex";
  }
  setOnStartCallback(callback) {
    this.onStartCallback = callback;
  }
}
