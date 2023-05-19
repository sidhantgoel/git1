export default {
	TempHeros: () => {
		const selectedRows = TableL2AssignmentQueue.selectedRows;
		let all = [];
		selectedRows.forEach((each_row, idx) => {
			let currentL2s = Config.pods.map(pod => each_row[pod]);
			let { start, end } = each_row;
			let team = "l2"
			currentL2s.forEach((each_l2) => {
				let entry = `(${each_l2.id}, '${start}', '${end}', '${team}', '${each_l2.pod}')`;
				all.push(entry);
			})
		});
		return all.join(',\n');
	}
}