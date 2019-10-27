export default function() {
	const video = document.createElement('video');
	const vidDiv = document.getElementById('video');
	video.setAttribute('width', 255);
	video.setAttribute('height', 255);
	video.autoplay = true;
	vidDiv.appendChild(video);
	return video;
}
