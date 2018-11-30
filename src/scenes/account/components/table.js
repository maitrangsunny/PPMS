import React, {
    Component
} from 'react';
import Connect from '../../../stores/connect';
import Row from './row';
import Permission from '../../../../public/assets/api/tables/permission.json'
class Table extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let row = Permission.map((row, index)=> {
            return (
            <Row curPermission={this.props.rows} listPermission={row} index={index} key={index} type={this.props.type}  />);
        })

        return (<tbody>{row}</tbody>);
    }
}
export default Connect(Table);