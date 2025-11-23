import SceneManager from "./SceneManager.js";
import TrackManager from "./TrackManager.js";
import RiderManager from "./RiderManager.js";
import UIManager from "./UIManager.js";
import GameController from "./gameController.js";

const config = {
  numRiders: 10,
  initialZPosition: -10,
  finishDistance: 40,
  turnInterval: 100,
  shouldMove: () => Math.random() >= 0.4,
  playerModelPath: "/racing-rider/rider.glb",
  robotModelPath: "/racing-rider/robot.glb",
  playerRiderIndex: 0,
};

const sceneManager = new SceneManager();
const trackManager = new TrackManager(
  sceneManager.getScene(),
  config.initialZPosition,
  config.finishDistance
);
const riderManager = new RiderManager(
  sceneManager.getScene(),
  config.numRiders,
  config.initialZPosition,
  config
);
const uiManager = new UIManager();

const gameController = new GameController(
  sceneManager,
  riderManager,
  uiManager,
  config
);

uiManager.init();

gameController.init().then(() => {
  gameController.animate(0);
});
