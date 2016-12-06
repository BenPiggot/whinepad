import CRUDStore from './CRUDStore';
import { List } from 'immutable';

const CRUDActions = {
	create(newRecord) {
		CRUDStore.setData(CRUDStore.getData().unshift(newRecord), true);
	},

	delete(recordId) {
		let data = CRUDStore.getData();
		CRUDStore.setData(data.remove(recordId), true);
	},

	updateRecord(recordId, newRecord) {
		CRUDStore.setData(CRUDStore.getData().set(recordId, newRecord), true);
	},

	updateField(recordId, key, value) {
		let record = CRUDStore.getData().get(recordId);
		record[key] = value;
		CRUDStore.setData(CRUDStore.getData().set(recordId, record), true);
	},

	_preSearchData: null,

	startSearching() {
		this._preSearchData = CRUDStore.getData();
	},

	search(e) {
		const needle = e.target.value.toLowerCase();
		if (!needle) {
			CRUDStore.setData(this._preSearchData);
			return;
		}

		const fields = CRUDStore.getSchema().map(item => item.id);
		if (!this._preSearchData) {
			return;
		}

		const searchData = this._preSearchData.filter(row => {
			for (let f = 0; f < fields.length; f++) {
				if (row[fields[f]].toString().toLowerCase().indexOf(needle) > -1) {
					return true;
				}
			}
			return false;
		});
		CRUDStore.setData(searchData, false)
	},

	_sortCallback(a, b, descending) {
		let res = 0;
		if (typeof a === 'number' && typeof b === 'number') {
			res = a - b;
		} else {
			res = String(a).localeCompare(String(b));
		}
		return descending ? -1 * res : res;
	},

	sort(key, descending) {
		CRUDStore.setData(CRUDStore.getData().sort(
			(a, b) => this._sortCallback(a[key], b[key], descending)
		));
	},

	_addNew(action) {
		this.setState({addnew: false});
		if (action === 'confirm') {
			CRUDActions.create(this.refs.form.getData());
		}
	}
};

export default CRUDActions