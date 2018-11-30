'use strict';

import React from 'react';
import {
    Link
} from 'react-router-dom';


const PageView = (props) => {
    let cssClassName = props.pageClassName;
    const linkClassName = props.pageLinkClassName;
    const onClick = props.onClick;
    const href = props.href;
    let ariaLabel = 'Page ' + props.page +
        (props.extraAriaContext ? ' ' + props.extraAriaContext : '');
    let ariaCurrent = null;

    if (props.selected) {
        ariaCurrent = 'page';
        ariaLabel = 'Page ' + props.page + ' is your current page';
        if (typeof(cssClassName) !== 'undefined') {
            cssClassName = cssClassName + ' ' + props.activeClassName;
        } else {
            cssClassName = props.activeClassName;
        }
    }
// console.log(href);
    return (
        <li className={cssClassName} onClick={onClick}>
            <Link
                className={linkClassName}
                to={href || "/"}
                tabIndex={props.page}
                aria-label={ariaLabel}
                aria-current={ariaCurrent}>{props.page}</Link>
        </li>
    )
};

export default PageView;