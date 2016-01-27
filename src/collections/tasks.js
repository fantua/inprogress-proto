import 'backbone.localstorage';
import { Collection } from 'backbone';
import TaskModel from '../models/task';

const Tasks = Collection.extend({

    model: TaskModel,

    initialize() {

    },

    // sort collection by position
    comparator(item) {
        return item.get('position');
    }

});

export default Tasks;