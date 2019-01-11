import React, { Component } from "react";
import Modal from "react-modal";
import Connect from "../../../stores/connect";
import JarvisWidget from "../../../components/jarvis_widget";
import Autosuggest from "react-autosuggest";
import UiDatepicker from "../../../components/forms/date_picker";
import Loading from "../../../components/loading";
import Utils, { BIGBOX, LINK } from "../../../utils";
import { Link } from "react-router-dom";
import Cleave from "cleave.js/react";

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

class AddPage extends Component {
   constructor(props) {
       super(props);
       this.state = {
            suggestions: []
       }
   }

   componentDidMount(){
	   console.log(this.props);
        this.props.actions.authenticate.getAllProduct(
            this.props.storage.token
        );	
    }

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

    const { value,suggestions } = this.state;
    const styleContent = {
        padding:"30px",
        backgroundColor: "white"
    }
    const inputProps = {
        placeholder: "Tên thuốc",
        value,
        onChange: this.onChange
    };
    return (
		<div>
			{/* header */}
			<header id="header">
				<div id="logo-group"><span id="logo"><b>PPMS.VN</b></span></div>
				<div class="pull-right">
					<div id="hide-menu" class="btn-header pull-right"><span><a title="Collapse Menu"><i class="fa fa-reorder"></i></a></span></div>
					<ul id="mobile-profile-img" class="header-dropdown-list hidden-xs padding-5">
						<li class="">
							<a class="dropdown-toggle no-margin userdropdown" data-toggle="dropdown"></a>
							<ul class="dropdown-menu pull-right">
							<li><a class="padding-10 padding-top-0 padding-bottom-0"><i class="fa fa-cog"></i> Setting</a></li>
							<li class="divider"></li>
							<li><a href="#/views/profile" class="padding-10 padding-top-0 padding-bottom-0"> <i class="fa fa-user"></i><u>P</u>rofile</a></li>
							<li class="divider"></li>
							<li><a class="padding-10 padding-top-0 padding-bottom-0" data-action="toggleShortcut"><i class="fa fa-arrow-down"></i> <u>S</u>hortcut</a></li>
							<li class="divider"></li>
							<li><a class="padding-10 padding-top-0 padding-bottom-0" data-action="launchFullscreen"><i class="fa fa-arrows-alt"></i> Full<u>S</u>creen</a></li>
							<li class="divider"></li>
							<li><a href="#/login" class="padding-10 padding-top-5 padding-bottom-5" data-action="userLogout"><i class="fa fa-sign-out fa-lg"></i> <strong><u>L</u>ogout</strong></a></li>
							</ul>
						</li>
					</ul>
					<div id="logout" class="btn-header transparent pull-right"><span><a href="/dang-nhap" title="Sign Out" data-logout-msg="You can improve your security further after logging out by closing this opened browser"><i class="fa fa-sign-out"></i></a> </span></div>
				</div>
				</header>
				{/* menu bar */}
				<aside id="left-panel">
					<div class="login-info">
						<span>
							<a href="#">
								<span>
								<h4>phu</h4>
								</span>
								<i class="fa fa-angle-down"></i>
							</a>
						</span>
					</div>
					<nav>
						<ul>
							<li class="">
								<a href="#" title="Đơn hàng"><i class="fa fa-fw fa-tag"></i> <span class="menu-item-parent">Đơn hàng</span> <b class="collapse-sign"><i class="glyphicon glyphicon-menu-right"></i></b></a>
								<ul>
								<li class=""><a title="Tạo đơn hàng" href="/noi-dung"><i class="fa fa-lg fa-fw fa-plus"></i> <span class="menu-item-parent">Tạo đơn hàng</span> </a></li>
								<li class=""><a title="Danh sách đơn hàng" href="/tra-cuu/don-hang"><i class="fa fa-fw fa-sticky-note-o"></i> <span class="menu-item-parent">Danh sách đơn hàng</span> </a></li>
								<li class=""><a title="Danh sách công nợ" href="/tra-cuu/cong-no"><i class="fa fa-fw fa-book"></i> <span class="menu-item-parent">Danh sách công nợ</span> </a></li>
								</ul>
							</li>
						</ul>
					</nav>
					<span class="minifyme" data-action="minifyMenu"><i class="fa fa-arrow-circle-left hit"></i></span>
					</aside>
					{/* content */}
					<div id="main" role="main">
						<div id="content">
						<div className="row">
						<div className="col-xs-12 col-sm-7 col-md-7">
							<h1 className="page-title txt-color-blueDark">Vui lòng nhập thông tin</h1>
						</div>
						<div className="col-xs-12 col-sm-5 col-md-5">
							<ul id="sparks" className="">
							<li className="sparks-info">
								<button                  
								type="button"
								className="btn btn-success btn-lg"
								>
								Tạo mới
								</button>
							</li>
							</ul>
						</div>
						</div>
						<JarvisWidget editbutton={false} custombutton={false}>
						<header>
							<span className="widget-icon">
							<i className="fa fa-edit" />
							</span>
							<h2>Thông tin khách hàng</h2>
						</header>
						<div>
							{/* widget content */}
							<div className="no-padding">
							<form className="smart-form" id="search">
								<div className="row input-order">
								<div className="col col-md-6 col-sm-6 col-xs-6">
									<label className="input">
									<h3>Tên khách hàng :</h3>
									<input
										type="text"
										placeholder="Họ tên"
									/>
									</label>
								</div>

								<div className="col col-md-6 col-sm-6 col-xs-6">
									<label className="input">
									<h3>Số điện thoại:</h3>
									<input
										type="number"
										name="t"
										placeholder="Số điện thoại"
										id="one"                     
									/>
									</label>
								</div>
								</div>

								<div className="row input-order">
								<div className="col col-lg-12 col-sm-12 col-xs-12">
									<label className="input">
									<h3>Địa chỉ :</h3>
									<input
										type="text"                       
										name="t"
										placeholder="Địa chỉ"
									
									/>
									</label>
								</div>
								</div>
							</form>
							</div>
						</div>
						</JarvisWidget>
						<JarvisWidget editbutton={false} custombutton={false}>
						<header>
							<span className="widget-icon">
							<i className="fa fa-edit" />
							</span>
							<h2>Nội dung</h2>
						</header>
						<div>
							<div className="widget-body no-padding">
							<form className="smart-form" id="search">
								<div className="row input-order">
								<div className="col col-md-4 col-sm-4 col-xs-4">
								<h3>Tên thuốc:</h3>
									<label className="input">
									{/* <Autosuggest
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
									)}/> */}
									
									</label>
								</div>

								<div className="col col-md-2 col-sm-2 col-xs-2">
									<label className="input">
									<h3>Số lượng:</h3>
									<input
										type="number"
										name="t"
										placeholder="Số lượng"
										id="one"
									
									/>
									</label>
								</div>

								<div className="col col-md-2 col-sm-2 col-xs-2">
									<label className="input">
									<h3>Giá :</h3>
									<Cleave
										
									/>
									</label>
								</div>

								<div className="col col-md-2 col-sm-2 col-xs-2">
									<label className="input">
									<h3>Thành tiền:</h3>
									<Cleave
										name="t"
										id="one"
										placeholder="Thành Tiền"
										
									/>
									</label>
								</div>
								</div>
								<footer>
								<button
									type="button"                
									className="btn btn-primary"
								>
									{" "}
									Thêm
								</button>
								</footer>
							</form>
							</div>
						</div>
						</JarvisWidget>
						{
						<JarvisWidget editbutton={false} color="darken">
							<header>
							<span className="widget-icon">
								<i className="fa fa-table" />
							</span>
							<h2>Đơn Hàng</h2>
							</header>
							<div className="widget-body">
							<div className="custom-table-thuoc">
								<div className="no-padding">
								<div className="table-responsive">
									<table
									ref={el => {
										this.messagesEnd = el;
									}}
									className="table table-bordered table-striped table-hover "
									>
									<thead>
										<tr>
										<th>STT</th>
										<th>Tên</th>
										<th>Số lượng</th>
										<th>Giá</th>
										<th>Thành Tiền</th>
										<th>Thay đổi</th>
										</tr>
									</thead>
									<tbody>
									
									</tbody>
									</table>
								</div>
								</div>
							</div>
							<div className="col-sm-8">
								<label className="input">
								<h3 className="fontWeight">Tổng tiền:</h3>
								</label>
							</div>
							<div className="col-sm-4">
								<label className="input">
								<h3 className="fontWeight">
								
								</h3>
								</label>
							</div>
							</div>
						</JarvisWidget>
						}
					</div>
					</div>
					{/* footer */}
					<div class="page-footer">
						<div class="row">
							<div class="col-xs-12 col-sm-6"><span class="txt-color-white">Power by © PPMS.VN</span></div>
							<div class="col-xs-6 col-sm-6 text-right hidden-xs">
								<div class="txt-color-white inline-block"><i class="txt-color-blueLight hidden-mobile">Last account activity <i class="fa fa-clock-o"></i> &nbsp; <strong>52 mins ago</strong> </i></div>
							</div>
						</div>
						</div>
				</div>
    );
  }
}

export default Connect(AddPage);
