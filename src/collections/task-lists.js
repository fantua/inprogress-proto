import 'backbone.localstorage';
import { Collection, LocalStorage } from 'backbone';
import TaskListModel from '../models/task-list';

const TaskLists = Collection.extend({

    model: TaskListModel,

    localStorage: new LocalStorage('inprogress-proto-data'),

    // sort collection by position
    comparator(item) {
        return item.get('position');
    },

    getTasksByStatus(status) {
        let result = [];

        this.each((model) => {
            result = result.concat(model.get('tasks').where({status}));
        });

        return result;
    },

    getTaskById(id) {
        let result = null;

        this.find(model => result = model.get('tasks').get(id));

        return result;
    }

});

export default TaskLists;