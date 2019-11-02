import devices from './devices';
import * as scene from './scene';
import videoCreator from './video';
import posenet from './posenet';
import * as models from './models';

export default async function() {
	const video = videoCreator();
	await devices(video);

	const options = {
		flipHorizontal: true,
		minConfidence: 0.5,
	};

	posenet(video, options);

	scene.animate();
	models.load(scene.scene);
}
