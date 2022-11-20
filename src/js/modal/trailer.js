import { renderModalFilm } from './render-modal';
import modalFilm from '../../templates/modalFilm.hbs';
import axios from 'axios';
import Notiflix from 'notiflix';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '8cb2067df7427c657a5f093d2a8e51ae';
// import { spinner } from '../spinner';

const refs = {
  trailerBtn: document.querySelector('.trailer-btn'),
};

async function onTrailerClick() {
  await fetchTrailer(currentId);
}
async function fetchTrailer(currentId) {
  try {
    const response = await axios.get(
      `${BASE_URL}${currentId}/videos?api_key=${API_KEY}&language=en-US`
    );
    const key = response.data.results[0].key;
    renderTrailer(key);
  } catch (error) {
    Notiflix.Notify.failure('Sorry, there is no trailer for this movie');
  }
}
function renderTrailer(key) {
  const instance = basicLightbox.create(
    `<div class="modal-trailer">
        <iframe width="560" height="315" src="https://www.youtube.com/embed/${key}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>`,
    {
      onShow: () => {
        window.addEventListener('keydown', onEsc);
      },
      onClose: () => {
        window.removeEventListener('keydown', onEsc);
      },
    }
  );
  instance.show();
  function onEsc(evt) {
    if (evt.key === 'Escape') {
      instance.close();
    }
  }
}
export { fetchTrailer };

//Приклда по якому воно мало би працювати
// trailerBtn.addEventListener('click', () => fetchTrailer(currentId), {
//   once: true,
// });
// toggleModal();

// function toggleModal() {
//   window.addEventListener('keydown', onEscPress);
//   refs.modalFilm.classList.toggle('is-hidden');
//   refs.body.classList.toggle('no-scroll');
//   if (refs.modalFilm.classList.contains('is-hidden')) {
//     window.removeEventListener('keydown', onEscPress);
//   }
// }
