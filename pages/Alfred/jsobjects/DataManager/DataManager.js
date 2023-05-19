export default {
	assignment: {
		"App Viewers Pod": '',
		"BE Coders Pod": '',
		"FE Coders Pod": '',
		"New Developers Pod": '',
		"Team Managers Pod": '',
		"UI Builders Pod": '',
	},
	format: (val) => val.format('YYYY-MM-DD'),
	getWeeks: () => {
		let dates = [];
		let counter = {};
		const startWeek = moment(date_start.selectedDate).startOf("week").add(1, "days");
		const endStartWeek = moment(startWeek).add(6, "days");
		const selectedEnd = this.format(moment(date_end.selectedDate));
		for (let i = 0; i < 10; i++) {
			let start = moment(startWeek);
			start = this.format(start.add(i * 7, "days"))
			let end = moment(endStartWeek);
			end = this.format(end.add(i * 7, "days"));
			if (end > selectedEnd) {
				break;
			}
			let temp = {
				"start": start,
				"end": end,
			};
			dates.push(temp);
		}
		return dates;
	},
	getL2AssignmentsQueue: () => {
		const podData = {};
		L2_Assignments_Queue.data.forEach(i => {
			let ps = podData[i.pod] || [];
			podData[i.pod] = [...ps, i];
		});
		let weeks = this.getWeeks();
		return weeks.map((w, idx) => {
			let weekly = {};
			Config.pods.forEach(p => {
				weekly[p] = podData[p][idx % podData[p].length]
			})
			return ({
				...w,
				...weekly,
			})
		})
		
	},
	getL2Engineers: () => {
		return L2_Engineers.data;
	}
}