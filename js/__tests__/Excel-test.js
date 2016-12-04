jest.autoMockOff();

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Excel from '../source/components/Excel';
import schema from '../source/schema';

let data = [{}];
schema.forEach(item => data[0][item.id] = item.sample);

describe('Editing data', () => {
	it('saves new data', () => {
		const callback = jest.genMockFunction();
		const table = TestUtils.renderIntoDocument(
			<Excel
				schema={schema}
				initialData={data}
				onDataChange={callback} />
		);

		const newname = '$2.99 chuck';
		const cell = TestUtils.scryRenderedDOMComponentsWithTag(table, 'td')[0];

		cell.dataset = {
			row: cell.getAttribute('data-row'),
			key: cell.getAttribute('data-key')
		};

		TestUtils.Simulate.doubleClick(cell);
		cell.getElementsByTagName('input')[0].value = newname;
		TestUtils.Simulate.submit(cell.getElementsByTagName('form')[0]);
		expect(cell.textContent).toBe(newname);
		expect(callback.mock.calls[0][0][0].name).toBe(newname);
	})

	it('deletes data', () => {
		const callback = jest.genMockFunction();
		const table = TestUtils.renderIntoDocument(
			<Excel
				schema={schema}
				initialData={data}
				onDataChange={callback} />
		);

		TestUtils.Simulate.click(
			TestUtils.findRenderedDOMComponentWithClass(table, 'ActionsDelete')
		);

		TestUtils.Simulate.click(
			TestUtils.findRenderedDOMComponentWithClass(table, 'Button')
		);

		expect(callback.mock.calls[0][0].length).toBe(0);
	})
})