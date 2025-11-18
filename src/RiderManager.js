import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default class RiderManager {
  constructor(scene, numRiders, initialZPosition, modelPath) {
    this.scene = scene;
    this.numRiders = numRiders;
    this.initialZPosition = initialZPosition;
    this.modelPath = modelPath;
    this.riderMeshes = [];
    this.loader = new GLTFLoader();
    this.onAllModelsLoaded = null;
  }

  loadAllRiders() {
    return new Promise((resolve) => {
      let loadedCount = 0;

      for (let i = 0; i < this.numRiders; i++) {
        this.loadRiderModel(i, () => {
          loadedCount++;
          if (loadedCount === this.numRiders) {
            resolve();
          }
        });
      }
    });
  }

  loadRiderModel(index, onLoad) {
    this.loader.load(
      this.modelPath,
      (gltf) => {
        const riderMesh = gltf.scene;
        riderMesh.scale.set(0.5, 0.5, 0.5);
        riderMesh.position.set(
          (index - (this.numRiders - 1) / 2) * 2,
          0.2,
          this.initialZPosition
        );

        this.scene.add(riderMesh);
        this.riderMeshes[index] = riderMesh;

        if (onLoad) onLoad();
      },
      undefined,
      (error) => {
        console.error("모델 로딩 중 오류 발생:", error);
      }
    );
  }

  updateRiderPositions(cars) {
    cars.forEach((car, index) => {
      const mesh = this.riderMeshes[index];
      if (mesh) {
        mesh.position.z = this.initialZPosition + car.distance;
      }
    });
  }

  getRiderNames() {
    return Array.from({ length: this.numRiders }, (_, i) => `Rider ${i + 1}`);
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
