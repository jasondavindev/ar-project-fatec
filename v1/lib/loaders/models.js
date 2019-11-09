import * as THREE from 'three';

export default function loadModels(scene) {
	const drill = document.getElementById('drill');
	const tripod = document.getElementById('tripod');
	const wall = document.getElementById('wall');

	scene.add(drill);
	scene.add(tripod);
	scene.add(wall);

	return {
		drill,
		tripod,
		wall,
	};
}

export function getDrillDimensions(drillObject3D) {
	const box = new THREE.Box3().setFromObject(drillObject3D);

	return {
		x: box.max.x,
		y: box.max.y,
	};
}
