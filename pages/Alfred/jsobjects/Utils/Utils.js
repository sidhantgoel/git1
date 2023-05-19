export default {
	format: (val) => val.format('YYYY-MM-DD'),
	members: () => {
		let data = {};
		Config.pods.forEach(pod => {
			data[pod] = fetch_appsmith_team.data.filter(item => item.pod === pod);
		});
		return data;
	},
	getWeeks: () => {
		let dates = [];
		let counter = {};
		Config.pods.forEach(pod => {
			counter[pod] = 0;
		});
		let members = this.members();
		const startWeek = moment('2022-05-16').startOf("week").add(1, "days");
		const endStartWeek = moment(startWeek).add(6, "days");
		for (let i = 1; i < 11; i++) {
			let start = moment(startWeek);
			let end = moment(endStartWeek);
			let temp = {
				"sr. no.": i * 7,
				"start": this.format(start.add(i * 7, "days")),
				"end": this.format(end.add(i * 7, "days")),
			};
			Config.pods.forEach(pod => {
				let idx = counter[pod];
				let podMembers = members[pod];
				let max = podMembers.length - 1;
				// temp[pod] = podMembers[idx];
				temp[pod] = podMembers[idx].name + ", " + podMembers[idx].id;
				counter[pod] = idx < max ? idx + 1 : 0;
			})
			dates.push(temp);
		}
		return dates;
	},
	dummy: () => {
		return moment().startOf("week").add(1, "days");
	}
}