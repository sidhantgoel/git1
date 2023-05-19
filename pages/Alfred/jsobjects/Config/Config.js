export default {
	pods: [
		"New Developers Pod",
		"Team Managers Pod",
		"BE Coders Pod",
		"FE Coders Pod",
		"App Viewers Pod",
		"UI Builders Pod"
	],
	getMembersByPod: () => {
		let podToMembers = {};
		this.pods.forEach(item => {
			podToMembers[item] = fetch_appsmith_team.data.filter(mem => mem.pod === item);
		});
		return podToMembers;
	}
}