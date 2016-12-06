import { EventEmitter } from 'fbemitter';
import { List } from 'immutable';

let data;
let schema;

const emitter = new EventEmitter();

const CRUDStore = {
	getData() {
		return data;
	},

	getSchema() {
		return schema;
	},

	setData(newData, commit) {
		data = newData;
		if (commit && 'localStorage' in window) {
			localStorage.setItem('data', JSON.stringify(newData))
		}
		emitter.emit('change')
	},

	getCount() {
		return data.count();
	},

	getRecord(recordID) {
		return data.get(recordID);
	},

	init(initialSchema) {
		schema = initialSchema;
		const storage = 'localStorage' in window ?
			localStorage.getItem('data') :
			null;

		if (!storage) {
			let initialRecord = {};
			schema.forEach(item => initialRecord[item.id] = item.sample);
			data = List([initialRecord]);
		} else {
			data = List(JSON.parse(storage));
		}
	},

	addListener(eventType, fn) {
		emitter.addListener(eventType, fn);
	}
}

export default CRUDStore