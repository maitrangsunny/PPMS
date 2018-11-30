import React, {
    Component
} from 'react';

import Item from './item';

export default class CategoryListItem extends Component {

    render() {
        return (
            <ol className="dd-list"> {
                this.props.data.map(category =>
                    <Item key={category.categoryId} data={category}/>
                )
            }
            </ol>
        )
    }
}