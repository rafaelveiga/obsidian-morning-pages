import MorningPages from "main";
import { App, moment, Notice, TFile } from "obsidian";

export default async function openMorningPage(app: App, plugin: MorningPages) {
	const path =
		plugin.settings.morningPagesFolder +
		"/" +
		moment().format(plugin.settings.noteTitleFormat) +
		".md";

	const file = app.vault.getFileByPath(path);

	if (!file) {
		const createdFile = await createMorningPage(
			app,
			path,
			plugin.settings.morningPagesFolder
		);
		if (createdFile) {
			openFileInLeaf(app, createdFile);
		}
	} else {
		openFileInLeaf(app, file);
	}
}

async function createMorningPage(
	app: App,
	path: string,
	folder: string,
	contents = ""
): Promise<TFile | null> {
	try {
		const file = await app.vault.create(path, contents);
		return file;
	} catch (error) {
		new Notice(
			`Failed to create morning page. The folder ${folder} exists?`
		);
		return null;
	}
}

function openFileInLeaf(app: App, file: TFile) {
	const leaf = app.workspace.getLeaf("tab");
	leaf.openFile(file);
}
