import React, {
    Component
} from 'react';
import Utils, {
    BIGBOX,
    LINK
} from "../../../utils";
import { Link } from 'react-router-dom';
import Connect from '../../../stores/connect';
import Validate from '../../../components/forms/ui_validate';
import DatePicker from '../../../components/forms/date_picker';
import ClockPicker from '../../../components/forms/clock_picker';
import JarvisWidget from '../../../components/jarvis_widget';
import serialize from 'form-serialize';
const VALIDATION = {

    // Rules for form validation
    rules: {
        title: {
            required: true
        },
        publishFrom: {
            required: true,
        },
        timeFrom: {
            required: true,
        },
        publishTo: {
            required: true,
        },
        timeTo: {
            required: true,
        },

    },

    // Messages for form validation
    messages: {
        title: {
            required: 'Vui lòng nhập tên chiến dịch'
        },
        publishFrom: {
            required: 'Vui lòng chọn ngày bắt đầu',
        },
        publishTo: {
            required: 'Vui lòng chọn ngày hết hạn',
        },
        timeFrom: {
            required: 'Vui lòng chọn giờ bắt đầu',
        },
        timeTo: {
            required: 'Vui lòng chọn giờ hết hạn',
        }

    }

};

class PromotionAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            status: "",
            dateFrom: "",
            timeFrom: "",
            dateTo: "",
            timeTo: "",
            fromAt: "",
            toAt: ""
        };

    }

    componentWillReceiveProps(nextProps) {
        if (this.props.campaign.detail !== nextProps.campaign.detail) {
            let campaign = nextProps.campaign.detail;
            let fromAt = new Date(campaign.fromAt);
            let toAt = new Date(campaign.toAt);
            this.setState({
                title: campaign.title,
                status: campaign.status,
                dateFrom: Utils.formatDate(fromAt, 'date'),
                timeFrom: Utils.formatDate(fromAt, 'time'),
                dateTo: Utils.formatDate(toAt, 'date'),
                timeTo: Utils.formatDate(toAt, 'time'),
            });
        }
        if (this.props.campaign.status !== nextProps.campaign.status) {
            switch (nextProps.campaign.status) {
                case 1:
                    Utils.bigBox("Thành công", "Bạn đã tạo chiến dịch thành công", BIGBOX.SUCESS);
                    this.props.actions.app.navigate(Utils.link(LINK.CAMPAIGN, "danh-sach"));
                    break;
            }
        }
    }
    onSubmit(form) {

        let obj = serialize(form, { hash: true });

        // Obj


        let publishFrom = new Date();
        if (obj.publishFrom) {
            publishFrom = this._toISOString(obj.publishFrom, obj.timeFrom);
        }
        let publishTo = new Date();
        if (obj.publishTo) {
            publishTo = this._toISOString(obj.publishTo, obj.timeTo);
        }

        if (publishTo < publishFrom) {
            Utils.smallBox("Lỗi", "Ngày kết thúc không được sớm hơn ngày bắt đầu", BIGBOX.ERROR);
            return;
        }
        //
        // console.log(obj);
        // return false;
    }
    _toISOString(date, time) {
        let dateParse = date.split('/');
        let timeParse = time.split(':');

        let day = dateParse[0];
        let month = dateParse[1] - 1;
        let year = dateParse[2];

        let hour = timeParse[0];
        let min = timeParse[1];

        let d = new Date();
        d.setFullYear(year, month, day);
        d.setHours(hour, min, 0, 0);
        return d;
    }
    render() {
        return (
            <div id="content">
                <div className="row">
                    <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                        <h1 className="page-title txt-color-blueDark">
                            Tạo chiến dịch
                        </h1>
                    </div>
                </div>
                <JarvisWidget colorbutton={false} editbutton={false}
                    custombutton={false}>
                    <header>
                        <span className="widget-icon"> <i
                            className="fa fa-edit" /> </span>
                        <h2>Tạo chiến dịch</h2>
                    </header>
                    <div>
                        {/* widget content */}
                        <div className="widget-body no-padding">
                            <Validate options={{
                                ...VALIDATION,
                                submitHandler: this.onSubmit.bind(this)
                            }}>
                                <form id="campaignForm" className="smart-form"
                                    onSubmit={e => e.preventDefault()}
                                    noValidate="novalidate">
                                    <fieldset>
                                        <section className="form-group">
                                            <label className="label">Tên chiến dịch</label>
                                            <label className="input">
                                                <input type="text" className="form-control" name="title"
                                                    value={this.state.title}
                                                    onChange={e => this.setState({ title: e.target.value })}
                                                    placeholder="Tên chiến dịch" />
                                            </label>
                                        </section>
                                        <section className="form-group">
                                            <label className="label">Hoạt động</label>
                                            <label className="select">
                                                <select name="status" value={this.state.status}
                                                    onChange={e => this.setState({ status: e.target.value })}>
                                                    <option value="new">New</option>
                                                    <option value="active">Active</option>
                                                    <option value="stop">Stop</option>
                                                    <option value="expire">Expire</option>
                                                </select> <i />
                                            </label>
                                        </section>
                                        <section className="form-group">
                                            <label className="label">Từ ngày</label>
                                            <div className="row">
                                                <section className="col col-3">
                                                    <DatePicker
                                                        name="publishFrom" placeholder="Chọn ngày"
                                                        className="form-control datepicker col-sm-6"
                                                        dateFormat="dd/mm/yy" value={this.state.dateFrom}
                                                        onChange={e => this.setState({ dateFrom: e.target.value })}
                                                    />
                                                </section>
                                                <section className="col col-3">
                                                    <ClockPicker
                                                        name="timeFrom" placeholder="Chọn giờ"
                                                        className="form-control datepicker"
                                                        data-date-format="dd/mm/yy" value={this.state.timeFrom}
                                                        onChange={e => this.setState({ timeFrom: e.target.value })}
                                                    />
                                                </section>
                                            </div>
                                        </section>
                                        <section className="form-group">
                                            <label className="label">Đến ngày</label>
                                            <div className="row">
                                                <section className="col col-3">
                                                    <DatePicker
                                                        name="publishTo" placeholder="Chọn ngày"
                                                        className="form-control datepicker col-sm-6"
                                                        dateFormat="dd/mm/yy" value={this.state.dateTo}
                                                        onChange={e => this.setState({ dateTo: e.target.value })}
                                                    />
                                                </section>
                                                <section className="col col-3">
                                                    <ClockPicker
                                                        name="timeTo" placeholder="Chọn giờ"
                                                        className="form-control datepicker"
                                                        data-date-format="dd/mm/yy" value={this.state.timeTo}
                                                        onChange={e => this.setState({ timeTo: e.target.value })}
                                                    />
                                                </section>
                                            </div>
                                        </section>

                                    </fieldset>

                                    <footer>
                                        <button type="submit" className="btn btn-primary"
                                        // onClick={this.onSubmit.bind(this)}
                                        >
                                            <i className="fa fa-save" /> {this.props.id ? "Cập nhật" : "Thêm mới"}
                                        </button>

                                    </footer>
                                </form>
                            </Validate>
                        </div>
                    </div>
                </JarvisWidget>
            </div>
        )
    }
}

export default Connect(PromotionAdd);