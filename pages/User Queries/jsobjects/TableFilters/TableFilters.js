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
	filter: () => {
		const notDeleted = `global_issues.state != 'DELETED'`;
		const search = Aforce_Issue_Table.searchText && Aforce_Issue_Table.searchText.length > 0 ? `
				and (global_issues.title ilike '%${Aforce_Issue_Table.searchText}%'
						or global_issues.description ilike '%${Aforce_Issue_Table.searchText}%')
		` : '';

		const podFilter = FilterInput_Pod.selectedOptionValue && FilterInput_Pod.selectedOptionValue !== "All" ? `
				and '${FilterInput_Pod.selectedOptionValue}' = ANY(global_issues.labels)
		` : '';

		const typeFilter = FilterInput_Type.selectedOptionValue && FilterInput_Type.selectedOptionValue !== "All" ? `
				and global_issues.type = '${FilterInput_Type.selectedOptionValue}'
		` : '';

		const actionItemFilter = FilterInput_Actions.selectedOptionValues && FilterInput_Actions.selectedOptionValues.length  > 0 ? `
				and (${FilterInput_Actions.selectedOptionValues.map(option => `'${option}' = ANY(global_issues.states)`).join(' or ')})
		` : ''
		return 'WHERE ' + notDeleted + typeFilter + podFilter + actionItemFilter + search;
	}
}