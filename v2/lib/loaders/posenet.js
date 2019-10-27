import ml5 from 'ml5';

import { animate } from './models';

const loaded = () => {
	console.log('loaded');
};

export default function(video, options) {
	const posenet = ml5.poseNet(video, options, loaded);

	posenet.on('pose', (poses) => animate(poses));

	return posenet;
}
