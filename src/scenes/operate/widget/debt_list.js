import React, { Component } from 'react';

import Connect from '../../../stores/connect';
import JarvisWidget from '../../../components/jarvis_widget';
import Loading from '../../../components/loading';
class DebtList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			list: []
		};
	}

	async componentWillMount() {
		this.setState({loading: true});
		await this.props.actions.product.debtList(
			this.props.storage.token
		);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.product.debtList && nextProps.product.debtList.status == 200) {
			this.setState({
				list: nextProps.product.debtList.data,
				loading: false,
			});
		}
	}

	render() {
		var {list} = this.state;
		console.log('Debtlist',list);
		return (
		<div className="panel">
			<Loading loading={this.state.loading} />
			<div className="panel panel-heading">
				<h1>Quản lý kho chứa</h1>
			</div>
			<div className="panel panel-body">
				<JarvisWidget editbutton={false} color="darken">
				<header>
				<span className="widget-icon">
					{' '}
					<i className="fa fa-table" />{' '}
				</span>

				<h2>Danh sách công nợ</h2>
				</header>
				<div>
					<div className="widget-body no-padding">
						<div className="table-responsive">
						<table className="table table-bordered table-striped table-hover">
							<thead>
							<tr>
								<th>name</th>
								<th>address</th>
								<th>payment</th>
								<th>rest</th>
								<th>expired</th>
							</tr>
							</thead>
							<tbody>
								{ list && list.length > 0 ? list.map((item, index)=>
									{
										return (
											<tr key = {index}>
												<td>{item.order.name}</td>
												<td>{item.order.address}</td>
												<td>{item.payment}</td>
												<td>{item.rest}</td>	
												<td>{item.expired}</td>							
												
											</tr>
										)
									}) : "test"
								}
							</tbody>
						</table>
						</div>
					</div>
				</div>
			</JarvisWidget>
			</div>
		</div>
		);
	}
}

export default Connect(DebtList);
