import React from 'react'

//import {connect} from 'react-redux'

import Connect from '../../../stores/connect';
import Configs from '../../../configs';

class SmallBreadcrumbs extends React.Component {

  render() {
    let pathname= this.props.router.location.pathname;
    let current = this.props.app.navigations[pathname];
    if(current){
        let parents = current.parents;
        return (
            <ol className="breadcrumb">
                {
                    parents && parents.map(it => (
                        <li key={it.title}>{it.title}</li>
                    ))
                }
                <li key={current.title}>{current.title}</li>
            </ol>
        )
    }else {
        return null;
    }

  }
}

export default Connect(SmallBreadcrumbs);