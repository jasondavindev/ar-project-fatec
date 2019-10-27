import * as THREE from 'three';

export default function() {
	const scene = new THREE.Scene();
	scene.background = new THREE.Color(0xf0f0f0);

	const camera = new THREE.PerspectiveCamera(
		75,
		window.innerWidth / 2 / (window.innerHeight / 2),
		0.1,
		1000
	);

	camera.position.z = 20;
	camera.position.set(0, 0, 0);
	camera.lookAt(scene.position);

	const light = new THREE.PointLight(0xffff00);
  light.position.set(-10, 0, 10);
  
  scene.add(light);

	return {
		scene,
		camera,
	};
}
