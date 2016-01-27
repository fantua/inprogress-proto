import 'jquery-ui/sortable';
import React from 'react';
import $ from 'jquery';
import UIModel from '../../models/ui';
import Task from './task';

const CenterColumn = React.createClass({

    componentDidMount() {
        this.props.collection.on('update relational:change:status', this.forceUpdate.bind(this, null), this);

        $(this.refs.sortable).sortable({
            items: '> li',
            handle: '> .status-list-item-title',
            forcePlaceholderSize: true,
            placeholderClass: 'drag-placeholder',
            update: this.handleSortableUpdate
        });

    },

    componentWillUnmount() {
        this.props.collection.off(null, null, this);
        $(this.refs.sortable).sortable('destroy');
    },

    componentWillUpdate() {
        UIModel.setStatusList(this.props.collection.getTasksByStatus('in-progress'));
    },

    handleSortableUpdate(e, ui) {
        const $node = $(this.refs.sortable);

        $node.sortable('toArray', {attribute: 'data-id'}).forEach((id, index) => {
            UIModel.get('statusList').get(id).set({statusListPosition: index}, {silent: true});
        });

        $node.sortable('cancel');
        this.forceUpdate();
    },

    render() {

        console.log('CenterColumn - render');

        let tasks = [];
        UIModel.get('statusList').forEach((model) => {
            tasks.push(<Task model={model} key={model.get('id')} />)
        });

        return (
            <div className="center-column">
                <div className="center-column-header">
                    <div style={{float: 'left'}}>
                        <img alt="menu" src="app-assets/icn-inp-2x.png" width="40" height="40" />
                    </div>
                    <div className="in-progress-title">In Progress</div>
                </div>
                <ul className="center-column-content" id="center-column-content">
                    <li className="status-list">
                        <ul ref="sortable" className="status-list-content">
                            {tasks}
                        </ul>
                    </li>
                </ul>
            </div>
        );

    }


});

export default CenterColumn;