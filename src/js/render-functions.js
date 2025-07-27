import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = createMarkup(images);
  gallery.innerHTML = markup;
  lightbox.refresh();
}

function createMarkup(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <a class="gallery-item" href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" width="360" height="200" />
          <div class="gallery-info">
            <ul class="info-list">
              <li><h3>Likes</h3><p>${likes}</p></li>
              <li><h3>Views</h3><p>${views}</p></li>
              <li><h3>Comments</h3><p>${comments}</p></li>
              <li><h3>Downloads</h3><p>${downloads}</p></li>
            </ul>
          </div>
        </a>
      `;
      }
    )
    .join('');
}

export function clearGallery() {
  gallery.innerHTML = '';
}

export function showLoader() {
  loader?.classList.remove('is-hidden');
}

export function hideLoader() {
  loader?.classList.add('is-hidden');
}
