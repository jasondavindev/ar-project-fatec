import * as THREE from 'three';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);
const camera = new THREE.PerspectiveCamera(
	75,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
document.body.appendChild(renderer.domElement);

camera.position.z = 5;

const light = new THREE.PointLight(0xffff00);
light.position.set(-10, 0, 10);
scene.add(light);

const animate = () => {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
};

export { scene, animate };
