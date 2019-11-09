export default function buildDetection({
	hacktrackObjectDetections,
	video,
	canvas,
	context,
}) {
	// closure
	return async function runDetection() {
		const predictions = await hacktrackObjectDetections.detect(video);

		hacktrackObjectDetections.renderPredictions(
			predictions,
			canvas,
			context,
			video
		);

		window.requestAnimationFrame(runDetection);
	};
}
