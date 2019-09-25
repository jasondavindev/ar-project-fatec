let drill = null;
let tripod = null;
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
	maxNumBoxes: 2,
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

	if (predictions.length == 1) {
		changeDrillData(predictions[0].bbox);
	} else if (predictions.length == 2) {
		changeDrillData(predictions[0].bbox);
		changeTripodData(predictions[1].bbox);
	}
}

//Method to Change prediction data into useful information
function changeDrillData(value) {
	let midvalX = value[0] + value[2] / 2;
	let midvalY = value[1] + value[3] / 2;

	moveDrill({ x: (midvalX - 300) / 600, y: (midvalY - 250) / 500 });
}

function changeTripodData(value) {
	let midvalX = value[0] + value[2] / 2;
	let midvalY = value[1] + value[3] / 2;

	moveTripod({ x: (midvalX - 300) / 600, y: (midvalY - 250) / 500 });
}

//Method to use prediction data to render cude accordingly
function moveDrill(value) {
	drill.object3D.position.x = ((window.innerWidth * value.x) / window.innerWidth) * 5;
	drill.object3D.position.y = -((window.innerHeight * value.y) / window.innerHeight) * 5;
	renderer.render(scene, camera);
}

function moveTripod(value) {
	tripod.object3D.position.x = ((window.innerWidth * value.x) / window.innerWidth) * 5;
	tripod.object3D.position.y = -((window.innerHeight * value.y) / window.innerHeight) * 5;
	renderer.render(scene, camera);
}

init();
