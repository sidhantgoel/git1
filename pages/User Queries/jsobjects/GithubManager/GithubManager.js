export default {
	searchGithubIssues: () => {
		const searchText = Issue_Form.fieldState?.githubLink?.filterText || '';
		return fetch_github_issues.run({ searchText });
	},
	getGithubIssues: () => {
		let gitIssues = {};
		fetch_github_issues.data.forEach(item => {
			gitIssues[item.id] = {
				label: item.title,
				value: item.id
			};
		});
		fetch_aforce_queries.data.forEach(item => {
			if (item.github_issue_id) {
				gitIssues[item.github_issue_id] = {
					label: item.github_issue_title,
					value: item.github_issue_id
				}
			}
		});
		return Object.keys(gitIssues).map(k => gitIssues[k]).reverse();
	},
	getGithubLabels: () => {
		return fetch_github_labels.data.items.filter((label) => {
			return !label.name.includes('Pod');
		}).map((item) => {
			return { label: item.name, value: item.name  } 
		}); 
	},
	dummy: () => {
		return Issue_Form.fieldState?.labels?.filterText || '';
	},
	searchLabels: (searchText) => {
		const filterText = (searchText ?? this.dummy());
		showAlert("Filtering Labels: " + filterText);
		return fetch_github_labels.run({ filterText });
	}
}