import React, { Component } from 'react';

import Connect from '../../../stores/connect';
import JarvisWidget from '../../../components/jarvis_widget';
import Loading from '../../../components/loading';
import BootstrapValidator from '../../../components/forms/bootstrap_validator';
import serialize from 'form-serialize';
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


class StockAdd extends Component {
	constructor(props) {
		super(props);
		this.state = {
		id: 0,
		ten: '',
		soluong: 0,
		loading: false,
		value: "",
		listOutlet: [],
		suggestions: [],
		soluonghientai: 0
		};
	}

	handleInputChange = (event) => {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.validity.valid? target.value : "";
		const name = target.name;
		this.setState({
			[name]: value
		});
	}

  	onSubmit() {		
		this.setState({
			loading: true
		})
		this.props.actions.authenticate.updateOutlet(this.props.storage.token, this.state.id, this.state.soluong);
	}

	componentDidMount(){
		this.props.actions.authenticate.getAllProduct(
			this.props.storage.token
		);	
	}
	componentWillReceiveProps(nextProps) {			
		if (nextProps.authenticate.updateOutlet && nextProps.authenticate.updateOutlet.status == 200) {
			this.setState({
				listOutlet: nextProps.authenticate.listOutlet.data,
				value: "",
				soluong: 0,
				soluonghientai:0,
				loading: false
			});	
			return;
		};
		
	};

	onSuggestionsFetchRequested = ({ value }) => {
		this.setState({
		  suggestions: this.getSuggestions(value),
		});
	  };
	
	onSuggestionsClearRequested = () => {
		this.setState({
		  suggestions: [],
		});
	};

	getSuggestions = value => {
		const languages = this.props.authenticate.allProduct.data;
		const inputValue = value.trim().toLowerCase();
		const inputLength = inputValue.length;
	
		return inputLength === 0
		  ? []
		  : languages.filter(
			  lang => lang.name.toLowerCase().slice(0, inputLength) === inputValue
			);
	  };
	
	onSuggestionSelected = (
		event,{ suggestion }
	  ) => {
		this.setState({
			id: suggestion.id,
			ten: suggestion.name,
			soluonghientai: suggestion.stock_balance
		});
	};

	onChange = (event, { newValue }) => {
		this.setState({
		  value: newValue,
		});
	};

	render() {
		const { listOutlet,value, suggestions } = this.state;
		const inputProps = {
			placeholder: "Tên thuốc",
			value,
			onChange: this.onChange
		};
		const inputQuantityStyle = {
			padding: '0 10px',
			boxSizing : 'border-box'
		}
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
							<label className="input">
							<Autosuggest
								suggestions={suggestions}
								onSuggestionsFetchRequested={
								this.onSuggestionsFetchRequested
								}
								onSuggestionsClearRequested={
								this.onSuggestionsClearRequested
								}
								getSuggestionValue={getSuggestionValue}
								renderSuggestion={renderSuggestion}
								inputProps={inputProps}
								theme={theme}
								highlightFirstSuggestion={true}
								onSuggestionSelected={this.onSuggestionSelected}
								renderInputComponent={inputProps => (
								<input {...inputProps} ref={c => (this._input = c)}/>
								)}
                     		 />
							</label>							
							</div>
							</div>
						</fieldset>
					
						<fieldset>
							<div className="form-group">
							<label className="col-lg-3 control-label">Số lượng hiện tại</label>
								{this.state.soluonghientai}								
							</div>
						</fieldset>
						<fieldset>
							<div className="form-group">
							<label className="col-lg-3 control-label">Tình trạng</label>		
								{`${this.state.soluonghientai>=100?'Còn hàng':`${this.state.soluonghientai<100 && this.state.soluonghientai>0?'Hàng sắp hết':`${this.state.soluonghientai<0?'Nhập hàng gấp':''}`}`}`}
							</div>
							
						</fieldset>
						<fieldset>
							<div className="form-group">
							<label className="col-lg-3 control-label">Thêm số lượng mới</label>
							<div className="col-lg-7">
								<input className="form-control" name="soluong" placeholder="Số lượng" value={this.state.soluong} pattern="[0-9]*"
								onChange={this.handleInputChange} style={inputQuantityStyle}/>
							</div>
							</div>
						</fieldset>
						<footer>
							<div className="form-group">
								<div className="col-lg-7">
									<button disabled={value===""|| this.state.id === 0?true:false} className="btn btn-primary center-block" onClick={this.onSubmit.bind(this)}>Xác nhận</button>	
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
