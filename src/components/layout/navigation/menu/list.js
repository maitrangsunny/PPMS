import React from 'react'

import NavMenuItem from './item'

export default function SmartMenuList(props) {

    const {items, ...p} = props;
    // console.log(props.router);

    return (
        <ul {...p}>
            {items.map((item) => {
                return <NavMenuItem item={item} key={item._id}/>
            })}
        </ul>
    )
}
