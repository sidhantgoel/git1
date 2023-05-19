export default {
	createDocIssue: async (issue_id) => {
		let createdIssue = await create_github_issue.run();
		let github_num = createdIssue.number;
		insert_linked_github_issues.run(() => { storeValue('new_doc_issue_visible', false, false); return showAlert('Added the issue') }, null, { issue_id, github_num });
	},
	getLabels: () => {
		return Object.keys(fetch_label_config.data.labels).map(k => ({label: k, value: k}));
	},
	getGithubAssignees: () => {
		return fetch_github_assignees.data.map(i => ({ label: i.login, value: i.login }));
	}
}