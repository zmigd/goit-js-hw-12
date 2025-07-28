import { getImagesByQuery } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  showLoader,
  hideLoader,
  showLoadMoreBtn,
  hideLoadMoreBtn,
  showGalleryLoader,
  hideGalleryLoader,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load');

let currentQuery = '';
let currentPage = 1;
const perPage = 15;
let totalImages = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();
  const input = form.elements['search-text'].value.trim();

  if (!input) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term!',
      position: 'topRight',
      timeout: 3000,
      color: 'orange',
    });
    return;
  }

  currentQuery = input;
  currentPage = 1;
  clearGallery();
  hideLoadMoreBtn();
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage, perPage);
    totalImages = data.totalHits;
    hideLoader();

    if (!data.hits.length) {
      iziToast.error({
        title: 'Sorry',
        message: 'No images found. Please try another query!',
        position: 'topRight',
        timeout: 5000,
        color: 'red',
      });
      return;
    }

    createGallery(data.hits);
    iziToast.success({
      title: 'Success',
      message: `Found ${totalImages} images!`,
      position: 'topRight',
      timeout: 3000,
      color: 'green',
    });

    if (totalImages > perPage) {
      showLoadMoreBtn();
    }
  } catch (error) {
    hideLoader();
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
      timeout: 5000,
      color: 'red',
    });
    console.error('Fetch error:', error);
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  showGalleryLoader();
  hideLoadMoreBtn();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage, perPage);
    createGallery(data.hits, true);
    smoothScroll();

    const totalLoaded = currentPage * perPage;
    if (totalLoaded >= totalImages) {
      iziToast.info({
        title: 'End of Results',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        timeout: 4000,
        color: 'blue',
      });
      hideLoadMoreBtn();
    } else {
      showLoadMoreBtn();
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Could not load more images.',
      position: 'topRight',
      timeout: 5000,
      color: 'red',
    });
    console.error('Load more error:', error);
  } finally {
    hideGalleryLoader();
  }
});

function smoothScroll() {
  const card = document.querySelector('.gallery a');
  if (card) {
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}
