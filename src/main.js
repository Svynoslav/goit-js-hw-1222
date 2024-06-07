'use strict';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchData } from "./js/pixabay-api";
import { createMarkup } from "./js/render-functions";

const API_KEY = '44071126-68094a25e5e927b0ae90eca12';
const BASE_URL = 'https://pixabay.com/api/';

const searchForm = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250
});

searchForm.addEventListener('submit', submitHandler);

function submitHandler(event) {
    event.preventDefault();
    const inputValue = event.target.query.value;
    if(inputValue === '') {
        return;
    }
    gallery.innerHTML = '';

    const options = new URLSearchParams({
        key: API_KEY,
        q: inputValue,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
    })

    loader.style.display = 'block';

    fetchData(BASE_URL, options)
        .then(resp => {
            if(resp.hits.length === 0) {
                iziToast.error({
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                    position: 'topRight',
                    backgroundColor: 'red',
                    messageColor: 'white',
                })
                loader.style.display = 'none';
                return;
            }
            gallery.insertAdjacentHTML("beforeend", createMarkup(resp))
            lightbox.refresh();
            loader.style.display = 'none';
        })
        .catch(err => {
            console.log(err);
            loader.style.display = 'none';
        });
}




