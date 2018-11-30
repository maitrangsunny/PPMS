import React, {
    Component
} from 'react';

import Connect from '../../stores/connect';

class InvoiceList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                Invoice list
            </div>
        )
    }
}

export default Connect(InvoiceList);