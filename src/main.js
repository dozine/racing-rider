import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
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

let riderMesh;
let ambientLight;
let directionalLight;

// 조명
ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(ambientLight);

// 방향 조명
directionalLight = new THREE.DirectionalLight(0xffffff, 2.0);
directionalLight.position.set(5, 10, 5); //빛 위치 설정
scene.add(directionalLight);

const loader = new GLTFLoader();
const modelPath = "/rider.glb";

//loader.load(url,onLoad,onProgress,onError)
loader.load(
  modelPath,
  function (gltf) {
    riderMesh = gltf.scene;

    //크기 및 위치 조정
    riderMesh.scale.set(0.5, 0.5, 0.5);
    riderMesh.position.set(0, 0, 0);

    scene.add(riderMesh);
    console.log("라이더 모델 로딩 성공!");
  },
  undefined, // 로딩 중 콜백 생략(onProgress)
  function (error) {
    //onError
    console.error("모델 로딩 중 오류 발생:", error);
  }
);

// geometry : 큐브 모양 뼈대
// 매 프레임마다 호출되어 화면을 업데이트
function animate() {
  requestAnimationFrame(animate);
  if (riderMesh) {
  }
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
