
class ListView {
    static DELETE_BTN_SELECTOR = '.delete-btn';
    static STUDENT_LIST_SELECTOR = '#studentList';
    static STUDENT_ITEM_SELECTOR = '.student-item';
    static MARK_INPUT_SELECTOR = '.mark-input';

    constructor(options) {
        this.options = options;
        this.$rootEl = this.initView();
        this.$list = this.$rootEl.find(ListView.STUDENT_LIST_SELECTOR);
    }

    initView() {
        return $(`
            <table> 
                <tr>
                    <th>Имя</th>
                    <th colspan="10">Оценки</th>
                    <th>Действие</th>
                </tr>
                <tbody id="studentList"></tbody>
            </table>
        `)
            .on('click', ListView.DELETE_BTN_SELECTOR, this.onDeleteBtnClick.bind(this))
            .on('focusout', ListView.MARK_INPUT_SELECTOR, this.onMarkInputFocusOut.bind(this));
    }

    appendTo($container) {
        $container.append(this.$rootEl);
    }

    onMarkInputFocusOut(e) {
        e.stopPropagation();

        const id = this.getElementId(e.target);
        const marks = this.getAllMarksById(id);

        this.options.onMarksEdit(id, marks);
    }

    onDeleteBtnClick(e) {
        e.stopPropagation();

        const id = this.getElementId(e.target);
 
        this.options.onDelete(id);
    }

    getElementId(el) {
        const id = el.closest(ListView.STUDENT_ITEM_SELECTOR)?.dataset.id;

        return id ? +id : NaN;
    }

    renderList(list) {
        const html = list.map(student => this.generateStudentHtml(student)).join('');

        this.$list.html(html);
    }

    addElement(student) {
        const studentHtml = this.generateStudentHtml(student);

        this.$list.append(studentHtml);
    }

    removeElement(id) {
        this.getElementId(id).remove();
    }

    updateElement(student, isNew = false) {
        const id = isNew ? '' : student.id;
        const studentHtml = this.generateStudentHtml(student);

        this.getElementId(id).replaceWith(studentHtml);
    }

    getAllMarksById(id) {
        return Array
            .from(this.getElById(id).find(ListView.MARK_INPUT_SELECTOR))
            .map(el => +el.value);
    }

    getElById(id) {
        return this.$list.find(`[data-id="${id}"]`);
    }
    
    generateStudentHtml(student) {
        return `
			<tr data-id="${student.id}" class="student-item">
				<td>${student.name}</td>
				${student.marks.map(mark => `
                <td>
                    <input class="mark-input" type="text" placeholder="0" value="${mark}">
                </td>
                `).join('')}
				<td class="delete-edit">
					<button class="delete-btn">Удалить</button>
				</td>
			</tr>
        `;
    }
}