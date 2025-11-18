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

  showResults(results) {
    if (!this.resultOverlay || !this.winnerMessage) return;

    const olElement = document.createElement("ol");
    olElement.style.cssText =
      "list-style-type: none; padding-left: 0; text-align: left; margin-top: 15px;";

    results.forEach((car, index) => {
      const rank = index + 1;
      const rankPrefix = `${rank}등`;

      const li = document.createElement("li");
      li.style.cssText = "font-size: 24px; margin-bottom: 8px;";
      li.textContent = `${rankPrefix}: ${car.name} (${car.distance}m)`;

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
