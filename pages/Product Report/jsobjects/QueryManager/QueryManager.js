export default {
	upsertIssues: async() => {
		try {
			let issueForm = Issue_Form.formData;
			let successMsg = 'Created new issue';
			const { labels } = issueForm;
			issueForm = {
				...issueForm,
				labels: LabelManager.getAssignedLabels(labels),
			};
			if (appsmith.store.isNewIssue) {
				const { link, description } = issueForm;
				await insert_aforce_issue.run({ ...issueForm });
				let issueData = await fetch_latest_aforce_issue.run();
				const issue_id = issueData[0].id;
				await insert_aforce_issue_upvote.run({ upvote_link: link, upvote_comment: description, issue_id });
			} else {
				await update_aforce_issue.run({ ...issueForm });
				successMsg = 'Updated issue';
			}
			await showAlert(successMsg);
			await fetch_aforce_queries.run();
		} catch (e) {
			await showAlert("Error: Couldn't create new issue");
		} finally {
			await closeModal('IssueDetailsModal');
		}
	},
	upsertUpvote: async() => {
		try {
			const upvoteForm = Issue_Upvote_Form.formData;
			const { upvote_link, upvote_comment, issue_labels } = upvoteForm;
			const issue_id = Aforce_Issue_Table.selectedRow.id;
			await insert_aforce_issue_upvote.run({ upvote_link, upvote_comment, issue_id });
			await update_aforce_issue_labels.run({ issue_labels, issue_id });
			await showAlert("Upvoted the issue");
			fetch_aforce_queries.run();
		} catch (e) {
			await showAlert("Error: Couldn't upvote the issue");
		} finally {
			await closeModal('IssueDetailsModal');
		}
	},
	deleteUpvote: async(id) => {
		try {
			await delete_aforce_issue_upvote.run({ id });
			await showAlert("Deleted: Upvote " + id);
			await fetch_aforce_issue_upvotes.run();
		} catch (e) {
			showAlert(JSON.stringify(e))
		}
	},
	insertComment: async() => {
		try {
			const commentForm = Issue_Comment_Form.formData;
			const { comment, priorityStatus } = commentForm;
			const issue_id = Aforce_Issue_Table.selectedRow.id;
			await insert_aforce_issue_comment.run({ comment, issue_id });
			await update_aforce_issue_priority.run({ priorityStatus, issue_id });
			await showAlert("Commented on the issue");
			fetch_aforce_queries.run();
		} catch (e) {
			await showAlert("Error: Couldn't comment on the issue");
		} finally {
			await closeModal('IssueDetailsModal');
		}
	},
	deleteComment: async(id) => {
		try {
			await delete_aforce_issue_comment.run({ id });
			await showAlert("Deleted: comment " + id);
			await fetch_aforce_issue_comments.run();
		} catch (e) {
			showAlert(JSON.stringify(e))
		}
	},
	dummy: async () => {
		let data = await fetch_latest_aforce_issue.run();
		return data[0].id;
	},
	deleteAforceIssue: async(id) => {
		try {
			await delete_aforce_issue_all_upvote.run({id});
			await delete_aforce_issue.run({id});
			fetch_aforce_queries.run();
			closeModal('IssueDetailsModal');
		} catch (e) {
			showAlert('Failed to delete issues/upvotes');
		}
	},
}