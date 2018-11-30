import React, {
    Component
} from 'react';

import Utils, {
    LINK
} from '../../../../utils';

import {Link} from 'react-router-dom';
import List from './list';

export default class CategoryItem extends Component {

    render() {
        return (
            <li
                key={"category_child_" + this.props.data.categoryId}
                className="dd-item dd3-item"
                data-id={this.props.data.categoryId}>
                <div className="dd-handle dd3-handle">
                    <i className="fa fa-reorder"/>
                </div>
                <div className="dd3-content">
                    {this.props.data.title}
                    <div className="pull-right">
                        <Link
                            to={Utils.link(LINK.CATEGORY, this.props.data.categoryId)}><span
                            className="btn fa fa-pencil-square-o"/>
                        </Link>
                        <a href="#"><span
                            className="btn text-danger fa fa-trash-o"/>
                        </a>
                        {/*<a href="#"><span*/}
                        {/*className="btn fa fa-recycle"/>*/}
                        {/*</a>*/}
                    </div>
                </div>
                {
                    this.props.data.child.length > 0 && <List data={this.props.data.child}/>
                }
            </li>
        )
    }
}