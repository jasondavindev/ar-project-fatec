import devices from './devices';
import * as scene from './scene';
import video from './video';
import posenet from './posenet';
import * as models from './models';

export default async function() {
	const objVideo = video();
	await devices(objVideo);

	const options = {
		flipHorizontal: true,
		minConfidence: 0.5,
	};

	posenet(objVideo, options);

	scene.animate();
	models.load(scene.scene);
}
