'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './components/Logo';
import Whinepad from './components/Whinepad';
import schema from './schema';

let data = JSON.parse(localStorage.getItem('data'));

if (!data) {
	data = {}
	schema.forEach(item => data[item.id] = item.sample);
	data = [data]
}

console.log(data)
ReactDOM.render(
	<div>
	  <h1>
	    <Logo /> Welcome to Whinepad!
	  </h1>
	  <Whinepad schema={schema} initialData={data} />
	 </div>,
  document.getElementById('pad')
);