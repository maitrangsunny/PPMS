import React, {
    Component
} from 'react';

import Editor from '../../../../components/forms/smart_ckeditor';

export default class Html extends Component {

    render() {
        return (
            <section>
                {/*<label className="label">HTML</label>*/}
                <Editor container="shortDescription" options={{
                    height: '500px',
                    allowedContent: true,
                    // startupFocus: true
                }}
                        value={this.props.data.html}
                        name="data"
                />
            </section>
        )
    }
}