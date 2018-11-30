import React, { Component } from 'react';

import Connect from '../../../stores/connect';
import JarvisWidget from '../../../components/jarvis_widget';
import Loading from '../../../components/loading';
import BootstrapValidator from '../../../components/forms/bootstrap_validator';
import serialize from 'form-serialize';
class StockAdd extends Component {
	constructor(props) {
		super(props);
		this.state = {
		ten: '',
		soluong: 0,
		loading: false
		};
	}

	componentDidMount(){

	}

	handleInputChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value
		});
	}
  	onSubmit(e) {
		e.preventDefault();
		let form = document.querySelector("#attributeForm");
		var obj = serialize(form, { hash: true });
		this.setState({
			loading: true
		})
		this.props.actions.authenticate.addOutlet(this.props.storage.token, obj);
		return false;
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.authenticate.addOutlet && nextProps.authenticate.addOutlet.status == 200) {
			this.setState({
				ten: '',
				soluong: 0,
				loading: false
			});	
			return;
		};
	};
	

	render() {
		return (
		<div className="panel">
			<div className="panel panel-heading">
			<h1>Nhập hàng</h1>
			</div>
			<div className="panel panel-body">
			<article className="col-sm-12 col-md-12">
				{/* Widget ID (each widget will need unique ID)*/}
				<JarvisWidget colorbutton={false} editbutton={false} custombutton={false}>
				<header>
					<span className="widget-icon">
					{' '}
					<i className="fa fa-edit" />{' '}
					</span>
					<h2>Chi tiết hàng hóa</h2>
				</header>
				<div>
					{/* widget content */}
					<div className="widget-body no-padding">
					<BootstrapValidator>
						<form
						id="attributeForm"
						className="smart-form"
						data-bv-message="This value is not valid"
						data-bv-feedbackicons-valid="glyphicon glyphicon-ok"
						data-bv-feedbackicons-invalid="glyphicon glyphicon-remove"
						data-bv-feedbackicons-validating="glyphicon glyphicon-refresh"
						>
						<fieldset>
							<div className="form-group">
							<label className="col-lg-3 control-label">Tên thuốc</label>
							<div className="col-lg-7">
								<input
								type="text"
								className="form-control"
								name="ten"
								value={this.state.ten}
								onChange={this.handleInputChange}
								placeholder="Tên thuốc"
								data-bv-notempty="true"
								data-bv-notempty-message="Tên Plug không được bỏ trống"
								/>
							</div>
							</div>
						</fieldset>
						{/* <fieldset>
							<div className="form-group">
							<label className="col-lg-3 control-label">Mô tả</label>
							<div className="col-lg-7">
								<textarea className="form-control" name="mota" placeholder="Mô tả" rows="3" value={this.state.mota} />
							</div>
							</div>
						</fieldset>

						<fieldset>
							<div className="form-group">
							<label className="col-lg-3 control-label">Đơn vị</label>
							<div className="col-lg-7">
								<input className="form-control" name="oum" placeholder="Đơn vị" rows="3" value={this.state.donvi} />
							</div>
							</div>
						</fieldset> */}
						<fieldset>
							<div className="form-group">
							<label className="col-lg-3 control-label">Số lượng</label>
							<div className="col-lg-7">
								<input className="form-control" name="soluong" placeholder="Số lượng" rows="3" value={this.state.soluong}
								onChange={this.handleInputChange}/>
							</div>
							</div>
						</fieldset>
						<footer>
							<div className="form-group">
								<div className="col-lg-7">
									<button className="btn btn-primary center-block" onClick={this.onSubmit.bind(this)}>Xác nhận</button>	
								</div>
							</div>
						</footer>
						</form>
					</BootstrapValidator>
					</div>
				</div>
				</JarvisWidget>
			</article>
			</div>
			<Loading loading={this.state.loading} />
		</div>
		);
	}
}

export default Connect(StockAdd);
