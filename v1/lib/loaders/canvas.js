export default function buildCanvas() {
	const canvas = document.getElementById('canvas');
	const context = canvas.getContext('2d');

	return { canvas, context };
}
