import date_utils from './date_utils';
import { $, createHTML } from './utils';

export default class Bar {
    constructor(gantt, task) {
        this.set_defaults(gantt, task);
        this.prepare();
        this.draw();
        this.bind();
    }

    set_defaults(gantt, task) {
        this.action_completed = false;
        this.gantt = gantt;
        this.task = task;
    }

    prepare() {
        this.prepare_values();
        this.prepare_helpers();
    }

    prepare_values() {
        this.invalid = this.task.invalid;
        this.height = this.gantt.options.bar_height;
        this.x = this.compute_x();
        this.y = this.compute_y();
        this.corner_radius = this.gantt.options.bar_corner_radius;
        this.duration =
            date_utils.diff(this.task._end, this.task._start, 'hour') /
            this.gantt.options.step;
        this.width = this.gantt.options.column_width * this.duration;
        this.progress_width =
            this.gantt.options.column_width *
                this.duration *
                (this.task.progress / 100) || 0;
        this.group = createHTML('div', {
            class: 'bar-wrapper ' + (this.task.custom_class || ''),
            'data-id': this.task.id
        });
        this.bar_group = createHTML('div', {
            class: 'bar-group',
            append_to: this.group
        });
        this.handle_group = createHTML('div', {
            class: 'handle-group',
            append_to: this.group
        });
    }

    prepare_helpers() {
        HTMLElement.prototype.getX = function() {
            return +this.getAttribute('x');
        };
        HTMLElement.prototype.getY = function() {
            return +this.getAttribute('y');
        };
        HTMLElement.prototype.getWidth = function() {
            return +this.getAttribute('width');
        };
        HTMLElement.prototype.getHeight = function() {
            return +this.getAttribute('height');
        };
        HTMLElement.prototype.getEndX = function() {
            return this.getX() + this.getWidth();
        };
        HTMLElement.prototype.getEndY = function() {
            return this.getY() + this.getHeight();
        };
    }

    draw() {
        this.draw_bar();
        this.draw_progress_bar();
        this.draw_label();
        this.draw_resize_handles();
    }

    draw_bar() {
        this.$bar = createHTML('div', {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height,
            class: 'bar',
            append_to: this.bar_group
        });
        this.$bar.style.borderRadius = this.corner_radius + 'px';

        if (this.invalid) {
            this.$bar.classList.add('bar-invalid');
        }
    }

    draw_progress_bar() {
        if (this.invalid) return;
        this.$bar_progress = createHTML('div', {
            x: this.x,
            y: this.y,
            width: this.progress_width,
            height: this.height,
            class: 'bar-progress',
            append_to: this.bar_group
        });
        this.$bar_progress.style.borderRadius = this.corner_radius + 'px';
    }

    draw_label() {
        createHTML('div', {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2,
            innerHTML: this.task.name,
            class: 'bar-label',
            append_to: this.bar_group
        });
        requestAnimationFrame(() => this.update_label_position());
    }

    draw_resize_handles() {
        if (this.invalid) return;

        const bar = this.$bar;
        const handle_width = 8;

        const $handle_right = createHTML('div', {
            x: bar.getX() + bar.getWidth() - 9,
            y: bar.getY() + 1,
            width: handle_width,
            height: this.height - 2,
            class: 'handle right',
            append_to: this.handle_group
        });
        $handle_right.style.borderRadius = this.corner_radius + 'px';

        const $handle_left = createHTML('div', {
            x: bar.getX() + 1,
            y: bar.getY() + 1,
            width: handle_width,
            height: this.height - 2,
            class: 'handle left',
            append_to: this.handle_group
        });
        $handle_left.style.borderRadius = this.corner_radius + 'px';

        if (this.task.progress && this.task.progress < 100) {
            this.$handle_progress = createHTML('div', {
                x: this.$bar_progress.getEndX() - 5,
                y: this.$bar_progress.getEndY() - 10,
                width: 0,
                height: 0,
                class: 'handle progress',
                append_to: this.handle_group
            });
        }
    }

    bind() {
        if (this.invalid) return;
        this.setup_click_event();
    }

    setup_click_event() {
        $.on(this.group, 'focus ' + this.gantt.options.popup_trigger, e => {
            if (this.action_completed) {
                return;
            }

            if (e.type === 'click') {
                this.gantt.trigger_event('click', [this.task]);
            }

            this.gantt.unselect_all();
            this.group.classList.toggle('active');

            this.show_popup();
        });
    }

    show_popup() {
        if (this.gantt.bar_being_dragged) return;

        const start_date = date_utils.format(
            this.task._start,
            'YYYY年MM月D日 HH:mm:ss',
            this.gantt.options.language
        );
        const end_date = date_utils.format(
            date_utils.add(this.task._end, -1, 'second'),
            'YYYY年MM月D日 HH:mm:ss',
            this.gantt.options.language
        );
        const subtitle = start_date + ' - ' + end_date;

        this.gantt.show_popup({
            target_element: this.$bar,
            title: this.task.name,
            subtitle: subtitle,
            task: this.task
        });
    }

    update_bar_position({ x = null, width = null }) {
        const bar = this.$bar;
        if (x) {
            const xs = this.task.dependencies.map(dep => {
                return this.gantt.get_bar(dep).$bar.getX();
            });
            const valid_x = xs.reduce((prev, curr) => {
                return x >= curr;
            }, x);
            if (!valid_x) {
                width = null;
                return;
            }
            this.update_attr(bar, 'x', x);
        }
        if (width && width >= this.gantt.options.column_width) {
            this.update_attr(bar, 'width', width);
        }
        this.update_label_position();
        this.update_handle_position();
        this.update_progressbar_position();
        this.update_arrow_position();
    }

    date_changed() {
        let changed = false;
        const { new_start_date, new_end_date } = this.compute_start_end_date();

        if (Number(this.task._start) !== Number(new_start_date)) {
            changed = true;
            this.task._start = new_start_date;
        }

        if (Number(this.task._end) !== Number(new_end_date)) {
            changed = true;
            this.task._end = new_end_date;
        }

        if (!changed) return;

        this.gantt.trigger_event('date_change', [
            this.task,
            new_start_date,
            date_utils.add(new_end_date, -1, 'second')
        ]);
    }

    progress_changed() {
        const new_progress = this.compute_progress();
        this.task.progress = new_progress;
        this.gantt.trigger_event('progress_change', [this.task, new_progress]);
    }

    set_action_completed() {
        this.action_completed = true;
        setTimeout(() => {
            this.action_completed = false;
        }, 100);
    }

    compute_start_end_date() {
        const bar = this.$bar;
        const x_in_units = bar.getX() / this.gantt.options.column_width;
        const new_start_date = date_utils.add(
            this.gantt.gantt_start,
            x_in_units * this.gantt.options.step,
            'hour'
        );
        const width_in_units = bar.getWidth() / this.gantt.options.column_width;
        const new_end_date = date_utils.add(
            new_start_date,
            width_in_units * this.gantt.options.step,
            'hour'
        );

        return { new_start_date, new_end_date };
    }

    compute_progress() {
        const progress =
            this.$bar_progress.getWidth() / this.$bar.getWidth() * 100;
        return parseInt(progress, 10);
    }

    compute_x() {
        const { step, column_width } = this.gantt.options;
        const task_start = this.task._start;
        const gantt_start = this.gantt.gantt_start;

        const diff = date_utils.diff(task_start, gantt_start, 'hour');
        let x = diff / step * column_width;

        if (this.gantt.view_is('Month')) {
            const diff = date_utils.diff(task_start, gantt_start, 'day');
            x = diff * column_width / 30;
        }
        return x;
    }

    compute_y() {
        return (
            this.gantt.options.header_height +
            this.gantt.options.padding +
            this.task._index * (this.height + this.gantt.options.padding)
        );
    }

    get_snap_position(dx) {
        let odx = dx,
            rem,
            position;

        if (this.gantt.view_is('Week')) {
            rem = dx % (this.gantt.options.column_width / 7);
            position =
                odx -
                rem +
                (rem < this.gantt.options.column_width / 14
                    ? 0
                    : this.gantt.options.column_width / 7);
        } else if (this.gantt.view_is('Month')) {
            rem = dx % (this.gantt.options.column_width / 30);
            position =
                odx -
                rem +
                (rem < this.gantt.options.column_width / 60
                    ? 0
                    : this.gantt.options.column_width / 30);
        } else {
            rem = dx % this.gantt.options.column_width;
            position =
                odx -
                rem +
                (rem < this.gantt.options.column_width / 2
                    ? 0
                    : this.gantt.options.column_width);
        }
        return position;
    }

    update_attr(element, attr, value) {
        value = +value;
        if (!isNaN(value)) {
            $.attr(element, attr, value);
        }
        return element;
    }

    update_progressbar_position() {
        $.attr(this.$bar_progress, 'x', this.$bar.getX());
        $.attr(
            this.$bar_progress,
            'width',
            this.$bar.getWidth() * (this.task.progress / 100)
        );
    }

    update_label_position() {
        const bar = this.$bar,
            label = this.group.querySelector('.bar-label');
        if (label.offsetWidth > bar.getWidth()) {
            label.classList.add('big');
            $.attr(label, 'x', bar.getX() + bar.getWidth() + 5);
            label.style.transform = 'translate(0,-50%)';
        } else {
            label.classList.remove('big');
            $.attr(label, 'x', bar.getX() + bar.getWidth() / 2);
            label.style.transform = 'translate(-50%,-50%)';
        }
    }

    update_handle_position() {
        const bar = this.$bar;
        $.attr(
            this.handle_group.querySelector('.handle.left'),
            'x',
            bar.getX() + 1
        );
        $.attr(
            this.handle_group.querySelector('.handle.right'),
            'x',
            bar.getEndX() - 9
        );
        const handle = this.group.querySelector('.handle.progress');
        if (handle) {
            $.attr(handle, 'x', this.get_progress_polygon_points().x);
            $.attr(handle, 'y', this.get_progress_polygon_points().y);
        }
    }

    get_progress_polygon_points() {
        const bar_progress = this.$bar_progress;
        return {
            x: bar_progress.getEndX() - 5,
            y: bar_progress.getEndY() - 10
        };
    }

    update_arrow_position() {
        this.arrows = this.arrows || [];
        for (let arrow of this.arrows) {
            arrow.update();
        }
    }
}

function isFunction(functionToCheck) {
    var getType = {};
    return (
        functionToCheck &&
        getType.toString.call(functionToCheck) === '[object Function]'
    );
}
