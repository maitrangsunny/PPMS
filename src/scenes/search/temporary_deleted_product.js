import React, { Component } from 'react';
import {Modal, Button, Panel} from "react-bootstrap";
import Connect from '../../stores/connect';
import JarvisWidget from '../../components/jarvis_widget';
import Loading from '../../components/loading';
import Utils from "../../utils";
import UiDatepicker from "../../components/forms/date_picker";
import Moment from 'moment';
import _ from 'lodash';

class TemporaryDeletedProduct extends Component{
    constructor(props) {
        super(props);
        this.state = {
          loading: false,			
          data: [],            
          listSelect: [],
          searchList: [],
          keyword: ""
        }  
    }

    componentWillReceiveProps(nextProps){             

        if (nextProps.product.searchProductList && nextProps.product.searchProductList.status == 200) {
              this.setState({
            data: nextProps.product.searchProductList.data,
            loading: false,
              });
        }
        
        if (
            nextProps.product.deleteTempProduct &&
            nextProps.product.deleteTempProduct.status == 200 &&
            !nextProps.product.flagDeleteTempProduct
        ) {
				nextProps.actions.product.setFlagDeleteTempProduct();				
				this.props.actions.product.searchListProduct(
					this.props.storage.token,
					this.state.keyword
				);
        }
	}

	deletedProduct() {
		this.props.actions.product.deletedTempProduct(
			this.props.storage.token,
			this.state.listSelect,
		);
	}

	async searchList(){	
		if(this.state.keyword.length>=2){
			this.setState({loading: true});
			await	this.props.actions.product.searchListProduct(
				this.props.storage.token,
				this.state.keyword
			);
		}else{
			alert("Nhập từ khóa từ 2 ký tự trở lên!")
    }
		
	}

    format2(n, currency) {
        return (
          n.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, "$1,") + " " + currency
        );
      }
    
	NumberList(data) {
		const listItems = data.map((item, index) => this.itemList(item, index));
		return <div>{listItems}</div>;
	}
    
    itemList(item, index) {
        let flag = this.state.listSelect.indexOf(item.id) > -1;
        if (flag) {
          return (
            <div
              className="product-list active"
              key={index}
              onClick={() => this.selectCate(index, item.id)}
            >
              <p style={{ width: 100 }}>{index + 1}</p>
              <p style={{ fontWeight: "300", flex: 1 }}>{item.name}</p>
              <p style={{ flex: 1 }}>
                {this.format2(parseInt(item.price), "VNĐ")}
              </p>          
              <p style={{ flex: 1 }}>
                {Utils.getTime(parseInt(item.created_at))}
              </p>
              <span className="glyphicon">&#xe067;</span>
            </div>
          );
        }
        return (
          <div
            onClick={() => this.selectCate(index, item.id)}
            className="product-list"
            key={index}
          >
            <p style={{ width: 100 }}>{index + 1}</p>
            <p style={{ fontWeight: "300", flex: 1 }}>{item.name}</p>
            <p style={{ flex: 1 }}>{this.format2(parseInt(item.price), "VNĐ")}</p>           
            <p style={{ flex: 1 }}>{Utils.getTime(parseInt(item.created_at))}</p>
            <p>
              <span className="glyphicon glyphicon-unchecked" />
            </p>
          </div>
        );
      }
    
    selectCate(index, id) {
        let arrayData = this.state.data.slice();
        let arraySelect = this.state.listSelect.slice();
    
        let tempFlag = arrayData[index].is_check || false;
        arrayData[index].is_check = !tempFlag;
    
        let position = arraySelect.indexOf(id);
        if (position > -1) {
          arraySelect.splice(position, 1);
        } else {
          arraySelect.push(id);
        }
        this.setState({ listSelect: arraySelect, data: arrayData });
    }
    
    render(){     
		const inputStyle = {
			padding: '0 10px',
			boxSizing : 'border-box'
		}  	
        return(
            <div id="content">
            <Loading loading={this.state.loading} />
			<div className="panel panel-heading">
				<h1 className="page-title txt-color-blueDark">Xóa thuốc</h1>
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
						<label className="col-xs-12 text-center" style={{"paddingBottom":'10px'}}>Vui lòng nhập từ khóa từ 2 ký tự trở lên.</label>													<div className="form-group form-group--search">							
							<label className="col-xs-12 col-md-3 col-sm-3 control-label">Tên thuốc</label>
							<div className="col-xs-12 col-md-5 col-sm-5">							
								<input className="col-xs-12 form-control"
										name="keyword"
										style={inputStyle}		
										value={this.state.keyword}
                    placeholder="Từ khóa..."		
                    onChange={e =>
                      this.setState({ keyword: e.target.value})
                    }   				
								/>				
							</div>
							<div className="col-xs-12 col-md-4 col-sm-4">
								<button type="button" 
								style = {{"marginLeft":"5px", 'padding':'6px'}} 
								className="btn btn-primary btn-sm"
								onClick={()=>this.searchList()}
								>Tìm kiếm</button>
							</div>							
							</div>					
						</fieldset>					
					</form>
					</div>
				</div>
			</JarvisWidget>	
			</div>
            <div className="row">
              <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                <h1 className="page-title txt-color-blueDark">
                    Xóa thuốc
                </h1>
              </div>
              <div className="col-xs-12 col-sm-5 col-md-5 col-lg-8">
                <ul id="sparks" className="">                 
                  <li
                    onClick={() => this.deletedProduct()}
                    className="sparks-info"
                  >
                    <button type="button" className="btn btn-danger btn-lg">
                      Xóa
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <JarvisWidget editbutton={false} color="darken">
              <header>
                <span className="widget-icon">
                  <i className="fa fa-table" />
                </span>
                <h2>Danh sách</h2>
              </header>
              <div>
                <div className="custom-table-bill">				
					{this.NumberList(this.state.data)}
                </div>
              </div>
            </JarvisWidget>
          </div>
        )
    }
}
export default Connect(TemporaryDeletedProduct)