import { $, createHTML } from './utils';
export default class TBody {
    constructor(columns, visibleNoFixed) {
        this.visibleNoFixed = visibleNoFixed;
        this.columns = columns;
        this.$element = createHTML('tbody');
    }
    addRow(rowData) {
        let tr = createHTML('tr');
        let columns = this.columns;
        columns.forEach(column => {
            this.addCell(tr, column, rowData);
        });
        this.$element.append(tr);
    }
    addCell($parent, column, rowData) {
        let $cell = createHTML('td');
        let attrs = {};
        if (column.format && typeof column.format === 'function') {
            $cell.innerHTML = column.format(rowData[column.field]);
        } else {
            $cell.innerHTML = rowData[column.field];
        }
        if (column.attrs) {
            attrs = Object.assign(attrs, column.attrs);
        }
        if (this.visibleNoFixed && !column.fixed) {
            $cell.classList.add('william-hidden');
        }
        $.attr($cell, attrs);
        if (column.rowSpan) {
            let rowSpan = column.rowSpan(rowData, column);
            let isNumber = typeof rowSpan == 'number';
            if (isNumber && rowSpan > 1) {
                $.attr($cell, { rowspan: rowSpan });
            } else if (isNumber && rowSpan < 0) {
                return;
            }
        }
        $parent.append($cell);
    }
    renderData(data) {
        data = data.data || [];
        this.$element.innerHTML = '';
        data.forEach(this.addRow.bind(this));
    }
    render($parent) {
        $parent.append(this.$element);
    }
}
