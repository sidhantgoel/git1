export default {
	sort: () => {
		const sortBy = SortMethodInput.selectedOptionValue;
		let sortOptions = '';
		switch(sortBy) {
			case "GITHUB":
				sortOptions = "github_reactions_count desc, github_comments_count desc, upvote_count desc";
				break;
			case "VOTES":
				sortOptions = "upvote_count desc, github_comments_count desc, github_reactions_count desc";
				break;
			case "COMMENTORS":
				sortOptions = "github_comments_count desc, github_reactions_count desc, upvote_count desc";
				break;
			case "RECENT":
				sortOptions = "updated_at desc";
				break;
			default:
				return '';
		}
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
		const notDeleted = `global_issues.state != 'DELETED'`;
		const search = Aforce_Issue_Table.searchText && Aforce_Issue_Table.searchText.length > 0 ? `
				and (global_issues.title ilike '%${Aforce_Issue_Table.searchText}%'
						or global_issues.description ilike '%${Aforce_Issue_Table.searchText}%')
		` : '';

		const podFilter = FilterInput_Pod.selectedOptionValue && FilterInput_Pod.selectedOptionValue !== "All" ? `
				and '${FilterInput_Pod.selectedOptionValue}' = ANY(global_issues.labels)
		` : '';

		const typeFilter = FilterInput_Type.selectedOptionValues && FilterInput_Type.selectedOptionValues.length > 0 && FilterInput_Type.selectedOptionValues !== "All" ? `
				and global_issues.type IN ('${FilterInput_Type.selectedOptionValues.join("','")}')
		` : '';

		const actionItemFilter = FilterInput_Actions.selectedOptionValues && FilterInput_Actions.selectedOptionValues.length  > 0 ? `
				and (${FilterInput_Actions.selectedOptionValues.map(option => `'${option}' = ANY(global_issues.states)`).join(' or ')})
		` : ''
		const dateRange = this.getDateFilter();
		return 'WHERE ' + dateRange + notDeleted + typeFilter + podFilter + actionItemFilter + search;
	},
}