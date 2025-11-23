import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
export default class RiderManager {
  constructor(scene, numRiders, initialZPosition, config) {
    this.scene = scene;
    this.numRiders = numRiders;
    this.initialZPosition = initialZPosition;
    this.riderMeshes = [];
    this.loader = new GLTFLoader();
    this.config = config;
  }

  // loadAllRiders() {
  //   return new Promise((resolve) => {
  //     let loadedCount = 0;

  //     for (let i = 0; i < this.numRiders; i++) {
  //       this.loadRiderModel(i, () => {
  //         loadedCount++;
  //         if (loadedCount === this.numRiders) {
  //           resolve();
  //         }
  //       });
  //     }
  //   });
  //}

  async loadAllRiders() {
    const riderNames = this.getRiderNames();

    const loadPromises = Array.from({ length: this.numRiders }, (_, i) => {
      const modelPath =
        i === this.config.playerRiderIndex
          ? this.config.playerModelPath
          : this.config.robotModelPath;

      return new Promise((resolve, reject) => {
        this.loader.load(
          modelPath,
          (gltf) => {
            const riderMesh = gltf.scene;
            riderMesh.scale.set(1, 1, 1);
            riderMesh.position.set(
              this.getXPosition(i),
              0,
              this.initialZPosition
            );

            this.scene.add(riderMesh);
            this.riderMeshes[i] = riderMesh;

            this.createRiderLabel(riderNames[i], i);
            resolve();
          },
          undefined,
          (error) => {
            console.error(`라이더 모델 ${i} 로드 오류:`, error);
            reject(error);
          }
        );
      });
    });

    await Promise.all(loadPromises);
    console.log("모든 라이더 모델 로드 완료.");
  }

  getXPosition(index) {
    const laneWidth = 20;
    const numLanes = 10;
    const separation = laneWidth / numLanes;
    return (index - (numLanes - 1) / 2) * separation;
  }

  createRiderLabel(riderName, index) {
    const riderMesh = this.riderMeshes[index];
    if (!riderMesh) return;

    const nameDiv = document.createElement("div");
    nameDiv.className = "rider-label";
    nameDiv.textContent = riderName;
    nameDiv.style.backgroundColor = "rgba(0,0,0,0.5)";
    nameDiv.style.color = "white";
    nameDiv.style.padding = "3px 8px";
    nameDiv.style.borderRadius = "5px";
    nameDiv.style.fontSize = "12px";
    nameDiv.style.whiteSpace = "nowrap";

    const nameLabel = new CSS2DObject(nameDiv);
    nameLabel.position.set(0, 1.5, 0);

    riderMesh.add(nameLabel);
  }

  updateRiderPositions(cars) {
    cars.forEach((car, index) => {
      const mesh = this.riderMeshes[index];
      if (mesh) {
        mesh.position.z = this.initialZPosition + car.distance;
      }
    });
  }
  getPlayerRiderPosition(index) {
    const mesh = this.riderMeshes[index];
    if (mesh) {
      return mesh.position;
    }
    return null;
  }

  getRiderNames() {
    return Array.from({ length: this.numRiders }, (_, i) =>
      i === 0 ? `나` : `Rider ${i}`
    );
  }
  getLeadRiderPosition() {
    if (this.riderMeshes.length === 0) return null;
    let leadMesh = this.riderMeshes[0];
    this.riderMeshes.forEach((mesh) => {
      if (mesh.position.z > leadMesh.position.z) {
        leadMesh = mesh;
      }
    });
    return leadMesh.position;
  }
}
