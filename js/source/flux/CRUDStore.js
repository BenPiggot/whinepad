import { EventEmitter } from 'fbemitter';

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
		return data.length;
	},

	getRecord(recordID) {
		return recordID in data ? data[recordID] : null;
	},

	init(initialSchema) {
		schema = initialSchema;
		const storage = 'localStorage' in window ?
			localStorage.getItem('data') :
			null;

		if (!storage) {
			data = [{}];
			schema.forEach(item => data[0][item.id] = item.sample);
		} else {
			data = JSON.parse(storage);
		}
	},

	addListener(eventType, fn) {
		emitter.addListener(eventType, fn);
	}
}

export default CRUDStore