import React from 'react'

import Header from './header'
import Navigation from './navigation'
import Ribbon from './ribbon'
import Footer from './footer'
import Shortcut from './navigation/shortcut';

import Configs from '../../configs';

export default class Layout extends React.Component {

    render() {
        return (
            <div>
                <Header logout={() => this.props.logout()} />
                <Navigation items={Configs.navigation1} />
                <div id="main" role="main">
                    <Ribbon />
                    {/* {this.props.children} */}
                </div>

                <Footer />
                <Shortcut />
            </div>
        )
    }
}

