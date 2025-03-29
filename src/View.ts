import { PluginValue, EditorView, ViewUpdate } from "@codemirror/view";
import { WordCounterWidget } from "./WordCounterWidget";
import { MorningPagesSettings } from "./Settings";

export class MorningPagesPlugin implements PluginValue {
	dom: HTMLElement;
	minimumWordCount: number;

	constructor(view: EditorView, settings: MorningPagesSettings) {
		this.minimumWordCount = settings.minimumWordCount;

		// Create widget and add it to the DOM
		this.dom = document.createElement("div");
		this.dom.className = "morning-pages-widget";

		// Add the actual widget content
		const widgetContent = new WordCounterWidget().toDOM(view);
		this.dom.appendChild(widgetContent);

		// Add the widget to the editor's parent container
		view.dom.parentElement?.appendChild(this.dom);
	}

	update(update: ViewUpdate) {
		const wordCount = update.state.doc.text.join(" ").split(" ").length - 1;
		const progress = (wordCount / this.minimumWordCount) * 100;

		if (progress > 100) {
			this.dom
				.querySelector(".word-counter-widget")
				?.querySelector(".morning-pages-progress-text")
				?.setText("Success! 🎉");
		} else {
			this.dom
				.querySelector(".word-counter-widget")
				?.querySelector(".morning-pages-progress-text")
				?.setText("Morning Pages Progress:");
		}

		this.dom
			.querySelector(".word-counter-widget")
			?.querySelector(".morning-pages-progress-bar")
			?.setAttribute("value", progress.toFixed(0).toString());

		this.dom
			.querySelector(".word-counter-widget")
			?.querySelector(".morning-pages-word-count")
			?.setText(`${wordCount}/${this.minimumWordCount}`);

		this.dom
			.querySelector(".word-counter-widget")
			?.querySelector(".morning-pages-percentage")
			?.setText(`${progress.toFixed(2)}%`);
	}

	destroy() {
		// Clean up by removing the DOM element when plugin is destroyed
		this.dom.remove();
	}
}
