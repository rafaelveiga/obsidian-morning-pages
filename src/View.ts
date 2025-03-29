import {
	PluginValue,
	EditorView,
	ViewUpdate,
	ViewPlugin,
} from "@codemirror/view";
import { WordCounterWidget } from "./WordCounterWidget";

export class MorningPagesPlugin implements PluginValue {
	dom: HTMLElement;

	constructor(view: EditorView) {
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
		if (update.docChanged) {
			const wordCount =
				update.state.doc.text.join(" ").split(" ").length - 1;
			const progress = (wordCount / 1000) * 100;

			this.dom
				.querySelector(".word-counter-widget")
				?.querySelector("progress")
				?.setAttribute("value", progress.toString());

			this.dom
				.querySelector(".word-counter-widget")
				?.querySelector(".word-count-div")
				?.setText(`${wordCount}/1000`);
		}
	}

	destroy() {
		// Clean up by removing the DOM element when plugin is destroyed
		this.dom.remove();
	}
}

export const morningPagesPlugin = ViewPlugin.fromClass(MorningPagesPlugin);
