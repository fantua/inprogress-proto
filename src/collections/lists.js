import { Collection } from 'backbone';
import ListModel from '../models/list';

const Lists = Collection.extend({

    model: ListModel

    // TODO: add localStorage support
    //localStorage: new LocalStorage('todos-traceur-backbone');

});

export default Lists;