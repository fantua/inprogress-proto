import React from 'react';
import UIModel from '../../models/ui';

const Task = React.createClass({

    componentDidMount() {
        this.props.model.on('change', this.forceUpdate.bind(this, null), this);
    },

    componentWillUnmount() {
        this.props.model.off(null, null, this);
    },

    onClick() {
        const clickCount = UIModel.get('clickCount') + 1;
        UIModel.set({clickCount});

        if (clickCount == 1) {
            UIModel.set('timer', setTimeout(() => {
                UIModel.set({clickCount: 0});
                this.handleClick();
            }, 250));
        } else {
            clearTimeout(UIModel.get('timer'));
            UIModel.set({clickCount: 0});
            this.handleDoubleClick();
        }
    },

    handleClick() {
        const status = {
            'initial': 'in-progress',
            'in-progress': 'initial',
            'done': 'initial'
        }[this.props.model.get('status')];

        this.props.model.save({status});
    },

    handleDoubleClick() {
        const status = {
            'initial': 'done',
            'in-progress': 'done',
            'done': 'initial'
        }[this.props.model.get('status')];

        this.props.model.save({status});
    },

    render() {

        console.log('Task - render');

        console.log(this.props.model);

        const id = this.props.model.get('id');
        const parentId = this.props.model.get('parent').get('id');
        const name = this.props.model.get('name');
        const status = this.props.model.get('status');

        const src = {
            'initial': 'app-assets/icn-arrow-outline-2x.png',
            'in-progress': 'app-assets/icn-arrow-fill-2x.png',
            'done': 'app-assets/icn-v-2x.png'
        }[status];

        let className = 'task-list-item-title';
        if (status == 'done') className += ' task-list-item-title-done';

        return (
            <li data-id={id} data-parent-id={parentId}>
                <div ref="test"  className="task-list-item-checkbox" onClick={this.onClick}>
                    <a href="#">
                        <img alt="not checked" src={src} />
                    </a>
                </div>
                <div className={className}>{name}</div>
            </li>
        );

    }

});

export default Task;