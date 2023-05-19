export default {
	saveUpvote: async () => {
		await this.updateAforceIssue();
		await this.updateAforceIssueUpvote();
		resetWidget('DetailsForm');
		TimelineManager.refreshData();
	},
	updateAforceIssue: async () => {
		const {answer, actionitems, type, title} = DetailsForm.formData;
		const {issue_id} = DetailsForm.sourceData;
		try {
			await update_aforce_issue.run({answer, actions: actionitems, type, title, id: issue_id});
			showAlert('Issue Updated');
		} catch {
			showAlert("Couldn't update issue");
		}
	},
	updateAforceIssueUpvote: async () => {
		const {comm_status, comment, link} = DetailsForm.formData;
		const {id} = DetailsForm.sourceData;
		try {
			await update_aforce_issue_upvote.run({comm_status, comment, link, id});
			showAlert('Upvote Updated');
		} catch {
			showAlert("Couldn't update upvote data");
		}
	},
	getTimeLineCondition: () => {
		const searchText = Aforce_Timeline_Table.searchText;
		const searchCondition = `(issues.title ilike '%${searchText}%' or upvote.comment ilike '%${searchText}%')`;
		let statusCondition = '';
		if (TypeFilter.selectedOptionValue === 'A_FORCE') {
			statusCondition = ` AND comm_status IN ('Idle','New','🦸‍♀️ ⌛️','Dev Inprogress','None')`;
		} else if (TypeFilter.selectedOptionValue === 'BACKLOG') {
			statusCondition = ` AND comm_status IN ('Idle','New','🤷‍♀️ ⌛️','🦸‍♀️ ⌛️','Dev Inprogress','None')`;
		}
		const podFilter = FilterInput_Pod.selectedOptionValue && FilterInput_Pod.selectedOptionValue !== "All" ? `
				and '${FilterInput_Pod.selectedOptionValue}' = ANY(issues.labels)
		` : '';
		const channelSelected = filter_by_channel.selectedOptionValue.toLowerCase();
		const channelFilter = filter_by_channel.selectedOptionValue && filter_by_channel.selectedOptionValue !== "ALL" ? `
				and upvote.link ilike '%${channelSelected}%'
		` : '';
		return 'WHERE ' + searchCondition + statusCondition + podFilter + channelFilter;
		//return statusCondition;
	},
	getSearchedIssues: () => {
		return fetch_searched_issues.data.map(item => ({
			label: (item.github_issue_id ? '[GIT] <=> ' : '') + item.title,
			value: item.id,
		}));
	},
	mergeIntoIssue: async (parent_id, child_id) => {
		showAlert(`parent: ${parent_id}, child: ${child_id}`);
		try {
			await merge_reassign_upvotes2parent.run({parent_id, child_id});
			showAlert('Reassigned Upvotes');
			await merge_delete_merged_issue.run({child_id});
			showAlert('Merge Finished');
			TimelineManager.refreshData();
		} catch {
			showAlert("Couldn't merge the issues");
		}
	}
}