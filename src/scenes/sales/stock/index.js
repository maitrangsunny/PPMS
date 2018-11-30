import React, {
    Component
} from 'react';

import Connect from '../../../stores/connect';

import Layout from '../../../components/layout';

import List from './stock_list';
import Add from './stock_add';

class Stock extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let child = <div/>;
        switch (this.props.match.params.action) {
            case "list" :
                child = <List/>;
                break;
            case "add" :
                child = <Add/>;
                break;
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

export default Connect(Stock);