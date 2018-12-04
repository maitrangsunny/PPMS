import React, { Component } from "react";
import Modal from "react-modal";
import Connect from "../../../stores/connect";
import JarvisWidget from "../../../components/jarvis_widget";
import SuggesEditext from "../../../components/suggestCustomer";
import Paginate from "../../../components/paginate";
import Autosuggest from "react-autosuggest";
import UiDatepicker from "../../../components/forms/date_picker";
import Loading from "../../../components/loading";
import Utils, { BIGBOX, LINK } from "../../../utils";
import { Link } from "react-router-dom";
import index from "../../../stores/states/authenticate/index";
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

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => <span>{suggestion.name}</span>;

class WidgetList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numChildren: 0,
      value: "",
      suggestions: [],
      nameCustomer: "",
      phoneCustomer: "",
      dateCustomer: "",
      addressCustomer: "",
      noteCustomer: "",
      idThuoc: 0,
      tenthuoc: "",
      gia: 0,
      soluong: 1,
      thanhtien: "",
      ghichu: "",
      bill: [],
      modalIsOpen: false,
      tongtien: 0,
      editbill: false,
      loading: false,
      idBill: 0,
      modalThemThuoc: false,
      listCustomer: [],
      idCustomer: 0,
      idBillSuccess: 0,
      selectItem: null,
      listOutlet: [],

      soluongEdit: 0,
	  giaEdit: 0,

	  payment: 1,
	  rest: 1,
	  dateExpired: ""
    };
    this.submitDonThuoc = this.submitDonThuoc.bind();
    this.submitBill = this.submitBill.bind();
    this.openModal = this.openModal.bind();
	this.handleKeyDown = this.handleKeyDown.bind();
    this.onForCus = this.onForCus.bind();
  }

  getTime(time) {
    var maxDate = new Date(time * 1000);
    var maxDateFormatted =
      this.pad(maxDate.getMonth() + 1, 2, "0") +
      "/" +
      this.pad(maxDate.getDate(), 2, "0") +
      "/" +
      +maxDate.getFullYear();
    return maxDateFormatted;
  }

  pad(s, width, character) {
    return new Array(width - s.toString().length + 1).join(character) + s;
  }

  validateNumberField(val) {
	var pattern = /^([0-9]\d*)?$/;
	// reg = /^\d+$/;
	return pattern.test(val);
  }

  async componentWillMount() {
    await this.props.actions.authenticate.getAllCustomer(
      this.props.storage.token
    );
    await this.props.actions.authenticate.getAllProduct(
      this.props.storage.token
    );
    await this.props.actions.authenticate.listOutler(
      this.props.storage.token
    );
    if (this.props.id) {
      this.setState({ loading: true });
      await this.props.actions.authenticate.getDetailOrder(
        this.props.storage.token,
        this.props.id,
        "edit"
      );
      this.setState({ idBill: this.props.id, editbill: true, loading: false });
    }
    await this.props.actions.storage.getListBill();

    if (this.props.storage.dataProduct) {
      this.setState({
        nameCustomer: this.props.storage.dataProduct.name,
        phoneCustomer: this.props.storage.dataProduct.phone || 0,
        addressCustomer: this.props.storage.dataProduct.address || "",
        noteCustomer: this.props.storage.dataProduct.note || "",
        bill: this.props.storage.dataProduct.po_product || [],
        idCustomer: this.props.storage.dataProduct.id || 0,
        tongtien: this.props.storage.dataProduct.tongtien || 0,
		dateCustomer: this.props.storage.dataProduct.date || "",
      });
    }
  }

  async componentWillReceiveProps(nextProps) {
    if (
      nextProps.authenticate.detailOrder &&
      nextProps.authenticate.detailOrder.status == 200 &&
      !nextProps.authenticate.flagDetailBill
    ) {
	  let data = nextProps.authenticate.detailOrder.data;
	  
      await this.setState({
        noteCustomer: data.note,
        addressCustomer: data.address,
        dateCustomer: this.getTime(data.delivery_date),
        phoneCustomer: data.phone,
        nameCustomer: data.name,
        bill: data.po_product,
        loading: false,
        tongtien: data.amount,
      });
      nextProps.actions.authenticate.setFlagDetailBill(true);
    }
    if (
      nextProps.authenticate.allCustomer &&
      nextProps.authenticate.allCustomer.status == 200
    ) {
      this.setState({
        listCustomer: nextProps.authenticate.allCustomer.data,
      });
    }
    if (
      nextProps.authenticate.listOutlet &&
      nextProps.authenticate.listOutlet.status == 200
    ) {
      this.setState({
        listOutlet: nextProps.authenticate.listOutlet.data,
      });
    }
    if (
      nextProps.product.submitBill &&
      nextProps.product.submitBill.status == 200 &&
      !nextProps.product.flagSubmitBill
    ) {
      nextProps.actions.product.setFlagSubmitBill(true);
      this.setState({
        modalIsOpen: true,
        loading: false,
        idBillSuccess: nextProps.product.submitBill.data.id,
      });
      this.saveNewCustomer();
      nextProps.actions.storage.clearListBill(true);
    }
    if (
      nextProps.product.updateProduct &&
      nextProps.product.updateProduct.status == 200 &&
      !nextProps.product.flagUpdateProduct
    ) {
      nextProps.actions.product.setFlagUpdateProduct(true);
      this.setState({
        loading: false,
	});
      this.props.actions.authenticate.getAllProduct(this.props.storage.token);
    }
    if (
      nextProps.product.editBill &&
      nextProps.product.editBill.status == 200 &&
      !nextProps.product.flagEditBill
    ) {
      nextProps.actions.product.setFlagEditBill(true);
      this.setState({
        modalIsOpen: true,
        loading: false,
        editbill: false,
        idBillSuccess: nextProps.product.editBill.data.id,
      });
      nextProps.actions.storage.clearListBill(true);
    }
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
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

  afterOpenModal = () => {
    this.subtitle.style.color = "#f00";
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
      bill: [],
      nameCustomer: "",
      phoneCustomer: "",
      addCustomer: "",
      noteCustomer: "",
      tongtien: 0,
    });
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
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
    event,
    { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }
  ) => {
    this.setState({
      tenthuoc: suggestion.name,
      gia: parseInt(suggestion.price),
      idThuoc: suggestion.id,
    });
  };

  handleSave = () => {
    let data = {
      phone: this.state.phoneCustomer,
      address: this.state.addressCustomer,
      tongtien: this.state.tongtien,
      note: this.state.noteCustomer,
      po_product: this.state.bill,
	  date: this.state.dateCustomer,
    };
    this.setState({ nameCustomer: this._inputName.value });
    this.props.actions.storage.setListBill(data);
  };

  async saveNewCustomer() {
    if (this.state.idCustomer == 0) {
      this.props.actions.authenticate.addCustomer(
        this.props.storage.token,
        this.state.nameCustomer,
        this.state.addressCustomer,
        "",
        this.state.phoneCustomer,
		this.state.noteCustomer,		
      );
      this.setState({ idCustomer: null });
    }
  }

  submitBill = () => {
	  console.log(this.props);
    this.setState({ loading: true });
    this.props.actions.product.submitBill(
      this.props.storage.token,
      this.state.addressCustomer,
      this.state.idCustomer || 0,
      this.state.dateCustomer,
      this.state.nameCustomer,
      this.state.tongtien + "",
      this.state.noteCustomer,
      this.state.phoneCustomer,
	  this.state.bill,
	  this.state.payment,
	  this.state.rest,
	  this.state.dateExpired
    );
  };

  editBill = () => {
    this.setState({ loading: true });
    this.props.actions.product.editBill(
      this.props.storage.token,
      this.state.idBill,
      this.state.addressCustomer,
      this.state.nameCustomer,
      this.state.dateCustomer,
      this.state.tongtien + "",
      this.state.noteCustomer,
      this.state.phoneCustomer,
      this.state.bill
    );
  };

  handleKeyDown = e => {
    if (e.keyCode == 9) {
      if (this.state.gia == "") {
        alert("Giá không để trống");
        return;
	  }
	  if(this.state.payment == "" || this.state.rest == ""){
		alert("Vui lòng nhập giá trị!");
		return;
		}
      if (this.state.soluong == "") {
        alert("Số lượng không để trống");
        return;
	  } else {
        this.setState({ tenthuoc: this._input.value });
        this.props.actions.product.updateProduct(
          this.props.storage.token,
          this.state.gia + "",
          this.state.idThuoc
        );
        let thuoc = {
          name: this._input.value,
          price: this.state.gia + "",
          quantity: this.state.soluong,
          product_id: this.state.idThuoc,
          amount: parseInt(this.state.soluong) * parseInt(this.state.gia) + "",
          note: this.state.ghichu,
        };
        this.checkThemThuocMoi();
        let tong = parseInt(thuoc.amount);
        let array = this.state.bill.slice();
        array.push(thuoc);
        this.setState({
          bill: array,
        });
        this.setState({
          tenthuoc: "",
          gia: 0,
          soluong: 1,
          thanhtien: 0,
          ghichu: "",
          value: "",
          idThuoc: 0,
          tongtien: parseInt(this.state.tongtien) + parseInt(tong),
        });
        setTimeout(
          () =>
            this.messagesEnd.scrollIntoView({
              behavior: "instant",
              block: "end",
              inline: "nearest",
            }),
          1000
        );
      }
	}
		 
	if ((!e.shiftKey && (e.keyCode < 48 || e.keyCode > 57)) || (e.keyCode < 96 || e.keyCode > 105)) {
		e.preventDefault();
	}
  };

  submitDonThuoc = () => {
	  console.log("submitDonThuoc",this.props)
    if (this.state.gia == "") {
      alert("Giá không để trống");
      return;
    }
    if (this.state.soluong == "") {
      alert("Số lượng không để trống");
      return;
    } else {
      this.props.actions.product.updateProduct(
        this.props.storage.token,
        this.state.gia + "",
        this.state.idThuoc
      );
      let thuoc = {
        name: this._input.value,
        price: this.state.gia + "",
        quantity: this.state.soluong,
        product_id: this.state.idThuoc,
        amount: parseInt(this.state.soluong) * parseInt(this.state.gia),
        note: this.state.ghichu,
      };
	  this.checkThemThuocMoi();
      let tong = parseInt(thuoc.amount);
      let array = this.state.bill.slice();
      array.push(thuoc);
      this.setState({
        bill: array,
      });
      this.setState({
        tenthuoc: "",
        donvi: "",
        gia: 0,
        soluong: 1,
        thanhtien: 0,
        ghichu: "",
        value: "",
        idThuoc: 0,
        tongtien: parseInt(this.state.tongtien) + parseInt(tong),
      });
      setTimeout(
        () =>
          this.messagesEnd.scrollIntoView({
            behavior: "instant",
            block: "end",
            inline: "nearest",
          }),
        1000
      );
    }
  };

  onForCus = () => {
    this._input.focus();
  };

  async checkThemThuocMoi() {
    if (this.state.idThuoc == 0) {
      await this.props.actions.product.addProduct(
        this.props.storage.token,
        this._input.value,
        this.state.gia + "",
        this.state.soluong
      );

      this.props.actions.authenticate.getAllProduct(this.props.storage.token);
    }
  }

  dataReturn = value => {
    this.setState({
      nameCustomer: value.name,
      phoneCustomer: value.phone || 0,
      addressCustomer: value.address || "",
      noteCustomer: value.note || "",
      idCustomer: value.id || 0,
    });
  };

  deleteThuoc(index) {
    let arrayClone = this.state.bill.slice();
    let amount = 0;
    if (index > -1) {
      arrayClone.splice(index, 1);
    }
    for (let i = 0; i < arrayClone.length; i++) {
      amount += parseInt(arrayClone[i].amount);
    }
    this.setState({ bill: arrayClone, tongtien: amount });

    this.handleSave();
  }

  format2(n, currency) {
    return (
      n.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, "$1,") + " " + currency
    );
  }

  format3(n) {
    return n.toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, "$1,");
  }

  updateProduct(id, price) {
    this.props.actions.product.updateProduct(
      this.props.storage.token,
      price,
      id
    );
  }

  onCreditCardChange(event) {}

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Tên thuốc",
      value,
      onChange: this.onChange,
    };

    const children = [];
    for (var i = 0; i < this.state.numChildren; i += 1) {
      children.push(this.renderChildern());
    }
    return (
      <div id="content">
        <div className="row">
          <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
            <h1 className="page-title txt-color-blueDark">Tạo Đơn Hàng</h1>
          </div>
          <div className="col-xs-12 col-sm-5 col-md-5 col-lg-8">
            <ul id="sparks" className="">
              <li className="sparks-info">
                <button
                  onClick={() => {
                    this.state.editbill ? this.editBill() : this.submitBill();
                  }}
                  type="button"
                  className="btn btn-success btn-lg"
                >
                  {this.state.editbill ? "Lưu chỉnh sửa" : "Tạo mới"}
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
                  <div className="col col-md-4 col-sm-4 col-xs-4">
                    <label className="input">
                      <h3>Tên khách hàng:</h3>
                      <SuggesEditext
                        dataReturn={data => this.dataReturn(data)}
                        languages={this.state.listCustomer}
                        renderInputComponent={inputProps => (
                          <input
                            {...inputProps}
                            ref={c => (this._inputName = c)}
                          />
                        )}
                        value={this.state.nameCustomer || ""}
                      />
                    </label>
                  </div>

                  <div className="col col-md-4 col-sm-4 col-xs-4">
                    <label className="input">
                      <h3>Số điện thoại:</h3>
                      <input
                        type="number"
                        name="t"
                        onBlur={this.handleSave}
                        placeholder="Số điện thoại"
                        id="one"
                        value={this.state.phoneCustomer}
                        onChange={e =>
                          this.setState({ phoneCustomer: e.target.value })
                        }
                      />
                    </label>
                  </div>

                  <div className="col col-md-4 col-sm-4 col-xs-4">
                    <label className="input">
                      <h3>Ngày giao hàng :</h3>
                      <UiDatepicker
                        type="text"
                        name="finishdate"
                        id="finishdate"
                        maxRestrict="#startdate"
                        placeholder="Ngày giao hàng"
                        data-date-format="dd/mm/yy"
                        value={this.state.dateCustomer}
                        onChange={e =>
                          this.setState({ dateCustomer: e.target.value })
                        }
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
                        onBlur={this.handleSave}
                        name="t"
                        placeholder="Địa chỉ"
                        value={this.state.addressCustomer}
                        onChange={e =>
                          this.setState({ addressCustomer: e.target.value })
                        }
                      />
                    </label>
                  </div>
                </div>

                <div className="row input-order ">
                  <div className="col col-lg-12 col-sm-12 col-xs-12">
                    <label className="input">
                      <h3>Ghi chú :</h3>
                      <input
                        type="text"
                        onBlur={this.handleSave}
                        name="t"
                        placeholder="Ghi chú"
                        id="one"
                        value={this.state.noteCustomer}
                        onChange={e =>
                          this.setState({ noteCustomer: e.target.value })
                        }
                      />
                    </label>
                  </div>
                </div>
				<div className="row input-order">
                  <div className="col col-md-4 col-sm-4 col-xs-4">
                    <label className="input">
                      <h3>Payment:</h3>
                      <input
                        type="text"
                        name="payment"
                        placeholder="Payment"
                        id="txtPayment"                       
						value={this.state.payment}     
						// onKeyDown={this.handleKeyDown} 
                        onChange={e =>
                          this.setState({ payment: e.target.value })
                        }             
                      />
                    </label>
                  </div>
                  <div className="col col-md-4 col-sm-4 col-xs-4">
                    <label className="input">
                      <h3>Rest:</h3>
					  <input
                        type="text"
                        name="rest"
                        placeholder="Rest"
                        id="txtRest"                        
						value={this.state.rest}     
						onChange={e =>
							this.setState({ rest: e.target.value })
						}                    
                      />
                    </label>
                  </div>
                  <div className="col col-md-4 col-sm-4 col-xs-4">
                    <label className="input">
                      <h3>Expired :</h3>
                      <UiDatepicker
                        type="text"
                        name="dateExpired"
                        id="dateExpired"
                        maxRestrict="#startdate"
                        placeholder="Expired"
                        data-date-format="dd/mm/yy"
                        value={this.state.dateExpired}
                        onChange={e =>
                          this.setState({ dateExpired: e.target.value })
                        }
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
                    <label className="input">
                      <h3>Tên thuốc :</h3>
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
                          <input {...inputProps} ref={c => (this._input = c)} />
                        )}
                      />
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
                        onBlur={this.handleSave}
                        value={this.state.soluong}
                        onChange={e =>
                          this.setState({
                            soluong: e.target.value,
                            thanhtien: this.state.gia * e.target.value,
                          })
                        }
                      />
                    </label>
                  </div>

                  <div className="col col-md-2 col-sm-2 col-xs-2">
                    <label className="input">
                      <h3>Giá :</h3>
                      <Cleave
                        placeholder="Giá thuốc"
                        options={{
                          numeral: true,
                          numeralThousandsGroupStyle: "thousand",
                        }}
                        onKeyDown={this.handleKeyDown}
                        onFocus={this.onCreditCardFocus}
                        // onFocus={() => this.checkThemThuocMoi()}
                        // onBlur={() => this.checkThemThuocMoi()}
                        onChange={e => {
                          this.setState({
                            gia: e.target.rawValue,
                            thanhtien: e.target.rawValue * this.state.soluong,
                          });
                        }}
                        value={parseInt(this.state.gia)}
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
                        options={{
                          numeral: true,
                          numeralThousandsGroupStyle: "thousand",
                        }}
                        onFocus={() => this.onForCus()}
                        onBlur={this.handleSave}
                        onChange={e =>
                          this.setState({ thanhtien: e.target.rawValue })
                        }
                        value={this.state.gia * this.state.soluong}
                      />
                    </label>
                  </div>
                </div>
                <footer>
                  <button
                    type="button"
                    onClick={() => this.submitDonThuoc()}
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
                        {this.state.bill.map((item, index) =>
                          this.renderItem(item, index)
                        )}
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
                    {this.format2(parseInt(this.state.tongtien), "VND")}
                  </h3>
                </label>
              </div>
            </div>
          </JarvisWidget>
        }
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              alignSelf: "center",
            },
            content: {
              position: "absolute",
              top: "10%",
              left: "40%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              border: "1px solid #ccc",
              background: "#fff",
              overflow: "auto",
              WebkitOverflowScrolling: "touch",
              borderRadius: "4px",
              outline: "none",
              padding: "20px",
            },
          }}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          <div>
            <h4>Tên : {this.state.nameCustomer}</h4>
            <h4>Địa chỉ : {this.state.addressCustomer}</h4>
            <h4>Số điện thoại : {this.state.phoneCustomer}</h4>
            <h4>Ngày đặt hàng : {this.state.dateCustomer}</h4>
            <h4>Ghi chú : {this.state.noteCustomer}</h4>
            <h4 ref={subtitle => (this.subtitle = subtitle)}>
              Chi tiết đơn đặt hàng
            </h4>
            <div className="custom-table-list-bill">
              <table className="table table-bordered table-striped table-hover">
                <thead>
                  <tr>
                    <th>Tên</th>
                    <th>Số lượng</th>
                    <th>Giá</th>
                    <th>Thành tiền</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.bill && this.state.bill
                    ? this.state.bill.map((item, index) => (
                        <tr key={index}>
                          <th>{item.name}</th>
                          <th>{item.quantity}</th>
                          <th>{this.format3(parseInt(item.price))}</th>
                          <th>{this.format3(parseInt(item.amount))}</th>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
            <h2>
              Tổng tiền đơn hàng :{" "}
              {this.format2(parseInt(this.state.tongtien), "VND")}
            </h2>
            <Link
              className="btn btn-info col-xs-offset-2"
              to={Utils.link(LINK.PRINT, this.state.idBillSuccess)}
            >
              In Đơn Hàng
            </Link>
          </div>
        </Modal>
        <Loading loading={this.state.loading} />
      </div>
    );
  }

  renderItem(item, index) {
    if (index == this.state.selectItem) {
      return (
        <tr key={index}>
          <th>{index + 1}</th>
          <th>{item.name}</th>
          <th>
            <input
              defaultValue={this.state.soluongEdit}
              onChange={e => this.setState({ soluongEdit: e.target.value })}
            />
          </th>
          <th>
            {/* <input
              defaultValue={this.format2(parseInt(this.state.giaEdit), "VND")}
              onChange={e => this.setState({ giaEdit: e.target.value })}
            /> */}
            <Cleave
              options={{
                numeral: true,
                numeralThousandsGroupStyle: "thousand",
              }}
              onChange={e => this.setState({ giaEdit: e.target.rawValue })}
              value={parseInt(this.state.giaEdit)}
            />
          </th>
          <th>
            {this.format2(
              parseInt(this.state.soluongEdit * this.state.giaEdit),
              "VND"
            )}
          </th>
          <th>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => this.selectEdit(index, item, "save")}
            >
              Lưu
            </button>
          </th>
        </tr>
      );
    }
    return (
      <tr key={index}>
        <th>{index + 1}</th>
        <th>{item.name}</th>
        <th>{item.quantity}</th>
        <th>{this.format2(parseInt(item.price), "VND")}</th>
        <th>{this.format2(parseInt(item.amount), "VND")}</th>
        <th>
          <button
            type="button"
            className="btn btn-success col-xs-offset-1"
            onClick={() => this.deleteThuoc(index)}
          >
            Xóa
          </button>

          <button
            type="button"
            className="btn btn-warning col-xs-offset-1"
            onClick={() => this.selectEdit(index, item, "edit")}
          >
            Chỉnh sửa
          </button>
        </th>
      </tr>
    );
  }

  selectEdit(index, item, type) {
    if (type == "edit") {
      this.setState({
        selectItem: index,
        soluongEdit: item.quantity,
        giaEdit: item.price,
      });
    } else if (type == "save") {
      let listBill = this.state.bill.slice();
      let value = listBill.indexOf(item);
      let amount = 0;
      if (value != -1) {
        listBill[index].quantity = parseInt(this.state.soluongEdit);
        listBill[index].price = this.state.giaEdit;
        listBill[index].amount =
          parseInt(this.state.giaEdit * this.state.soluongEdit) + "";
      }
      for (let i = 0; i < listBill.length; i++) {
        amount += parseInt(listBill[i].amount);
      }
      this.setState({ bill: listBill, selectItem: null, tongtien: amount });
    }
  }
}

export default Connect(WidgetList);
