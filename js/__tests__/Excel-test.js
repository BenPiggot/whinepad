jest.autoMockOff();

import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Excel from '../source/components/Excel';
import schema from '../source/schema';
import Store from '../source/flux/CRUDStore';

Store.init(schema);

describe('Editing data', () => {

  it('saves new data', () => {
    const table = TestUtils.renderIntoDocument(
      <Excel />
    );
    const newname = '$2.99 chuck';
    const cell = TestUtils.scryRenderedDOMComponentsWithTag(table, 'td')[0];
    cell.dataset = { 
      row: cell.getAttribute('data-row'),
      key: cell.getAttribute('data-key'),
    };
    TestUtils.Simulate.doubleClick(cell);
    cell.getElementsByTagName('input')[0].value = newname;
    TestUtils.Simulate.submit(cell.getElementsByTagName('form')[0]);
    expect(cell.textContent).toBe(newname);
  });

  it('deletes data', () => {
    const table = TestUtils.renderIntoDocument(
      <Excel />
    );

    TestUtils.Simulate.click(
      TestUtils.findRenderedDOMComponentWithClass(table, 'ActionsDelete')
    );
    TestUtils.Simulate.click( 
      TestUtils.findRenderedDOMComponentWithClass(table, 'Button')
    );

    expect(TestUtils.scryRenderedDOMComponentsWithTag(table, 'td').length).toBe(0);

  });

});