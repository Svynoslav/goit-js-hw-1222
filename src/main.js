'use strict';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchData } from "./js/pixabay.api";
import { createMarkup } from "./js/render-functions";

const API_KEY = '44071126-68094a25e5e927b0ae90eca12';
const BASE_URL = 'https://pixabay.com/api/';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-btn');

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250
});

searchForm.addEventListener('submit', submitHandler);
loadMoreBtn.addEventListener('click', loadMoreHandler);

let page = 1;
let currentQuery = '';
let totalHits = 0;

function submitHandler(event) {
    event.preventDefault();
    currentQuery = event.target.query.value.trim();
    if (currentQuery === '') {
        return;
    }
    gallery.innerHTML = '';
    page = 1;
    totalHits = 0;
    loadMoreBtn.style.display = 'none';
    loader.style.display = 'block';

    fetchImages();
}

function loadMoreHandler() {
    page += 1;
    loader.style.display = 'block';
    loadMoreBtn.disabled = true;
    fetchImages();
}

function fetchImages() {
    const options = new URLSearchParams({
        key: API_KEY,
        q: currentQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 15,
    });

    fetchData(BASE_URL, options)
        .then(resp => {
            if (resp.hits.length === 0 && page === 1) {
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight',
                    backgroundColor: 'red',
                    messageColor: 'white',
                });
                loader.style.display = 'none';
                return;
            }
            if (page === 1) {
                totalHits = resp.totalHits;
            }

            gallery.insertAdjacentHTML("beforeend", createMarkup(resp));
            lightbox.refresh();
            loader.style.display = 'none';
            loadMoreBtn.disabled = false;

            if (gallery.children.length >= totalHits) {
                loadMoreBtn.style.display = 'none';
                iziToast.info({
                    message: "We're sorry, but you've reached the end of search results.",
                    position: 'topRight',
                    backgroundColor: 'blue',
                    messageColor: 'white',
                });
            } else {
                loadMoreBtn.style.display = 'block';
            }

            smoothScroll();
        })
        .catch(err => {
            console.log(err);
            loader.style.display = 'none';
            loadMoreBtn.disabled = false;
        });
}

function smoothScroll() {
    const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
}
