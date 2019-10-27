import ml5 from 'ml5';

export default function(video, options) {
	const posenet = ml5.poseNet(video, options);
	return posenet;
}
