import GLTFLoader from 'three-gltf-loader';

const axis = {};
let drill;

const changeAxis = () => {
	if (axis.x && axis.y && drill) {
		drill.position.x = axis.x / 100;
		drill.position.y = axis.y / 100;
		console.log(axis);
	}
};

export function load(scene) {
	const loader = new GLTFLoader();
	const modelURL = '../../resources/drill/texture.gltf';

	loader.load(
		modelURL,
		(gltf) => {
			// called when the resource is loaded
			gltf.scene.scale.set(10, 10, 10);
			gltf.scene.position.set(0, 0, 0);
			scene.add(gltf.scene);
			drill = gltf.scene;
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

export function animate(poses) {
	poses.forEach(({ pose }) => {
		const keypoint = pose.keypoints[9];

		if (keypoint.score > 0.3) {
			axis.x = keypoint.position.x;
			axis.y = keypoint.position.y;
		}
	});

	changeAxis();
}
