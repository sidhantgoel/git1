export default {
	tabs: [
		'Details',
		'Upvote',
		'PM Comments',
		'New Upvote',
		'New Comment'
	],
	getActiveTab: () => {
		if (appsmith.store.isIssueDetails) return 'Details';
		if (appsmith.store.isUpvoteIssue) return 'New Upvote';
		return 'New Comment';
	}
}