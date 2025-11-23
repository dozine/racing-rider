import * as THREE from "three";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { EXRLoader } from "three/examples/jsm/loaders/EXRLoader.js";

export default class SceneManager {
  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xff5ebebb);

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 8, -25);
    this.camera.lookAt(0, 0, 10);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    this.labelRenderer.domElement.style.position = "absolute";
    this.labelRenderer.domElement.style.top = "0px";
    this.labelRenderer.domElement.style.pointerEvents = "none";
    document.body.appendChild(this.labelRenderer.domElement);
    this.setupLights();
    this.setupWindowResize();
  }

  setupLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 3.0);
    directionalLight.position.set(5, 15, 5);
    const spotLight = new THREE.SpotLight(
      0x00ffff,
      40,
      100,
      Math.PI / 8,
      0.5,
      0.5
    );
    spotLight.position.set(0, 15, 0);
    spotLight.target.position.set(0, 0, 10);
    this.scene.add(spotLight);
    this.scene.add(spotLight.target);
    this.scene.add(ambientLight);
    this.scene.add(directionalLight);
  }

  setupWindowResize() {
    window.addEventListener("resize", () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  render() {
    this.renderer.render(this.scene, this.camera);
    this.labelRenderer.render(this.scene, this.camera);
  }

  getScene() {
    return this.scene;
  }

  getCamera() {
    return this.camera;
  }

  getRenderer() {
    return this.renderer;
  }
  updateCameraToTrack(targetPosition) {
    if (!targetPosition) return;

    const newCameraZ = targetPosition.z - 10;
    const newCameraY = 10;
    const newCameraX = -20;

    this.camera.position.set(newCameraX, newCameraY, newCameraZ);

    this.camera.lookAt(targetPosition.x, targetPosition.y, targetPosition.z);
  }

  loadHDRI(path) {
    new EXRLoader().setPath("/").load(
      path,
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;

        this.scene.background = texture;
        this.scene.environment = texture;
      },
      undefined,
      (error) => {
        console.error("HDRI 로드 중 오류 발생:", error);
      }
    );
  }
}
