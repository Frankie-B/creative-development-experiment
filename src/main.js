import './style.css';

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/orbitControls';
import { PerspectiveCamera } from 'three';

const scene = new THREE.Scene();

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshBasicMaterial({ color: 0xff6347, wireframe: true });
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });


const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 0, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);

scene.add(lightHelper, gridHelper);

// Add orbit control to the DOM UI, that will move the camera around on a mouse event
const controls = new OrbitControls(camera, renderer.domElement);

// randomly generate stars in the scene
const addStar = () => {
  const geometry = new THREE.SphereGeometry(0.125, 14, 14);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.Math.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
};

Array(500).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load('images/space.jpg');

// create a rendering loop
const animate = () => {
  requestAnimationFrame(animate);
  // add torus rotation animation
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();
  renderer.render(scene, camera);
}


animate();