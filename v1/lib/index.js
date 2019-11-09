import buildCanvas from './loaders/canvas';
import buildVideoTag from './loaders/video';
import createScene from './loaders/scene';
import * as handtrackLoader from './loaders/handtrack';
import loadModels from './loaders/models';
import detectionBuilder from './detections';

export default async function init() {
	const { canvas, context } = buildCanvas();
	const video = buildVideoTag();
	const scene = createScene();

	loadModels(scene);

	const hacktrackObjectDetections = await handtrackLoader.load();
	detectionBuilder({ hacktrackObjectDetections, video, canvas, context });
}
