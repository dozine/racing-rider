import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
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
        const riderName = this.getRiderNames()[index]; // Rider 이름 가져오기
        const nameDiv = document.createElement("div");
        nameDiv.className = "rider-label";
        nameDiv.textContent = riderName;
        // CSS 스타일 적용 (필요시 style.css에 추가)
        nameDiv.style.backgroundColor = "rgba(0,0,0,0.5)";
        nameDiv.style.color = "white";
        nameDiv.style.padding = "3px 8px";
        nameDiv.style.borderRadius = "5px";
        nameDiv.style.fontSize = "12px";
        nameDiv.style.whiteSpace = "nowrap"; // 텍스트 줄바꿈 방지
        const nameLabel = new CSS2DObject(nameDiv);
        nameLabel.position.set(0, 1.5, 0); // 라이더 모델 위에 표시 (Y축 1.5m 높이)
        riderMesh.add(nameLabel); // 라이더 메시에 이름표를 자식으로 추가
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
