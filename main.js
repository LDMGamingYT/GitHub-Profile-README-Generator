var inputs = {};
var markdown = "";

async function getInputs() {
	inputs = {};
	Array.from(document.querySelectorAll(".input-wrapper input")).forEach(function (input) {
		inputs[input.id] = input.value;
	});
}

async function generate() {
	const content = document.getElementById("content-body");
	content.innerHTML = "";
	markdown = "";
	getInputs();

	document.getElementById("copy-button").style = "opacity: 100%;";

	createIn(content, 'h1', `Hi! I'm ${inputs.name}. 👋`, { "align": "center" });
	createIn(content, 'h3', inputs["short-description"], { "align": "center" });
}

async function createIn(parent, type, content, attributes = {}) {
	const element = document.createElement(type);
	element.innerHTML = content;
	markdown += `<${type} `;

	Object.keys(attributes).forEach(function (key) {
		element.setAttribute(key, attributes[key]);
		markdown += `${key}="${attributes[key]}" `
	});

	parent.appendChild(element);
	markdown = `${markdown.trim()}>${content}</${type}>\n`;
}

async function copyContent(text) {
	try {
		await navigator.clipboard.writeText(text);
	} catch (err) {
		console.error('Failed to copy: ', err);
	}
}

window.onload = function () {
	document.getElementById("generate-button").addEventListener("click", function () {
		generate();
	});
	document.getElementById("copy-button").addEventListener("click", function () {
		copyContent(markdown);
	});
};