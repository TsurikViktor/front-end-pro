'use strict'
const DELETE_NOTE_SELECTOR = '.delete-note';
const EDIT_NOTE_CONTROL_SELECTOR = '.edit-note-control';
const NOTE_ITEM_SELECTOR = '.note';
const TEMPLATE_SELECTOR = '#noteTemplate';
const LIST_SELECTOR = '#list';
const ADD_NOTE_SELECTOR = '#addNoteBtn';

const EMPTY_NOTE = {description: ''};
let notesList = [];

const noteTemplate = $(TEMPLATE_SELECTOR).html();
const $noteListEl = $(LIST_SELECTOR)
    .on('click', DELETE_NOTE_SELECTOR, onDeleteClick)
    .on('focusout', EDIT_NOTE_CONTROL_SELECTOR, onListFocusout);

$(ADD_NOTE_SELECTOR).on('click', onAddNoteBtnClick);

init();
    
function onAddNoteBtnClick() {
    createNote(EMPTY_NOTE);
}

function onDeleteClick(e) {
    const $element = $(this).parent();

    $element.fadeOut(2000, () => deleteNote(getElementIndex($element)));
}

function onListFocusout(e) {
    const $element = $(this);

    updateNote(getElementIndex($element), {
        description: $element.val(),
    });
}

function init() {
    getList();
}

function getList() {
    TodoAPI.getList()
        .then(setData)
        //.then(renderList);
}

function setData(data) {
    return notesList = data;
}

function getNoteElementById(id) {
    return $noteListEl.find(`[data-note-index= "${id}"]`);
}

function createNote(note) {
    TodoAPI.create(note)
        .then((note) => {
            notesList.push(note);
            renderNote(note);
        });
}

function updateNote(id, changes) {
    const note = notesList.find((el) => el.id == id);

    Object.keys(changes).forEach((key) => (note[key] = changes[key]));
    TodoAPI.update(id, note);
}

function deleteNote(id) {
    notesList = notesList.filter((el) => el.id != id);

    deleteNoteElement(id);
    TodoAPI.delete(id);
}

function deleteNoteElement(id) {
    const $element = getNoteElementById(id);

    $element && $element.remove();
}

//function renderList(notesList) {
//    notesList.forEach(renderNote);
//}

//function renderNote(note) {
//    const $noteElement = $(getNoteHtml(note));
//
//    $noteListEl.append($noteElement);
//}

//function getNoteHtml(note) {
//    return noteTemplate
//        //.replace('{{id}}', note.id)
//        //.replace('{{description}}', note.description);
//}

function getElementIndex($el) {
    const $note = getNoteElementByChild($el);

    return $note && $note.data('noteIndex');
}

function getNoteElementByChild($child) {
    return $child.closest(NOTE_ITEM_SELECTOR);
}