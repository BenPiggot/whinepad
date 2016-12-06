'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fbemitter = require('fbemitter');

var _immutable = require('immutable');

var data = void 0;
var schema = void 0;

var emitter = new _fbemitter.EventEmitter();

var CRUDStore = {
	getData: function getData() {
		return data;
	},
	getSchema: function getSchema() {
		return schema;
	},
	setData: function setData(newData, commit) {
		data = newData;
		if (commit && 'localStorage' in window) {
			localStorage.setItem('data', JSON.stringify(newData));
		}
		emitter.emit('change');
	},
	getCount: function getCount() {
		return data.count();
	},
	getRecord: function getRecord(recordID) {
		return data.get(recordID);
	},
	init: function init(initialSchema) {
		schema = initialSchema;
		var storage = 'localStorage' in window ? localStorage.getItem('data') : null;

		if (!storage) {
			(function () {
				var initialRecord = {};
				schema.forEach(function (item) {
					return initialRecord[item.id] = item.sample;
				});
				data = (0, _immutable.List)([initialRecord]);
			})();
		} else {
			data = (0, _immutable.List)(JSON.parse(storage));
		}
	},
	addListener: function addListener(eventType, fn) {
		emitter.addListener(eventType, fn);
	}
};

exports.default = CRUDStore;