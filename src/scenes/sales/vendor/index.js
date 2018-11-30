import React, {
    Component
} from 'react';

import Connect from '../../../stores/connect';

import Layout from '../../../components/layout';

import List from './vendor_list';
import Add from './vendor_add';

class Vendor extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let child = <div/>;
        let action =this.props.match.params.action;
        if(action==="danh-sach"){
            child = <List/>;
        }else if(action==="them-moi"){
            child = <Add/>;
        }else{
            child= <Add id={this.props.match.params.action}/>
        }
        return (
            <Layout   logout={() => {
                this.props.actions.storage.removeAccessToken(),
                  this.props.actions.storage.removeUser();
              }}>
                {child}
            </Layout>
        )
    }
}

export default Connect(Vendor);