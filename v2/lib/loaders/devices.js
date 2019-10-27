export default async function(video) {
	try {
		const stream = await navigator.mediaDevices.getUserMedia({
			video: true,
			audio: false,
		});

		video.srcObject = stream;
	} catch (error) {
		console.error(`A error occurred! ${error.message}`);
	}
}
