import React, { Component } from 'react';

import Connect from '../../../stores/connect';
import JarvisWidget from '../../../components/jarvis_widget';
import Loading from '../../../components/loading';
class StockList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			listOutlet: []
		};
	}

	async componentWillMount() {
		this.setState({loading: true});
		await this.props.actions.authenticate.listOutler(
			this.props.storage.token
		);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.authenticate.listOutlet && nextProps.authenticate.listOutlet.status == 200) {
			this.setState({
				listOutlet: nextProps.authenticate.listOutlet.data,
				loading: false,
			});
		}
	}

	render() {
		var {listOutlet} = this.state;
		// var sortList = this.state.listOutlet.sort((a, b) => (b.id - a.id))
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

				<h2>Danh sách hàng trong kho</h2>
				</header>
				<div>
					<div className="widget-body no-padding">
						<div className="table-responsive">
						<table className="table table-bordered table-striped table-hover">
							<thead>
							<tr>
								<th>STT</th>
								<th>Tên sản phẩm</th>
								<th>số lượng</th>
								<th>Trạng thái</th>
							</tr>
							</thead>
							<tbody>
								{ listOutlet && listOutlet.length > 0 ? listOutlet.map((item, index)=>
									{
										return (
											<tr key = {index}>
												<td>{index + 1}</td>
												<td>{item.name}</td>	
												<td>{item.stock_balance}</td>									
												<td className={`${item.is_enable === 1? 'label label-success' : ''}`}>
													<label className={`${item.is_enable===1 ?'label label-success' : 'label label-warning'}`}>{`${item.is_enable === 1 ? "còn hàng" : "hết hàng"}`}</label>
												</td>
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

export default Connect(StockList);
