import { EditorView, WidgetType } from "@codemirror/view";

export class WordCounterWidget extends WidgetType {
	toDOM(view: EditorView): HTMLElement {
		const div = document.createElement("div");
		div.className = "word-counter-widget";
		const progressBar = document.createElement("progress");
		const progressText = document.createElement("span");

		progressText.innerText = "Morning Pages progress: 0%";
		progressBar.value = 20;
		progressBar.setAttribute("max", "100");
		div.appendChild(progressText);
		div.appendChild(progressBar);
		return div;
	}
}
