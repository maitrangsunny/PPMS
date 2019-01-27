import React, { Component } from "react";
import Modal from "react-modal";
import Connect from "../../../stores/connect";
import JarvisWidget from "../../../components/jarvis_widget";
import Autosuggest from "react-autosuggest";
import Loading from "../../../components/loading";
import Utils, { BIGBOX, LINK } from "../../../utils";
import { Link } from "react-router-dom";
import Cleave from "cleave.js/react";

import ToggleMenu from '../../../components/layout/toggle_menu';
import Header from '../../../components/layout/header';
import Ribbon from '../../../components/layout/ribbon'
import Footer from '../../../components/layout/footer'
import Shortcut from '../../../components/layout/navigation/shortcut';
import MinifyMenu from "../../../components/layout/navigation/minify_menu";
import LoginInfo from "../../../components/layout/navigation/login_info";
import NavMenu from "../../../components/layout/navigation/menu";

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

class StoreList extends Component {
   constructor(props) {
       super(props);
       this.state = {
            suggestions: []
	   }
	   this.data = {			
			"items": [
			{
				"_id": "actions",
				"title": "Đơn hàng",
				"icon": "fa fa-fw fa-tag",
			}
			]
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

     
    switchRoute(e){
        this.props.actions.app.navigate(Utils.link(LINK.ADD_CUSTOMER_PAGE));
    }
   
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
			<Header/>
				{/* menu bar */}
				<aside id="left-panel">
					{/* <div class="login-info">
						<span>
							<a href="#">
								<span>
								<h4>phu</h4>
								</span>
								<i class="fa fa-angle-down"></i>
							</a>
						</span>
					</div> */}
					<LoginInfo user={"ABC"} />
					<nav>
						<ul>
							<li class="">
								<a href="#" title="Đơn hàng"><i class="fa fa-fw fa-tag"></i> <span class="menu-item-parent">Đơn hàng</span> <b class="collapse-sign"><i class="glyphicon glyphicon-menu-right"></i></b></a>
								<ul>
									<li class=""><a title="Tạo đơn hàng" href=""><i class="fa fa-lg fa-fw fa-plus"></i> <span class="menu-item-parent">Tạo đơn hàng</span> </a></li>
								</ul>
							</li>
						</ul>						
					</nav>
					<MinifyMenu />
				</aside>
				{/* content */}
				<div id="main" role="main">
					<Ribbon />
					<div id="content">						
                        <div className="widget-body no-padding">
                            <div className="smart-form text-center smart-form_list" id="search">
                                <h3>Chọn tên cửa hàng</h3>
                                <label className="input"><input/>
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
                                <button 
                                        className="btn btn-common btn-green btn-lg bt-mg"
                                        onClick={e=>this.switchRoute(e)}
                                >Tiếp tục</button>
                            </div>
                        </div>
				    </div>
				</div>
				{/* footer */}
				<Footer/>
				<Shortcut />
		</div>
    );
  }
}

export default Connect(StoreList);
