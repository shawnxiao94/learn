import { createHTML, $ } from './utils';

export default class Arrow {
    constructor(gantt, from_task, to_task) {
        this.gantt = gantt;
        this.from_task = from_task;
        this.to_task = to_task;

        this.calculate_path();
        if (this.from_is_below_to) {
            return false;
        }
        this.draw();
        this.resize();
    }

    calculate_path() {
        let start_x =
            this.from_task.$bar.getX() + this.from_task.$bar.getWidth() / 2;

        const condition = () =>
            this.to_task.$bar.getX() < start_x + this.gantt.options.padding &&
            start_x > this.from_task.$bar.getX() + this.gantt.options.padding;

        while (condition()) {
            start_x -= 10;
        }

        const start_y =
            this.gantt.options.header_height +
            this.gantt.options.bar_height +
            (this.gantt.options.padding + this.gantt.options.bar_height) *
                this.from_task.task._index +
            this.gantt.options.padding;

        const end_x = this.to_task.$bar.getX() - this.gantt.options.padding / 2;
        const end_y =
            this.gantt.options.header_height +
            this.gantt.options.bar_height / 2 +
            (this.gantt.options.padding + this.gantt.options.bar_height) *
                this.to_task.task._index +
            this.gantt.options.padding;

        this.from_is_below_to =
            this.from_task.task._index > this.to_task.task._index;
        const curve = this.gantt.options.arrow_curve;
        const curve_y = this.from_is_below_to ? -curve : curve;
        const offset = this.from_is_below_to
            ? end_y + this.gantt.options.arrow_curve
            : end_y - this.gantt.options.arrow_curve;

        this.element = createHTML('div', {
            'data-from': this.from_task.task.id,
            'data-to': this.to_task.task.id,
            class: 'bar-arrow'
        });

        this.path = {
            start_x,
            start_y,
            offset,
            end_x
        };

        if (
            this.to_task.$bar.getX() <
            this.from_task.$bar.getX() + this.gantt.options.padding
        ) {
            const down_1 = this.gantt.options.padding / 2;
            const down_2 =
                this.to_task.$bar.getY() +
                this.to_task.$bar.getHeight() / 2 -
                curve_y;
            const left = this.to_task.$bar.getX() - this.gantt.options.padding;

            this.path = {
                start_x,
                start_y,
                down_1,
                offset,
                end_x,
                down_2,
                left
            };
        }
    }

    draw() {
        this.element_path_a = createHTML('div', {
            append_to: this.element,
            class: 'arrow'
        });
        this.element_path_b = createHTML('div', {
            append_to: this.element,
            class: 'arrow'
        });
        this.element_path_c = createHTML('div', {
            append_to: this.element,
            class: 'arrow'
        });
        this.element_path_d = createHTML('div', {
            append_to: this.element,
            class: 'arrow'
        });
    }

    resize() {
        if (
            this.to_task.$bar.getX() <
            this.from_task.$bar.getX() + this.gantt.options.padding
        ) {
            this.element_path_c.style.display = 'block';
            this.element_path_d.style.display = 'block';
            $.attr(this.element_path_a, 'data', 'left_a');
            $.attr(this.element_path_a, 'x', this.path.start_x);
            $.attr(this.element_path_a, 'y', this.path.start_y);
            $.attr(this.element_path_a, 'width', 2);
            $.attr(this.element_path_a, 'height', this.path.down_1);
            $.attr(this.element_path_b, 'data', 'left_b');
            $.attr(this.element_path_b, 'x', this.path.left);
            $.attr(
                this.element_path_b,
                'y',
                this.path.start_y + this.path.down_1 - 2
            );
            $.attr(
                this.element_path_b,
                'width',
                this.path.start_x - this.path.left
            );
            $.attr(this.element_path_b, 'height', 2);
            $.attr(this.element_path_c, 'data', 'left_c');
            $.attr(this.element_path_c, 'x', this.path.left);
            $.attr(
                this.element_path_c,
                'y',
                this.path.start_y + this.path.down_1 - 2
            );
            $.attr(this.element_path_c, 'width', 2);
            $.attr(
                this.element_path_c,
                'height',
                this.path.down_2 - (this.path.start_y + this.path.down_1 - 2)
            );
            $.attr(this.element_path_d, 'data', 'left_d');
            $.attr(this.element_path_d, 'x', this.path.left);
            $.attr(this.element_path_d, 'y', this.path.down_2);
            $.attr(
                this.element_path_d,
                'width',
                this.path.end_x - this.path.left
            );
            $.attr(this.element_path_d, 'height', 2);
        } else {
            $.attr(this.element_path_a, 'data', 'center_a');
            $.attr(this.element_path_a, 'x', this.path.start_x);
            $.attr(this.element_path_a, 'y', this.path.start_y);
            $.attr(this.element_path_a, 'width', 2);
            $.attr(
                this.element_path_a,
                'height',
                this.path.offset - this.path.start_y
            );
            $.attr(this.element_path_b, 'data', 'center_b');
            $.attr(this.element_path_b, 'x', this.path.start_x);
            $.attr(this.element_path_b, 'y', this.path.offset);
            $.attr(
                this.element_path_b,
                'width',
                this.path.end_x - this.path.start_x
            );
            $.attr(this.element_path_b, 'height', 2);
            this.element_path_c.style.display = 'none';
            this.element_path_d.style.display = 'none';
        }
    }

    update() {
        this.calculate_path();
        if (this.from_is_below_to) {
            return false;
        }
        this.resize();
    }
}
