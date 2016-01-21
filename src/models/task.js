import 'backbone-relational';
import { RelationalModel as Model } from 'backbone';

const Task = Model.extend({

    defaults: {
        id: null,
        position: null,
        name: '',
        description: ''
    }

});

export default Task;