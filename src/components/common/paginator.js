/**
 * Created by Phuoc Minh on 12/14/2017.
 */
import React, {
    Component
} from 'react';

export default class Paginator extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let jsx = [];
        for (let i = 0; i < this.props.total; i++) {
            jsx.push(<li key={i}><a href='#'>{i}</a></li>)
        }
        return ( <div className="text-center">
            <ul className="pagination pagination-lg">
                <li>
                    <a href="#"><i className="fa fa-angle-left"/></a>
                </li>
                {jsx}
                <li>
                    <a href="#"><i className="fa fa-angle-right"/></a>
                </li>
            </ul>
        </div>)
    }
}
