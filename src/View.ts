import { RangeSetBuilder } from "@codemirror/state";
import {
	PluginValue,
	EditorView,
	ViewUpdate,
	ViewPlugin,
	WidgetType,
	DecorationSet,
	Decoration,
} from "@codemirror/view";

export class MorningPagesPlugin implements PluginValue {
	decorations: DecorationSet;
	dom: HTMLDivElement;

	constructor(view: EditorView) {
		this.dom = view.dom.appendChild(document.createElement("div"));
		this.dom.style.position = "absolute";
		this.dom.style.top = "0";
		this.dom.style.right = "0";
		this.dom.style.zIndex = "1000";
		this.dom.style.backgroundColor = "white";
		this.dom.style.padding = "10px";
		this.dom.style.border = "1px solid black";
		this.decorations = this.buildDecorations(view);
	}

	update(update: ViewUpdate) {
		if (update.docChanged || update.viewportChanged) {
			this.decorations = this.buildDecorations(update.view);
		}
	}

	destroy() {}

	buildDecorations(view: EditorView) {
		const widgets = [
			Decoration.widget({
				widget: new WordCounterWidget(),
				side: 1,
				block: true,
			}).range(10, 100),
		];

		return Decoration.set(widgets);
	}
}

class WordCounterWidget extends WidgetType {
	toDOM() {
		const div = document.createElement("div");
		div.innerText = "😀😃😄😁😆😅😂Word Counter";
		return div;
	}
}

export const morningPagesPlugin = ViewPlugin.fromClass(MorningPagesPlugin);
