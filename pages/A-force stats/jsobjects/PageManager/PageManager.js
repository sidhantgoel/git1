export default {
	refetchData: () => {
		fetch_aforce_vitals.run();
		fetch_aforce_churn.run();
		fetch_queries_by_author.run();
		fetch_queries_by_channels.run();
		fetch_queries_by_type.run();
		fetch_queries_count.run();
		fetch_queries_by_added2forum.run();
		fetch_queries_by_pods.run();
	},
	refreshPage: async () => {
		await resetWidget('date_From');
		await resetWidget('date_To');
		this.refetchData();
	}
}