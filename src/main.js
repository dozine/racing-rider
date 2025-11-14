import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import RacingGame from "./RacingGame.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 8, -25);
camera.lookAt(0, 0, 10);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let racingGame = null;
const numRiders = 10;
const riderMeshes = [];
const initialZPosition = -10;
const turnInterval = 100;
const shouldMove = () => Math.random() >= 0.4;
const modelPath = "/rider.glb";
let winnerDeclared = false;

const finish_distance = 40;
const finish_line_z = initialZPosition + finish_distance;

const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
const directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
directionalLight.position.set(5, 10, 5);

scene.add(ambientLight);
scene.add(directionalLight);

const planeGeometry = new THREE.PlaneGeometry(30, 50);
const planeMaterial = new THREE.MeshLambertMaterial({ color: 0x50c878 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = 0;
scene.add(plane);

const finishLineGeometry = new THREE.BoxGeometry(10, 0.1, 0.1);
const finishLineMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const finishLine = new THREE.Mesh(finishLineGeometry, finishLineMaterial);

finishLine.position.set(0, 0.05, finish_line_z);
scene.add(finishLine);
const loader = new GLTFLoader();

function loadRiderModel(index) {
  loader.load(
    modelPath,
    function (gltf) {
      const riderMesh = gltf.scene;

      riderMesh.scale.set(0.5, 0.5, 0.5);

      riderMesh.position.set(
        (index - (numRiders - 1) / 2) * 2,
        0.2,
        initialZPosition
      );

      scene.add(riderMesh);
      riderMeshes[index] = riderMesh;

      if (riderMeshes.filter((m) => m).length === numRiders) {
        const carNames = Array.from(
          { length: numRiders },
          (_, i) => `Rider ${i + 1}`
        );
        racingGame = new RacingGame(carNames, shouldMove);
        const startButton = document.getElementById("startButton");
        startButton.disabled = false;
        console.log("시작 버튼을 눌러주세요.");
      }
    },
    undefined,
    function (error) {
      console.error("모델 로딩 중 오류 발생:", error);
    }
  );
}

for (let i = 0; i < numRiders; i++) {
  loadRiderModel(i);
}

let lastUpdateTime = 0;

function animate(currentTime) {
  requestAnimationFrame(animate);

  if (racingGame && racingGame.gameStatus === "RUNNING") {
    if (currentTime - lastUpdateTime > turnInterval) {
      racingGame.playTurn();
      if (racingGame.finish(finish_distance)) {
        console.log("경주 종료! 우승자를 확인합니다.");
      }

      lastUpdateTime = currentTime;
    }

    racingGame.cars.forEach((car, index) => {
      const mesh = riderMeshes[index];
      if (mesh) {
        mesh.position.z = initialZPosition + car.distance;
      }
    });
  } else if (
    racingGame &&
    racingGame.gameStatus === "FINISHED" &&
    !winnerDeclared
  ) {
    const winner = racingGame.getWinner();
    console.log(
      `🏆 경주가 끝났습니다! 우승자는 ${winner.name} (거리: ${winner.distance}) 입니다!`
    );
    winnerDeclared = true;
  }

  renderer.render(scene, camera);
}

animate(0);

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("startButton");
  startButton.disabled = true;
  startButton.addEventListener("click", () => {
    if (racingGame && racingGame.gameStatus === "READY") {
      racingGame.startGame();
      startButton.style.display = "none";
    }
  });
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
