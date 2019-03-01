import React, { Component } from "react";

import serialize from "form-serialize";
import Utils, { LINK } from "../../utils";
import FUNC from "../../utils";
import Connect from "../../stores/connect";
import Loading from "../../components/loading";
import {Tabs,Tab} from "react-bootstrap";


class LoginUser extends Component {
    constructor(props) {
        super(props);
    
    }

    render() {
        return (
            <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                <Tab eventKey={1} title="Tab 1">
                    Login 
                    
                </Tab>
                <Tab eventKey={2} title="Tab 2">
                   Register
                </Tab>
            </Tabs>
        );
    }
}

export default Connect(LoginUser);
