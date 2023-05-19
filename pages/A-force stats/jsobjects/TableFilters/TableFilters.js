export default {
	/*
	sort: () => {
		const sortOptions = "upvote_count desc, github_comments_count desc, github_reactions_count desc";
		return `ORDER BY ` + sortOptions;
	},
	paginate: () => {
		const offset = (Aforce_Issue_Table.pageNo - 1) * Aforce_Issue_Table.pageSize;
		const limit = Aforce_Issue_Table.pageSize;
		return `OFFSET ${offset} LIMIT ${limit}`;
	},
	getAbsoluteDates: (count, timeline) => moment().subtract(count, timeline).hours(0).minutes(0).seconds(0).milliseconds(0).format('YYYY-MM-DD HH:mm:ss'),
	getDateFilter: () => {
		//moment().format('YYYY-MM-DD HH:mm:ss')
		const filterValue = timeline_selectInput.selectedOptionValue;
		let dateValue = '';
		switch (filterValue) {
			case 'All':
				return '';
			case 'Last Week':
				dateValue = this.getAbsoluteDates(6, 'days');
				break;
			case 'Last Month':
				dateValue = this.getAbsoluteDates(1, 'months');
				break;
			case 'Last 3 Months':
				dateValue = this.getAbsoluteDates(3, 'months');
				break;
			case 'Last 6 Months':
				dateValue = this.getAbsoluteDates(6, 'months');
				break;
			case 'Last Year':
				dateValue = this.getAbsoluteDates(1, 'years');
				break;
			default:
				return '';
		}
		return `aforce_issue_upvote.created_at >= '${dateValue}' and `;
	},
	filter: () => {
		const notDeleted = `global_issues.state != 'DELETED' AND global_issues.type != 'Feature'`;
		const search = Aforce_Issue_Table.searchText && Aforce_Issue_Table.searchText.length > 0 ? `
				and (global_issues.title ilike '%${Aforce_Issue_Table.searchText}%'
						or global_issues.description ilike '%${Aforce_Issue_Table.searchText}%')
		` : '';
		const podFilter = pod_selectInput.selectedOptionValue && pod_selectInput.selectedOptionValue !== "All" ? `
				and '${pod_selectInput.selectedOptionValue}' = ANY(global_issues.labels)
		` : '';
		const dateRange = this.getDateFilter();
		return 'WHERE ' + dateRange + notDeleted + podFilter + search;
	}
	*/
}