import React, {
    Component
} from 'react';

export default class WidgetAddCustom extends Component {
    constructor(props) {
        super(props);

        let custom = "";
        if (this.props.data && this.props.data.custom) {
            custom = this.props.data.custom;
        }
        this.state = {
            json: custom,
        }
    }
    componentWillReceiveProps(nextProps) {
        // console.log(nextProps,this.props);
        if (nextProps.data && nextProps.data.custom) {
            this.setState({
                json : nextProps.data.custom
            })
        }
    }


    render() {
        return (
            <section className="form-group">
                <label className="label">Tuỳ biến</label>
                <label className="input">
                    <textarea className="form-control" name="data" rows="3"
                              value={this.state.json}
                              onChange={e => this.setState({json: e.target.value})}
                    />
                </label>
            </section>
        )
    }
}