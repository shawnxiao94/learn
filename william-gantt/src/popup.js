export default class Popup {
    constructor(parent, custom_html) {
        this.parent = parent;
        this.custom_html = custom_html;
        this.make();
    }

    make() {
        this.parent.innerHTML = `
            <div class="title"></div>
            <div class="subtitle"></div>
            <div class="pointer"></div>
        `;

        this.hide();

        this.title = this.parent.querySelector('.title');
        this.subtitle = this.parent.querySelector('.subtitle');
        this.pointer = this.parent.querySelector('.pointer');
    }

    show(options) {
        if (!options.target_element) {
            throw new Error('target_element is required to show popup');
        }
        if (!options.position) {
            options.position = 'left';
        }
        const target_element = options.target_element;

        if (this.custom_html) {
            let html = this.custom_html(options.task);
            html += '<div class="pointer"></div>';
            this.parent.innerHTML = html;
            this.pointer = this.parent.querySelector('.pointer');
        } else {
            this.title.innerHTML = options.title;
            this.subtitle.innerHTML =
                options.subtitle + `<br>进度:${options.task.progress}%`;
            this.parent.style.width = this.parent.clientWidth + 'px';
        }

        let position_meta;
        position_meta = target_element.getBoundingClientRect();
        if (options.position === 'left') {
            this.parent.style.left =
                target_element.offsetLeft +
                target_element.offsetWidth +
                15 +
                'px';
            this.parent.style.top = target_element.offsetTop + 'px';

            this.pointer.style.transform = 'rotateZ(90deg)';
            this.pointer.style.left = '-7px';
            this.pointer.style.top = '2px';
        }

        this.parent.style.opacity = 1;
    }

    hide() {
        this.parent.style.opacity = 0;
    }
}
