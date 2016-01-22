import React from 'react';
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
        this.props.collection.on('update', this.forceUpdate.bind(this, null), this);
    },

    componentWillUnmount() {
        this.props.collection.off(null, null, this);
    },

    createTaskList(name) {
        this.props.collection.create({name});
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
                <ul className="left-column-content" id="left-column-content">
                    {taskLists}
                    <li>
                        <button className="task-list-header new-list" onClick={this.showPopup}>New List</button>
                    </li>
                </ul>
                {popup()}
            </div>
        );

    }

});

export default LeftColumn;