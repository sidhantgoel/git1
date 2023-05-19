export default {
	InsertUpdate: async () => {
		if (appsmith.store.toUpdate) {
			UpdateData.run(() => SelectQuery.run().then(() => closeModal('Insert_Modal')),
										(error) => showAlert(`Error while updating resource!\n ${error}`,'error'))
		} else {
			InsertQuery.run(
				() => SelectQuery.run().then(() => closeModal('Insert_Modal')), 
				(error) => showAlert(`Error while inserting resource!\n ${error}`,'error')
			)
		}
		storeValue('toUpdate',false, false);
	}
}