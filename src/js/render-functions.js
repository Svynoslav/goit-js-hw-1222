'use strict';

function createMarkup(data) {
    return data.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <li class="search-item">
            <a class="search-link" href="${largeImageURL}">
                <img src="${webformatURL}" alt="${tags}">
            </a>
            <div class="search-item-text-wrap">
                <div class="search-item-text">
                    <h2>Likes</h2>
                    <p>${likes}</p>
                </div>
                <div class="search-item-text">
                    <h2>Views</h2>
                    <p>${views}</p>
                </div>
                <div class="search-item-text">
                    <h2>Comments</h2>
                    <p>${comments}</p>
                </div>
                <div class="search-item-text">
                    <h2>Downloads</h2>
                    <p>${downloads}</p>
                </div>
            </div>
        </li>
    `).join('');
}

export { createMarkup };