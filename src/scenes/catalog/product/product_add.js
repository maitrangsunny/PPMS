import React, {
    Component
} from 'react';
import serialize from 'form-serialize';
import Connect from '../../../stores/connect';
import JarvisWidget from '../../../components/jarvis_widget';
import BootstrapValidator from '../../../components/forms/bootstrap_validator';
import Dropzone from 'react-dropzone-component';
import TagsInput from '../../../components/forms/tags_input';
import Select2 from '../../../components/forms/select2';

import SearchModal from '../../../components/product/search_modal';

import Utils, { LINK } from "../../../utils";
import { Link } from 'react-router-dom';
import Editor from '../../../components/forms/smart_ckeditor';

import Configs from '../../../configs';

class ProductAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {


            category: "",

            display: true,
            action: true,
            bref: "",
            info: "",
            // title: "",
            caption: "",
            alt: "",
            titleSEO: "",
            descriptionSEO: "",
            keywordSEO: "",

            title: "",
            slug: "",
            sku: "",
            shortDescription: "",
            description: "",

            categorySelected: "",
            relatedProducts: [],
            imageFiles: [],

            searchRelatedTitle: "",
        }

        // if (this.props.id) {
        //     this.props.actions.product.requestDetail(this.props.id);
        // }
    }

    onSubmit(e) {
        e.preventDefault();
        let form = document.querySelector('#smart-form');
        var obj = serialize(form, { hash: true });
        console.log(obj)
        return false;
    }

    handleForm(event) {
        if (event.target.type !== 'textarea' && event.which === 13 /* Enter */) {
            event.preventDefault();
        }
    }

    handleSearchProduct(title) {
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.product.list !== this.props.product.list) {
            setTimeout(() => {
                $("#myModal").modal("show");
            }, 500)
        }

        if (nextProps.product.detail !== this.props.product.detail) {
            let product = nextProps.product.detail;
            // console.log(this.props.product.detail.category[0]);
            this.setState({
                title: product.title,
                slug: product.slug,
                sku: product.sku,
                shortDescription: product.shortDescription,
                description: product.description,

                imageFiles: product.images.map(image => {
                    return {
                        default: image.isDefault,
                        title: image.title,
                        upload: {
                            uuid: image.src,
                        },
                        size: "",
                        dataURL: Configs.app.IMAGE_API + "/file/" + image.src
                    }
                })
            });
        }

        if (nextProps.category.mapped !== this.props.category.mapped && nextProps.product.detail) {
            this.setState({
                categorySelected: nextProps.product.detail.category.slice(-1)[0].categoryId
            })
            // categorySelected: this.props.product.detail.category[0].categoryId,
        }
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
        // console.log(this.props)
        return (
            <div id="content">
                <div className="row">
                    <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                        <h1 className="page-title txt-color-blueDark">
                            Thêm sản phẩm
                        </h1>
                    </div>
                    <div className="col-xs-12 col-sm-5 col-md-5 col-lg-8">

                        {
                            !this.props.id ?
                                <ul id="sparks" className="">
                                    <li className="sparks-info">
                                        <button type="button" onClick={this.onSubmit.bind(this)}
                                            className="btn btn-primary btn-lg">
                                            Tạo và thêm sản phẩm khác
                                        </button>
                                    </li>
                                    <li className="sparks-info">
                                        <button type="button" onClick={this.onSubmit.bind(this)}
                                            className="btn btn-success btn-lg">
                                            Tạo mới
                                        </button>
                                    </li>

                                </ul> :
                                <ul id="sparks" className="">
                                    <li className="sparks-info">
                                        <button type="button" onClick={this.onSubmit.bind(this)}
                                            className="btn btn-success btn-lg">
                                            Cập nhật
                                        </button>
                                    </li>
                                </ul>
                        }

                    </div>
                </div>
                <JarvisWidget colorbutton={false} editbutton={false}
                    custombutton={false}>
                    <header>
                        <span className="widget-icon"> <i
                            className="fa fa-edit" /> </span>
                        <h2>Thêm sản phẩm</h2>
                    </header>
                    <div>
                        {/* widget content */}
                        <div className="widget-body no-padding">
                            <BootstrapValidator>
                                <form id="smart-form" className="smart-form"
                                    onKeyPress={this.handleForm}
                                    data-bv-message="This value is not valid"
                                    data-bv-feedbackicons-valid="glyphicon glyphicon-ok"
                                    data-bv-feedbackicons-invalid="glyphicon glyphicon-remove"
                                    data-bv-feedbackicons-validating="glyphicon glyphicon-refresh">
                                    <ul className="nav nav-tabs ">
                                        <li className="active">
                                            <a data-toggle="tab" href="#menu1">Thông tin</a>
                                        </li>
                                        <li className="">
                                            <a data-toggle="tab" href="#menu2">Hình ảnh</a>
                                        </li>
                                        <li className="">
                                            <a data-toggle="tab" href="#menu3">Giá bán</a>
                                        </li>
                                        <li className="">
                                            <a data-toggle="tab" href="#menu4">Thuộc tính</a>
                                        </li>
                                        <li className="">
                                            <a data-toggle="tab" href="#menu5">Sản phẩm mua kèm</a>
                                        </li>
                                        <li className="">
                                            <a data-toggle="tab" href="#menu6">SEO</a>
                                        </li>
                                    </ul>
                                    <div className="tab-content padding-10">
                                        <div id="menu1" className="tab-pane fade in active ">
                                            <fieldset>
                                                <section>
                                                    <label className="label">Tên sản phầm</label>
                                                    <label className="input">
                                                        <input
                                                            type="text" name="title" className=""
                                                            value={this.state.title}
                                                            onChange={e => this.setState({ title: e.target.value })}
                                                        />
                                                    </label>
                                                </section>
                                                <section>
                                                    <label className="label">Slug</label>
                                                    <label className="input">
                                                        <input
                                                            value={this.state.slug}
                                                            onChange={e => this.setState({ slug: e.target.value })}
                                                            type="text" name="slug" className="" />
                                                    </label>
                                                </section>
                                                <section>
                                                    <label className="label">SKU</label>
                                                    <label className="input">
                                                        <input
                                                            value={this.state.sku}
                                                            onChange={e => this.setState({ sku: e.target.value })}
                                                            type="text" name="sku" className="" />
                                                    </label>
                                                </section>
                                                <section>
                                                    <label className="label">Danh mục</label>
                                                    {
                                                        this.props.category.mapped.length > 0 &&
                                                        <Select2
                                                            className="select2"
                                                            name="category"
                                                            value={this.state.categorySelected}
                                                            onChange={e => {
                                                                this.setState({
                                                                    categorySelected: e.target.value
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
                                                    <label className="label">Mô tả ngắn</label>
                                                    <Editor container="shortDescription" options={{
                                                        height: '100px',
                                                        // startupFocus: true
                                                    }} value={this.state.shortDescription} />
                                                </section>
                                                <section>
                                                    <label className="label">Thông tin sản phẩm</label>
                                                    <Editor container="description" options={{
                                                        height: '250px',
                                                        // startupFocus: true
                                                    }} value={this.state.description} />
                                                </section>
                                                <section>
                                                    <label className="label">Từ khoá</label>
                                                    <label className="input">
                                                        <TagsInput
                                                            className="form-control tagsinput"
                                                            defaultValue=""
                                                            data-role="tagsinput"
                                                        />
                                                    </label>
                                                </section>
                                                <section className="col-lg-12">
                                                    <label className="toggle col-lg-3" style={{
                                                        display: "inline-block"
                                                    }}>
                                                        <input type="checkbox" name="checkbox-toggle"
                                                            defaultChecked />
                                                        <i data-swchon-text="Bật" data-swchoff-text="Tắt" />
                                                        Đang khuyến mãi
                                                    </label>
                                                </section>
                                                <section className="col-lg-12">
                                                    <label className="toggle col-lg-3" style={{
                                                        display: "inline-block"
                                                    }}>
                                                        <input type="checkbox" name="checkbox-toggle"
                                                            defaultChecked />
                                                        <i data-swchon-text="Bật" data-swchoff-text="Tắt" />
                                                        Sản phẩm mới
                                                    </label>
                                                </section>
                                                <section className="col-lg-12">
                                                    <label className="toggle col-lg-3" style={{
                                                        display: "inline-block"
                                                    }}>
                                                        <input type="checkbox" name="checkbox-toggle"
                                                            defaultChecked />
                                                        <i data-swchon-text="Bật" data-swchoff-text="Tắt" />
                                                        Đang hoạt động
                                                    </label>
                                                </section>
                                                <section className="col-lg-12">
                                                    <label className="toggle col-lg-3" style={{
                                                        display: "inline-block"
                                                    }}>
                                                        <input type="checkbox" name="checkbox-toggle"
                                                            defaultChecked />
                                                        <i data-swchon-text="Bật" data-swchoff-text="Tắt" />
                                                        Hiển thị sản phẩm
                                                    </label>
                                                </section>
                                            </fieldset>
                                        </div>
                                        <div id="menu2" className="tab-pane fade">
                                            <fieldset>
                                                <Dropzone
                                                    ref={(drop) => this.drop = drop}
                                                    config={{
                                                        iconFiletypes: ['.jpg', '.png', '.gif'],
                                                        showFiletypeIcon: true,
                                                        postUrl: 'http://localhost:9091/v1/upload'
                                                    }}
                                                    djsConfig={{
                                                        addRemoveLinks: true,
                                                        dictRemoveFile: "Xoá file",
                                                        dictRemoveFileConfirmation: "Bạn có chắc muốn xoá file này?"
                                                    }}
                                                    eventHandlers={{
                                                        complete: (file) => {
                                                            let files = this.state.imageFiles;
                                                            files.push(file);
                                                            this.setState({
                                                                imageFiles: files
                                                            })
                                                        },
                                                        removedfile: (fileRemove) => {
                                                            let files = this.state.imageFiles;
                                                            this.setState({
                                                                imageFiles: files.filter(file => file.upload.uuid !== fileRemove.upload.uuid)
                                                            })
                                                        }
                                                    }}
                                                />

                                            </fieldset>
                                            {
                                                this.state.imageFiles.map((file, i) =>
                                                    <fieldset key={"image_upload_" + file.upload.uuid}>
                                                        <section className="col-lg-1">
                                                            <img
                                                                width={100}
                                                                src={file.dataURL} />
                                                        </section>
                                                        <section className="col-lg-11">
                                                            <section>
                                                                <label className="label">Mô tả hình</label>
                                                                <label className="input">
                                                                    <input type="text" name="image_title[]"
                                                                        value={file.title}
                                                                        onChange={e => {
                                                                            let files = this.state.imageFiles;
                                                                            files[i].title = e.target.value;
                                                                            this.setState({
                                                                                imageFiles: files
                                                                            })
                                                                        }}
                                                                        className="" />
                                                                </label>
                                                            </section>
                                                            <section className="col-lg-12">
                                                                <label className="toggle col-lg-2" style={{
                                                                    display: "inline-block"
                                                                }}>
                                                                    <input type="radio" name="isDefault[]"
                                                                        defaultChecked={file.default} />
                                                                    <i data-swchon-text="Bật" data-swchoff-text="Tắt" />
                                                                    Hình ảnh mặc định
                                                                </label>
                                                            </section>
                                                            <section>
                                                                <label className="input">
                                                                    <a className="btn btn-danger"
                                                                        onClick={Utils.confirmBox.bind(this, "Xoá file", "Bạn có chắc muốn xoá file này?", () => this.drop.dropzone.emit('removedfile', file), null)}
                                                                    >
                                                                        <i className="fa fa-trash-o" />
                                                                        Xoá file
                                                                    </a>
                                                                </label>
                                                            </section>
                                                        </section>
                                                    </fieldset>
                                                )
                                            }

                                        </div>
                                        <div id="menu5" className="tab-pane fade  ">
                                            <fieldset>
                                                <section className="col col-4">
                                                    <section>
                                                        <label className="label">Tên sản phẩm</label>
                                                        <label className="input">
                                                            <input type="text" list="list"
                                                                value={this.state.searchRelatedTitle}
                                                                onChange={e => this.setState({ searchRelatedTitle: e.target.value })}
                                                            // onKeyPress={e => e.key === 'Enter' && this.handleSearchProduct(e.target.value)}
                                                            />
                                                        </label>
                                                    </section>
                                                    <section>
                                                        <button type="button" className="btn btn-primary"
                                                            style={{
                                                                padding: "6px 12px"
                                                            }}
                                                            onClick={() => {
                                                                this.handleSearchProduct(this.state.searchRelatedTitle)
                                                                // let categories = this.state.categories;
                                                                // if (categories.filter(categoryId => categoryId === this.state.categorySelected).length === 0) {
                                                                //     categories.push(this.state.categorySelected);
                                                                //     this.setState({categories: categories})
                                                                // }
                                                            }}>
                                                            <i className="fa fa-plus" /> Tìm sản phẩm
                                                        </button>
                                                    </section>
                                                </section>
                                                <section className="col col-8">
                                                    <div className="table-responsive">

                                                        <table
                                                            className="table table-bordered table-striped table-hover">
                                                            <thead>
                                                                <tr>
                                                                    <th>SKU</th>
                                                                    <th>Tên sản phẩm</th>
                                                                    <th>Hình</th>
                                                                    <th>Giá bán</th>
                                                                    <th>Giá gốc</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    this.state.relatedProducts.map(product =>
                                                                        <tr key={"product_list_" + product.productId}>
                                                                            <td>{product.sku}</td>
                                                                            <td>
                                                                                <Link
                                                                                    to={Utils.link(LINK.PRODUCT, product.productId)}>{product.title}</Link>
                                                                            </td>
                                                                            <td>
                                                                                <img
                                                                                    style={{
                                                                                        width: "100px",
                                                                                        // height: "100px",
                                                                                    }}
                                                                                    src={Utils.image(product.images, 240)} />
                                                                            </td>
                                                                            <td>{Utils.formatPrice(product.price)} đ</td>
                                                                            <td>{Utils.formatPrice(product.originalPrice)} đ</td>
                                                                        </tr>
                                                                    )
                                                                }

                                                            </tbody>

                                                        </table>

                                                    </div>
                                                </section>
                                            </fieldset>
                                        </div>
                                        <div id="menu6" className="tab-pane fade  ">
                                            <fieldset>
                                                <div className="form-group">
                                                    <label
                                                        className="col-lg-3 control-label">Title</label>
                                                    <div className="col-lg-7">
                                                        <input type="text" className="form-control"
                                                            name="titleSEO"
                                                            value={this.state.titleSEO}
                                                            onChange={e => this.setState({ titleSEO: e.target.value })}
                                                            placeholder="Title"
                                                            data-bv-notempty="true"
                                                            data-bv-notempty-message="Title không được bỏ trống" />
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <fieldset>
                                                <div className="form-group">
                                                    <label
                                                        className="col-lg-3 control-label">Description</label>
                                                    <div className="col-lg-7">
                                                        <input type="text" className="form-control"
                                                            name="descriptionSEO"
                                                            value={this.state.descriptionSEO}
                                                            onChange={e => this.setState({ descriptionSEO: e.target.value })}
                                                            placeholder="Description" />
                                                    </div>
                                                </div>
                                            </fieldset>
                                            <fieldset>
                                                <div className="form-group">
                                                    <label
                                                        className="col-lg-3 control-label">Keyword</label>
                                                    <div className="col-lg-7">
                                                        <input type="text" className="form-control"
                                                            name="keywordSEO"
                                                            value={this.state.keywordSEO}
                                                            onChange={e => this.setState({ keywordSEO: e.target.value })}
                                                            placeholder="Keyword"
                                                            data-bv-notempty="true"
                                                            data-bv-notempty-message="Plug không được bỏ trống" />
                                                    </div>
                                                </div>
                                            </fieldset>
                                        </div>

                                    </div>

                                </form>
                            </BootstrapValidator>
                        </div>
                    </div>
                </JarvisWidget>
                {
                    this.props.product.list.length > 0 &&
                    <SearchModal
                        product={this.props.product}
                        buttons={{
                            add: (product) => {
                                let relatedProducts = this.state.relatedProducts;
                                if (relatedProducts.filter(p => p.productId === product.productId).length === 0) {
                                    relatedProducts.push(product);
                                    this.setState({
                                        relatedProducts
                                    })
                                }
                            }
                        }}
                    />
                }
            </div>
        )
    }
}

export default Connect(ProductAdd);