import React, { Component } from 'react';
import {Modal, Button, Panel} from "react-bootstrap";
import Connect from '../../stores/connect';
import JarvisWidget from '../../components/jarvis_widget';
import Loading from '../../components/loading';
import serialize from 'form-serialize';
import UiDatepicker from "../../components/forms/date_picker";
import Moment from 'moment';
import _ from 'lodash';
class DebtList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			list: false,
			show: false,
			data:false,
			payment: null,
			rest: null,
			expired: null
		};
	}

	componentDidMount(){	
		this.props.actions.product.getDebtList(
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
		if (nextProps.product.detailDebt && nextProps.product.detailDebt.status == 200 ) {
			this.setState({
				data: nextProps.product.detailDebt.data,
			});
		}
		if (nextProps.product.updateDebt &&
			nextProps.product.updateDebt.status == 200 &&
			!nextProps.product.flagUpdateDebt) {
				nextProps.actions.product.setFlagUpdateDebt(true);
				this.setState({
				loading: false,
				show: false
			});
			this.props.actions.product.getDebtList(
				this.props.storage.token
			);
		  }
	}

	handleClose = () => {
		this.setState({ 
			show: false,
			payment: null,
			rest: null,
			expired: null
		});
	}

	handleShow = ()=> {
		this.setState({ show: true });
	}

	showDetail= id => {
		this.setState({ show: true})
		this.props.actions.product.getDetailDebt(
		  this.props.storage.token,
		  id
		);
	}

	handleInputChange = event => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;	
		console.log(name+'==='+value);
		this.setState({
		  [name]: value
		});
	}	

	onUpdateDebt = (id)=>{
		if(_.isEmpty(this.state.payment) || _.isEmpty(this.state.rest) || _.isEmpty(this.state.expired)){
			alert("Không bỏ trống các field. Vui lòng nhập giá trị!");
		}else {
			this.props.actions.product.updateDebt(
				this.props.storage.token,
				id,
				this.state.payment,
				this.state.rest,
				Moment(this.state.expired).valueOf()/1000
			);	
		}
		this.setState({
			payment: null,
			rest: null,
			expired: null
		});
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
									<td>{parseInt(data.payment).toLocaleString('en')}</td>
									<td>{parseInt(data.rest).toLocaleString('en')}</td>	
									<td>{Moment(data.expired * 1000).format('DD-MM-YYYY')}</td>
								</tr>
							
							</tbody>
						</table>
						</div>
						<form id="attributeForm">
							<div className="form-group">
								<label>Payment</label>
								<input type="text" name="payment" className="form-control" placeholder="Payment" value={this.state.payment}  onChange={this.handleInputChange}/>
							</div>
							<div className="form-group">
								<label>Rest</label>
								<input type="text" name="rest" className="form-control" placeholder="Rest" value={this.state.rest} onChange={this.handleInputChange}/>
							</div>
							<div className="form-group">
								<label>Expired date</label>
								<UiDatepicker
									type="text"
									name="expired"
									id="finishdate"
									maxRestrict="#startdate"
									placeholder="Expired date"
									data-date-format="dd/mm/yy"
									className="form-control"
									value={this.state.expired}
									onChange={e =>
										this.setState({ expired: e.target.value })
									}
									/>
							</div> 
							<div className="btn-group">
								<button type="button" onClick={()=>this.onUpdateDebt(data.id)} className="btn btn-primary">Lưu</button>&nbsp;&nbsp;
								<button type="button" className="btn btn-default" onClick={this.handleClose}>Đóng</button>
							</div>
						</form>											
					</Modal.Body>
				</Modal>
			</div>
		);
	}
}

export default Connect(DebtList);
