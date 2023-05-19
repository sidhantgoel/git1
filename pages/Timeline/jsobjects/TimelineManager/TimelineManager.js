export default {
	getTimelineData: () => {
		let timelineData = fetch_timeline.data;
		let votes = fetch_timeline_votes.data;
		return timelineData.map(data => ({
			...data,
			upvote_count: votes.find(item => item.id === data.issue_id)?.count,
		}));
	},
	getMyTimelineData: () => {
		let timelineData = fetch_my_timeline.data;
		let votes = fetch_timeline_votes.data;
		return timelineData.map(data => ({
			...data,
			upvote_count: votes.find(item => item.id === data.issue_id)?.count,
		}));
	},
	getData: () => {
		if (TypeFilter.selectedOptionValue === 'MY_TIMELINE') {
			return this.getMyTimelineData();
		} else {
			return this.getTimelineData();
		}
	},
	refreshData: async() => {
		if (TypeFilter.selectedOptionValue === 'MY_TIMELINE') {
				await fetch_my_timeline.run();
				await fetch_my_timeline_votes.run();
		} else {
				await fetch_timeline.run();
				await fetch_timeline_votes.run();
		}

	},
	showTimelineDetails: async () => {
		await storeValue('timelineIndex', Aforce_Timeline_Table.selectedRowIndex, false);
		await resetWidget('DetailsForm');
		await showModal('IssueDetailsModal');
	},
	showNextIssue: () => {
		storeValue('timelineIndex', appsmith.store.timelineIndex + 1, false);
	},
	showPreviousIssue: () => {
		storeValue('timelineIndex', appsmith.store.timelineIndex - 1, false);
	},
	resetTimelineDetails: () => {
		storeValue('timelineIndex', 0, false);
		resetWidget('DetailsForm');
	},
	getCurrentTimelineDetails: () => {
		return this.getData()[appsmith.store.timelineIndex];
	},
	dummy: () => {
		let timelineData = fetch_timeline.data;
		let votes = fetch_timeline_votes.data;
		try {
			return timelineData.map(data => ({
			...data,
			upvote_count: votes.find(item => item.id === data.issue_id)?.count || 0,
		}));
		} catch (e) {
			showAlert('Error');
			return e;
		}
	}
}