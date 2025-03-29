import { EditorView, WidgetType } from "@codemirror/view";

export class WordCounterWidget extends WidgetType {
	toDOM(view: EditorView): HTMLElement {
		const div = document.createElement("div");
		div.className = "word-counter-widget";
		const progressBar = document.createElement("progress");
		const progressText = document.createElement("span");

		const wordCountDiv = document.createElement("div");
		wordCountDiv.className = "word-count-div";
		wordCountDiv.innerText = "0/750";

		progressText.innerText = "Morning Pages progress: 0%";
		progressBar.value = 20;
		progressBar.setAttribute("max", "100");
		div.appendChild(progressText);
		div.appendChild(progressBar);
		div.appendChild(wordCountDiv);
		return div;
	}
}
