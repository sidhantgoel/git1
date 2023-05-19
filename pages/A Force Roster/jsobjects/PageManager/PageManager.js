export default {
	update_l2_assignments: (data) => {
		storeValue('currentUpdate', data, false);
		showModal('Modal1');
	},
	L2Option: () => {
		return fetch_appsmith_team.data.map(item => ({
			label: item.name + ', ' + item.email + ` (${item.pod})`,
			value: item.id,
		}))
	}
}