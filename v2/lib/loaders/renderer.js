import * as THREE from 'three';

export default function() {
	const renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setClearColor('#2E2B40');
	renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
	return renderer;
}
