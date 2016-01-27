import React from 'react';
import UIModel from '../../models/ui';
import TaskSelectMixin from '../../mixins/task-select';

const Task = React.createClass({

    mixins: [TaskSelectMixin],

    componentDidMount() {
        this.props.model.on('change', this.forceUpdate.bind(this, null), this);
        UIModel.on('change:selectedTask', this.handleChangeSelectedTask, this);
    },

    componentWillUnmount() {
        this.props.model.off(null, null, this);
        UIModel.off(null, null, this);
    },

    onCheckboxClick() {
        const clickCount = UIModel.get('clickCount') + 1;
        UIModel.set({clickCount});

        if (clickCount == 1) {
            UIModel.set('timer', setTimeout(() => {
                UIModel.set({clickCount: 0});
                this.handleCheckboxClick();
            }, 200));
        } else {
            clearTimeout(UIModel.get('timer'));
            UIModel.set({clickCount: 0});
            this.handleCheckboxDoubleClick();
        }
    },

    handleCheckboxClick() {
        const status = {
            'initial': 'in-progress',
            'in-progress': 'initial',
            'done': 'initial'
        }[this.props.model.get('status')];

        this.props.model.save({status});
        if (status == 'in-progress') UIModel.set('selectedTask', this.props.model.get('id'));
    },

    handleCheckboxDoubleClick() {
        const status = {
            'initial': 'done',
            'in-progress': 'done',
            'done': 'initial'
        }[this.props.model.get('status')];

        this.props.model.save({status});
    },

    render() {

        console.log('Left Task - render');

        const id = this.props.model.get('id');
        const name = this.props.model.get('name');
        const status = this.props.model.get('status');

        const src = {
            'initial': 'app-assets/icn-arrow-outline-2x.png',
            'in-progress': 'app-assets/icn-arrow-fill-2x.png',
            'done': 'app-assets/icn-v-2x.png'
        }[status];

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