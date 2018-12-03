import React, { Component } from 'react';
import {Modal, Button} from "react-bootstrap";
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
			show: false,
			data:false
		};
	}

	async componentDidMount(){	
		await this.props.actions.product.getDebtList(
			this.props.storage.token
		);
		if(this.props.id){
			this.setState({
				loading: true
			});
			await this.props.actions.product.getDetailDebt(
				this.props.storage.token,
				this.props.id,
			)
			console.log(this.props.id);
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.product.debtList && nextProps.product.debtList.status == 200) {
			this.setState({
				list: nextProps.product.debtList.data,
				loading: false,
			});
		}
		if (nextProps.product.detailDebt &&nextProps.product.detailDebt.status == 200 ) {
			this.setState({
				data : nextProps.product.detailDebt.data
			})
			  		
			console.log(data);
			// await this.setState({
			 
			// });
		}
	}

	handleClose = () => {
		this.setState({ show: false });
	}

	handleShow = ()=> {
		this.setState({ show: true });
	}

	// async showDetail(item,index) {
	// 	console.log(1);
	// 	await this.setState({ show: true });
	// 	return (
	// 		<tr key={index}>
	// 			<th>{item.payment}</th>
	// 			<th>{item.rest}</th>
	// 			<th>{item.expired}</th>
	// 		</tr>
	// 	)
	
	// }
	
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
														//onClick={()=>this.showDetail(item,index)}
														onClick={this.handleShow}>
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
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<table>
						<thead>
							<tr>
							<th>STT</th>
							<th>Tên</th>
							<th>Số lượng</th>
							</tr>
						</thead>
						<tbody>
							{/* {list.length > 0 ? list.map((item, index)=>{
							this.showDetail(item, index);
							}): null} */}
						</tbody>
					</table>				
								
				</Modal.Body>
        	</Modal>
		</div>
		);
	}
}

export default Connect(DebtList);
