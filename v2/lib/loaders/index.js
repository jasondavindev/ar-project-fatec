import devices from './devices';
import renderer from './renderer';
import scene from './scene';
import video from './video';
import posenet from './posenet';
import models from './models';

export default async function() {
	const objVideo = video();
	await devices(objVideo);

	const options = {
		flipHorizontal: true,
		minConfidence: 0.5,
	};

	const ia = posenet(objVideo, options);
	const objRenderer = renderer();
	const objScene = scene();
	models(objScene.scene);
	objRenderer.render(objScene.scene, objScene.camera);
	document.body.appendChild(objRenderer.domElement);
}
