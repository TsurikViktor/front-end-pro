//'use strict'

const SELECTOR = Object.freeze({
    MY_FORM: '#myForm',
    PHONEBOOK: '#phoneBook',
    COUNTER: '#number',
    INPUT_NAME: '#myInputName',
    INPUT_SURNAME: '#myInputSurname',
    INPUT_PHONENUMBER: '#myInputPhoneNumber',
    ADD_ROW_BUTTON: '#addRowButton'
});
const CLASS = Object.freeze({
    ROW: '.Row',
    NUMBER: '.Number',
    NAME: '.Name',
    SURNAME: '.Surname',
    PHONENAMBER: '.PhoneNumber',
});
const myFormForInput = document.querySelector(SELECTOR.MY_FORM);
const phoneBook = document.querySelector(SELECTOR.PHONEBOOK);
const myInputName = document.querySelector(SELECTOR.INPUT_NAME);
const myInputSurname = document.querySelector(SELECTOR.INPUT_SURNAME);
const myInputPhoneNumber = document.querySelector(SELECTOR.INPUT_PHONENUMBER);
const buttonAdd = document.querySelector(SELECTOR.ADD_ROW_BUTTON);
const buttonDel = document.querySelector(SELECTOR.PHONEBOOK);
const trTemplate =`
<tr class="Row">
    <td class="Number">{{number}}</td>
    <td class="Name">{{Name}}</td>
    <td class="Surname">{{Surname}}</td>
    <td class="PhoneNumber">{{PhoneNumber}}</td>
    <td class="deleteButton">
        <button class="delRow">Удалить</button>
    </td>
</tr>
`;
let counter = 0;

buttonAdd.addEventListener('click', onAddButtonFormClick);
buttonDel.addEventListener('click', onDelButtonRowClick);
myFormForInput.addEventListener(`submit`, onMyFormForInputSubmit);

function onAddButtonFormClick() {
    inputValidOnEmpty();  
};

function onDelButtonRowClick(event) {
    rowRemove(event);
};

function onMyFormForInputSubmit(event) {
    event.preventDefault();
 };

function inputValidOnEmpty() {
    if (!myInputName.value || !myInputSurname.value || !myInputPhoneNumber.value) {
        return inputAlert() 
    };
    validInputCell();
};
function validInputCell() {
    if (!/^[а-яА-ЯёЁa-zA-Z\s]+$/i.test(myInputName.value)) {
        clearValueName();
        return inputAlert()
    };
    if (!/^[а-яА-ЯёЁa-zA-Z\s]+$/i.test(myInputSurname.value)) {
        clearValueSurname();
        return inputAlert()
    }; 
    if (isNaN(myInputPhoneNumber.value)) {
        clearValuePhoneNumber();
        return inputAlert()
    } 
    counter += 1;
    addInputToHtml();
    clearValue();
};

function dataReplace() {
    const numberReplace = trTemplate.replace('{{number}}', counter);
    const inputNameReplace = numberReplace.replace('{{Name}}', myInputName.value);
    const inputSurnameReplace = inputNameReplace.replace('{{Surname}}', myInputSurname.value);
    const trTemplateFilled = inputSurnameReplace.replace('{{PhoneNumber}}', myInputPhoneNumber.value);
    return trTemplateFilled
};

function addInputToHtml() {
    phoneBook.insertAdjacentHTML('beforeend', dataReplace());
};
function clearValue() {
    clearValueName();
    clearValueSurname();
    clearValuePhoneNumber();
};

function clearValueName() {
    myInputName.value = ``;
};

function clearValueSurname() {  
    myInputSurname.value = ``;
};

function clearValuePhoneNumber() {
    myInputPhoneNumber.value = ``;
};

function inputAlert() {
    return alert('Введены некоректные данные')
};

function rowRemove(event) {
    const child = event.target;
    const parent = child.closest(CLASS.ROW);
    parent.remove();  
}; 