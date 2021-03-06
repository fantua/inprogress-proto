import 'jquery-ui/sortable';
import React from 'react';
import $ from 'jquery';
import Config from '../../config';
import UIModel from '../../models/ui';
import Task from './task';

const CenterColumn = React.createClass({

    componentDidMount() {
        this.props.collection.on('update relational:change:status remove:tasks', this.forceUpdate.bind(this, null), this);

        $(this.refs.sortable).sortable({
            items: '> li',
            handle: '> .drag-handle',
            delay: Config.dragDelay,
            distance: Config.dragDistance,
            forcePlaceholderSize: true,
            placeholder: 'drag-placeholder',
            update: this.handleSortableUpdate
        });

        window.addEventListener('resize', this.handleResize);
    },

    componentWillUnmount() {
        this.props.collection.off(null, null, this);
        $(this.refs.sortable).sortable('destroy');
        window.removeEventListener('resize', this.handleResize);
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

    handleResize() {
        this.refs.content.style.height = (window.innerHeight - 64) + "px";
    },

    render() {

        if (process.env.NODE_ENV === "development") {
            console.log('CenterColumn - render');
        }

        let tasks = [];
        UIModel.get('statusList').forEach((model) => {
            tasks.push(<Task model={model} key={model.get('id')} />)
        });

        const style = {
            height: (window.innerHeight - 64) + "px"
        };

        return (
            <div className="center-column">
                <div className="center-column-header">
                    <div style={{float: 'left'}}>
                        <img alt="menu" src="app-assets/icn-inp-2x.png" width="40" height="40" />
                    </div>
                    <div className="in-progress-title">In Progress</div>
                </div>
                <ul ref="content" className="center-column-content" style={style}>
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