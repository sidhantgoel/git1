export default {
	upsert: () => {
		return (this.isUpdate() ? update_app : create_new_app).run()
			.then(async () => {
				const id = await ForkHelper.getAppId(upsert_link.text);
				make_forkable.run({ id });
				fetch_sample_apps.run();
				closeModal('Upsert_Modal');
				resetWidget('Upsert_Modal');
			})
			.catch(() => {
				showAlert('Error while creating/updating app!','error');
			});
	},
	upsertApp: (isNew) => {
		storeValue('isUpdateApp', !isNew, false);
		showModal('Upsert_Modal');
	},
	isUpdate: () => appsmith.store.isUpdateApp,
}