'use strict'

const CLASS = Object.freeze({
    ALBUMS: '.albums-conteiner',
    GALLERY: '.gallery-conteiner',
});
const SELECTOR = Object.freeze({
    ALBUMS_LIST: '#albumslist',
});
const albums = document.querySelector(CLASS.ALBUMS);
const albumsList = document.querySelector(SELECTOR.ALBUMS_LIST);
const gallery = document.querySelector(CLASS.GALLERY);
let selectedLi;
let firstAlbumId;

albums.addEventListener(`click`, onAlbumClick);

function onAlbumClick(e) {
    let target = e.target;
    let albumId = target.id;
    if (target.tagName != 'LI') return;
    loadAlbumsImages(albumId);
    highlight(target);
};

function highlight(li) {
    if (selectedLi) {
        selectedLi.classList.remove('highlight');
    };
    selectedLi = li;
    selectedLi.classList.add('highlight');
};