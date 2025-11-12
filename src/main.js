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
camera.position.set(3, 3, 10);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let racingGame = null;
const numRiders = 2;
const riderMeshes = [];
const initialZPosition = -10;
const turnInterval = 100;
const shouldMove = () => Math.random() >= 0.4;
const modelPath = "/rider.glb";

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
        console.log("레이싱 게임 시작 준비 완료!");
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
  if (racingGame) {
    if (currentTime - lastUpdateTime > turnInterval) {
      const updatedPositions = racingGame.playTurn();
      updatedPositions.forEach((car, index) => {
        const mesh = riderMeshes[index];
        if (mesh) {
          mesh.position.z = initialZPosition + car.distance;
          console.log(`${car.name} distance: ${car.distance}`);
        }
      });

      lastUpdateTime = currentTime;
    }
  }

  renderer.render(scene, camera);
}
animate(0);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
