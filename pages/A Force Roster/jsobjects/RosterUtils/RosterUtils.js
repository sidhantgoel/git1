export default {
	getL1: (weekly) => {
		let L1Data = {};
		let currentL1 = weekly.data.l1;
		Config.l1Functions.forEach(c => {
			L1Data[c] = {
				id : currentL1[c]?.id,
				name: currentL1[c] ? (currentL1[c].name + ', ' + currentL1[c].email) : 'Register',
				pod: currentL1[c] ? currentL1[c].pod : c,
				email: currentL1[c] ? currentL1[c].email : '',
				isDisabled: !!currentL1[c],
				isCurrentUser: currentL1[c]?.email === appsmith.user.email || appsmith.user.email === 'pranav@appsmith.com'
			};
		});
		return L1Data;
	},
	getL2: (weekly) => {
		let L2Data = {};
		let currentL2 = weekly.data.l2;
		Config.pods.forEach(c => {
			L2Data[c] = {
				id : currentL2[c]?.id,
				name: currentL2[c] ? (currentL2[c].name + ', ' + currentL2[c].email) : 'Unassigned',
				pod: currentL2[c] ? currentL2[c].pod : c,
				email: currentL2[c] ? currentL2[c].email : '',
				isDisabled: false,
				isCurrentUser: currentL2[c]?.email === appsmith.user.email
			};
		});
		return L2Data;
	}
}