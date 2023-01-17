var inputs = {};
var languages = {};
var markdown = "";

async function setupImageButtons() {
	Array.from(document.querySelectorAll(".img-button")).forEach(function(element) {
		element.setAttribute("selected", "false");
	});
}

async function toggleBooleanAttribute(element, attribute) {
	if (element.getAttribute(attribute) == "false") {
		element.setAttribute(attribute, "true");
	} else {
		element.setAttribute(attribute, "false");
	}
}

async function getInputs() {
	inputs = {};
	Array.from(document.querySelectorAll(".input-wrapper input")).forEach(function (input) {
		inputs[input.id] = input.value;
	});
	languages = {};
	Array.from(document.querySelectorAll(".img-button")).forEach(function (element) {
		languages[element.id] = element.getAttribute("selected");
	});
}

async function generate() {
	const content = document.getElementById("content-body");
	content.innerHTML = "";
	markdown = "";
	getInputs();

	document.getElementById("copy-button").style = "opacity: 100%;";

	create(content, 'h1', `${inputs['name-prefix']} ${inputs.name}${inputs['name-suffix']}`, { "align": "center" });
	create(content, 'h3', inputs["short-description"], { "align": "center" });
}

async function create(parent, type, content, attributes = {}) {
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

window.onload = function() {
	setupImageButtons();
	document.getElementById("generate-button").addEventListener("click", function () {
		generate();
	});
	document.getElementById("copy-button").addEventListener("click", function () {
		copyContent(markdown);
	});
	Array.from(document.querySelectorAll(".img-button")).forEach(function(element) {
		element.addEventListener("click", function() {
			toggleBooleanAttribute(element, "selected");
		});
	});
};