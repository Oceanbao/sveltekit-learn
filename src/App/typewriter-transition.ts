// thanks to https://gist.github.com/meain/6440b706a97d2dd71574769517e7ed32
export const messages = [
	'reticulating splines...',
	'generating witty dialog...',
	'swapping time and space...',
	'640K ought to be enough for anybody',
	'checking the gravitational constant in your locale...',
	'keep calm and npm install',
	'counting backwards from Infinity',
	"I'm sorry Dave, I can't do that.",
	'adjusting flux capacitor...',
	'constructing additional pylons...',
	'rm -rf /'
];

export function typewriterKey(node, { speed = 1 }) {
	const valid = node.childNodes.length === 1 && node.childNodes[0].nodeType === Node.TEXT_NODE;

	if (!valid) {
		throw new Error(`This transition only works on elements with a single text node child`);
	}

	const text = node.textContent;
	const duration = text.length / (speed * 0.01);

	return {
		duration,
		tick: (t) => {
			const i = Math.trunc(text.length * t);
			node.textContent = text.slice(0, i);
		}
	};
}
