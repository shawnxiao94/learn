var Grid = (function () {
    'use strict';

    function $(expr, con) {
        return typeof expr === 'string'
            ? (con || document).querySelector(expr)
            : expr || null;
    }

    function createHTML(tag, attrs) {
        const elem = document.createElement(tag);
        for (let attr in attrs) {
            if (attr === 'append_to') {
                const parent = attrs.append_to;
                parent.appendChild(elem);
            } else if (attr === 'innerHTML') {
                elem.innerHTML = attrs.innerHTML;
            } else {
                elem.setAttribute(attr, attrs[attr]);
            }
        }
        return elem;
    }

    $.on = (element, event, selector, callback) => {
        if (!callback) {
            callback = selector;
            $.bind(element, event, callback);
        } else {
            $.delegate(element, event, selector, callback);
        }
    };

    $.off = (element, event, handler) => {
        element.removeEventListener(event, handler);
    };

    $.bind = (element, event, callback) => {
        event.split(/\s+/).forEach(function(event) {
            element.addEventListener(event, callback);
        });
    };

    $.delegate = (element, event, selector, callback) => {
        element.addEventListener(event, function(e) {
            const delegatedTarget = e.target.closest(selector);
            if (delegatedTarget) {
                e.delegatedTarget = delegatedTarget;
                callback.call(this, e, delegatedTarget);
            }
        });
    };

    $.closest = (selector, element) => {
        if (!element) return null;

        if (element.matches(selector)) {
            return element;
        }

        return $.closest(selector, element.parentNode);
    };

    $.attr = (element, attr, value) => {
        if (!value && value !== 0 && typeof attr === 'string') {
            return element.getAttribute(attr);
        }

        if (typeof attr === 'object') {
            for (let key in attr) {
                $.attr(element, key, attr[key]);
            }
            return;
        }
        element.setAttribute(attr, value);
    };

    $.styles = (element, css, value) => {
        if (!value && value !== 0 && typeof style === 'string') {
            return element.style[css];
        }

        if (typeof css === 'object') {
            for (let key in css) {
                $.styles(element, key, css[key]);
            }
            return;
        }
        if (typeof value === 'number') {
            value += 'px';
        }
        element.style[css] = value;
    };

    /* eslint-disable */
    if (!Element.prototype.matches)
        Element.prototype.matches = Element.prototype.msMatchesSelector || 
                                    Element.prototype.webkitMatchesSelector;

    if (!Element.prototype.closest)
        Element.prototype.closest = function(s) {
            var el = this;
            if (!document.documentElement.contains(el)) return null;
            do {
                if (el.matches(s)) return el;
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1); 
            return null;
        };

    class TBody {
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

    class THead {
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

    class Emitter {
        constructor() {
            this._listener = [];
        }
        bind(eventName, callback) {
            let listener = this._listener[eventName] || [];
            listener.push(callback);
            this._listener[eventName] = listener;
        }
        trigger(eventName) {
            let args = Array.prototype.slice.apply(arguments).slice(1);
            let listener = this._listener[eventName];
            if (!Array.isArray(listener)) return;
            listener.forEach(function(callback) {
                try {
                    callback.apply(this, args);
                } catch (e) {
                    console.error(e);
                }
            });
        }
    }

    class Colgroup {
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

    class Table {
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

    class Grid {
        constructor(element, options) {
            this.setupOptions(options);
            this.setupWrapper(element);
            this.initViewSize();
            this.init();
        }
        setupOptions(options) {
            let defaultOptions = {
                columns: [],
                dataSource: null,
                autobind: true,
                width: 'auto',
                height: 'auto'
            };
            this.options = Object.assign({}, defaultOptions, options);
        }
        setupWrapper(element) {
            if (element && typeof element === 'string') {
                this.$container = document.querySelector(element);
            } else if (element instanceof HTMLElement) {
                this.$container = element;
            } else {
                throw new TypeError('请添加选择器！');
            }
            this.$container.classList.add('william-table-container');
            this.$wrapper = createHTML('div', {
                class: 'william-table-wrapper',
                append_to: this.$container
            });
            this.$fx_head = createHTML('div', {
                class: 'william-head',
                append_to: this.$wrapper
            });
            this.$fx_body = createHTML('div', {
                class: 'william-body',
                append_to: this.$wrapper
            });
        }
        initViewSize() {
            function getStyleValue(value, defaultValue) {
                return value !== 'auto' && value !== undefined
                    ? parseInt(value)
                    : defaultValue;
            }
            let viewWidth = this.$container.offsetWidth;
            this._width = getStyleValue(this.options.width, 0);
            this._height = getStyleValue(this.options.height, 0);
            this.isScroll = this._width > 0 || this._height > 0;
            this.viewWidth = viewWidth;
            if (this._width > 0) {
                $.styles(this.$container, {
                    width: this._width
                });
            }
        }
        init() {
            this.dataSource = this.options.dataSource;
            this.render();
            this._successHandler(this.dataSource);
        }
        _successHandler(data) {
            this.contentTable.renderData(data);
        }
        _failHandler() {}
        initTable() {
            this.contentTable = new Table(this.options.columns);
            this.isFixedColumn = this.contentTable.getFixedColumns().length > 0;
        }
        initBody() {}
        _setHeadStyle($element) {
            $element.classList.add('william-head-table', 'william-hidden-scroll');
        }
        _setBodyStyle($element) {
            $element.classList.add('william-body-table', 'william-body-scroll');
        }
        _setFixedHeadStyle($element) {
            $element.classList.add(
                'william-head-table',
                'william-head-fixed',
                'william-hidden-scroll'
            );
        }
        _setFixedBodyStyle($element) {
            $element.classList.add(
                'william-body-table',
                'william-hidden-scroll',
                'william-body-fixed'
            );
        }
        initFixedTable() {
            let width = this._width;
            let height = this._height;
            let isFixedColumn = this.isFixedColumn;
            let contentTable = this.contentTable;
            let fHead = this.contentTable.clone();
            let fixedBody;
            let fixedHead;
            let isScrollY = false;
            let isScrollX = false;
            let tableWidth = contentTable.getColumnWidth(width);
            let fixedWidth = contentTable.getFixedColumnWidth(width);
            this._setHeadStyle(fHead.$wrapper);
            this._setBodyStyle(contentTable.$wrapper);

            function setTableLayout() {
                if (width > 0) {
                    // 设置固定宽度
                    fHead.setWidth(tableWidth);
                    fHead.setOuterWidth(width);
                    contentTable.setWidth(tableWidth);
                    contentTable.setOuterWidth(width);
                }
                if (height > 0 && width > 0 && isScrollY) {
                    fHead.setOuterWidth(width - 17);
                    contentTable.setOuterHeight(height);
                } else if (height > 0 && isScrollY) {
                    $.styles(fHead.$wrapper, {
                        marginRight: '17px'
                    });
                    contentTable.setOuterHeight(height);
                }
                if (isFixedColumn) {
                    fixedHead.setOuterWidth(fixedWidth);
                    fixedHead.setWidth(tableWidth);
                    fixedBody.setOuterWidth(fixedWidth);
                    fixedBody.setWidth(tableWidth);
                    $.styles(contentTable.$wrapper, {
                        width: width - fixedWidth + 'px',
                        marginLeft: fixedWidth + 'px'
                    });
                    $.styles(contentTable.$element, {
                        marginLeft: -fixedWidth + 'px'
                    });
                }
                if (isFixedColumn && height > 0 && isScrollY) {
                    fixedBody.setOuterHeight(height - 17);
                }
            }
            if (isFixedColumn) {
                fixedHead = contentTable.clone();
                fixedHead.initHead(true);
                fixedBody = contentTable.clone();
                fixedBody.initBody(true);
                fixedHead.render(this.$fx_head);
                fixedBody.render(this.$fx_body);
                this._setFixedHeadStyle(fixedHead.$wrapper);
                this._setFixedBodyStyle(fixedBody.$wrapper);
            }
            setTableLayout(); // 初始化
            contentTable.initBody();
            fHead.initHead();
            fHead.render(this.$fx_head);
            contentTable.render(this.$fx_body);
            contentTable.Emitter.bind('onRenderData', function(data) {
                if (isFixedColumn) {
                    fixedBody.renderData(data);
                }
                isScrollX = contentTable.$wrapper.scrollWidth > width;
                isScrollY = contentTable.$wrapper.scrollHeight > height;
                setTableLayout();
            });
            $.on(contentTable.$wrapper, 'scroll', function() {
                fHead && (fHead.$wrapper.scrollLeft = this.scrollLeft);
                fixedBody && (fixedBody.$wrapper.scrollTop = this.scrollTop);
            });
        }
        render() {
            let self = this;
            this.initTable();
            if (this.isFixedColumn || this.isScroll) {
                this.initFixedTable();
            } else {
                this.contentTable.initHead();
                this.contentTable.initBody();
                this.contentTable.render({
                    append: function(child) {
                        self.$wrapper.append(child);
                    }
                });
            }
        }
    }

    return Grid;

}());
