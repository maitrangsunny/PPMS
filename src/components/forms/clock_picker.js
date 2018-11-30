import React from 'react'

import 'script-loader!clockpicker/dist/bootstrap-clockpicker.min.js'

export default class ClockPicker extends React.Component {
    componentDidMount() {
        const element = $(this.refs.input);
        const options = {
            placement: 'top',
            donetext: 'Hoàn tất',
            autoclose: true,
            afterDone: () => {
                this.props.onChange({
                    target : {
                        value : element.val()
                    }
                });
            }
        };
        element.clockpicker(options);
    }

    render() {
        return (
            <input type="text" {...this.props} ref="input"/>
        )
    }
}