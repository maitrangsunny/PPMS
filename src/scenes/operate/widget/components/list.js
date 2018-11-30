import React, {
    Component
} from 'react';

import Custom from './custom';
import Banner from './banner';
import Product from './product';
import Category from './category';

export default class WidgetAddList extends Component {

    render() {
        switch (this.props.component) {
            case 'custom' :
                return <Custom data={this.props.data}/>;
            case 'banner' :
                return <Banner data={this.props.data}/>;
            case 'category' :
                return <Category data={this.props.data}/>;
            case 'product' :
                return <Product data={this.props.data}/>;
            default:
                return <div/>
        }
    }
}
