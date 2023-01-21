// define HTML elements
const formElement = document.querySelector("form");

// handle form submission
formElement.addEventListener("submit", async (e) => {
	// prevent page reload
	e.preventDefault();
	let outputElement = document.getElementById("output");
	let topic = document.getElementById("topic");
	let subject = document.getElementById("subject");
	let grade = document.getElementById("grade");
	let numb_questions = document.getElementById("number");

	let formString = "Erstelle " + numb_questions.value +" Multiple-Choice-Fragen für den " + subject.value + "-Unterricht einer " + grade.value + ". Klasse. Das Thema ist \"" + topic.value + "\". Jede Frage sollte 4 Optionen und 1 richtige Antworten haben.";

	console.log(formString)

	// show loading status
	outputElement.innerText = "Multiple Choice Test lädt...";

	// make a POST request to /completion endpoint with textarea's text
	const response = await fetch("/completion", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ message: formString, tokens: numb_questions.value * 250 }),
	});

	// convert the response to json
	const data = await response.json();

	// show the answer resp. the error
	if (data.answer) {
		outputElement.innerText = data.answer;
	} else if (data.error) {
		outputElement.innerText = "";
		window.alert(data.error);
	}
});
