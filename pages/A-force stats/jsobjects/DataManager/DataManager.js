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
	getAforceIssues: () => {
		//fetch_aforce_queries.data.map(qItem => this.getRowData(qItem))
	},
}