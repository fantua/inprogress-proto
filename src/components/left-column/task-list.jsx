import 'jquery-ui/sortable';
import React from 'react';
import $ from 'jquery';
import autosize from 'autosize';
import Config from '../../config';
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
        this.props.model.on('change add:tasks reset:tasks remove:tasks', this.forceUpdate.bind(this, null), this);

        $(this.refs.sortable).sortable({
            items: '> li:not(.disabled)',
            handle: '> .task-list-item-title',
            connectWith: '.connected',
            delay: Config.dragDelay,
            distance: Config.dragDistance,
            forcePlaceholderSize: true,
            placeholder: 'drag-placeholder',
            update: this.handleSortableUpdate
        });
    },

    componentWillUnmount() {
        this.props.model.off(null, null, this);
        $(this.refs.sortable).sortable('destroy');
        autosize.destroy(this.refs.name);
    },

    handleSortableUpdate(e, ui) {
        const $node = $(this.refs.sortable);
        const collection = this.props.model.get('tasks');

        if (ui.sender != null) return;

        const $parent = ui.item.parent()[0];
        const parentId = $parent.dataset.id;

        if (this.props.model.get('id') != parentId) {
            // Handle connected drag:
            const parent = this.props.model.collection.get(parentId).get('tasks');
            const model = collection.get(ui.item.data('id'));
            const data = model.toJSON();

            collection.remove(model, {silent: true});
            parent.add(data, {silent: true});

            $($parent).sortable('toArray', {attribute: 'data-id'}).forEach((id, index) => {
                parent.get(id).set('position', index, {silent: true});
            });
            $node.sortable('toArray', {attribute: 'data-id'}).forEach((id, index) => {
                collection.get(id).set('position', index, {silent: true});
            });

            $node.sortable('cancel');

            parent.sort();
            collection.sort();
        } else {
            // Handle default drag:
            $node.sortable('toArray', {attribute: 'data-id'}).forEach((id, index) => {
                collection.get(id).set('position', index, {silent: true});
            });

            $node.sortable('cancel');

            collection.sort();
        }
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
        const task = collection.add({name, position});

        UIModel.set('selectedTask', task.get('id'));
        UIModel.set('focusNewTaskFiled', this.props.model.get('id'));
    },

    onFocus() {
        autosize(this.refs.name);
    },

    render() {

        if (process.env.NODE_ENV === "development") {
            console.log('Left TaskList - render');
        }

        const id = this.props.model.get('id');
        const name = this.props.model.get('name');
        const tasks = this.props.model.get('tasks').map((model) => {
            return <Task model={model} key={model.get('id')} />;
        });
        const popup = () => {
            if (this.state.showPopup)
                return <EditTaskListPopup name={name} onSubmit={this.edit} onCancel={this.hidePopup} onDelete={this.showDeletePopup} />;
            else if (this.state.showDeletePopup)
                return <DeleteTaskListPopup name={name} onSubmit={this.delete} onCancel={this.hideDeletePopup} />;
        };

        const autoFocus = UIModel.focusNewTaskFiled(id);

        return (
            <li className="task-list" data-id={id}>
                <div className="task-list-header" onClick={this.showPopup}>{name}</div>
                <ul ref="sortable" className="task-list-content connected" data-id={id}>
                    {tasks}
                    <li className="task-list-item-new disabled">
                        <form>
                            <textarea ref="name" rows="1" style={{height: '18px'}} onFocus={this.onFocus} autoFocus={autoFocus} onKeyDown={this.handleKeyDown} />
                        </form>
                    </li>
                </ul>
                {popup()}
            </li>
        );

    }

});

export default TaskList;