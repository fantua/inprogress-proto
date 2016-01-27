import 'jquery-ui/sortable';
import React from 'react';
import $ from 'jquery';
import UIModel from '../../models/ui';
import PopupMixin from '../../mixins/popup';
import Menu from '../library/menu';
import TaskList from './task-list';
import CreateTaskListPopup from '../popups/create-task-list';

const LeftColumn = React.createClass({

    mixins: [PopupMixin],

    componentDidMount() {
        this.props.collection.on('update sort', this.forceUpdate.bind(this, null), this);

        $(this.refs.sortable).sortable({
            items: '> li:not(.disabled)',
            handle: '> .task-list-header',
            forcePlaceholderSize: true,
            placeholderClass: 'drag-placeholder',
            update: this.handleSortableUpdate
        });

    },

    componentWillUnmount() {
        this.props.collection.off(null, null, this);
        $(this.refs.sortable).sortable('destroy');
    },

    handleSortableUpdate(e, ui) {
        const $node = $(this.refs.sortable);

        $node.sortable('toArray', {attribute: 'data-id'}).forEach((id, index) => {
            this.props.collection.get(id).save({position: index}, {silent: true});
        });

        $node.sortable('cancel');

        this.props.collection.sort();
    },

    createTaskList(name) {
        const position = (this.props.collection.length) ? this.props.collection.last().get('position') + 1 : 0;
        const task = this.props.collection.create({name, position});

        this.hidePopup();
        UIModel.set('focusNewTaskFiled', task.get('id'));
    },

    render() {

        if (process.env.NODE_ENV === "development") {
            console.log('LeftColumn - render');
        }

        const taskLists = this.props.collection.map((model) => {
            return <TaskList model={model} key={model.get('id')} />;
        });

        const popup = () => {
            if (this.state.showPopup)
                return <CreateTaskListPopup onSubmit={this.createTaskList} onCancel={this.hidePopup} />;
        };

        return (
            <div className="left-column">
                <div className="left-column-header">
                    <Menu />
                </div>
                <ul ref="sortable" className="left-column-content" id="left-column-content">
                    {taskLists}
                    <li className="disabled">
                        <button className="task-list-header new-list tint-three" onClick={this.showPopup}>New List</button>
                    </li>
                </ul>
                {popup()}
            </div>
        );

    }

});

export default LeftColumn;