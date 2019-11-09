import * as handtrack from 'handtrackjs';

const buildParams = () => ({
	flipHorizontal: true,
	maxNumBoxes: 1,
	iouThreshold: 0.5,
	scoreThreshold: 0.7,
});

export const load = async (params) => {
	return handtrack.load(params || buildParams());
};

export const start = async (video) => {
	return handtrack.startVideo(video);
};
