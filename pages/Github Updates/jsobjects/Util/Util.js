export default {
	getStateColor: (state) => {
		if (state == "open") return "#fcc203";
		if (state == "closed") return "#9ff5ad";
	},
	getSupportIssuesURL: () => {
		let state = String(Select1.selectedOptionValue).toLowerCase();
		const base = "/search/issues";
		let query = "?q=repo%3Aappsmithorg%2Fappsmith+is%3Aissue";
		if (state !== "all") {
			query += `+is%3A${state}`;
		}
		query += "+sort%3Acreated-desc";
		query += "+label%3ASupport";
		return base + query;
	}
}