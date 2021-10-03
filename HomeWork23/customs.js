//'use strict'

const SELECTOR = Object.freeze({
    MY_FORM: '#myForm',
    USER_NAME_INPUT: '#inputUserName',
    SEARCH_BUTTON: '#userSearch',
    USER_CART: '#userInfo',
    USER: '#user'
});
const myFormForInput = document.querySelector(SELECTOR.MY_FORM);
const userNameInput = document.querySelector(SELECTOR.SEARCH_BUTTON);
const inputName = document.querySelector(SELECTOR.USER_NAME_INPUT);
const userCart = document.querySelector(SELECTOR.USER_CART);
const user = document.querySelector(SELECTOR.USER);
const userCartTemplate =`
<div id="user" class="user">
    <img src="{{avatar}}">
    <div class="data">
        <p class="repo">Repository: {{repository}}</td>
        <p class="followers">Followers: {{followers}}</p>
        <p class="following">Following: {{following}}</p>
    </div>
</div>
`;

myFormForInput.addEventListener(`submit`, onMyFormForInputSubmit);
userNameInput.addEventListener(`click`, onUserNameInputClick);

function onUserNameInputClick() {
    userSearch();
};

function onMyFormForInputSubmit(event) {
    event.preventDefault();
};

 function userSearch() {
    inputValidOnEmpty();
};

function inputValidOnEmpty() {
    if (!inputName.value) {
        return  inputAlert()
    } else {
        getData();
        clearValue();
    }
};

function getData() {
    fetch(`https://api.github.com/users/${inputName.value}`)  
    .then((response) => {
        if (response.ok) {
            return response.json().then((data) => {
                const avatar = data.avatar_url;
                const repo = data.public_repos;
                const followers = data.followers;
                const following = data.following;
                return dataReplace(avatar, repo, followers, following)
            });
        } else {
            return userNotFoundAlert()
        }
    })
};

function dataReplace(avatar, repo, followers, following) {
    const userAvatar = userCartTemplate.replace('{{avatar}}', avatar);
    const userRepo = userAvatar.replace('{{repository}}', repo);
    const userFollowers = userRepo.replace('{{followers}}', followers);
    const userCartTemplateFilled = userFollowers.replace('{{following}}', following);
   
    return  addUserInfoToHtml(userCartTemplateFilled)    
};

function addUserInfoToHtml(data) {
    userRemove();
    userCart.insertAdjacentHTML('afterbegin', data);
};
function clearValue() {
    inputName.value = ``;
};

function inputAlert() {
    return alert('Введите имя пользователя')
};
function userNotFoundAlert() {
    return alert('Пользователь с таким именем не существует')
};

function userRemove() {
    const userRemove = userCart.querySelector(SELECTOR.USER);
    userRemove.remove();
}; 