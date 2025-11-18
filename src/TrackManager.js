import * as THREE from "three";

export default class TrackManager {
  constructor(scene, initialZPosition, finishDistance) {
    this.scene = scene;
    this.initialZPosition = initialZPosition;
    this.finishDistance = finishDistance;
    this.finishLineZ = initialZPosition + finishDistance;
    this.createTrack();
    this.createFinishLine();
  }

  createTrack() {
    const planeGeometry = new THREE.PlaneGeometry(30, 50);
    const planeMaterial = new THREE.MeshLambertMaterial({ color: 0x50c878 });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = 0;
    this.scene.add(plane);
  }

  createFinishLine() {
    const finishLineGeometry = new THREE.BoxGeometry(10, 0.1, 0.1);
    const finishLineMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const finishLine = new THREE.Mesh(finishLineGeometry, finishLineMaterial);
    finishLine.position.set(0, 0.05, this.finishLineZ);
    this.scene.add(finishLine);
  }
}
