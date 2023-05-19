export default {
	podSlackIds : {
		"FE Coders Pod": "S03FQU20P97",
		"BE Coders Pod": "S03EXKHTUSK",
		"New Developers Pod": "S03FBSS7X2N",
		"UI Builders Pod": "S03F5LEAPCN",
		"Team Managers Pod": "S03FC9AA9HQ",
		"App Viewers Pod": "S03FC9LENFL",
	},

	RegisterAsHero: (start, end, pod, team) => {
		let currentHero = validate_appsmith_team.data[0];
		register_as_hero.run(() => {
			fetch_roster.run();
			showAlert('Registered Successfully!');
		}, () => {
			showAlert('Failed to register');
		}, {
			id: currentHero.id,
			start_date: start,
			end_date: end,
			team,
			pod,
		});
	},
	register_as_l1: (start, end, pod) => {
		this.RegisterAsHero(start, end, pod, "l1");
	},
	register_as_l2: (start, end, pod) => {
		this.RegisterAsHero(start, end, pod, "l2");
	},
	UnregisterHero: (id) => {
		unregister_as_hero.run(() => {
			showAlert('Successfully unregister!!');
			fetch_roster.run();
		}, (e) => {
			showAlert('Failed to unregister!');
		}, { id: id });
	},
	dummy: async (id) => {
		await showAlert("asdf " + id);
	},
	createL2Assignment: (data) => {
		// hero_id, start_date, end_date, support_team, pod
		return register_as_l2.run(() => {showAlert('Success'); fetch_roster.run();
																		 closeModal('Modal1');}, () => {showAlert('Failed to add new assignment')}, {
			hero_id: data.hero_id, start_date: data.current.start, end_date: data.current.end, support_team: "l2", pod: data.current.user.pod
		});
	},
	updateL2Assignment: (data) => {
		const hero_id = data.hero_id;
		const id = data.current.user.id;
		if (!!id) {
			update_l2_assignment.run(() => {
				showAlert('Successfully Updated New Assignment');
				fetch_roster.run();
				closeModal('Modal1');
			}, () => {
				showAlert('Failed to update the assignment');
			}, { hero_id, id });
		} else {
			this.createL2Assignment(data);
		}
	},

	updateSlackGroups: async() => {
		const rosterData = await fetch_roster.run();
		rosterData
			.filter(user => user.support_team === 'l2' && user.start_date === moment().startOf("week").add(1, "days").format("YYYY-MM-DD"))
			.forEach((user) => {
			if (user.slack_id) {
				const podSlackID = this.podSlackIds[user.pod];
				UpdateUserGroup.run({ usergroup: podSlackID, users: user.slack_id })
			}
		})
	}
}