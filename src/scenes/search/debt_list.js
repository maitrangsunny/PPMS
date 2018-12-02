import React, { Component } from 'react';

import Connect from '../../stores/connect';
import JarvisWidget from '../../components/jarvis_widget';
import Loading from '../../components/loading';
import Moment from 'moment';

class DebtList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			list: false,
		};
	}

	componentDidMount =  () => 
 	{	this.props.actions.product.debtList(
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

	changeStatusDate=date=>{	
		const currentDate = Moment(new Date());
		let	expiredDate = Moment(date*1000);
		let duration = Moment.duration(expiredDate.diff(currentDate));
		let days = Math.round(duration.asDays());
		console.log(days);
		let warningValue = null;
		switch(days){
			case 3:
			warningValue = 3
			break; 
			case 6:
			warningValue = 6
			break; 
			default:
			break;
		}
		return warningValue;
	}

	render() {
		var {list} = this.state;
		return (
		<div className="panel">
			<Loading loading={this.state.loading} />
			<div className="panel panel-heading">
				<h1>Quản lý công nợ</h1>
			</div>
			<div className="panel panel-body">
				<JarvisWidget editbutton={false} color="darken">
				<header>
				<span className="widget-icon">
					<i className="fa fa-table" />
				</span>
				<h2>Danh sách công nợ</h2>
				</header>
				<div>
					<div className="widget-body no-padding">
						<div className="table-responsive">
						<table className="table table-bordered table-striped table-hover">
							<thead>
							<tr>
								<th>Tên Khách Hàng</th>
								<th>Địa chỉ</th>
								<th>Payment</th>
								<th>Rest</th>
								<th>Expired</th>
								<th>Tình trạng</th>
								<th>Chi tiết</th>								
							</tr>
							</thead>
							<tbody>
								{ list && list.length > 0 ? list.map((item, index)=>
									{
										let dayValue = this.changeStatusDate(item.expired);
										return (
											<tr key={index}>
												<td>{item.order.name}</td>
												<td>{item.order.address}</td>
												<td>{parseInt(item.payment).toLocaleString('en')}</td>
												<td>{parseInt(item.rest).toLocaleString('en')}</td>	
												<td>{Moment(item.expired * 1000).format('DD-MM-YYYY')}</td>	
												<td>
													<label className={`${dayValue==3?'label label-danger':`${dayValue===6?'label label-warning':'label label-primary'}`}`}>Sắp thu</label>
												</td>
												<td>
													<button
														type="button"
														className="btn btn-info col-xs-offset-1">
														Chi tiết
													</button>
													<button
														type="button"
														className="btn btn-success col-xs-offset-1">
														Xoa
													</button>
       											 </td>						
											</tr>
										)
									}) :null
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
