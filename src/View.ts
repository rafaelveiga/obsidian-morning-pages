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
		// You can update widget content based on editor changes if needed
		if (update.docChanged) {
			// Update widget content if necessary
		}
	}

	destroy() {
		// Clean up by removing the DOM element when plugin is destroyed
		this.dom.remove();
	}
}

export const morningPagesPlugin = ViewPlugin.fromClass(MorningPagesPlugin);
