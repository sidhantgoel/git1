export default {
	types: {
		"Bug": 0,
		"Feature": 0,
		"Troubleshooting": 0,
		"Suggestion": 0,
		"Question": 0
	},
	actions: {
		"Needs Documentation": 0,
		"Add to Forum": 0
	},
	temp: () => {
		let data = {};
		fetch_queries_by_pods.data.forEach(i => {
			if (!data[i.unset_labels]) {
				data[i.unset_labels] = {
					"Bug": 0,
					"Feature": 0,
					"Question": 0,
					"Troubleshooting": 0,
					"Suggestion": 0
				};
			}
			data[i.unset_labels][i.type] = i.count;
		});
		const dataSource = {
			chart: {
				showsum: "1",
				plottooltext:
				"$seriesName: <b>$dataValue</b>",
				theme: "fusion",
				drawcrossline: "1"
			},
			categories: [
				{
					category: Object.keys(data).map(i => ({
						label: i
					}))
				}
			],
			dataset: Object.keys(this.types).map((i, idx) => ({
				seriesname: i,
				color: ColorsManager.Colors[idx],
				data: Object.keys(data).map(p => ({
					value: data[p][i],
				}))
			}))
		};

		return ({
				type: "stackedcolumn2d",
				dataSource
		});
		// return data;
	},
	comparative: () => {
		let data = {};
		fetch_queries_by_pending_doc.data.forEach(i => {
			if (!data[i.unset_labels]) {
				data[i.unset_labels] = {
					"Needs Documentation": 0,
					"Add to Forum": 0
				};
			}
			data[i.unset_labels][i.unset_states] = i.count;
		});
		const dataSource = {
			chart: {
				showsum: "1",
				plottooltext:
				"$seriesName: <b>$dataValue</b>",
				theme: "fusion",
				drawcrossline: "1"
			},
			categories: [
				{
					category: Object.keys(data).map(i => ({
						label: i
					}))
				}
			],
			dataset: Object.keys(this.actions).map((i, idx) => ({
				seriesname: i,
				color: ColorsManager.Colors[idx],
				data: Object.keys(data).map(p => ({
					value: data[p][i],
				}))
			}))
		};

		return ({
				type: "stackedcolumn2d",
				dataSource
		});
		// return data;
	}
}