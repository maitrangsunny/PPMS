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

class DebtList extends Component {
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
  }

  render() {

    return (
		<div>
			abd
		</div>
	)
  }
}

export default Connect(DebtList);
