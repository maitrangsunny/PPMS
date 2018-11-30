import React, {
    Component
} from 'react';
import Connect from "../../../../stores/connect";

import Select2 from '../../../../components/forms/select2';
import SmartNestable from '../../../../components/common/smart_nestable';

class WidgetAddCategory extends Component {
    constructor(props) {
        super(props);


        if (this.props.category.list.length === 0) {
        }

        let categories = [];
        if (this.props.data && this.props.data.category) {
            categories = this.props.data.category.data;
        }

        this.state = {
            categories: categories,
            categorySelected: ""
        };
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.category.list !== this.props.category.list) {
            this.setState({
                categorySelected: nextProps.category.mapped[0].categoryId
            })
        }
    }

    _populateCategory(category, prefix = "") {
        let jsx = [];
        jsx.push(
            <option
                key={"category_select_" + category.categoryId}
                value={category.categoryId}
            >
                {prefix} {category.title}
            </option>
        );
        if (category.child && category.child.length > 0) {
            jsx.push(category.child.map(child => this._populateCategory(child, prefix + "---")));
        }
        return jsx;
    }

    render() {
        return (
            <div>
                <header />
                <fieldset>
                    <section className="col col-4">
                        <section className="form-group">
                            {
                                this.props.category.mapped.length > 0 &&
                                <Select2
                                    // style={{
                                    //     width: "100%"
                                    // }}
                                    // multiple
                                    className="select2"
                                    name="categorySelect"
                                    value={this.state.categorySelected}
                                    onChange={e => this.setState({
                                        categorySelected: e.target.value
                                    })}
                                >
                                    {
                                        this.props.category.mapped.map(category => this._populateCategory(category))
                                    }
                                </Select2>
                            }
                        </section>

                        {
                            this.state.categorySelected !== "" &&
                            <section className="form-group">
                                <button type="button" className="btn btn-primary"
                                    style={{
                                        padding: "6px 12px"
                                    }}
                                    onClick={() => {
                                        let categories = this.state.categories;
                                        if (categories.filter(categoryId => categoryId === this.state.categorySelected).length === 0) {
                                            categories.push(this.state.categorySelected);
                                            this.setState({ categories: categories })
                                        }
                                    }}>
                                    <i className="fa fa-plus" /> Thêm danh mục
                                </button>
                            </section>
                        }
                    </section>
                    <section className="col col-8">
                        <SmartNestable
                            maxDepth={1}
                        >
                            <div className="dd" style={{ maxWidth: "100%" }}>
                                <ol className="dd-list">
                                    {
                                        this.props.category.list.length > 0 && this.state.categories.map((categoryId, i) =>
                                            <li key={"category_add_list" + categoryId + i}
                                                className="dd-item">
                                                <div className="dd-handle">
                                                    {this.props.category.byID[categoryId].title}
                                                </div>
                                                <input type="hidden"
                                                    name="category[]"
                                                    value={categoryId}
                                                />
                                            </li>
                                        )
                                    }
                                </ol>
                            </div>
                        </SmartNestable>
                    </section>
                </fieldset>
            </div>
        )
    }
}

export default Connect(WidgetAddCategory);