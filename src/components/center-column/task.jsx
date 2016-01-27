import React from 'react';
import UIModel from '../../models/ui';

const Task = React.createClass({

    componentDidMount() {
        this.props.model.on('change', this.forceUpdate.bind(this, null), this);
    },

    componentWillUnmount() {
        this.props.model.off(null, null, this);
    },

    handleClick() {
        this.props.model.save({status: 'done'});
    },

    render() {

        console.log('Center Task - render');

        const id = this.props.model.get('id');
        const name = this.props.model.get('name');
        const listName = this.props.model.get('parent').get('name');

        return (
            <li data-id={id}>
                <div className="status-list-item-checkbox">
                    <button onClick={this.handleClick}>
                        <img alt="not checked" src="app-assets/icn-check-outline-2x.png" />
                    </button>
                </div>
                <div className="status-list-item-title">{name}</div>
                <div className="status-list-item-subtitle">{listName}</div>
            </li>
        );

    }

});

export default Task;