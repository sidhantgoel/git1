export default {
	getRowData: (row) => ({
    id: (row ? row.id : ""),
    g_id: (row ? row.github_issue_id : ""),
    g_no: (row ? row.issue_number : ""),
    type: (row ? row.type : ""),
    link: (row ? row.link : ""),
    title: (row ? row.title : ""),
    description: (row ? row.description : ""),
    answer: (row ? row.answer : ""),
    author: (row ? row.author : ""),
    labels: (row ? row.labels : ""),
    actions: (row ? row.states : ""),
    upvote_count: (row ? row.upvote_count + '' : ""),
    g_reaction_count: (row ? row.github_reactions_count + '' : ""),
    g_comment_count: (row ? row.github_comments_count + '' : ""),
    priority_status: (row ? row.priority_status : ""),
    created_at: (row ? row.created_at : ""),
    updated_at: (row ? row.updated_at : ""),
		github_issue_title: (row ? row.github_issue_title : "")
  }),
	getAforceIssues: () => fetch_aforce_queries.data.map(qItem => this.getRowData(qItem)),
	getGithubLink: (issueNo) => `https://github.com/appsmithorg/appsmith/issues/${issueNo}`,
	getActionItems: (actionItems) => (actionItems ?? []).map(item => IssueConfigs.actionItems[item]).join(' , '),
	getFormData: () => {
		const isNew = appsmith.store.isNewIssue;
		let formDataObj = this.getRowData();
		if(!isNew) {
      const idx = Aforce_Issue_Table.selectedRow.id;
			const row = fetch_aforce_queries.data.find(q => q.id === idx);
      formDataObj = this.getRowData(row);
		}
		return formDataObj;
	},
	getPlatform: (link) => {
		const github = /github/
		const intercom = /intercom/
		const discord = /discord/
		const forum = /community\.appsmith/
		if(link.search(github) > -1) return 'GITHUB';
		if(link.search(intercom) > -1) return 'INTERCOM';
		if(link.search(discord) > -1) return 'DISCORD';
		if(link.search(forum) > -1) return 'APPSMITH_FORUM';
		return 'OTHERS'
	},
	getUpvotesForSelectedIssue: () => {
		const upvotes = fetch_aforce_issue_upvotes.data;
		const votesList = upvotes.map(item => {
			const { link, comment, author, created_at, comm_status, id } = item;
			return {
				id,
				platform: IssueConfigs.platforms[this.getPlatform(link)],
				link,
				comment,
				author: author.split('@')[0],
				created_at: moment(created_at).format('Do MMM YY'),
				comm_status
			};
		})
		return votesList;
	},
	getCommentsForSelectedIssue: () => {
		const comments = fetch_aforce_issue_comments.data;
		return (Array.isArray(comments) ? comments : []).map(c => {
			const {comment, author, created_at, id} = c;
			return {
				id,
				comment,
				author: author.split('@')[0],
				created_at: moment(created_at).format('Do MMM YY',)
			}
		});
	}
}