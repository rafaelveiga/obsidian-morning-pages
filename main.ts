import { Plugin } from "obsidian";
import { MorningPagesSettings, MorningPagesSettingsTab } from "src/Settings";
import { DEFAULT_SETTINGS } from "src/Settings";

export default class MorningPages extends Plugin {
	settings: MorningPagesSettings;

	async onload() {
		await this.loadSettings();

		// Adding settings tab
		this.addSettingTab(new MorningPagesSettingsTab(this.app, this));
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
