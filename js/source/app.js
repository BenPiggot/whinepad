'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './components/Logo';
import CRUDStore from './flux/CRUDStore';
import Whinepad from './components/Whinepad';
import schema from './schema';

let data = JSON.parse(localStorage.getItem('data'));

CRUDStore.init(schema);

ReactDOM.render(
	<div>
	  <h1>
	    <Logo /> Welcome to Whinepad!
	  </h1>
	  <Whinepad />
	 </div>,
  document.getElementById('pad')
);