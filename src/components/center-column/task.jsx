import React from 'react';
import UIModel from '../../models/ui';
import TaskSelectMixin from '../../mixins/task-select';

const Task = React.createClass({

    mixins: [TaskSelectMixin],

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

    handleCheckboxClick() {
        this.props.model.save({status: 'done'});
    },

    render() {

        if (process.env.NODE_ENV === "development") {
            console.log('Center Task - render');
        }

        const id = this.props.model.get('id');
        const name = this.props.model.get('name');
        const listName = this.props.model.get('parent').get('name');

        let liClassName = '';
        if (this.state.selected) liClassName += ' status-list-item-selected';

        return (
            <li data-id={id} className={liClassName}>
                <div className="status-list-item-checkbox">
                    <button onClick={this.handleCheckboxClick}>
                        <img alt="not checked" src="app-assets/icn-check-outline-2x.png" />
                    </button>
                </div>
                <div className="drag-handle" onClick={this.handleSelectClick}>
                    <div className="status-list-item-title">{name}</div>
                    <div className="status-list-item-subtitle">{listName}</div>
                </div>
            </li>
        );

    }

});

export default Task;