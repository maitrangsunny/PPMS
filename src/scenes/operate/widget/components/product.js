import React, {
    Component
} from 'react';

import SearchModal from '../../../../components/product/search_modal';
import Connect from "../../../../stores/connect";
import Utils, {LINK} from "../../../../utils";

class WidgetAddProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchTitle: "",
            products: []
        };
    }

    handleSearchProduct(title) {
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        return (
            <div>
                <header/>
                <fieldset>
                    <section className="col col-4">
                        <section>
                            <label className="label">Tên sản phẩm</label>
                            <label className="input">
                                <input type="text" list="list"
                                       value={this.state.searchTitle}
                                       onChange={e => this.setState({searchTitle: e.target.value})}
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
                                        this.handleSearchProduct(this.state.searchTitle)
                                        // let categories = this.state.categories;
                                        // if (categories.filter(categoryId => categoryId === this.state.categorySelected).length === 0) {
                                        //     categories.push(this.state.categorySelected);
                                        //     this.setState({categories: categories})
                                        // }
                                    }}>
                                <i className="fa fa-plus"/> Tìm sản phẩm
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
                                    {/*<th>Khuyến mãi</th>*/}
                                    {/*<th>Sản phẩm mới</th>*/}
                                    {/*<th>Hiển thị</th>*/}
                                    {/*<th>Hoạt động</th>*/}
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.state.products.map(product =>
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
                                                    src={Utils.image(product.images, 240)}/>
                                            </td>
                                            <td>{Utils.formatPrice(product.price)} đ</td>
                                            <td>{Utils.formatPrice(product.originalPrice)} đ</td>
                                            {/*<td>*/}
                                            {/*{*/}
                                            {/*product.isPromotion ?*/}
                                            {/*<label*/}
                                            {/*className="label label-success">có</label> :*/}
                                            {/*<label*/}
                                            {/*className="label label-danger">không</label>*/}
                                            {/*}*/}
                                            {/*</td>*/}
                                            {/*<td>*/}
                                            {/*{*/}
                                            {/*product.isNewProduct ?*/}
                                            {/*<label*/}
                                            {/*className="label label-success">có</label> :*/}
                                            {/*<label*/}
                                            {/*className="label label-danger">không</label>*/}
                                            {/*}*/}
                                            {/*</td>*/}
                                            {/*<td>*/}
                                            {/*{*/}
                                            {/*product.isVisible ?*/}
                                            {/*<label*/}
                                            {/*className="label label-success">có</label> :*/}
                                            {/*<label*/}
                                            {/*className="label label-danger">không</label>*/}
                                            {/*}*/}
                                            {/*</td>*/}
                                            {/*<td>*/}
                                            {/*{*/}
                                            {/*product.isActive ?*/}
                                            {/*<label*/}
                                            {/*className="label label-success">có</label> :*/}
                                            {/*<label*/}
                                            {/*className="label label-danger">không</label>*/}
                                            {/*}*/}
                                            {/*</td>*/}

                                        </tr>
                                    )
                                }

                                </tbody>

                            </table>

                        </div>
                        {/*<SmartNestable*/}
                        {/*maxDepth={1}*/}
                        {/*>*/}
                        {/*<div className="dd" style={{maxWidth: "100%"}}>*/}
                        {/*<ol className="dd-list">*/}
                        {/*{*/}
                        {/*this.props.category.list.length > 0 && this.state.categories.map((categoryId, i) =>*/}
                        {/*<li key={"category_add_list" + categoryId + i}*/}
                        {/*className="dd-item">*/}
                        {/*<div className="dd-handle">*/}
                        {/*{this.props.category.byID[categoryId].title}*/}
                        {/*</div>*/}
                        {/*</li>*/}
                        {/*)*/}
                        {/*}*/}
                        {/*</ol>*/}
                        {/*</div>*/}
                        {/*</SmartNestable>*/}
                    </section>
                </fieldset>
                {
                    this.props.product.list.length > 0 &&
                    <SearchModal
                        product={this.props.product}
                        buttons={{
                            add: (product) => {
                                let products = this.state.products;
                                if (products.filter(p => p.productId === product.productId).length === 0) {
                                    products.push(product);
                                    this.setState({
                                        products
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

export default Connect(WidgetAddProduct);