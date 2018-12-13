import { $, createHTML } from './utils';
import Table from './table';
import './grid.less';
export default class Grid {
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
