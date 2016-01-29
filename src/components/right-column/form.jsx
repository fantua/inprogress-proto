import React from 'react';
import autosize from 'autosize';
import PopupMixin from '../../mixins/popup';
import TaskChangeStatusMixin from '../../mixins/task-change-status';
import DeleteTaskPopup from '../popups/delete-task';
import UIModel from '../../models/ui';

import $ from 'jquery';

const Form = React.createClass({

    mixins: [PopupMixin, TaskChangeStatusMixin],

    componentDidMount() {
        this.props.model.on('change', this.forceUpdate.bind(this, null), this);
        window.addEventListener('resize', this.handleResize);
        autosize(this.refs.name);
    },

    componentWillUnmount() {
        this.props.model.off(null, null, this);
        window.removeEventListener('resize', this.handleResize);
        autosize.destroy(this.refs.name);
    },

    handleNameKeyDown(e) {
        switch (e.key) {
            case 'Enter':
                const name = this.refs.name.value.trim();
                if (name) {
                    e.preventDefault();
                    this.props.model.save({name});
                }
            case 'Escape':
                this.refs.name.value = this.props.model.get('name');
                this.refs.name.blur();
                break;
        };
    },

    handleDescriptionKeyDown(e) {
        switch (e.key) {
            case 'Enter':
                const description = this.refs.description.value.trim();

                this.props.model.save({description}, {silent: true});
                // Windows - ctrlKey, OS X - metaKey (Cmd)
                if (!(e.ctrlKey || e.metaKey)) break;
                e.preventDefault();
            case 'Escape':
                this.refs.description.value = this.props.model.get('description');
                this.refs.description.blur();
                break;
        };
    },

    handleResize() {
        this.refs.content.style.height = (window.innerHeight - 64) + "px";
    },

    onFocus() {
        autosize.update(this.refs.name);
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

        const style = {
            height: (window.innerHeight - 64) + "px"
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
                <div ref="content" className="task-details-content" style={style}>
                    <div className="task-details-title">
                        <textarea ref="name" rows="1" spellCheck="false" defaultValue={name} onFocus={this.onFocus} onKeyDown={this.handleNameKeyDown} style={{height: '22px'}} />
                    </div>
                    <div className="task-details-subtitle">
                        {listName}
                    </div>
                    <div className="task-details-description">
                        <textarea ref="description" spellCheck="false" defaultValue={description} onKeyDown={this.handleDescriptionKeyDown} style={{height: '300px'}} />
                    </div>
                </div>
                {popup()}
            </form>
        );

    }


});

export default Form;