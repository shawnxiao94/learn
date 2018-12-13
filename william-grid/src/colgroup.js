import { $, createHTML } from './utils';
export default class Colgroup {
    constructor(columns) {
        this.$element = createHTML('colgroup');
        columns.forEach(column => {
            let $col = createHTML('col');
            if (column.hasOwnProperty('width')) {
                $.styles($col, { width: column.width });
            }
            this.$element.append($col);
        });
    }
    render($parent) {
        $parent.append(this.$element);
    }
}
