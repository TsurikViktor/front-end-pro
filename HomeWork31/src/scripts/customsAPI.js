function loadAlbumsList() {
	fetch(`${url}/albums`)
	.then(res => res.json())
		.then(res => {
			renderList(res);
	})
	.catch(error => alert('Error'))	
	.then(() =>  {
		const firstAlbum = albumsList.firstElementChild;
		firstAlbumId = firstAlbum.id;
		return loadAlbumsImages(firstAlbumId)
	})
};

function loadAlbumsImages(id) {
	fetch(`${url}/photos?albumId=${id}`)
	.then(res => res.json())
		.then(res => {
			renderImages(res);
	})
	.catch (error => alert('Error', error))
};
