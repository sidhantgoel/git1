export default {
	getAbs: (date) => moment(date).hours(0).minutes(0).seconds(0).milliseconds(0).format('YYYY-MM-DD HH:mm:ss'),
	getTo: () => this.getAbs(date_To.selectedDate),
	getFrom: () => this.getAbs(date_From.selectedDate),
	getDateRangeFilter: (column) => {
		const to = this.getTo();
		const from = this.getFrom();
		return `${column} >= '${from}' AND ${column} <= '${to}' `;
	},
	getStatusFilter: (column, isBacklog=false) => {
		return `${column} ${isBacklog ? "" : "NOT"} IN ('Idle','🦸‍♀️ ⌛️','Dev Inprogress')`;
	},
	getBacklogStatusFilter: (column) => this.getStatusFilter(column, true),
	getResolvedStatusFilter: (column) => this.getStatusFilter(column, false),
}