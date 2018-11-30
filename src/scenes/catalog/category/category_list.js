import React, {
    Component
} from 'react';

import Utils, {
    LINK
} from '../../../utils';

import {Link} from 'react-router-dom';

import Connect from '../../../stores/connect';
import JarvisWidget from '../../../components/jarvis_widget';
import SmartNestable from '../../../components/common/smart_nestable';

import List from './component/list';

class CategoryList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    onChange = (output) => {
        this.setState({
            list: output
        })
    };

    deleteCategory(a) {
    }

    onSubmit() {
    }

    render() {
        return (
            <div id="content">
                <div className="row">
                    <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                        <h1 className="page-title txt-color-blueDark">
                            Danh sách danh mục
                        </h1>
                    </div>
                    <div className="col-xs-12 col-sm-5 col-md-5 col-lg-8">
                        <ul id="sparks" className="">
                            <li className="sparks-info">
                                <Link to={Utils.link(LINK.CATEGORY, "them-moi")} className="btn btn-success btn-lg">
                                    Tạo mới
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <JarvisWidget editbutton={false} custombutton={false}>
                    <header>
                        <span className="widget-icon"> <i className="fa fa-reorder"/> </span>
                        <h2>Danh sách danh mục </h2>
                        <div className="widget-toolbar" role="menu">
                            <button className="btn btn-primary" onClick={() => this.onSubmit()}>
                                Xác nhận
                            </button>
                        </div>
                    </header>
                    <div>
                        {/* widget content */}
                        <div className="widget-body">
                            <div className="row">
                                <div className="col-sm-12">
                                    {
                                        this.props.category.mapped.length > 0 &&
                                        <SmartNestable onChange={this.onChange}>
                                            <div className="dd" style={{maxWidth: "100%"}}>
                                                <List data={this.props.category.mapped}/>
                                            </div>
                                        </SmartNestable>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </JarvisWidget>
            </div>
        )
    }

}

export default Connect(CategoryList);