import React, {
    Component
} from 'react';

import Connect from '../../../stores/connect';

import Layout from '../../../components/layout';

import List from './campaign_list';
import Add from './coupon_add';
import Report from './campaign_report';
import Detail from './campaign_detail';
import CampaignAdd from './campaign_add';

class Promotion extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let child = <div />;
        switch (this.props.match.params.action) {
            case "danh-sach":
                child = <List />;
                break;
            case "them-moi-chien-dich":
                child = <CampaignAdd />;
                break;
            case "bao-cao":
                child = <Report />;
                break;
            case "chi-tiet":
                child = <Detail />;
                break;
            case "coupon":
                child = this.props.match.params.id === "them-moi" ? <Add /> : <Add id={this.props.match.params.id} />;
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

export default Connect(Promotion);