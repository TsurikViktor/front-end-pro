class TodoListView {
    static TODO_ITEM_SELECTOR = '.todo-item';
    static EDIT_BTN_SELECTOR = '.edit-btn';
    static DELETE_BTN_SELECTOR = '.delete-btn';
    static TODO_POST_SELECTOR = '.post';
    static CREATE_EDIT_SELECTOR = '#create-edit'

    #$listEl;
    #options;
    $create;
    $editId;
    $postOne;

    constructor(options) {
        this.#$listEl = this.init();
        this.#options = options;
    }

    init() {
        return $('<ul></ul>')
            .on('click', TodoListView.TODO_POST_SELECTOR, (e) => this.onTodoListClick(e))
            .on('click', TodoListView.EDIT_BTN_SELECTOR, (e) => this.onEditBtnClick(e))
            .on('click', TodoListView.DELETE_BTN_SELECTOR, (e) => this.onDeleteBtnClick(e));
    }

    onTodoListClick(e) {
        const id = this.getTodoItemId(e.target);

        this.#options.onToggle(id);
    }

    onEditBtnClick(e) {
        const id = this.getTodoItemId(e.target);
        
        TodoAPI.getOne(id)
            .then((post) => {
                TodoListView.$postOne = post;
                return this.insertValue(id, post.title)
            });
    }

    onDeleteBtnClick(e) {
        const id = this.getTodoItemId(e.target);

        this.#options.onDelete(id);
    }

    getTodoItemId(el) {
        return el.closest(TodoListView.TODO_ITEM_SELECTOR)?.dataset?.id;
    }
    
    appendTo($el) {
        $el.append(this.#$listEl);
    }

    renderList(list) {
        const html = list.map(todo => this.generateTodoHTML(todo)).join('');

        this.#$listEl.html(html);
    }

    generateTodoHTML(todo) {
        const statusClass = todo.status === 'completed' ? 'done' : '';
        return `
            <li class="todo-item " data-id="${todo.id}">
            <p class="post ${statusClass}">${todo.title}</p>
            <button id="opener-edit" class="edit-btn" >Edit</button>
            <button class="delete-btn" >Delete</button>
            </li>
       `
    }

    deleteElement(id) {
        this.#$listEl.find(`[data-id="${id}"]`).remove();
    }

    renderElement(todo) {
        const html = this.generateTodoHTML(todo);

        this.#$listEl.find(`[data-id="${todo.id}"]`).replaceWith(html);
    }

    insertValue(id, text) {
        const create = $('#create-edit');

        create.val(text);
        return $("#dialog").dialog("open");
    }
    
//    editPost() {
//        const $id = this.editId;
//        const $editPost = $('#create-edit');
//        const $editText = $editPost.val();
//
//        TodoAPI.update($id, this.$editText);
//    }
}

const $todoLIstView = new TodoListView;

$(document).ready(
    $(function () {
        $("#dialog").dialog({
            autoOpen: false,
            modal: true,
            width: 500,
            title: "Create & Edit",
            show: {
                effect: "blind",
                duration: 1000
            },
            hide: {
                effect: "blind",
                duration: 1000
            },
            buttons: {
                "Готово": function () {
                    const $editPost = $('#create-edit');
                    const $editText = $editPost.val();

                    if (!TodoListView.$postOne) {
                        TodoAPI.create($editText);
                    } else {
                        TodoListView.$postOne.title = $editPost.val();
                        TodoAPI.update(TodoListView.$postOne.id, TodoListView.$postOne);
                    }
                    
                    TodoListView.renderList($editText);
                    $editPost.val('')
                   
                    $("#dialog").dialog("close");
                }
            }
        })
        $("#opener").on("click", function () {
            $("#dialog").dialog("open");
        });

    })
)

