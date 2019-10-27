import GLTFLoader from 'three-gltf-loader';

export default function(scene) {
	const loader = new GLTFLoader();

	loader.load(
		'../../js/texture/scene.gltf',
		(gltf) => {
			// called when the resource is loaded
			console.log(gltf.scene);
			scene.add(gltf.scene);
		},
		(xhr) => {
			// called while loading is progressing
			console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
		},
		(error) => {
			// called when loading has errors
			console.error('An error happened', error);
		}
	);
}
