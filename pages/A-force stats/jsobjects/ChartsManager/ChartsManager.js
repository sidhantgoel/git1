export default {
	getVitals: () => {
		let categories = fetch_aforce_vitals.data.map(item => ({ label: moment(item.day_backlog || item.day).format('ddd Do, MMM') }));
		let resolved = fetch_aforce_vitals.data.map(item => ({ value: item.resolved ?? 0 }));
		let backlog = fetch_aforce_vitals.data.map(item => ({ value: item.backlog ?? 0 }));
		let percentage = fetch_aforce_vitals.data.map(item => ({ value: Math.ceil((item.resolved) * 100/((item.resolved ?? 0) + (item.backlog ?? 0)))}));
		const dataSource = {
			chart: {
				showBorder: "0",
				borderThickness: "0",
				theme: "fusion",
				plottooltext:
					"$seriesName Queries : <b>$dataValue</b>",
				yaxisname: "Number of Queries",
				syaxisname: "% of Resolved Queries",
				snumbersuffix: "%",
				syaxismaxvalue: "100",
				showvalues: "0",
				drawcrossline: "1",
				divlinealpha: "20",
				chartLeftMargin: 40,
				chartRightMargin: 40,
				chartTopMargin: 40,
				chartBottomMargin: 10,
			},
			categories: [
				{
					category: categories
				}
			],
			dataset: [
				{
					dataset: [
						{
							color: ColorsManager.Green,
							seriesname: "Resolved",
							data: resolved,
						},
						{
							color: ColorsManager.Red,
							seriesname: "Backlog",
							data: backlog,
						}
					]
				}
			],
			lineset: [
				{
					color: "#264653",
					anchorradius: "8",
					anchorbgcolor: "#264653",
					palettecolors: "#264653",
					seriesname: "Resolved %",
					linethickness: "3",
					plottooltext:
						"On $label <b>$dataValue</b> queries were resolved.",
					data: percentage,
				}
			]
		};
		return {
			"type": "msstackedcolumn2dlinedy",
			dataSource,
		};
	},
	getIssuesByChannel: () => {
		const data = fetch_queries_by_channels.data.map(item => ({ label: _.capitalize(item.channel ?? 'others'), value: item.count, color: ColorsManager[_.capitalize(item.channel ?? 'others')] }));
		const dataSource = {
			chart: {
				plottooltext: "<b>$percentValue</b> of the queries were asked on $label",
				showlegend: "0",
				showpercentvalues: "1",
				usedataplotcolorforlabels: "1",
				theme: "fusion",
				chartLeftMargin: 10,
				chartRightMargin: 10,
				chartTopMargin: 10,
				chartBottomMargin: 10,
			},
			data
		};
		return {
			"type": "pie2d",
			dataSource,
		};
	},
	getIssuesByType: () => {
		const categories = fetch_queries_by_type.data.map(item => ({ label: _.capitalize(item.r_type ?? 'others') }));
		const count = fetch_queries_by_type.data.map(item => ({ value: (item.r ?? 0) + (item.b ?? 0) }));
		const area = fetch_queries_by_type.data.map(item => ({ value: item.b ?? 0 }));

		const dataSource = {
			chart: {
				yaxisname: "Number of Queries",
				theme: "fusion",
				chartTopMargin: 30,
				chartBottomMargin: 20,
				labelDisplay: "stagger"
			},
			categories: [
				{
					category: categories
				}
			],
			dataset: [
				{
					data: count,
					plottooltext: "$label : <b>$dataValue</b>",
					color: '#99c1de',
				},
				{
					plottooltext: "Backlogs : <b>$dataValue</b>",
					renderas: "area",
					showanchors: "1",
					data: area,
					color: ColorsManager.Red,
				}
			]
		};
		return {
			"type": "mscombi2d",
			dataSource,
		};
	},
	getIssuesByAuthor: () => {
		const data = fetch_queries_by_author.data.map(item => ({ label: _.capitalize(item.author.split('@')[0]), value: item.count }));
		const dataSource = {
			chart: {
				yaxisname: "Number of Queries Reported",
				aligncaptionwithcanvas: "0",
				drawcrossline: "1",
				divlinealpha: "50",
				chartLeftMargin: 20,
				chartRightMargin: 30,
				chartBottomMargin: 10,
				plottooltext: "<b>$dataValue</b> queries reported",
				theme: "fusion",
				palettecolors: "#f3927c",
			},
			data,
		};
		return {
			"type": "bar2d",
			dataSource,
		};
	},
	getIssuesByWeek: () => {
		const rawData = fetch_queries_by_week.data;
		let chartData = {};
		let issueData = {};
		rawData.forEach(item => {
			chartData[moment(item.week).format('Do MMM')] = {
				...chartData[moment(item.week).format('Do MMM')] ?? {},
				[item.type]: item.count,
			}
		});
		const issueTypes = [
			"Feature",
			"Bug",
			"Question",
			"Troubleshooting",
			"Suggestion",
		];
		issueTypes.forEach(t => {
			issueData[t] = Object.keys(chartData).map(d => ({value: chartData[d][t] ?? 0}))
		})
		const category = Object.keys(chartData).map(item => ({ label: item }));
		const queriesData = Object.keys(chartData).map(d => {
			return ({ value: _.sum(Object.keys(chartData[d]).map(t => chartData[d][t])) });
		});
		const dataSource = {
			chart: {
				drawcrossline: "1",
				divlinealpha: "50",
				numdivlines: "3",
				showvalues: "0",
				legenditemfontsize: "15",
				legenditemfontbold: "1",
				plottooltext: "$seriesName: <b>$dataValue</b>",
				theme: "fusion",
				chartLeftMargin: 20,
				chartRightMargin: 30,
				chartBottomMargin: 10,
				labelDisplay: "rotate"
			},
			categories: [
				{
					category,
				}
			],
			dataset: [
				{
					seriesname: "Total Queries",
					data: queriesData,
				},
				...(Object.keys(issueData).map(k => ({
					seriesname: k,
					data: issueData[k],
				}))),
			]
		};
		return {
			"type": "msspline",
			dataSource,
		};
	},
	getChurn: () => {
		let categories = fetch_aforce_churn.data.map(item => ({ label: moment(item.answered_day || item.not_answered_day).format('ddd Do, MMM') }));
		let resolved = fetch_aforce_churn.data.map(item => ({ value: item.answered ?? 0 }));
		let backlog = fetch_aforce_churn.data.map(item => ({ value: item.not_answered ?? 0 }));
		let percentage = fetch_aforce_churn.data.map(item => ({ value: Math.ceil((item.answered) * 100/((item.answered ?? 0) + (item.not_answered ?? 0)))}));
		const dataSource = {
			chart: {
				showBorder: "0",
				borderThickness: "0",
				theme: "fusion",
				plottooltext:
					"$seriesName Queries : <b>$dataValue</b>",
				yaxisname: "Number of Queries",
				syaxisname: "% of Answered Queries",
				snumbersuffix: "%",
				syaxismaxvalue: "100",
				showvalues: "0",
				drawcrossline: "1",
				divlinealpha: "20",
				chartLeftMargin: 40,
				chartRightMargin: 40,
				chartTopMargin: 40,
				chartBottomMargin: 10,
			},
			categories: [
				{
					category: categories
				}
			],
			dataset: [
				{
					dataset: [
						{
							color: ColorsManager.Green,
							seriesname: "Answered",
							data: resolved,
						},
						{
							color: ColorsManager.Red,
							seriesname: "Pending",
							data: backlog,
						}
					]
				}
			],
			lineset: [
				{
					color: "#264653",
					anchorradius: "8",
					anchorbgcolor: "#264653",
					palettecolors: "#264653",
					seriesname: "Answered %",
					linethickness: "3",
					plottooltext:
						"On $label <b>$dataValue</b> queries were answered.",
					data: percentage,
				}
			]
		};
		return {
			"type": "msstackedcolumn2dlinedy",
			dataSource,
		};
	},
}