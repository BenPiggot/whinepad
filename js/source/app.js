'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './components/Logo';
import Excel from './components/Excel';

var headers = localStorage.getItem('headers');
var data = localStorage.getItem('data');

if (!headers) {
	headers = ['Title', 'Year', 'Rating', 'Comments'];
	data = [['Test', '2015', '3', 'meh']];
}

ReactDOM.render(
	<div>
	  <h1>
	    <Logo /> Welcome to Whinepad!
	  </h1>
	  <Excel headers={headers} data={data} />
	 </div>,
  document.getElementById('pad')
);