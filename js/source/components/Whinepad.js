import Button from './Button';
import Dialog from './Dialog';
import Excel from './Excel';
import Form from './Form';
import React, { Component, PropTypes } from 'react';
import CRUDStore from '../flux/CRUDStore';
import CRUDActions from '../flux/CRUDActions';


class Whinepad extends Component {
	constructor() {
		super();
		this.state = {
			count: CRUDStore.getCount(),
			addnew: false
		}

		CRUDStore.addListener('change', () => {
			this.setState({
				count: CRUDStore.getCount()
			})
		})
	};

	_addNewDialog() {
		this.setState({addnew: true})
	};

	_addNew(action) {
		this.setState({addnew: false});
		if (action === 'confirm') {
			CRUDActions.create(this.refs.form.getData());
		}
	};

	render() {
		return (
			<div className="Whinepad">
				<div className="WhinepadToolbar">
					<div className="WhinepadToolbarAdd">
						<Button
							onClick={this._addNewDialog.bind(this)}
							className="WhinepadToolbarAddButton">
							+ add
						</Button>
					</div>
					<div className="WhinepadToolbarSearch">
						<input
              placeholder={this.state.count === 1
                ? 'Search 1 record...'
                : `Search ${this.state.count} records...`
              } 
              onChange={CRUDActions.search.bind(CRUDActions)}
              onFocus={CRUDActions.startSearching.bind(CRUDActions)} />
					</div>
				</div>
				<div className="WhinepadDatagrid">
					<Excel />
				</div>
				{ this.state.addnew ? 
					<Dialog
						modal={true}
						headers="Add new item"
						confirmLabel="Add"
						onAction={this._addNew.bind(this)}
					>
						<Form ref="form" />
					</Dialog> : 
					null
				}
			</div>
		)
	}
};


export default Whinepad