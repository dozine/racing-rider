import * as THREE from "three";

//scene: 3d 객체와 조명이 배치되는 곳
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xff5ebebb); // 배경색

//camera : 무대를 바라보는 곳
const camera = new THREE.PerspectiveCamera(
  75, //시야각
  window.innerWidth / window.innerHeight, //화면 비율
  0.1, //Near
  1000 //Far
);
camera.position.z = 5;

//renderer : 계산된 씬을 그리는 역할
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// geometry : 큐브 모양 뼈대
const geometry = new THREE.BoxGeometry(1, 1, 1);
// material : 표면의 색상과 질감
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// mesh : 형태와 재질을 합친 3d객체
const cube = new THREE.Mesh(geometry, material);
// 씬에 큐브를 추가
scene.add(cube);

// 매 프레임마다 호출되어 화면을 업데이트
function animate() {
  requestAnimationFrame(animate);
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  renderer.render(scene, camera);
}

animate();

//반응형 처리 (창 크기 변경 시)
window.addEventListener("resize", () => {
  // 카메라 비율 업데이트
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  // 렌더러 크기 업데이트
  renderer.setSize(window.innerWidth, window.innerHeight);
});
