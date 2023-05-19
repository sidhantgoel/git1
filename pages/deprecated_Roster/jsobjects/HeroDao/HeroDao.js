export default {
	fetchRoster: () => { 
		const thisWeek = moment().startOf("week").add(1, "days");
		const thisWeekEnd = moment(thisWeek).add(6, "days");
		const nextWeek = moment(thisWeek).add(1, "week");
		const nextWeekEnd = moment(nextWeek).add(6, "days");
		const weekAfter = moment(nextWeek).add(1, "week");
		const weekAfterEnd = moment(weekAfter).add(6, "days");
		const weekAfterAfter = moment(weekAfter).add(1, "week");
		const weekAfterAfterEnd = moment(weekAfterAfter).add(6, "days");
		const roster = List1.pageNo === 1 ? {
			[weekAfterAfter.format("YYYY-MM-DD")]: {
				start_date: weekAfterAfter.format("YYYY-MM-DD"),
				end_date: weekAfterAfterEnd.format("YYYY-MM-DD"),				
				week: weekAfterAfter.format("Do MMM") + " - " + weekAfterAfterEnd.format("Do MMM"),
				l1_heroes: {},
				l2_heroes: {}
			},
			[weekAfter.format("YYYY-MM-DD")]: {
				start_date: weekAfter.format("YYYY-MM-DD"),
				end_date: weekAfterEnd.format("YYYY-MM-DD"),				
				week: weekAfter.format("Do MMM") + " - " + weekAfterEnd.format("Do MMM"),
				l1_heroes: {},
				l2_heroes: {}
			},
			[nextWeek.format("YYYY-MM-DD")]: {
				start_date: nextWeek.format("YYYY-MM-DD"),
				end_date: nextWeekEnd.format("YYYY-MM-DD"),
				week: nextWeek.format("Do MMM") + " - " + nextWeekEnd.format("Do MMM"),
				l1_heroes: {},
				l2_heroes: {}
			},
			[thisWeek.format("YYYY-MM-DD")]: {
				start_date: thisWeek.format("YYYY-MM-DD"),
				end_date: thisWeekEnd.format("YYYY-MM-DD"),
				week: "► " + thisWeek.format("Do MMM") + " - " + thisWeekEnd.format("Do MMM"),
				l1_heroes: {},
				l2_heroes: {},
				isCurrentWeek: true
			},
		} : {};
		fetch_hero_roster.data.map((registration) => {
			if (!roster[registration.start_date]) {
				roster[registration.start_date] = {
					start_date: registration.start_date,
					end_date: registration.end_date,
					week: moment(registration.start_date).format("Do MMM") + " - " + moment(registration.end_date).format("Do MMM"),
					l1_heroes: {},
					l2_heroes: {},
				}
			}
			if (registration.email === appsmith.user.email)
				roster[registration.start_date].isRegistered = true;
			if (!registration.pod) {
				registration.pod = Object.keys(roster[registration.start_date].l1_heroes).length;
			}
			if (registration.support_team === "l1") {
				roster[registration.start_date].l1_heroes[registration.pod] = { email: registration.email, pod: registration.pod };
			} else {
				roster[registration.start_date].l2_heroes[registration.pod] = { email: registration.email, pod: registration.pod };
			}
		});
		return Object.keys(roster).sort().reverse().map((date) => {
			return roster[date];
		})
	},
	check: () => {
		return fetch_hero.data[0]
	},
	assignHero: async (team, pod) => {
		if (!fetch_hero.data[0]) {
			await register_hero.run();
		} 
		await fetch_hero.run();
		await assign_hero.run({ team, pod });
		await fetch_hero_roster.run();
		await showAlert('Signup Complete', 'success');
	}, 
	unassignHero: async () => {
		await unassign_hero.run();
		await fetch_hero_roster.run();
	}
}