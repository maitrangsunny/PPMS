import React, {
    Component
} from 'react';
import Utils from "../../utils";
import Datatable from '../common/datatable';
export default class Product extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //
        //     relatedProducts : []
        // }
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.product.list !== this.props.product.list) {
    //         this.setState({
    //             relatedProducts: nextProps.p
    //         })
    //     }
    // }

    render() {
        // console.log(this.props.product);

        return (
            <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
                 aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-hidden="true">
                                &times;
                            </button>
                            <h4 className="modal-title" id="myModalLabel">Sản phẩm</h4>
                        </div>
                        <div className="modal-body">

                            <fieldset>
                                <section>
                                    <div className="widget-body no-padding">
                                        <Datatable
                                            buttons={this.props.buttons}
                                            options={{
                                                ordering: false,
                                                searching: false,
                                                data: this.props.product.list,
                                                columns: [
                                                    {data: "sku"},
                                                    {data: "title"},
                                                    {data: "images"},
                                                    {data: "price"},
                                                    {data: "originalPrice"},
                                                    {data: "isPromotion"},
                                                    {data: "isNewProduct"},
                                                    {data: "isVisible"},
                                                    {data: "isActive"},
                                                    {
                                                        data: null,
                                                        defaultContent: "<button class='add' style='padding: 1px 7px 2px;'>" +
                                                        "<i class=\"fa fa-plus fa-lg\"/>" +
                                                        "</button>"
                                                    }
                                                ],
                                                columnDefs: [
                                                    {
                                                        "render": (data, type, row) =>
                                                            "<span class='label'>" + Utils.formatPrice(data) + "đ</span>" +
                                                            (data !== row.originalPrice ? "<span class='label'><s>" + Utils.formatPrice(row.originalPrice) + "đ</s></span>" : ""),
                                                        "targets": 3
                                                    },
                                                    {
                                                        "visible": false,
                                                        "targets": 4
                                                    },
                                                    {
                                                        "render": (data, type, row) =>
                                                            "<img style=\"width: 100px;\"  src=\"" + Utils.image(data, 240) + "\">",
                                                        "targets": 2
                                                    },
                                                    {
                                                        "render": (data, type, row) =>
                                                            data ?
                                                                "<span style=\"color: #fff;text-align:center\" class=\"label label-success\">Có</span>" :
                                                                "<span style=\"color: #fff;text-align:center\" class=\"label label-danger\">Không</span>",
                                                        "targets": [5, 6, 7, 8]
                                                    },
                                                ]
                                            }}
                                            paginationLength={true}
                                            className="table table-striped table-bordered table-hover"
                                            width="100%"
                                        >
                                            <thead>
                                            <tr>
                                                <th>SKU</th>
                                                <th>Tên sản phẩm</th>
                                                <th>Hình</th>
                                                <th>Giá bán</th>
                                                <th>Giá gốc</th>
                                                <th>Khuyến mãi</th>
                                                <th>Sản phẩm mới</th>
                                                <th>Hiển thị</th>
                                                <th>Hoạt động</th>
                                            </tr>
                                            </thead>
                                        </Datatable>
                                    </div>
                                </section>
                            </fieldset>

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" data-dismiss="modal">
                                Cancel
                            </button>
                            <button type="button" className="btn btn-primary">
                                Post Article
                            </button>
                        </div>
                    </div>
                    {/* /.modal-content */}
                </div>
                {/* /.modal-dialog */}
            </div>
        )
    }
}