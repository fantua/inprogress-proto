import React from 'react';
import PopupMixin from '../../mixins/popup';
import TaskChangeStatusMixin from '../../mixins/task-change-status';
import DeleteTaskPopup from '../popups/delete-task';
import UIModel from '../../models/ui';

import $ from 'jquery';

const Form = React.createClass({

    mixins: [PopupMixin, TaskChangeStatusMixin],

    componentDidMount() {
        this.props.model.on('change', this.forceUpdate.bind(this, null), this);
    },

    componentWillUnmount() {
        this.props.model.off(null, null, this);
    },

    handleKeyDown(ref, e) {
        switch (e.key) {
            case 'Enter':
                const value = this.refs[ref].value.trim();
                // Windows - ctrlKey, OS X - metaKey (Cmd)
                if (ref == 'description' && !(e.ctrlKey || e.metaKey)) break;
                if (value) {
                    e.preventDefault();
                    this.props.model.save(ref, value);
                }
            case 'Escape':
                this.refs[ref].value = this.props.model.get(ref);
                this.refs[ref].blur();
                break;
        };
    },

    delete() {
        this.props.model.collection.remove(this.props.model);
        UIModel.set('selectedTask', null);
    },

    render() {

        if (process.env.NODE_ENV === "development") {
            console.log('Right Form - render');
        }

        const name = this.props.model.get('name');
        const listName = this.props.model.get('parent').get('name');
        const description = this.props.model.get('description');
        const status = this.props.model.get('status');

        const src = this.getStatusImage(status, 'detail');

        const popup = () => {
            if (this.state.showPopup)
                return <DeleteTaskPopup name={name} onSubmit={this.delete} onCancel={this.hidePopup} />;
        };

        return (
            <form>
                <div className="right-column-header">
                    <div style={{float: 'right'}} onClick={this.showPopup}>
                        <button type="button">
                            <img alt="menu" src="app-assets/icn-detail-trash-2x.png" width="40" height="40" />
                        </button>
                    </div>
                    <div style={{float: 'right'}} onClick={this.onCheckboxClick}>
                        <button type="button">
                            <img alt="menu" src={src} width="40" height="40" />
                        </button>
                    </div>
                </div>
                <div className="task-details-content" id="task-details-content">
                    <div className="task-details-title">
                        <textarea ref="name" spellCheck="false" defaultValue={name} onKeyDown={this.handleKeyDown.bind(this, 'name')} style={{height: '22px'}} />
                    </div>
                    <div className="task-details-subtitle">
                        {listName}
                    </div>
                    <div className="task-details-description">
                        <textarea ref="description" spellCheck="false" defaultValue={description} onKeyDown={this.handleKeyDown.bind(this, 'description')} style={{height: '300px'}} />
                    </div>
                </div>
                {popup()}
            </form>
        );

    }


});

export default Form;