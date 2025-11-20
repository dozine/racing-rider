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

    const roadMaterial = new THREE.MeshLambertMaterial({ color: 0x808080 });
    const roadPlane = new THREE.Mesh(planeGeometry, roadMaterial);
    roadPlane.rotation.x = -Math.PI / 2;
    roadPlane.position.y = 0;
    this.scene.add(roadPlane);

    const sideGeometry = new THREE.PlaneGeometry(50, 50);
    const sideMaterial = new THREE.MeshLambertMaterial({ color: 0x3fe0b0 }); // 배민 그린
    const sidePlane = new THREE.Mesh(sideGeometry, sideMaterial);
    sidePlane.rotation.x = -Math.PI / 2;
    sidePlane.position.y = -0.05;
    this.scene.add(sidePlane);

    this.createLanes(3, 0.01, 0xffffff);
  }

  createLanes(count, thickness, color) {
    const laneMaterial = new THREE.MeshBasicMaterial({ color: color });
    const laneGeometry = new THREE.BoxGeometry(0.2, thickness, 2); // 짧은 차선 조각

    const separation = 3;
    const roadWidth = 10;

    for (let i = 0; i < count; i++) {
      const laneX = (i - (count - 1) / 2) * (roadWidth / count);
      for (let z = -25; z < 25; z += separation * 2) {
        const lane = new THREE.Mesh(laneGeometry, laneMaterial);
        lane.position.set(laneX, 0.02, z);
        this.scene.add(lane);
      }
    }
  }

  createFinishLine() {
    const finishLineGeometry = new THREE.BoxGeometry(10, 0.1, 0.1);
    const finishLineMaterial = new THREE.MeshBasicMaterial({
      color: 0x3fe0b0,
    });
    const finishLine = new THREE.Mesh(finishLineGeometry, finishLineMaterial);
    finishLine.position.set(0, 0.05, this.finishLineZ);
    this.scene.add(finishLine);
  }
}
