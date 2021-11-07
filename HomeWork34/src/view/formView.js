import $ from 'jquery';

import './index.css';

class FormView {
    #$inputs;

    constructor(options) {
        this.options = options;
        this.$rootEl = this.initView();
        this.#$inputs = this.$rootEl.find('input, textarea');
    }

    initView() {
        return $(`
            <form name="studentForm">
                <input name="id" type="hidden">
                <input class="name-input" name="name" type="text">
                <button>Добавить</button>
            </form>
        `).on('submit', this.onFormSubmit.bind(this));
    }

    appendTo($container) {
        $container.append(this.$rootEl);
    }

    onFormSubmit(e) {
        e.preventDefault();

        const student = this.getFormData();

        this.options.onSubmit(student);
    }

    setFormData() {
        for (const input of this.#$inputs) {
            if (input.name in student) {
                input.value = student[input.name];
            }
        };
    }

    getFormData() {
        const student = {};
        
        for (const input of this.#$inputs) {
            student[input.name] = input.value;

        };
        return student
    }

    resetForm() {
        this.#$inputs.val('');
    }

};

export default FormView;
