import 'jquery-ui/sortable';
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import PopupMixin from '../../mixins/popup';
import Menu from '../library/menu';
import TaskList from './task-list';
import CreateTaskListPopup from '../popups/create-task-list';

const LeftColumn = React.createClass({

    mixins: [PopupMixin],

    getInitialState() {
        return {
            focusNewTaskList: false
        };
    },

    componentDidMount() {
        this.props.collection.on('update sort', this.forceUpdate.bind(this, null), this);

        $(this.refs.sortable).sortable({
            items: '> li:not(.disabled)',
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
            this.props.collection.get(id).save('position', index, {silent: true});
        });

        $node.sortable('cancel');

        this.props.collection.sort();
    },

    createTaskList(name) {
        const position = (this.props.collection.length) ? this.props.collection.last().get('position') + 1 : 0;

        this.props.collection.create({name, position});
        this.hidePopup();
        this.setState({focusNewTaskList: true});
    },

    render() {

        const taskLists = this.props.collection.map((list, index, arr) => {
            const focus = this.state.focusNewTaskList && (index + 1 == arr.length);
            return <TaskList model={list} key={list.get('id')} focus={focus} />;
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
                        <button className="task-list-header new-list" onClick={this.showPopup}>New List</button>
                    </li>
                </ul>
                {popup()}
            </div>
        );

    }

});

export default LeftColumn;