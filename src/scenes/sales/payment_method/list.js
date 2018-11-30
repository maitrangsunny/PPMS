import React, {
    Component
} from 'react';

import Connect from '../../../stores/connect';
import Utils, {
    BIGBOX,
    LINK
} from "../../../utils/index";
import {Link} from 'react-router-dom';
import JarvisWidget from '../../../components/jarvis_widget';
import Paginate from '../../../components/paginate';
class PaymentMethodList extends Component {
    constructor(props) {
        super(props);
        this.query = Utils.parseQuery(this.props.router.location.search);
        // console.log(this.props.router);
        this.state = {
            title: '',
            limit: this.query['l'] || 20,
            page: parseInt(this.query['p']) || 1,

        };
    }
    componentWillMount() {

    }
    
    componentWillReceiveProps(nextProps) {
    }

    handleDelete(id){
        Utils.confirmBox("Xoá nội dung", "Bạn có muốn xoá nội dung này", () => {
            this.props.actions.paymentMethod.requestDelete(id, this.props.storage.token);
        })
    }

    render() {

        return (
            <div id="content">
                <div className="row">
                    <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                        <h1 className="page-title txt-color-blueDark">
                            Danh sách đơn vị vận chuyển
                        </h1>
                    </div>
                    <div className="col-xs-12 col-sm-5 col-md-5 col-lg-8">
                        <ul id="sparks" className="">
                            <li className="sparks-info">
                                <Link to={Utils.link(LINK.PAYMENT_METHOD, "them-moi")} className="btn btn-success btn-lg">
                                    Tạo mới
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                {/*<JarvisWidget editbutton={false} custombutton={false}>*/}
                    {/*<header>*/}
                        {/*<span className="widget-icon"> <i className="fa fa-edit"/> </span>*/}
                    {/*</header>*/}
                    {/*<div>*/}
                        {/*<div className="widget-body no-padding">*/}
                            {/*<form className="smart-form" id="search">*/}
                                {/*<fieldset>*/}
                                    {/*<section className="col col-4">*/}
                                        {/*<label className="input">*/}
                                            {/*<input type="text" placeholder="Phương thức thanh toán"*/}
                                                   {/*value={this.state.title}*/}
                                                   {/*className="form-control"*/}
                                                   {/*name="title"*/}
                                                   {/*onChange={e => this.setState({title: e.target.value})}/>*/}
                                        {/*</label>*/}
                                    {/*</section>*/}
                                {/*</fieldset>*/}
                                {/*<footer>*/}
                                    {/*<Link to={Utils.link(LINK.PAYMENT_METHOD, "danh-sach", {*/}
                                        {/*title: this.state.title,*/}
                                        {/*limit: this.state.limit,*/}
                                        {/*page: 1*/}
                                    {/*})} type="submit" className="btn btn-primary">*/}
                                        {/*Tìm kiếm*/}
                                    {/*</Link>*/}
                                {/*</footer>*/}
                            {/*</form>*/}
                        {/*</div>*/}
                    {/*</div>*/}
                {/*</JarvisWidget>*/}
                <JarvisWidget editbutton={false} color="darken">
                    <header>
                        <span className="widget-icon"> <i className="fa fa-table"/> </span>
                        <h2>Danh sách phương thức thanh toán</h2>
                    </header>
                    <div>
                        <div className="widget-body no-padding">

                            <div className="table-responsive">

                                <table className="table table-bordered table-striped table-hover">
                                    <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Phương thức thanh toán</th>
                                        <th>Hoạt động</th>
                                        <th>Ngày tạo</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.props.paymentMethod.list.length>0&&this.props.paymentMethod.list.map((paymentMethod,index)=>
                                            <tr key={"paymentMethod_list_"+paymentMethod.paymentMethodId}>
                                                <td>{(this.state.page-1)*this.state.limit+index}</td>
                                                <td><Link to={Utils.link(LINK.PAYMENT_METHOD,paymentMethod.paymentMethodId)}>{paymentMethod.title}</Link></td>
                                                <td>{
                                                    paymentMethod.isActive?<label className="label label-success">Đang hoạt động</label>:
                                                        <label className="label label-danger">Đóng</label>
                                                }</td>
                                                <td>{Utils.formatDate(paymentMethod.createdAt)}</td>
                                                <td><button onClick={()=>this.handleDelete(paymentMethod.paymentMethodId)}  className="btn btn-danger center-block">Xóa</button></td>
                                            </tr>)
                                    }
                                    </tbody>

                                </table>

                            </div>

                        </div>
                    </div>
                </JarvisWidget>
                <Paginate
                    activeClassName="active"
                    initialPage={this.state.page - 1}
                    forcePage={this.state.page - 1}
                    containerClassName="pagination pagination-lg"
                    pageCount={this.props.paymentMethod.total / 20}
                    hrefBuilder={(currentPage) => Utils.link(LINK.PAYMENT_METHOD, "danh-sach", {
                        page: currentPage,
                        title: this.state.title
                    })}
                />
            </div>
        )
    }
}

export default Connect(PaymentMethodList);