'use strict'

const SELECTOR = Object.freeze({
    MY_LIST: '#myList',
    INPUT_VALUE: '#myInput',
    MY_FORM: '#myForm'
});
const CLASS = Object.freeze({
    INPUT_BUTTON: '.addToList',
    SAVE_BUTTON: 'saveList',
    DEL_BUTTON: 'delList',
    LIST: '.list',
    COLOR_SAVE: 'colorSave',
    COLORSAVEBUTTOM: 'colorSaveButton'
});
const input = document.querySelector(SELECTOR.INPUT_VALUE);
const buttonAdd = document.querySelector(CLASS.INPUT_BUTTON);
const buttonDoneRemove = document.querySelector(SELECTOR.MY_LIST);
const myFormForInput = document.querySelector(SELECTOR.MY_FORM);
const list = `
<li class="list">
    {{inputData}}
    <div class="buttonConteiner">
        <button class="saveList">Готово</button>
        <button class="delList">Удалить</button>
    </div>
</li>`;
let counter = 0;

buttonAdd.addEventListener(`click`, onAddClick); 
buttonDoneRemove.addEventListener(`click`, onDoneRemoveClick);
myFormForInput.addEventListener(`submit`, onMyFormForInputSubmit);

function onAddClick() {
    validInput();
    clearInput();
};

function onDoneRemoveClick(event) {
    const clickButton = event.target.classList;
    const parent = event.target.closest(CLASS.LIST);

    exchangeColorList(clickButton, parent);
    removeInputList(clickButton, parent);
};

function onMyFormForInputSubmit(event) {
    event.preventDefault();
 };

function validInput() {
    if (!input.value) {
        return
    }; 
    counter += 1;
    addInputToHtml();
};

function  getInput() {
    return input.value
};

function addInputToHtml() {
    const inputData = `${counter}. ${getInput(input)}`;
    const inputDataReplase = list.replace('{{inputData}}', inputData);
    buttonDoneRemove.insertAdjacentHTML('beforeend', inputDataReplase);
};

function clearInput() {
    input.value = ``;
};

function exchangeColorList(clickButton, parent) {
    if (clickButton.contains(CLASS.SAVE_BUTTON)) {
        parent.classList.toggle(CLASS.COLOR_SAVE);
        clickButton.toggle(CLASS.COLORSAVEBUTTOM);
    }; 
};

function removeInputList(clickButton, parent) {
    if (clickButton.contains(CLASS.DEL_BUTTON)) {
        parent.remove();
    }; 
};