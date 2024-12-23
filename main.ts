import { Plugin } from "obsidian";
import { MorningPagesSettings, MorningPagesSettingsTab } from "src/Settings";
import { DEFAULT_SETTINGS } from "src/Settings";
import openMorningPage from "src/utils/openMorningPage";
import { morningPagesPlugin } from "src/View";

export default class MorningPages extends Plugin {
	settings: MorningPagesSettings;

	async onload() {
		await this.loadSettings();

		// Adding settings tab
		this.addSettingTab(new MorningPagesSettingsTab(this.app, this));

		// Button to create a new morning page
		this.addRibbonIcon("sunrise", "Create Morning Page", () => {
			openMorningPage(this.app, this);
		});

		this.registerEditorExtension(morningPagesPlugin);
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
