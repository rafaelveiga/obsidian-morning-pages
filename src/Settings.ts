import MorningPages from "main";
import { App, PluginSettingTab, Setting } from "obsidian";

export interface MorningPagesSettings {
	morningPagesFolder: string;
	minimumWordCount: number;
	noteTitleFormat: string;
	noteTemplatePath: string;
}

export const DEFAULT_SETTINGS: Partial<MorningPagesSettings> = {
	morningPagesFolder: "./Morning Pages",
	minimumWordCount: 750,
	noteTitleFormat: "YYYY-MM-DD",
};

export class MorningPagesSettingsTab extends PluginSettingTab {
	plugin: MorningPages;

	constructor(app: App, plugin: MorningPages) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName("Morning Pages Folder")
			.setDesc("The folder where morning pages will be created.")
			.addText((text) =>
				text
					.setPlaceholder("MMMM dd, yyyy")
					.setValue(this.plugin.settings.morningPagesFolder)
					.onChange(async (value) => {
						// remove trailing slash
						this.plugin.settings.morningPagesFolder = value.replace(
							/\/$/,
							""
						);
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Minimum Word Count")
			.setDesc("The minimum word count for a morning page.")
			.addText((text) =>
				text
					.setPlaceholder("750")
					.setValue(this.plugin.settings.minimumWordCount.toString())
					.onChange(async (value) => {
						this.plugin.settings.minimumWordCount = parseInt(value);
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Note Title Format")
			.setDesc("The format of the note title.")
			.addDropdown((dropdown) =>
				dropdown
					.addOption("YYYY-MM-DD", "2024-08-26.md")
					.addOption("MMM DD, YYYY", "Aug 26, 2024.md")
					.setValue(this.plugin.settings.noteTitleFormat)
					.onChange(async (value) => {
						this.plugin.settings.noteTitleFormat = value;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Note Template Path")
			.setDesc("The path to the note template.")
			.addText((text) =>
				text
					.setPlaceholder("templates/morning-page.md")
					.setValue(this.plugin.settings.noteTemplatePath)
					.onChange(async (value) => {
						this.plugin.settings.noteTemplatePath = value;
						await this.plugin.saveSettings();
					})
			);
	}
}
