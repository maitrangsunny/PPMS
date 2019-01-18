import React, { Component } from 'react';

import Connect from '../../../stores/connect';
import JarvisWidget from '../../../components/jarvis_widget';
import Loading from '../../../components/loading';
import { Link } from "react-router-dom";
import Utils, { LINK } from "../../../utils";
import Autosuggest from "react-autosuggest";

const theme = {
	container: {
	  position: "relative",
	},
	input: {
	  height: 30,
	  fontFamily: "Helvetica, sans-serif",
	  fontWeight: 500,
	  fontSize: 16,
	  border: "1px solid #aaa",
	},
	inputFocused: {
	  outline: "none",
	},
	inputOpen: {
	  borderBottomLeftRadius: 0,
	  borderBottomRightRadius: 0,
	},
	suggestionsContainer: {
	  display: "none",
	},
	suggestionsContainerOpen: {
	  display: "block",
	  position: "absolute",
	  top: 51,
	  width: 280,
	  border: "1px solid #aaa",
	  backgroundColor: "#fff",
	  fontFamily: "Helvetica, sans-serif",
	  fontWeight: 300,
	  fontSize: 16,
	  maxHeight: 200,
	  borderBottomLeftRadius: 4,
	  borderBottomRightRadius: 4,
	  zIndex: 2,
	  overflow: "auto",
	},
	suggestionsList: {
	  margin: 0,
	  padding: 0,
	  listStyleType: "none",
	},
	suggestion: {
	  cursor: "pointer",
	  padding: "10px 20px",
	},
	suggestionHighlighted: {
	  backgroundColor: "#ddd",
	},
  };
  

const getSuggestionValue = suggestion => suggestion.name;
const renderSuggestion = suggestion => <span>{suggestion.name}</span>;

class StockList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			listOutlet: [],
			suggestions: [],
			value: "",
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

	onChange = (event) => {
		let searchList = this.props.authenticate.listOutlet.data.filter((el) => {
			let searchValue = el.name.toLowerCase();
			return searchValue.search(event.target.value.toLowerCase()) !== -1;
		})
		this.setState({
			listOutlet: searchList
		});
	};

	render() {
		var {listOutlet} = this.state;
		// var sortList = this.state.listOutlet.sort((a, b) => (b.id - a.id))
		const inputStyle = {
			padding: '0 10px',
			boxSizing : 'border-box'
		}
		return (
		<div className="panel">
			<Loading loading={this.state.loading} />
			<div className="panel panel-heading">
				<h1 className="page-title txt-color-blueDark">Quản lý kho chứa</h1>
				<JarvisWidget editbutton={false} custombutton={false}>
				<header>
					<span className="widget-icon">				
						<i className="fa fa-search" />{'Tìm Tên Thuốc'}
					</span>
				</header>
				<div>
					{/* widget content */}
					<div className="widget-body no-padding">
					<form className="smart-form" id="search">
						<fieldset>
						<div className="form-group">
							<label className="col-lg-3 control-label">Tên thuốc</label>
							<div className="col-lg-7">
								<input className="col-xs-12 form-control" 
											style={inputStyle}								
											onChange={this.onChange}
											placeholder="Từ khóa..."/>							
							</div>
							</div>					
						</fieldset>					
					</form>
					</div>
				</div>
			</JarvisWidget>	
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
						<div className="custom-table-bill">
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
												<td>
													<label className={`${item.stock_balance>=100?'label label-primary':`${item.stock_balance<100 && item.stock_balance>0?'label label-warning':'label label-danger'}`}`}>
													{`${item.stock_balance>=100?'Còn hàng':`${item.stock_balance<100 && item.stock_balance>0?'hàng sắp hết':'nhập hàng gấp'}`}`}
													</label>
												</td>
											</tr>
										)
									}) : null
								}
							</tbody>
						</table>
						</div>
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
