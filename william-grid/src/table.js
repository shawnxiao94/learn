import { $, createHTML } from './utils';
import TBody from './tbody';
import THead from './thead';
import Emitter from './Emitter';
import Colgroup from './colgroup';
export default class Table {
    constructor(columns) {
        this.setupOptions(columns);
        this.setupEmiiter();
        this.initColgroup();
    }
    setupOptions(columns) {
        this.columns = columns;
        this.unionColumns = this.concatColumn(columns);
        this.colgroup = null;
        this.thead = null;
        this.tbody = null;
        this.$wrapper = createHTML('div');
        this.$element = createHTML('table', {
            append_to: this.$wrapper,
            class: 'william-table'
        });
    }
    // 注册事件
    setupEmiiter() {
        this.Emitter = new Emitter();
    }
    // 获取所有底层对象
    concatColumn(_columns) {
        debugger;
        let columns = Array.from(_columns);
        let unionColumns = [];
        for (let column of columns) {
            if (column.columns) {
                column.columns.forEach(c => {
                    c.fixed = column.field;
                });
                unionColumns.push.apply(
                    columns,
                    this.concatColumn(column.columns)
                );
            } else {
                unionColumns.push(column);
            }
        }
        return unionColumns;
    }
    // 获取固定列
    getFixedColumns() {
        return this.unionColumns.filter(item => {
            return item.fixed;
        });
    }
    // 获取列宽方法
    forColumnWidth(viewWidth, callback) {
        let totalWidth = 0;
        function getValue(value) {
            value = parseInt(value);
            return String(value).indexOf('%') != -1
                ? value / 100 * viewWidth
                : value;
        }
        for (let column of this.unionColumns) {
            if (callback(column)) {
                totalWidth += getValue(column.width);
            }
        }
        return totalWidth;
    }
    getColumnWidth(viewWidth) {
        return Math.max(
            this.forColumnWidth(viewWidth, c => {
                return c.width;
            }),
            viewWidth
        );
    }
    getFixedColumnWidth(viewWidth) {
        return this.forColumnWidth(viewWidth, c => {
            return c.width && c.fixed;
        });
    }
    getHeight() {
        return this.$element.offsetHeight;
    }
    getWidth() {
        return this.$element.offsetWidth;
    }

    setWidth(width) {
        $.styles(this.$element, {
            width: width
        });
    }
    setHeight(height) {
        $.styles(this.$element, {
            height: height
        });
    }
    setOuterWidth(width) {
        $.styles(this.$wrapper, {
            width: width
        });
    }
    setOuterHeight(height) {
        $.styles(this.$wrapper, {
            height: height
        });
    }

    setStyle(styles) {
        $.styles($element, styles);
    }
    clone() {
        return new Table(this.columns);
    }
    initColgroup() {
        this.colgroup = new Colgroup(this.unionColumns);
    }
    setHead(thead) {
        this.thead = thead;
    }
    initHead(visibleNoFixed) {
        this.thead = new THead(this.columns, visibleNoFixed);
    }
    initBody(visibleNoFixed) {
        this.tbody = new TBody(this.unionColumns, visibleNoFixed);
    }
    renderData(data) {
        this.tbody.renderData(data);
        this.Emitter.trigger('onRenderData', data);
    }
    render($parent) {
        this.colgroup.render(this.$element);
        this.thead && this.thead.render(this.$element);
        this.tbody && this.tbody.render(this.$element);
        $parent.append(this.$wrapper);
    }
}
