export default {
	getAppId: async (link) => {
		if (link.includes("/applications/")) return link.match(/\/applications\/(\w+)/)[1];
		else if (link.match(/.*-([0-9a-z]*)/)) {
			const pageId = link.match(/.*-([0-9a-z]*)/)[1];
			const pageData = await find_app_clean_url.run({ id: pageId });
			return pageData[0].applicationId;
		}
		return link;
	},
	findApp: async (link) => {
		const id = await this.getAppId(link ?? forkableAppURLInput.text);
		find_app.run({ id });
	},
	toggleForkable: async (link) => {
		let id = await this.getAppId(link ?? forkableAppURLInput.text);
		await toggle_forkable.run({ id });
		await find_app.run({ id });
	},
}