import React from 'react';
import UIModel from '../../models/ui';
import TaskSelectMixin from '../../mixins/task-select';
import TaskChangeStatusMixin from '../../mixins/task-change-status';

const Task = React.createClass({

    mixins: [TaskSelectMixin, TaskChangeStatusMixin],

    componentWillMount() {
        this.setState({selected: (UIModel.get('selectedTask') == this.props.model.get('id'))});
    },

    componentDidMount() {
        this.props.model.on('change', this.forceUpdate.bind(this, null), this);
        UIModel.on('change:selectedTask', this.handleChangeSelectedTask, this);
    },

    componentWillUnmount() {
        this.props.model.off(null, null, this);
        UIModel.off(null, null, this);
    },

    render() {

        if (process.env.NODE_ENV === "development") {
            console.log('Left Task - render');
        }

        const id = this.props.model.get('id');
        const name = this.props.model.get('name');
        const status = this.props.model.get('status');

        const src = this.getStatusImage(status);

        let titleClassName = 'task-list-item-title';
        if (status == 'done') titleClassName += ' task-list-item-title-done';

        let liClassName = '';
        if (this.state.selected) liClassName += ' task-list-item-selected';

        return (
            <li data-id={id} className={liClassName}>
                <div ref="test"  className="task-list-item-checkbox" onClick={this.onCheckboxClick}>
                    <a href="#">
                        <img alt="not checked" src={src} />
                    </a>
                </div>
                <div onClick={this.handleSelectClick} className={titleClassName}>{name}</div>
            </li>
        );

    }

});

export default Task;