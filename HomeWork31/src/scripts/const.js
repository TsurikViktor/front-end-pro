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
const url = 'https://jsonplaceholder.typicode.com';
let firstAlbumId;
let selectedLi;
