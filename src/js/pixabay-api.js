import axios from 'axios';

const API_KEY = '51403222-4fbdc3af82d89be9b055ca0a4';
const URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query) {
  const response = await axios.get(URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });

  return response.data.hits;
}
