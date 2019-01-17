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
            showError: false,
            data: [],            
            listSelect: [],
            isEnable: null
        }  
    }

    async componentWillMount(){
        this.setState({loading: true});
        // await this.props.actions.authenticate.getAllProduct(
        //     this.props.storage.token
        // );
        await this.props.actions.authenticate.listOutler(
			this.props.storage.token
		);
    }

    componentWillReceiveProps(nextProps){
        // if (nextProps.authenticate.allProduct && nextProps.authenticate.allProduct.status == 200) {
		// 	this.setState({
		// 		data: nextProps.props.authenticate.allProduct.data,
		// 		loading: false,
        //     });
        // }	
        
        if (nextProps.authenticate.listOutlet && nextProps.authenticate.listOutlet.status == 200) {
          this.setState({
            data: nextProps.authenticate.listOutlet.data,
            loading: false,
          });
        }	
        
        if (
            nextProps.product.deleteTempProduct &&
            nextProps.product.deleteTempProduct.status == 200 &&
            !nextProps.product.flagDeleteTempProduct
          ) {
            nextProps.actions.product.setFlagDeleteTempProduct();
            this.setState({  
				data: nextProps.product.deleteTempProduct.data,
            });
          }
    }
	deletedProduct() {
		this.props.actions.product.deletedTempProduct(
		  this.props.storage.token,
		  this.state.listSelect,
		);
	}
    format2(n, currency) {
        return (
          n.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, "$1,") + " " + currency
        );
      }
    
	NumberList(data) {
		console.log(data);
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
              {/* <h5 style={{ flex: 1 }}>{item.outlet.name}</h5> */}
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
            {/* <h5 style={{ flex: 1 }}>{item.outlet.name}</h5> */}
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
        return(
            <div id="content">
            <Loading loading={this.state.loading} />
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