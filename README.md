# WOOWAHAN TECH COURSE

## 3D Racing Rider Game

### 프로젝트 개요

- 프로젝트명 : Racing Rider
- 기간 : 11월 10일 - 11월 24일
- 기술 : Three.js, JavaScript
- 프로젝트 목표 : 우테코 프리코스에서 구현했던 자동차 경주 게임의 로직을 활용하여 3차원 웹 공간에서 라이더들이 실제로 경주하는 시각적 경험을 구현한다.

### 기획 의도

- 프리코스에서 JS로 구현했던 객체 지향 로직을 활용하여 3D환경에서 적용해본다.
- 웹 기반 3D 그래픽 라이브러리인 Three.js의 Scene, Camera, Renderer, Mesh의 기본 개념과 작동 원리를 익힌다.
- requestAnimationFrame을 이용한 렌더링 루프를 이해하고, 3D 객체의 위치와 회전을 제어하는 기본적인 애니메이션을 구현한다.
- 최근 화두가 되는 XR/공간 컴퓨팅의 가장 기초적인 형태인 웹 기반 3D 구현에 미리 적응하고 역량을 확보한다.

### 기술 스택 및 환경

- 언어 : Javascript
- 라이브러리 :Three.js
- 개발 환경 : Vite

### 코드 아키텍처

이 프로젝트는 MVC패턴으로 역할을 분리하여 코드를 구성했습니다.

- GameController.js(controller) : 렌더링 루프 관리, RacingGame과 3D Manager간의 데이터 동기화, 시간 기반 턴 실행, 카메라 추적 로직 실행합니다.
- RacingGame.js(Model) : 경주 시뮬레이션의 핵심로직을 담당한다. 3D환경에 대한 의존성은 없습니다.
- SceneManager.js(View) : 뷰포트 및 렌더링 환경을 관리한다. Three.js의 Scene, Camera, Renderer를 초기화 및 관리, HDRI로딩, 렌더링 실해으 카메라 위치 조정의 역할을 수행합니다.
- RiderManage.js(View) : GLTF모델 비동기 코드, '나' 라이더와 로봇라이더들의 모델을 분리 적용하고 3D위치를 업데이트합니다. 이름표 생성 및 부착의 역할도 수행합니다.
- TrackManager.js(View) : 트랙, 차선, 결승선 구조물 등 움직이지 않는 모든 3D배경 요소를 생성하고 장면에 추가하는 역할을 합니다.
- UIManager.js(View) : 2D사용자 인터페이스를 담당합니다. 게임시작 버튼을 활성화하고 경주 순위 결과 창을 표시하는 등 HTML기반의 2D UI상호작용 및 업데이트를 담당합니다.

### 주요 기능

1. 라이더 모델 분리 관리

- 플레이어인 '나'와 로봇 라이더들에게 각각 다른 GLB 3D모델 파일을 적용해서 시각적으로 구분하였습니다.
- 3D/2D결합 : CSSObject를 사용해서 라이더 모델 위에 이름표를 부착하고 3D공간을 따라 움직이는 2D UI를 구현하였습니다.

2. 경주 환경 및 애니메이션

- 시간 기반 턴 실행 : 밀리초 단위의 turnInterval 마다 게임 로직을 실행하여 부드러운 시간 제어를 구현했습니다.
- 카메라 추적 : 플레이어 라이더의 3D위치를 실시간으로 추적하여 카메라가 라이더 뒤를 따라가는 몰입형 환경을 제공합니다.
- TrackManager를 통해서 완주 지점에 현수막과 기둥으로 된 구조물을 배치했습니다.

### 프로젝트 실행 및 배포

- 로컬 실행 : npm install 후 npm run dev
- Github Pages배포 : npm run deploy
