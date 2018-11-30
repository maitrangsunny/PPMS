import React from "react";
import ToggleShortcut from "./toggle_shortcut";

import Connect from "../../../stores/connect";

class LoginInfo extends React.Component {
  render() {
    return (
      <div className="login-info">
        <span>
          <ToggleShortcut>
            <span>
              <h4>
                {this.props.user && this.props.user.name
                  ? this.props.user.name
                  : ""}
              </h4>
            </span>
            <i className="fa fa-angle-down" />
          </ToggleShortcut>
        </span>
      </div>
    );
  }

  componentWillMount() {
    this.props.actions.storage.getUser();
  }
}

export default Connect(LoginInfo);
