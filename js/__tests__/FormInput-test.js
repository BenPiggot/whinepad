jest
	.dontMock('../source/components/FormInput')

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import FormInput from '../source/components/FormInput';

describe('Form inputs', () => {
	it('returns input value', () => {
		let input = TestUtils.renderIntoDocument(<FormInput type="year" />);
		expect(input.getValue()).toBe(String(new Date().getFullYear()));

		input = TestUtils.renderIntoDocument(
			<FormInput type="rating" defaultValue="3" />
		);
		expect(input.getValue()).toBe(3);
	});
});