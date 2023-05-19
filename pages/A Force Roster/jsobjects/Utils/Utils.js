export default {
	format: (val) => val.format('YYYY-MM-DD'),
	getWeeks: () => {
		let dates = [];
		const startWeek = moment().startOf("week").add(1, "days");
		const endStartWeek = moment(startWeek).add(6, "days");
		for (let i = 0; i < 10; i++) {
			let start = moment(startWeek);
			let end = moment(endStartWeek);
			let temp = {
				"start": this.format(start.add(i * 7, "days")),
				"end": this.format(end.add(i * 7, "days")),
			};
			dates.push(temp);
		}
		return dates;
	},
	getWeeklyTeam: () => {
		let weeks = this.getWeeks();
		let rosterData = [];
		debugger;
		weeks.forEach(w => {
			let weekly = {
				start: w.start,
				end: w.end,
				data: {
					l1: {},
					l2: {}
				},
			};
			fetch_roster.data.filter(item => item.start_date === w.start).forEach(i => {
				weekly.data[i.support_team][i.pod] = {
					pod: i.pod,
					name: i.name,
					email: i.email,
					team: i.support_team,
					id: i.id,
				};
			});
			rosterData.push(weekly);
		});
		return rosterData;
	},
	
	testSlackGroup: () => {
		const userObj = {
			"id": 513,
			"start_date": "2022-08-08",
			"hero_id": 28,
			"end_date": "2022-08-14",
			"support_team": "l2",
			"pod": "FE Coders Pod",
			"name": "Rimil",
			"email": "rimil@appsmith.com",
			"slack_id": "U037MMXNQ00"
		}
		const podSlackID = PodSlackConstants[userObj.pod?.toUpperCase()?.replace(" ", "_")]?.pod_slack_id;
		return podSlackID;
	}
}