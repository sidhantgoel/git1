export default {
	fetch_additional_info: async () => {
		let git_issues = await fetch_associated_git_issues.run({ id: Aforce_Issue_Table.selectedRow.id });
		let githubDetails = [];
		for(let i = 0; i < git_issues.length; i++) {
			let tempData = await fetch_github_issue_by_num.run({ num: git_issues[i].num });
			githubDetails.push(tempData);
		}
		await storeValue('currentIssueAdditionalInfo', githubDetails, false);
	},
	upsert: async (isNew=false) => {
		await storeValue('isNewIssue', !!isNew, false);
		await storeValue('isIssueDetails', true, false);
		await storeValue('isCommentIssue', !isNew, false);
		await storeValue('isUpvoteIssue', !isNew, false);
		await showModal('IssueDetailsModal');
		fetch_aforce_issue_upvotes.run();
		fetch_aforce_issue_comments.run();
		if (!isNew) {
			await this.fetch_additional_info();
		}
	},
	upvote: async () => {
		fetch_aforce_issue_upvotes.run();
		await storeValue('isUpvoteIssue', true, false);
		await showModal('IssueDetailsModal');
	},
	comment: async () => {
		fetch_aforce_issue_comments.run();
		await storeValue('isCommentIssue', true, false);
		await showModal('IssueDetailsModal');
	},
	closeDetailsModal: async () => {
		resetWidget("IssueDetailsModal", true);
		storeValue('isIssueDetails', false, false);
		storeValue('isNewIssue', false, false);
		storeValue('isCommentIssue', false, false);
		storeValue('isUpvoteIssue', false, false);
	},
	mergeIssues: async(parent_id, child_id) => {
		showAlert(`parent: ${parent_id}, child: ${child_id}`);
		try {
			await merge_reassign_upvotes2parent.run({parent_id, child_id});
			showAlert('Reassigned Upvotes');
			await merge_delete_merged_issue.run({child_id});
			showAlert('Merge Finished');
			closeModal('IssueDetailsModal');
			fetch_aforce_queries.run();
		} catch {
			showAlert("Couldn't merge the issues");
		}
	},
	dummy: async (isNew=false) => {
		if (!isNew) {
			await this.fetch_additional_info();
		}
	}
}