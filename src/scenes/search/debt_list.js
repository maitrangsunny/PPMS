import React, { Component } from 'react';
import {Modal, Button, Panel} from "react-bootstrap";
import Connect from '../../stores/connect';
import JarvisWidget from '../../components/jarvis_widget';
import Loading from '../../components/loading';
import Moment from 'moment';
import _ from 'lodash';
class DebtList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			list: false,
			show: false,
			data:false
		};
	}

	componentDidMount(){	
		this.props.actions.product.getDebtList(
			this.props.storage.token
		);
	}

	async componentWillReceiveProps(nextProps) {
		if (nextProps.product.debtList && nextProps.product.debtList.status == 200) {
			this.setState({
				list: nextProps.product.debtList.data,
				loading: false,
			});
		}
		if (nextProps.product.detailDebt && nextProps.product.detailDebt.status == 200 ) {
			this.setState({
				data: nextProps.product.detailDebt.data,
			});
		}
	}

	handleClose = () => {
		this.setState({ show: false });
	}

	handleShow = ()=> {
		this.setState({ show: true });
	}

	showDetail=id => {
		this.setState({ show: true})
		this.props.actions.product.getDetailDebt(
		  this.props.storage.token,
		  id
		);
	}
	
	editItem = (index) => {
		console.log(1);
		this.setState({ show: true });
	}

	changeStatusDate=date=>{	
		const currentDate = Moment(new Date());
		let	expiredDate = Moment(date*1000);
		let duration = Moment.duration(expiredDate.diff(currentDate));
		let days = Math.ceil(duration.asDays());
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
		var {list, data} = this.state;
		console.log("data", this.state.data);
		let payment = parseInt(data.payment).toLocaleString('en');
		let rest = parseInt(data.rest).toLocaleString('en');
		let expiredDate = Moment(data.expired * 1000).format('YYYY-MM-DD');
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
									<th>STT</th>
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
													<td>{index + 1}</td>
													<td>{item.order.name}</td>
													<td>{item.order.address}</td>
													<td>{parseInt(item.payment).toLocaleString('en')}</td>
													<td>{parseInt(item.rest).toLocaleString('en')}</td>	
													<td>{Moment(item.expired * 1000).format('DD-MM-YYYY')}</td>	
													<td>
														<label className={`${dayValue===3?'label label-danger':`${dayValue===6?'label label-warning':'label label-primary'}`}`}>Sắp thu</label>
													</td>
													<td>
														<button
															type="button"
															className="btn btn-info" 
															onClick={()=>this.showDetail(item.id)}>
															Chi tiết
														</button>
														<button
															type="button"
															className="btn btn-success">
															Xóa
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
				<Modal show={this.state.show} onHide={this.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Chi tiết công nợ</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<div className="table-responsive custom-table-detail-cong-no">
						<table  className="table table-bordered table-striped table-hover">
							<thead>
								<tr>
									<th>Payment</th>
									<th>Rest</th>
									<th>Expire Date</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>{payment}</td>
									<td>{rest}</td>	
									<td>{expiredDate}</td>
								</tr>
							
							</tbody>
						</table>
						</div>
						<form>
							<div className="form-group">
								<label>Payment</label>
								<input type="text" className="form-control" placeholder="Payment" value={payment}/>
							</div>
							<div className="form-group">
								<label>Rest</label>
								<input type="text" className="form-control" placeholder="Rest" value={rest}/>
							</div>
							<div className="form-group">
								<label>Expired date</label>
								<input type="date" className="form-control" placeholder="Expired date" value={expiredDate}/>
							</div> 
							<div className="btn-group">
								<button type="submit" className="btn btn-primary">Lưu</button>&nbsp;&nbsp;
								<button className="btn btn-default">Đóng</button>
							</div>
						</form>						
					</Modal.Body>
				</Modal>
			</div>
		);
	}
}

export default Connect(DebtList);
