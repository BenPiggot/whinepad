'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _CRUDStore = require('./CRUDStore');

var _CRUDStore2 = _interopRequireDefault(_CRUDStore);

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CRUDActions = {
	create: function create(newRecord) {
		_CRUDStore2.default.setData(_CRUDStore2.default.getData().unshift(newRecord), true);
	},
	delete: function _delete(recordId) {
		var data = _CRUDStore2.default.getData();
		_CRUDStore2.default.setData(data.remove(recordId), true);
	},
	updateRecord: function updateRecord(recordId, newRecord) {
		_CRUDStore2.default.setData(_CRUDStore2.default.getData().set(recordId, newRecord), true);
	},
	updateField: function updateField(recordId, key, value) {
		var record = _CRUDStore2.default.getData().get(recordId);
		record[key] = value;
		_CRUDStore2.default.setData(_CRUDStore2.default.getData().set(recordId, record), true);
	},


	_preSearchData: null,

	startSearching: function startSearching() {
		this._preSearchData = _CRUDStore2.default.getData();
	},
	search: function search(e) {
		var needle = e.target.value.toLowerCase();
		if (!needle) {
			_CRUDStore2.default.setData(this._preSearchData);
			return;
		}

		var fields = _CRUDStore2.default.getSchema().map(function (item) {
			return item.id;
		});
		if (!this._preSearchData) {
			return;
		}

		var searchData = this._preSearchData.filter(function (row) {
			for (var f = 0; f < fields.length; f++) {
				if (row[fields[f]].toString().toLowerCase().indexOf(needle) > -1) {
					return true;
				}
			}
			return false;
		});
		_CRUDStore2.default.setData(searchData, false);
	},
	_sortCallback: function _sortCallback(a, b, descending) {
		var res = 0;
		if (typeof a === 'number' && typeof b === 'number') {
			res = a - b;
		} else {
			res = String(a).localeCompare(String(b));
		}
		return descending ? -1 * res : res;
	},
	sort: function sort(key, descending) {
		var _this = this;

		_CRUDStore2.default.setData(_CRUDStore2.default.getData().sort(function (a, b) {
			return _this._sortCallback(a[key], b[key], descending);
		}));
	},
	_addNew: function _addNew(action) {
		this.setState({ addnew: false });
		if (action === 'confirm') {
			CRUDActions.create(this.refs.form.getData());
		}
	}
};

exports.default = CRUDActions;