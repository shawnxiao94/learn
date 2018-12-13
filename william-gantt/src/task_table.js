import { createHTML } from './utils';

export default class TaskTable {
    constructor(gantt, options) {
        this.setup_options(gantt, options);
        this.render();
        this.bind();
    }
    setup_options(gantt, options) {
        this.gantt = gantt;
        this.tasks = gantt.tasks;
        const default_options = {
            grid: [
                {
                    key: 'id',
                    name: 'ID',
                    width: 50
                },
                {
                    key: 'name',
                    name: '任务名称',
                    width: 150
                },
                {
                    key: 'start',
                    name: '开始时间',
                    width: 100
                },
                {
                    key: 'end',
                    name: '结束时间',
                    width: 100
                },
                {
                    key: 'progress',
                    name: '进度',
                    width: 60
                }
            ]
        };
        this.options = Object.assign(default_options, options);
    }
    render() {
        this.make_tables();
    }
    make_tables() {
        const row_height =
            this.gantt.options.bar_height + this.gantt.options.padding;
        let row_y =
            this.gantt.options.header_height + this.gantt.options.padding / 2;
        this.$rows = [];
        for (let task of this.tasks) {
            let $row;
            $row = createHTML('div', {
                x: 0,
                y: row_y,
                height: row_height,
                'data-id': task.id,
                class: 'task-table-row',
                append_to: this.gantt.$task_table
            });
            this.make_tables_row(task, $row);
            this.$rows.push($row);
            row_y += this.gantt.options.bar_height + this.gantt.options.padding;
        }
        this.make_tables_header();
    }
    make_tables_row(task, $row) {
        for (let column of this.options.grid) {
            switch (column.key) {
                case 'id':
                    createHTML(
                        'div',
                        {
                            class: 'task-table-column task-table-column-id',
                            innerHTML: `<span>${task.id}</span>`,
                            width: column.width,
                            append_to: $row
                        },
                        true
                    );
                    break;
                case 'name':
                    createHTML(
                        'div',
                        {
                            class: 'task-table-column task-table-column-name',
                            innerHTML: `<span>${task.name}</span>`,
                            width: column.width,
                            append_to: $row
                        },
                        true
                    );
                    break;
                case 'start':
                    createHTML(
                        'div',
                        {
                            class: 'task-table-column task-table-column-start',
                            innerHTML: `<span>${task.start}</span>`,
                            width: column.width,
                            append_to: $row
                        },
                        true
                    );
                    break;
                case 'end':
                    createHTML(
                        'div',
                        {
                            class: 'task-table-column task-table-column-end',
                            innerHTML: `<span>${task.end}</span>`,
                            width: column.width,
                            append_to: $row
                        },
                        true
                    );
                    break;
                case 'progress':
                    createHTML(
                        'div',
                        {
                            class:
                                'task-table-column task-table-column-progress',
                            innerHTML: `<span>${task.progress}%</span>`,
                            width: column.width,
                            append_to: $row
                        },
                        true
                    );
                    break;
            }
        }
    }
    make_tables_header() {
        let header_height =
            this.gantt.options.header_height + this.gantt.options.padding / 2;
        const $header = createHTML('div', {
            x: 0,
            y: 0,
            height: header_height,
            class: 'task-table-header',
            append_to: this.gantt.$task_table
        });
        for (let column of this.options.grid) {
            createHTML(
                'div',
                {
                    class:
                        'task-table-header-column' +
                        ` task-table-column-${column.key}`,
                    innerHTML: `<span>${column.name}</span>`,
                    width: column.width,
                    append_to: $header
                },
                true
            );
        }
    }
    bind() {}
}
