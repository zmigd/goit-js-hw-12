import { getImagesByQuery } from './js/pixabay-api';
import {
  clearGallery,
  createGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

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

  clearGallery();
  showLoader();

  try {
    const images = await getImagesByQuery(input);
    hideLoader();

    if (!images.length) {
      iziToast.error({
        title: 'Sorry',
        message:
          'There are no images matching your search query. Please try again!',
        position: 'topRight',
        timeout: 5000,
        color: 'red',
      });
      return;
    }

    createGallery(images);

    iziToast.success({
      title: 'Success',
      message: `Found ${images.length} images!`,
      position: 'topRight',
      timeout: 3000,
      color: 'green',
    });
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
