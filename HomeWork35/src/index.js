import './index.css';

import Chat from "./indexChat";
import $ from 'jquery';

const chat = new Chat({ onMessage: addMessage });
const $messages = $('#messages');
const $inputName = $('#inputName');
const $inputMessage = $('#inputMessage');

$('#sendMessage').on('submit', (e) => {
    e.preventDefault();
    sendMessage();
});

chat.initChat();

function addMessage({ name, message }) {
    const $message = $(`
        <div>
            <div class="Author-name">${name}:</div>
            <div class="Text-message">${message}</div>
        </div>
    `);

    renderMessage($message);
}

function sendMessage() {
    chat.send($inputName.val(), $inputMessage.val());
    formMessageReset();
}

function formMessageReset() {
    $inputMessage.val('');
}

function scrollDown() {
    $messages.scrollTop($($messages)[0].scrollHeight);
}

function renderMessage(message) {
    $messages.append(message);
    setTimeout(() => {
        message.addClass('message');
        scrollDown();
    });
}