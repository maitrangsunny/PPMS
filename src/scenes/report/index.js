import React, {
    Component
} from 'react';

import Connect from '../../stores/connect';

import Layout from '../../components/layout';

import ReportInvoice from './invoice';
import ReportPayment from './payment';
import ReportTopBuyProduct from './top_buy_product';
import ReportTopPayAccount from './top_pay_account';
import ReportVendor from './vendor';

class Report extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let child = <div/>;
        switch (this.props.match.params.action) {
            case "don-hang" :
                child = <ReportInvoice/>;
                break;
            case "doanh-thu" :
                child = <ReportPayment/>;
                break;
            case "san-pham-mua-nhieu" :
                child = <ReportTopBuyProduct/>;
                break;
            case "tai-khoan-mua-nhieu" :
                child = <ReportTopPayAccount/>;
                break;
            case "nha-cung-cap" :
                child = <ReportVendor/>;
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

export default Connect(Report);