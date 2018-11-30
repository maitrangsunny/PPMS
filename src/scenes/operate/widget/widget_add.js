import React, {
    Component
} from 'react';
import serialize from 'form-serialize';
import slug from 'slug';

import Connect from '../../../stores/connect';
import Utils, {LINK, BIGBOX} from '../../../utils';
import JarvisWidget from '../../../components/jarvis_widget';
// import BootstrapValidator from '../../../components/forms/bootstrap_validator';
import Validate from '../../../components/forms/ui_validate';

import DatePicker from '../../../components/forms/date_picker';
import ClockPicker from '../../../components/forms/clock_picker';

import Html from './components/html';
import List from './components/list';


class WidgetAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };

    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        // console.log(this.state.type);
        return (
            <div id="content">
                <div className="row">
                    <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                        <h1 className="page-title txt-color-blueDark">
                            {this.props.id ? "Chỉnh sửa widget" : "Tạo widget"}
                        </h1>
                    </div>
                </div>
                <JarvisWidget colorbutton={false} editbutton={false}
                              custombutton={false}>
                    <header>
                        <span className="widget-icon">
                            <i className="fa fa-edit"/>
                        </span>
                        <h2>Chi tiết widget</h2>
                    </header>
                    <div>
                        {/* widget content */}
                        <div className="widget-body no-padding">
                            <Validate options={{
                                ...VALIDATION,
                                submitHandler: this.onSubmit.bind(this)
                            }}
                            >
                                <form id="widgetForm" className="smart-form"
                                      onSubmit={e => e.preventDefault()}
                                      noValidate="novalidate"
                                >
                                    <fieldset>
                                        <section className="form-group">
                                            <label className="label">Tên Widget</label>
                                            <label className="input">
                                                <input type="text" name="title"
                                                       value={this.state.title}
                                                       onChange={e => this.setState({
                                                           title: e.target.value,
                                                           slug: slug(e.target.value, {lower: true}),
                                                       })}
                                                />
                                            </label>
                                        </section>
                                        <section className="form-group">
                                            <label className="label">Slug</label>
                                            <label className="input">
                                                <input type="text" className="form-control" name="slug"
                                                       value={this.state.slug}
                                                       onChange={e => this.setState({slug: e.target.value})}
                                                />
                                            </label>
                                        </section>
                                        <section className="form-group">
                                            <label className="label">Mô tả</label>
                                            <label className="input">
                                            <textarea className="form-control" name="description" rows="3"
                                                      value={this.state.description}
                                                      onChange={e => this.setState({description: e.target.value})}
                                            />
                                            </label>
                                        </section>
                                        <section className="form-group">
                                            <label className="label">Từ ngày</label>
                                            <div className="row">
                                                <section className="col col-3">
                                                    <DatePicker
                                                        name="publishFrom" placeholder="Chọn ngày"
                                                        className="form-control datepicker col-sm-6"
                                                        dateFormat="dd/mm/yy"
                                                        value={this.state.dateFrom}
                                                        onChange={e => this.setState({dateFrom: e.target.value})}
                                                    />
                                                </section>
                                                <section className="col col-3">
                                                    <ClockPicker
                                                        name="publishFrom" placeholder="Chọn giờ"
                                                        className="form-control datepicker"
                                                        // data-date-format="dd/mm/yy"
                                                        value={this.state.timeFrom}
                                                        onChange={e => this.setState({timeFrom: e.target.value})}
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
                                                        dateFormat="dd/mm/yy"
                                                        value={this.state.dateTo}
                                                        onChange={e => this.setState({dateTo: e.target.value})}
                                                    />
                                                </section>
                                                <section className="col col-3">
                                                    <ClockPicker
                                                        name="publishTo" placeholder="Chọn giờ"
                                                        className="form-control datepicker"
                                                        // data-date-format="dd/mm/yy"
                                                        value={this.state.timeTo}
                                                        onChange={e => this.setState({timeTo: e.target.value})}
                                                    />
                                                </section>
                                            </div>
                                        </section>

                                        <section className="form-group">
                                            <label className="label">Trạng thái</label>
                                            <label className="select">
                                                <select className="form-control" name="isActive"
                                                        value={this.state.isActive}
                                                        onChange={e => this.setState({isActive: parseInt(e.target.value)})}>
                                                    <option value={1}>Hoạt động</option>
                                                    <option value={0}>Đóng</option>
                                                </select> <i/>
                                            </label>
                                        </section>
                                        <section className="form-group">
                                            <label className="label">Loại</label>
                                            <label className="select">
                                                <select className="form-control" value={this.state.type} name="type"
                                                        onChange={e => this.setState({
                                                            type: e.target.value
                                                        })}>
                                                    <option value="list">Danh sách</option>
                                                    <option value="html">HTML</option>
                                                </select><i/>
                                            </label>
                                        </section>
                                        {
                                            this.state.type !== 'html' &&
                                            <section className="form-group">
                                                <label className="label">Component</label>
                                                <label className="select">
                                                    <select className="form-control" value={this.state.component}
                                                            name="component"
                                                            onChange={e => this.setState({
                                                                component: e.target.value
                                                            })}>
                                                        <option value="custom">Tuỳ biến</option>
                                                        <option value="banner">Banner</option>
                                                        <option value="category">Danh mục</option>
                                                        <option value="product">Sản phẩm</option>
                                                    </select><i/>
                                                </label>
                                            </section>
                                        }


                                        {
                                            this.state.type === 'html' ? <Html data={this.state.data}/> :
                                                <List component={this.state.component} data={this.state.data}/>
                                        }

                                    </fieldset>
                                    <footer>
                                        <button type="submit" className="btn btn-primary"
                                            // onClick={this.onSubmit.bind(this)}
                                        >
                                            <i className="fa fa-save"/> {this.props.id ? "Cập nhật" : "Thêm mới"}
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

export default Connect(WidgetAdd);