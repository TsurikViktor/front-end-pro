albums.addEventListener(`click`, onAlbumClick);

function onAlbumClick(e) {
    let target = e.target;
    let albumId = target.id;

    if (target.className != 'item') return;

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
function renderList(res) {
    albumsList.innerHTML = res.map(data => `
	<li id="${data.id}" class="item">${data.id}. ${data.title}</li>
	`).join('');
};

function renderImages(res) {
    gallery.innerHTML = res.map(data => `
	<img class="images" src="${data.url}">
	`).join('');
};
