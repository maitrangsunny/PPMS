import React, {
    Component
} from 'react';
import serialize from 'form-serialize';
import Connect from '../../../stores/connect';
import JarvisWidget from '../../../components/jarvis_widget';
import Paginate from '../../../components/paginate';

import Utils, {
    LINK
} from "../../../utils";
import { Link } from 'react-router-dom';
class CampaignList extends Component {
    constructor(props) {
        super(props);
        this.query = Utils.parseQuery(this.props.router.location.search);
        this.state = {
            title: this.query['t'],
            isActive: true,
            limit: this.query['l'] || 20,
            page: parseInt(this.query['p']) || 1,
        }
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    handleDelete(campaignId) {


    }


    render() {
        return (
            <div id="content">
                <div className="row">
                    <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                        <h1 className="page-title txt-color-blueDark">
                            Danh sách chiến dịch
                        </h1>
                    </div>
                    <div className="col-xs-12 col-sm-5 col-md-5 col-lg-8">
                        <ul id="sparks" className="">
                            <li className="sparks-info">
                                <Link to={Utils.link(LINK.CAMPAIGN, "them-moi-chien-dich")}
                                    className="btn btn-success btn-lg">
                                    Thêm mới chiến dịch
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <JarvisWidget editbutton={false} custombutton={false}>
                    <header>
                        <span className="widget-icon"> <i className="fa fa-edit" /> </span>

                        <h2>Tìm kiếm chiến dịch</h2>
                    </header>
                    <div>
                        {/* widget content */}
                        <div className="widget-body no-padding">
                            <form className="smart-form" id="search">
                                <fieldset>
                                    <div className="row">
                                        <div className="col col-xs-6">
                                            <div className="form-group">
                                                <label className="input">
                                                    <input type="text" placeholder="Tên chiến dịch" defaultValue={this.state.title}
                                                        className="form-control"
                                                        name="name"
                                                        onChange={e => this.setState({ title: e.target.value })} />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </fieldset>
                                <footer>
                                    <Link to={Utils.link(LINK.CAMPAIGN, "danh-sach", {
                                        title: this.state.title,
                                        limit: this.state.limit,
                                        page: 1
                                    })} type="submit" className="btn btn-primary">
                                        Tìm kiếm
                                    </Link>
                                </footer>
                            </form>
                        </div>
                    </div>
                </JarvisWidget>
                <JarvisWidget editbutton={false} color="darken">
                    <header>
                        <span className="widget-icon"> <i className="fa fa-table" /> </span>
                        <h2>Danh sách chiến dịch</h2>
                    </header>
                    <div>
                        <div className="widget-body no-padding">

                            <div className="table-responsive">

                                <table className="table table-bordered table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>STT</th>
                                            <th>Tên Chiến Dịch</th>
                                            <th>Trang thái</th>
                                            <th>Thơi gian bắt đầu</th>
                                            <th>Thời gian kết thúc</th>
                                            <th>Ngày khởi tạo khởi tạo</th>
                                            <th>Báo cáo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.props.campaign.list.length > 0 && this.props.campaign.list.map((campaign, i) => (
                                                <tr key={i}>
                                                    <td>{(this.state.page - 1) * this.state.limit + i}</td>
                                                    <td><Link
                                                        to={Utils.link(LINK.CAMPAIGN, "chi-tiet/" + campaign.campaignId)}>{campaign.title}</Link>
                                                    </td>
                                                    <td>{campaign.status}</td>
                                                    <td>
                                                        {Utils.formatDate(campaign.fromAt)}
                                                    </td>
                                                    <td>
                                                        {Utils.formatDate(campaign.toAt)}
                                                    </td>
                                                    <td>
                                                        {Utils.formatDate(campaign.createdAt)}
                                                    </td>
                                                    <td><Link to={Utils.link(LINK.CAMPAIGN, "bao-cao/" + campaign.id)}><i
                                                        className="fa fa-line-chart"
                                                        aria-hidden={true}></i></Link>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>

                                </table>

                            </div>

                        </div>
                    </div>
                </JarvisWidget>
            </div>
        )
    }
}

export default Connect(CampaignList);