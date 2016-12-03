jest
	.dontMock('../source/components/Actions')
	.dontMock('./Wrap')

import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Actions from '../source/components/Actions';
import Wrap from './Wrap';