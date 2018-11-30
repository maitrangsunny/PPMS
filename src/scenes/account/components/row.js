import React, {
    Component
} from 'react';
import Connect from '../../../stores/connect';

class Rows extends Component {
    constructor(props) {
        super(props);
        this.state = {
            read: false,
            write: false,
            execute: false,
            all: false
        }
    }
    componentWillReceiveProps(nextProps){

        if (this.props.curPermission != nextProps.curPermission) {
            let read = false;
            let write = false;
            let execute = false;
            if(nextProps.type==="Edit"){
                let items =nextProps.curPermission;
                for(let i =0; i< items.length;i++)
                    if(items[i].name ===nextProps.listPermission.name){
                        read =items[i].read;
                        write=items[i].write;
                        execute=items[i].execute;
                        break;
                    }
                }
            let all = false;
            if (read === write === execute === true)
                all = true;
            this.setState({
                read: read,
                write: write,
                execute: execute,
                all: all
            })
        }
    }

    checkAll(e) {
        if(e.target.className=="all"){
            this.setState({
                read: e.target.checked,
                write: e.target.checked,
                execute: e.target.checked,
                all: e.target.checked
            })
        }
        else {
            this.setState({
                all: false
            })
        }

    }

    check(e) {
        if(e.target.className==="read"){
            this.setState({
                read: e.target.checked
            });
        }
        else if(e.target.className==="write"){
            this.setState({
                write: e.target.checked
            });
        }else{
            this.setState({
                execute: e.target.checked
            });
        }

        this.checkAll(e)
    }

    render() {

        return (
        <tr>

                <td>{this.props.listPermission.name}</td>
                <td>
                    <input type="checkbox" name={this.props.listPermission.name+"[]"} value={"read"} checked={this.state.read}
                           onChange={e=>this.check(e)} className="read"/>
                </td>
                <td>
                    <input type="checkbox" name={this.props.listPermission.name+"[]"} value={"write"} checked={this.state.write}
                           onChange={e=>this.check(e)} className="write"/>
                </td>
                <td>
                    <input type="checkbox" name={this.props.listPermission.name+"[]"} value={"execute"} checked={this.state.execute}
                           onChange={e=>this.check(e)} className="execute"/>
                </td>
                <td>
                    <input type="checkbox" name={this.props.listPermission.name+"[]"} value={"all"} checked={this.state.all}
                           onChange={e=>this.checkAll(e)} className="all"/>
                </td>
            </tr>
        )
    }
}
export default Connect(Rows);