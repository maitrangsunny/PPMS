import React from 'react'

import 'script-loader!bootstrap-tagsinput/dist/bootstrap-tagsinput.min.js'

export default class Tagsinput extends React.Component {

  componentDidMount() {
    $(this.refs.input).tagsinput({
        tagClass: ""
    });
    $(".bootstrap-tagsinput > input").css({
        display: "inline-block",
        "border-width": 0
    })
  }

  render() {
    return (
      <input type="text" {...this.props} ref="input"/>
    )
  }
}