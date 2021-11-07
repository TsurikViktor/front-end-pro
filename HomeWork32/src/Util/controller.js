
class Controller {
    #rootEl;

    constructor($rootEl) {
        this.#rootEl = $rootEl;
        this.studentsCollection = new Collection();
        this.listView = new ListView({
            onDelete: id => this.deleteStudent(id),
            onMarksEdit: (id, marks) => this.studentsCollection.update(id, { marks }),
        });
        this.formView = new FormView({
            onSubmit: student => this.saveStudent(student),
        });
        
        this.listView.appendTo(this.#rootEl);
        this.formView.appendTo(this.#rootEl);
        this.studentsCollection.fetch().then(list => this.listView.renderList(list));
    }

    saveStudent(student) {
        if (student.id) {
            this.studentsCollection.update(student.id, student)
            .then((res) => {
                this.listView.updateElement(student);
                this.student.FormView.resetForm();
            });
        } else {
            this.studentsCollection.create(student)
            .then((res) => {
                this.listView.addElement(res.item);
                this.formView.resetForm();
                res.loading.then(() => this.listView.updateElement(res.item, true));     
            });
        }
    }

    deleteStudent(id) {
        this.studentsCollection.delete(id)
            .then(() => this.listView.removeElement(id));
    }
};