import { $, createHTML } from './utils';
export default class THead {
    constructor(columns, visibleNoFixed) {
        this.visibleNoFixed = visibleNoFixed;
        this.$element = createHTML('thead');
        this.addRow(columns);
    }
    rowDepth(columns, len) {
        let childColumns = [];
        for (let column of columns) {
            if (column.columns && column.columns.length > 0) {
                childColumns = childColumns.concat(column.columns);
            }
        }
        if (childColumns.length > 0) {
            return this.rowDepth(childColumns, len + 1);
        }
        return len;
    }
    colDepth(columns, len) {
        let childColumns = [];
        let length = columns.length;
        for (let column of columns) {
            if (column.columns && column.columns.length > 0) {
                childColumns = childColumns.concat(column.columns);
            }
        }
        if (childColumns.length > 0) {
            return this.colDepth(childColumns, len + length - 1);
        }
        return len + length;
    }
    addRow(columns) {
        let tr = createHTML('tr');
        let childColumns = [];
        let rowSpan = this.rowDepth(columns, 1);
        columns.forEach(column => {
            this.addCell(tr, column, rowSpan);
            if (column.columns) {
                childColumns = childColumns.concat(column.columns);
            }
        });
        this.$element.append(tr);
        if (childColumns.length > 0) {
            this.addRow(childColumns);
        }
    }
    addCell($parent, column, rowSpan) {
        let $cell = createHTML('th');
        let crowSpan = 0;
        let attrs = {};
        if (column.headFormat && typeof column.headFormat === 'function') {
            $cell.innerHTML = column.headFormat(column);
        } else {
            $cell.innerHTML = column.title;
        }
        if (column.headAttrs && typeof column.headAttrs === 'object') {
            attrs = Object.assign(attrs, column.headAttrs);
        }
        if (column.columns && column.columns.length > 0) {
            attrs.colspan = this.colDepth(column.columns, 0);
            crowSpan = this.rowDepth(column.columns, 1);
        }
        if (this.visibleNoFixed && !column.fixed) {
            $cell.classList.add('william-hidden');
        }
        rowSpan -= crowSpan;
        if (rowSpan > 1) {
            attrs.rowspan = rowSpan;
        }
        $.attr($cell, attrs);
        $parent.append($cell);
    }
    render($parent) {
        $parent.append(this.$element);
    }
}
