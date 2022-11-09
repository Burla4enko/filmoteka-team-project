import * as basicLightbox from 'basiclightbox';
import { getMoviesById } from './get-movies';
import modalFilm from '../templates/modalFilm.hbs';

const backdrop = document.querySelector('.backdrop');
const films = document.querySelector('.films');

films.addEventListener('click', onOpenModal);

export function onOpenModal(evt) {
  evt.preventDefault();
  console.log(evt);
  const currentItem = evt.target;
  let movieId = Number(evt.target.closest('IMG').dataset.id);
  console.log(movieId);

  async function onMovieClick() {
    try {
      const path = `/movie/${movieId}`;
      const getFetchMovieByIdResponse = await getMoviesById(path);
      const movieInformation = await getFetchMovieByIdResponse.data;
      console.log('movieInformation', movieInformation);
      backdrop.innerHTML = modalFilm(movieInformation.results);
    } catch (error) {
      console.log(error.message);
    }
  }
  onMovieClick();

  backdrop.classList.remove('is-hidden');
  const instance = basicLightbox.create(backdrop, {
    onShow: () => {
      document.addEventListener('keydown', onCloseModalEsc);
    },
    onClose: () => {
      document.removeEventListener('keydown', onCloseModalEsc);
    },
  });
  instance.show();

  const modalBtn = document.querySelector('.modal-close-btn');
  modalBtn.addEventListener('click', onCloseModalBtn);
  function onCloseModalBtn(evt) {
    instance.close();
    document.removeEventListener('click', onCloseModalBtn);
  }

  function onCloseModalEsc(evt) {
    if (evt.code === 'Escape') {
      instance.close();
    }
  }
}

export function renderModalFilm(film) {
  backdrop.insertAdjacentHTML('beforeend', modalFilm(film));
}
