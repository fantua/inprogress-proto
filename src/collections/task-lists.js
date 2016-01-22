import 'backbone.localstorage';
import { Collection, LocalStorage } from 'backbone';
import TaskListModel from '../models/task-list';

const TaskLists = Collection.extend({

    model: TaskListModel,

    localStorage: new LocalStorage('inprogress-proto-data')

});

export default TaskLists;