import React, {
    Component
} from 'react';

import Utils, {
    LINK
} from "../../../utils";
import { Link } from 'react-router-dom';
import Connect from '../../../stores/connect';
import JarvisWidget from '../../../components/jarvis_widget';
import Loading from '../../../components/loading';
import Paginate from '../../../components/paginate';
import serialize from 'form-serialize';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: '',
            email: '',
            address: '',
            note: '',
            loading: false
        };
    }

    async componentWillMount() {

    }

    componentDidMount() {
    };


    componentWillReceiveProps(nextProps) {
        if (nextProps.authenticate.addCustomer && nextProps.authenticate.addCustomer.status == 200) {
            this.setState({ name: '', phone: '', email: '', address: '', note: '', loading: false })
        }
    }

    submitCustomer() {
        if (this.state.name == '') {
            alert('Tên không được để trống')
        }
        else {
            this.setState({ loading: true })
            this.props.actions.authenticate.addCustomer(this.props.storage.token, this.state.name, this.state.address, this.state.email, this.state.phone, this.state.note)
        }
    }

    render() {
        return (
            <div id="content">
                <Loading loading={this.state.loading} />
                <div className="row">
                    <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                        <h1 className="page-title txt-color-blueDark">
                            Thêm khách hàng mới
                        </h1>
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
                                            <h3>Tên khách hàng :</h3>
                                            <input
                                                type="text" name="t" placeholder="Tên khách hàng" id="one"
                                                value={this.state.name}
                                                onChange={e => this.setState({ name: e.target.value })}
                                            />
                                        </label>
                                    </div>

                                    <div className="col col-md-4 col-sm-4 col-xs-4">
                                        <label className="input">
                                            <h3>Số điện thoại:</h3>
                                            <input
                                                type="number" name="t" placeholder="Số điện thoại" id="one"
                                                value={this.state.phone}
                                                onChange={e => this.setState({ phone: e.target.value })}
                                            />
                                        </label>
                                    </div>

                                    <div className="col col-md-4 col-sm-4 col-xs-4">
                                        <label className="input">
                                            <h3>Email</h3>
                                            <input
                                                type="text" name="t" placeholder="email" id="one"
                                                value={this.state.email}
                                                onChange={e => this.setState({ email: e.target.value })}
                                            />
                                        </label>
                                    </div>

                                </div>

                                <div className="row input-order">
                                    <div className="col col-lg-12 col-sm-12 col-xs-12">
                                        <label className="input">
                                            <h3>Địa chỉ :</h3>
                                            <input type="text" name="t" placeholder="Địa chỉ"
                                                value={this.state.address}
                                                onChange={e => this.setState({ address: e.target.value })}
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="row input-order ">
                                    <div className="col col-lg-12 col-sm-12 col-xs-12">
                                        <label className="input">
                                            <h3>Ghi chú :</h3>
                                            <input type="text" name="t" placeholder="Ghi chú" id="one"
                                                value={this.state.note}
                                                onChange={e => this.setState({ note: e.target.value })}
                                            />
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </JarvisWidget>
                <div className="col-xs-12 col-sm-5 col-md-5 col-lg-8">
                    <ul id="sparks" className="">
                        <li className="sparks-info">
                            <button onClick={() => this.submitCustomer()} type="button" className="btn btn-success btn-lg">
                                Tạo mới
                                </button>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default Connect(ProductList);