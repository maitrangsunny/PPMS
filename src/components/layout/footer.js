/**
 * Created by griga on 11/24/15.
 */

import React from 'react'

import {Dropdown, MenuItem} from 'react-bootstrap'

export default class Footer extends React.Component {
    render() {
        return (
            <div className="page-footer">
                <div className="row">
                    <div className="col-xs-12 col-sm-6">
                        <span className="txt-color-white">Power by © PPMS.VN</span>
                    </div>

                    <div className="col-xs-6 col-sm-6 text-right hidden-xs">
                        <div className="txt-color-white inline-block">
                            <i className="txt-color-blueLight hidden-mobile">Last account activity <i
                                className="fa fa-clock-o"/> &nbsp; <strong>52 mins ago</strong> </i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}