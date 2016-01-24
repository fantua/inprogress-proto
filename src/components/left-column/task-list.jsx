import React from 'react';
import $ from 'jquery';
import UIModel from '../../models/ui';
import PopupMixin from '../../mixins/popup';
import Task from './task';
import EditTaskListPopup from '../popups/edit-task-list';
import DeleteTaskListPopup from '../popups/delete-task-list';

const TaskList = React.createClass({

    mixins: [PopupMixin],

    getInitialState() {
        return {
            showDeletePopup: false
        };
    },

    componentDidMount() {
        this.props.model.on('change', this.forceUpdate.bind(this, null), this);

        $(this.refs.sortable).sortable({
            items: '> li:not(.disabled)',
            handle: '> .task-list-item-title',
            connectWith: '.connected',
            forcePlaceholderSize: true,
            placeholderClass: 'drag-placeholder',
            update: this.handleSortableUpdate
        });
    },

    componentWillUnmount() {
        this.props.model.off(null, null, this);
    },

    handleSortableUpdate(e, ui) {
        const $node = $(this.refs.sortable);
        const collection = this.props.model.get('tasks');

        if (ui.sender != null) {
            const id = ui.item.data('id');
            const parentId = ui.item.data('parent-id');
            const model = this.props.model.collection.get(parentId).get('tasks').get(id);

            collection.create(model.toJSON(), true);
        }

        $node.sortable('toArray', {attribute: 'data-id'}).forEach((id, index) => {
            collection.get(id).save({position: index}, {silent: true});
        });

        if (ui.sender != null) {
            $node.sortable('cancel');
        }

        collection.sort();
    },

    showDeletePopup() {
        this.setState({showDeletePopup: true});
        this.hidePopup();
    },

    hideDeletePopup() {
        this.setState({showDeletePopup: false});
        this.showPopup();
    },

    delete() {
        this.props.model.destroy();
    },

    edit(name) {
        this.props.model.save({name});
        this.hidePopup();
    },

    handleKeyDown(e) {
        switch (e.key) {
            case 'Enter':
                const name = this.refs.name.value.trim();
                if (name) {
                    e.preventDefault();
                    this.createTask(name);
                    this.refs.name.value = '';
                    break;
                }
            case 'Escape':
                this.refs.name.blur();
                break;
        };
    },

    createTask(name) {
        const collection = this.props.model.get('tasks');
        const position = (collection.length) ? collection.last().get('position') + 1 : 0;

        collection.create({name, position});
        UIModel.set('focusNewTaskFiled', this.props.model.get('id'));
    },

    render() {

        console.log('TaskList - render');

        const name = this.props.model.get('name');
        const id = this.props.model.get('id');
        const tasks = this.props.model.get('tasks').map((task) => {
            return <Task model={task} key={task.get('id')} />;
        });
        const popup = () => {
            if (this.state.showPopup)
                return <EditTaskListPopup name={name} onSubmit={this.edit} onCancel={this.hidePopup} onDelete={this.showDeletePopup} />;
            else if (this.state.showDeletePopup)
                return <DeleteTaskListPopup name={name} onSubmit={this.delete} onCancel={this.hideDeletePopup} />;
        };

        let focus = false;
        if (UIModel.get('focusNewTaskFiled') == id) {
            focus = true;
            UIModel.trigger('focusNewTaskFiled');
        }

        return (
            <li className="task-list">
                <div className="task-list-header" onClick={this.showPopup}>{name}</div>
                <ul ref="sortable" className="task-list-content connected">
                    {tasks}
                    <li className="task-list-item-new disabled">
                        <form>
                            <textarea ref="name" style={{height: '18px'}} autoFocus={focus} onKeyDown={this.handleKeyDown} />
                        </form>
                    </li>
                </ul>
                {popup()}
            </li>
        );

    }

});

export default TaskList;