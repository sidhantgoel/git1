export default {
	upsert: async (isNew=false) => {
		await storeValue('isNewIssue', !!isNew, false);
		await storeValue('isIssueDetails', true, false);
		await storeValue('isCommentIssue', !isNew, false);
		await storeValue('isUpvoteIssue', !isNew, false);
		await showModal('IssueDetailsModal');
		fetch_aforce_issue_upvotes.run();
		fetch_aforce_issue_comments.run();
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
}