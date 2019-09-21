let drill = null;
let tripod = null;
let grasped = false;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const drillDimensions = {};

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1);

document.body.appendChild(renderer.domElement);

camera.position.z = 5;

const light = new THREE.AmbientLight(0xffffff); // soft white light
scene.add(light);

// Optional animation to rotate the element
const animate = function() {
	// requestAnimationFrame(animate);
	// renderer.render(scene, camera);
};

animate();

// Creating Canavs for video Input
const video = document.getElementById('myvideo');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let trackButton = document.getElementById('trackbutton');
let updateNote = document.getElementById('updatenote');

let isVideo = false;
let model = null;

// Params to initialize Handtracking js
const modelParams = {
	flipHorizontal: true,
	maxNumBoxes: 1,
	iouThreshold: 0.5,
	scoreThreshold: 0.7,
};

async function init() {
	const lmodel = await handTrack.load(modelParams);
	model = lmodel;
	updateNote.innerText = 'Loaded Model!';
	trackButton.disabled = false;

	drill = document.querySelector('a-entity');
	tripod = document.querySelectorAll('a-entity')[1];
	scene.add(drill.object3D);
	scene.add(tripod.object3D);

	const box = new THREE.Box3().setFromObject(drill.object3D);
	drillDimensions.x = box.max.x;
	drillDimensions.y = box.max.y;

	toggleVideo();
}

// Method to start a video
async function startVideo() {
	const status = await handTrack.startVideo(video);
	if (status) {
		updateNote.innerText = 'Video started. Now tracking';
		isVideo = true;
		runDetection();
	} else {
		updateNote.innerText = 'Please enable video';
	}
}

// Method to toggle a video
function toggleVideo() {
	if (!isVideo) {
		updateNote.innerText = 'Starting video';
		startVideo();
	} else {
		updateNote.innerText = 'Stopping video';
		handTrack.stopVideo(video);
		isVideo = false;
		updateNote.innerText = 'Video stopped';
	}
}

//Method to detect movement
async function runDetection() {
	const predictions = await model.detect(video);

	model.renderPredictions(predictions, canvas, context, video);
	if (isVideo) {
		requestAnimationFrame(runDetection);
	}

	if (predictions.length > 0) {
		changeData(predictions[0].bbox);

		collision() && (grasped = true);
	}
}

//Method to Change prediction data into useful information
function changeData(value) {
	let midvalX = value[0] + value[2] / 2;
	let midvalY = value[1] + value[3] / 2;

	// document.querySelector('.hand-1 #hand-x span').innerHTML = midvalX;
	// document.querySelector('.hand-1 #hand-y span').innerHTML = midvalY;

	moveTheBox({ x: (midvalX - 300) / 600, y: (midvalY - 250) / 500 });
	grasped && grasp();
}

//Method to use prediction data to render cude accordingly
function moveTheBox(value) {
	drill.object3D.position.x = ((window.innerWidth * value.x) / window.innerWidth) * 5;
	drill.object3D.position.y = -((window.innerHeight * value.y) / window.innerHeight) * 5;
	renderer.render(scene, camera);
}

function collision() {
	if (
		inRange(
			drill.object3D.position.x,
			drill.object3D.position.y,
			tripod.object3D.position.x,
			tripod.object3D.position.y,
			2
		)
	) {
		return true;
	}

	return false;
}

function inRange(x, y, baseX, baseY, range) {
	if (x >= baseX - range && x <= baseX + range && y >= baseY - range && y <= baseY + range) {
		return true;
	}

	return false;
}

function grasp() {
	tripod.object3D.position.x = drill.object3D.position.x - drillDimensions.x * 2;
	tripod.object3D.position.y = drill.object3D.position.y + (drillDimensions.y - drillDimensions.y * 0.2);
}

init();
