import React from 'react';
import PopupMixin from '../../mixins/popup';
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
    },

    componentWillUnmount() {
        this.props.model.off(null, null, this);
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

    render() {

        const name = this.props.model.get('name');
        const id = this.props.model.get('id');
        const popup = () => {
            if (this.state.showPopup)
                return <EditTaskListPopup name={name} onSubmit={this.edit} onCancel={this.hidePopup} onDelete={this.showDeletePopup} />;
            else if (this.state.showDeletePopup)
                return <DeleteTaskListPopup name={name} onSubmit={this.delete} onCancel={this.hideDeletePopup} />;
        };

        const { focus } = this.props;

        return (
            <li className="task-list" data-id={id}>
                <div className="task-list-header" onClick={this.showPopup}>{name}</div>
                <ul className="task-list-content">
                    <li className="task-list-item-new">
                        <form>
                            <textarea style={{height: '18px'}} autoFocus={focus} />
                        </form>
                    </li>
                </ul>
                {popup()}
            </li>
        );

    }

});

export default TaskList;