import 'backbone.localstorage';
import { Collection } from 'backbone';
import TaskModel from '../models/task';

const Tasks = Collection.extend({

    model: TaskModel,

    initialize() {
        this.on('sort', () => this.parent.trigger('change', this.parent));
    },

    // sort collection by position
    comparator(item) {
        return item.get('position');
    },

    // Temporary solution:
    create(model, silent = false) {
        this.add(model, {silent: true});
        this.parent.save(null, {silent: true});
        if (!silent) this.parent.trigger('change', this.parent);
    }

});

export default Tasks;