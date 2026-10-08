import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const canvas = document.getElementById('star-destroyer-canvas');
const footer = document.querySelector('.footer');
if (!canvas || !footer) throw new Error('Canvas or footer not found');

const SIZE = 220;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true,
});
renderer.setSize(SIZE, SIZE);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.4;

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
camera.position.set(0, 1.5, 4);
camera.lookAt(0, 0, 0);

// Lighting — bright and punchy
const ambient = new THREE.AmbientLight(0xc4c8ff, 1.0);
scene.add(ambient);

const key = new THREE.DirectionalLight(0xffffff, 2.0);
key.position.set(3, 4, 5);
scene.add(key);

const fill = new THREE.DirectionalLight(0x818cf8, 1.2);
fill.position.set(-4, 2, -2);
scene.add(fill);

const rim = new THREE.DirectionalLight(0xa78bfa, 0.8);
rim.position.set(0, -3, -4);
scene.add(rim);

// Load model
let model = null;
const loader = new GLTFLoader();

loader.load(
  'assets/models/star_destroyer.glb',
  (gltf) => {
    model = gltf.scene;

    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2.5 / maxDim;

    model.scale.setScalar(scale);
    model.position.sub(center.multiplyScalar(scale));

    scene.add(model);
  },
  undefined,
  (err) => console.warn('Star Destroyer failed to load:', err)
);

// Show/hide when footer enters/leaves the viewport
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      canvas.classList.add('visible');
    } else {
      canvas.classList.remove('visible');
    }
  },
  { threshold: 0 }
);

observer.observe(footer);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  if (model) {
    model.rotation.y += 0.006;
  }

  renderer.render(scene, camera);
}

animate();
