import { EditorView, WidgetType } from "@codemirror/view";

export class WordCounterWidget extends WidgetType {
	toDOM(view: EditorView): HTMLElement {
		const div = document.createElement("div");
		div.className = "word-counter-widget";

		const percentage = document.createElement("span");
		percentage.className = "morning-pages-percentage";
		percentage.innerText = "0%";

		const progressBar = document.createElement("progress");
		progressBar.className = "morning-pages-progress-bar";
		progressBar.setAttribute("value", "0");
		progressBar.setAttribute("max", "100");

		const progressText = document.createElement("span");
		progressText.className = "morning-pages-progress-text";
		progressText.innerText = "Morning Pages Progress:";

		const wordCountDiv = document.createElement("div");
		wordCountDiv.className = "morning-pages-word-count";
		wordCountDiv.innerText = "0/750";

		div.appendChild(progressText);
		div.appendChild(percentage);
		div.appendChild(progressBar);
		div.appendChild(wordCountDiv);
		return div;
	}
}
