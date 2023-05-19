export default {
	getQuarters: () => {
		let firstQuarter = moment("2021-01-01");
		const numMonths = moment().diff(firstQuarter, "months");
		const numQuarters = Math.ceil(numMonths/3);
		const options = [];
		for(let i = 0 ; i < numQuarters; i++) {
			const firstMonth = firstQuarter.format("MMM YY");
			const firstDate = firstQuarter.toISOString();
			const lastMonth = firstQuarter.add(2, "months").format("MMM YY");
			options.push({
				label: firstMonth + " - " + lastMonth,
				value: firstDate
			});
			firstQuarter = firstQuarter.add(1, "months");
		}
		return options.reverse();
	},
	csvToArrs: () => {
		const csvRows = FilePicker1.files[0].data.split("\n");
		const objArr = [];
		const headers = csvRows[0].split(',');
			for(let i = 1; i < csvRows.length; i++) {
				const rowObj = {};
				objArr.push(rowObj);
				const rowArr = csvRows[i].split(',');
				rowArr.forEach((val, index) => {
				rowObj[headers[index]] = val;
				});
			}
		const map = {};
		objArr.map((row) => {
			if (row.ForceCommander)
				map[row.ForceCommander.toLowerCase()] = {...row, email: row.ForceCommander.toLowerCase()};
			if (row["ForceHero\r"])
				map[row["ForceHero\r"].toLowerCase().replace("\r","")] = {...row, email: row["ForceHero\r"].toLowerCase().replace("\r","")};
		});
		return Object.values(map);
	},
	populateId: () => {
		const csvRows = FilePicker1.files[0].data.split("\n");
		const objArr = [];
		const headers = csvRows[0].split(',');
			for(let i = 1; i < csvRows.length; i++) {
				const rowObj = {};
				objArr.push(rowObj);
				const rowArr = csvRows[i].split(',');
				rowArr.forEach((val, index) => {
				rowObj[headers[index]] = val;
				});
			}
		const finalrows = [];
		objArr.map((row) => {
			const hero_id = Query1.data.find((hero) => hero.email === row["ForceHero\r"].toLowerCase().replace("\r",""))?.id;
			const comm_id = Query1.data.find((hero) => hero.email === row["ForceCommander"].toLowerCase())?.id;
			finalrows.push({
				...row, hero_id: hero_id
			});
			finalrows.push({
				...row, hero_id: comm_id
			});
		});
		return finalrows.filter((row) => row.hero_id !== undefined);
	}
}