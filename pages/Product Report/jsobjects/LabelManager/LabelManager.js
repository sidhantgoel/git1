export default {
	getPodLabels: () => {
			return Object.keys(fetch_label_config.data.runners[0].issue.labels)
					.map((pod) => { 
							return {
									label: pod,
									value: pod
							}
					});
	},
	checkIsPod: (label) => {
			return fetch_label_config.data.runners[0].issue.labels[label] !== undefined
	},
	getConfig: () => {
			return fetch_label_config.data;
	},
	getPodForLabel: (label = "New JS Function") => {
			const labels = fetch_label_config.data.runners[0].issue.labels;
			const pods = this.getPodLabels().map((pod) => pod.label);
			let foundPod;
			pods.map((podLabel) => {
					const foundLabel = labels[podLabel].conditions.find((condition) => {
							return condition.label === label && podLabel !== label
					})
					if (foundLabel) {
							foundPod = podLabel
					}
			});
			return foundPod;
	},
	getLabelsForPod: (pod = "App Viewers Pod") => {
			return fetch_label_config.data.runners[0]
					.issue.labels[pod].conditions.map((label) => 
									fetch_label_config.data.labels[label.label])
					.filter((label) => label !== undefined)
	},
	getAssignedLabels: (allLabels) => {
			const labels = allLabels.filter((label) => {
					return this.checkIsPod(label) !== true;
			}); 
			const podMap = {};
			labels.map((label) => {
					const pod = this.getPodForLabel(label);
					if (pod)
							podMap[pod] = true;
			});
			return [...Object.keys(podMap), ...labels];
	},
	bulkUpdateLabels: () => {
		let records = fetch_unlabbeled_queries.data;
		records.forEach(async (item) => {
			await update_unlabbeled_queries.run({ id: item.id, labels: this.getAssignedLabels(item.labels) });
		})
	},
	getLabels: () => {
		return Object.keys(fetch_label_config.data.labels).map(l => ({ label: l, value: l }));
	}
}