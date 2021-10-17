'use strict'

function loadAlbumsList() {
	fetch('https://jsonplaceholder.typicode.com/albums')
	.then(res => res.json())
	.then(res => {
		albumsList.innerHTML = res.map(data => `
	<li id="${data.id}" class="item">${data.id}.  ${data.title}</li>
	`).join('');
	})
	.catch(error => alert('Что-то пошло не так!!!'))	
	.finally(() =>  {
		const firstAlbum = albumsList.firstElementChild;
		firstAlbumId = firstAlbum.id;
		return loadAlbumsImages(firstAlbumId)
	})
};

function loadAlbumsImages(id) {
	fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`)
	.then(res => res.json())
	.then(res => {
		gallery.innerHTML = res.map(data => `
		<img class="images" src="${data.url}">
		`)
	.join('');
	})
	.catch (error => alert('Что-то пошло не так!!!'))
};

loadAlbumsList();