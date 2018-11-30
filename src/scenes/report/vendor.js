import React, {
    Component
} from 'react';

import Connect from '../../stores/connect';
import JarvisWidget from '../../components/jarvis_widget';
import Data from '../../../public/assets/api/report/location.json';
import UiDatepicker from '../../components/forms/date_picker'
import serialize from 'form-serialize';

class VendorList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "1",
            location: "none",
            province: "",
            branch: []

        };
    }

    setData(data) {
        this.setState({
            location: data.id,
            province: data.province[0].id,
            branch: data.province[0].branch
        })
    }

    componentWillMount() {
        let data = Data[0];
        this.setData(data)
    }

    onSubmit(e) {
        e.preventDefault();
        let form = document.querySelector('#search');
        var obj = serialize(form, {hash: true});

        let data = Data.find(item => item.id === obj.location)
        data = data.province.find(item => item.id === obj.province)
        this.setState({branch: data.branch})
        return false;
    }

    changeLocation(e) {
        let data = Data.find(item => item.id === e.target.value);
        this.setData(data)

    }

    render() {
        let location = [];
        location = Data.find(item => item.id === this.state.location);
        let provinces = [];
        if (location) {
            provinces = location.province;
        }

        return (<div id="content">
                <div className="row">
                    <div className="col-xs-12 col-sm-7 col-md-7 col-lg-4">
                        <h1 className="page-title txt-color-blueDark">
                            Thống kê doanh thu nhà cung cấp
                        </h1>
                    </div>
                </div>
                <JarvisWidget editbutton={false} custombutton={false}>
                    <header>
                        <span className="widget-icon"> <i className="fa fa-edit"/> </span>

                        <h2>Top tài khoản mua nhiều</h2>
                    </header>
                    <div>
                        {/* widget content */}
                        <div className="widget-body no-padding">
                            <form className="smart-form" id="search">
                                <fieldset>
                                    <div className="row">
                                        <section className="col col-6">
                                            <div className="form-group">
                                                <select className="form-control" name="location"
                                                        value={this.state.location}
                                                        onChange={(e) => this.changeLocation(e)}>
                                                    {
                                                        Data.map((data, i) => (
                                                            <option key={data.id} value={data.id}>{data.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </section>
                                        <section className="col col-6">
                                            <div className="form-group">
                                                <select className="form-control" name="province"
                                                        value={this.state.province}
                                                        onChange={e => this.setState({province: e.target.value})}>
                                                    {
                                                        provinces.map((data, i) => (
                                                            <option key={data.id} value={data.id}>{data.name}</option>
                                                        ))
                                                    }
                                                </select>
                                            </div>
                                        </section>
                                        <section className="col col-6">
                                            <label className="input"> <i className="icon-append fa fa-calendar"/>
                                                <UiDatepicker type="text" name="startdate" id="startdate"
                                                              minRestrict="#finishdate"
                                                              placeholder="Expected start date"/>
                                            </label>
                                        </section>
                                        <section className="col col-6">
                                            <label className="input"> <i className="icon-append fa fa-calendar"/>
                                                <UiDatepicker type="text" name="finishdate" id="finishdate"
                                                              maxRestrict="#startdate"
                                                              placeholder="Expected finish date"/>
                                            </label>
                                        </section>
                                    </div>
                                </fieldset>
                                <footer>
                                        <button className="btn btn-primary"
                                                onClick={this.onSubmit.bind(this)}>Xuất báo cáo
                                        </button>
                                </footer>

                            </form>
                        </div>
                    </div>
                </JarvisWidget>
                <JarvisWidget editbutton={false} color="darken">
                    <header>
                        <span className="widget-icon"> <i className="fa fa-table"/> </span>
                        <h2>Top mua nhiều</h2>
                    </header>
                    <div>
                        <div className="widget-body no-padding">

                            <div className="table-responsive">

                                <table className="table table-bordered table-striped table-hover">
                                    <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Nhà cung cấp</th>
                                        <th>Giao dịch</th>
                                        <th>Doanh thu</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.branch.map((data, i) => (
                                            <tr key={data.id}>
                                                <td>{i}</td>
                                                <td>{data.name}</td>
                                                <td>100,000</td>
                                                <td>100,000,000</td>
                                            </tr>
                                        ))
                                    }


                                    </tbody>

                                </table>

                            </div>

                        </div>
                    </div>
                </JarvisWidget>
            </div>
        )
    }
}

export default Connect(VendorList);