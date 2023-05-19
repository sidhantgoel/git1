export default {
	dateFormat: (date) => !!date ? moment(date).format("Do MMM YY") : date,
	getIssues: () => {
		return fetch_support_issues.data.items.map(item => ({
			"Number": item.number,
			"URL": item.html_url,
			"Title": item.title,
			"Author": item.user?.login,
			"Labels": item.labels.map(item => item.name).join(", "),
			"Assignee": item.assignee?.login,
			"State": item.state,
			"Created At": this.dateFormat(item.created_at),
			"Updated At": this.dateFormat(item.updated_at),
			"Closed At": this.dateFormat(item.closed_at),
		}));
	},
	dummy: () => {
		return fetch_support_issues.data.map(item => {
			return item;
		});
	}
}