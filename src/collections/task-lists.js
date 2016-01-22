import 'backbone.localstorage';
import { Collection, LocalStorage } from 'backbone';
import TaskListModel from '../models/task-list';

const TaskLists = Collection.extend({

    model: TaskListModel,

    localStorage: new LocalStorage('inprogress-proto-data'),

    // sort collection by position
    comparator(item) {
        return item.get('position');
    }

});

export default TaskLists;