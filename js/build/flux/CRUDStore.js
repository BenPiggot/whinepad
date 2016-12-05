'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _fbemitter = require('fbemitter');

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
		return data.length;
	},
	getRecord: function getRecord(recordID) {
		return recordID in data ? data[recordID] : null;
	},
	init: function init(initialSchema) {
		schema = initialSchema;
		var storage = 'localStorage' in window ? localStorage.getItem('data') : null;

		if (!storage) {
			data = [{}];
			schema.forEach(function (item) {
				return data[0][item.id] = item.sample;
			});
		} else {
			data = JSON.parse(storage);
		}
	},
	addListener: function addListener(eventType, fn) {
		emitter.addListener(eventType, fn);
	}
};

exports.default = CRUDStore;