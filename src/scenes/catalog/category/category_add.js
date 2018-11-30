import React, {
    Component
} from 'react';

import serialize from 'form-serialize';
import Connect from '../../../stores/connect';

import JarvisWidget from '../../../components/jarvis_widget';
import BootstrapValidator from '../../../components/forms/bootstrap_validator';
// import TagsInput from '../../../components/forms/tags_input';
import Select2 from '../../../components/forms/select2'

class CategoryAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            icon: "",
            slug: "",
            categoryParent: "",
            attributeSet: [],


            parent: "0",
        };

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.category.detail !== this.props.category.detail) {
            // console.log(nextProps.category.detail);
            let product = nextProps.category.detail;
            this.setState({
                title: product.title,
                parent: nextProps.category.detail.parents.length > 0 ? nextProps.category.detail.parents[0].categoryId : "",
                icon: product.icon,
                slug: product.slug,
            })
        }
    }

    onSubmit(e) {
        e.preventDefault();
        let form = document.querySelector('#attributeForm');
        var obj = serialize(form, {hash: true});
        return false;
    }

    _populateCategory(category, prefix = "") {
        let jsx = [];
        jsx.push(
            <option
                key={"category_select_" + category.categoryId}
                value={category.categoryId}
            >
                {prefix}{category.title}
            </option>
        );
        if (category.child && category.child.length > 0) {
            jsx.push(category.child.map(child => this._populateCategory(child, prefix + "---")));
        }
        return jsx;
    }

    render() {
        return (
            <div id="content">
                <div className="row">
                    <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                        <h1 className="page-title txt-color-blueDark">
                            Thêm mới danh mục
                        </h1>
                    </div>
                </div>
                <JarvisWidget colorbutton={false} editbutton={false}
                              custombutton={false}>
                    <header>
                        <span className="widget-icon">
                            <i className="fa fa-edit"/>
                        </span>
                        <h2>Thêm mới danh mục</h2>
                    </header>
                    <div>
                        {/* widget content */}
                        <div className="widget-body no-padding">
                            <BootstrapValidator>
                                <form id="attributeForm" className="smart-form"
                                      data-bv-message="This value is not valid"
                                      data-bv-feedbackicons-valid="glyphicon glyphicon-ok"
                                      data-bv-feedbackicons-invalid="glyphicon glyphicon-remove"
                                      data-bv-feedbackicons-validating="glyphicon glyphicon-refresh">
                                    <fieldset>
                                        <section>
                                            <label className="label">Tên danh mục</label>
                                            <label className="input">
                                                <input type="text" className=""
                                                    // name="title"
                                                       value={this.state.title}
                                                       onChange={e => this.setState({title: e.target.value})}
                                                    // placeholder="Tên danh mục"
                                                       data-bv-notempty="true"
                                                    // data-bv-notempty-message="Tên danh mục không được bỏ trống"
                                                />
                                            </label>
                                        </section>
                                        <section>
                                            <label className="label">Slug</label>
                                            <label className="input">
                                                <input type="text" className="" name="slug"
                                                       value={this.state.slug}
                                                       onChange={e => this.setState({slug: e.target.value})}
                                                    // placeholder="Icon"
                                                    // data-bv-notempty="true"
                                                    // data-bv-notempty-message="Icon không được bỏ trống"
                                                />
                                            </label>
                                        </section>
                                        <section>
                                            <label className="label">Icon</label>
                                            <label className="input">
                                                <input type="text" className="" name="icon"
                                                       value={this.state.icon}
                                                       onChange={e => this.setState({icon: e.target.value})}
                                                    // placeholder="Icon"
                                                    // data-bv-notempty="true"
                                                    // data-bv-notempty-message="Icon không được bỏ trống"
                                                />
                                            </label>
                                        </section>
                                        <section>
                                            <label className="label">Danh mục</label>
                                            {
                                                this.props.category.mapped.length > 0 &&
                                                <Select2
                                                    className="select2"
                                                    name="category"
                                                    value={this.state.categoryParent}
                                                    onChange={e => {
                                                        this.setState({
                                                            categoryParent: e.target.value
                                                        })
                                                    }}
                                                >
                                                    {
                                                        this.props.category.mapped.map(category => this._populateCategory(category))
                                                    }
                                                </Select2>
                                            }
                                        </section>
                                        <section>
                                            <label className="label">Nhóm thuộc tính</label>
                                            <Select2
                                                className="select2"
                                                name="attributeSet"
                                                value={this.state.attributeSet}
                                                onChange={e => {
                                                    this.setState({
                                                        attributeSet: e.target.value
                                                    })
                                                }}
                                                multiple={true}
                                            >
                                                <option value="0">Android asd asd asd asd as</option>
                                                <option value="1">ios</option>
                                            </Select2>
                                            {/*<TagsInput*/}
                                            {/*className="form-control tagsinput"*/}
                                            {/*defaultValue=""*/}
                                            {/*data-role="tagsinput"*/}
                                            {/*/>*/}

                                        </section>
                                        {/*<div className="form-group">*/}
                                        {/*<label>Nhóm thuộc tính</label>*/}
                                        {/*<Select2 className="select2" name="attributeSet" multiple={true}*/}
                                        {/*style={{width: '100%'}}*/}
                                        {/*value={this.state.attributeSet}*/}
                                        {/*onChange={e => this.setState({attributeSet: e.target.value})}>*/}
                                        {/*<option value="0">Android</option>*/}
                                        {/*<option value="1">IOS</option>*/}
                                        {/*</Select2>*/}
                                        {/*</div>*/}
                                    </fieldset>
                                    <fieldset>
                                        <header>
                                            <h2>Danh sách thuộc tính </h2>
                                        </header>
                                        <div>
                                            <div className="jarviswidget-editbox">
                                            </div>
                                            <div className="widget-body">
                                                <div className="tabs-left">
                                                    <ul className="nav nav-tabs tabs-left"
                                                        id="demo-pill-nav">
                                                        <li className="active">
                                                            <a href="#tab-r1"
                                                               data-toggle="tab">Thương
                                                                hiệu</a>
                                                        </li>
                                                        <li>
                                                            <a href="#tab-r2"
                                                               data-toggle="tab">Giá bán</a>
                                                        </li>
                                                        <li>
                                                            <a href="#tab-r3"
                                                               data-toggle="tab">Kích cỡ</a>
                                                        </li>
                                                    </ul>
                                                    <div className="tab-content">
                                                        <div className="tab-pane active"
                                                             id="tab-r1">
                                                            <div>
                                                                <br/>
                                                                <label className="checkbox">
                                                                    <input type="checkbox"
                                                                           name="trade[]" value="samsung"
                                                                           defaultChecked/>
                                                                    <i/>SamSung</label>
                                                                <label className="checkbox">
                                                                    <input type="checkbox" value="nokia"
                                                                           name="trade[]"/>
                                                                    <i/>Nokia</label>
                                                                <label className="checkbox">
                                                                    <input type="checkbox"
                                                                           name="trade[]"/>
                                                                    <i/>Anastasia</label>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane"
                                                             id="tab-r2">
                                                            <div>
                                                                <br/>
                                                                <label className="checkbox">
                                                                    <input type="checkbox"
                                                                           name="checkbox"/>
                                                                    <i/>Alice</label>
                                                                <label className="checkbox">
                                                                    <input type="checkbox"
                                                                           name="checkbox"/>
                                                                    <i/>Anastasia</label>
                                                            </div>
                                                        </div>
                                                        <div className="tab-pane"
                                                             id="tab-r3">
                                                            <div>
                                                                <br/>
                                                                <label className="checkbox">
                                                                    <input type="checkbox"
                                                                           name="checkbox"
                                                                    />
                                                                    <i/>Alexandra</label>
                                                                <label className="checkbox">
                                                                    <input type="checkbox"
                                                                           name="checkbox"
                                                                           defaultChecked/>
                                                                    <i/>Anastasia</label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            {/* end widget content */}

                                        </div>
                                        {/* end widget div */}
                                    </fieldset>
                                    <footer>
                                        <input type="submit" className="btn btn-primary center-block"
                                               onClick={this.onSubmit.bind(this)} value="Xác nhận"/>
                                    </footer>
                                </form>
                            </BootstrapValidator>
                        </div>
                    </div>
                </JarvisWidget>
            </div>
        )
    }
}

export default Connect(CategoryAdd);