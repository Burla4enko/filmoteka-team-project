import * as basicLightbox from 'basiclightbox';
import modalWindowTrailer from '../templates/trailer-modal';
import { getTrailerById } from './get-movies';

let modalTrailer = null;

class OpenModal {
  #windowKeyHandler = this.onWindowClick.bind(this);
  onstructor(argument) {
    this.id = argument.id;
    this.instance = basicLightbox.create(modalWindowMovie(this.movieObj), {
      onClose: () => {
        this.onCloseModal();
      },
      onShow: () => {
        this.onShowModal();
      },
    });
  }
}

const createTrailerModal = async function (movie) {
  let trailerObj;
  try {
    trailerObj = await getTrailerById(movie.id);
  } catch (error) {
    return;
  }
  if (trailerObj?.results.length < 1) {
    return;
  }
  document
    .querySelector('.movie__button-trailer')
    .classList.remove('hidden-button');
  modalTrailer = basicLightbox.create(
    modalWindowTrailer(trailerObj.results[0]),
    {
      onShow: onModalTrailerShow,
      onClose: onModalTrailerClose,
    }
  );
  createEvents();
};

function createEvents() {
  document
    .querySelector('.movie__button-trailer')
    .addEventListener('click', () => {
      modalTrailer.show();
      document.querySelector('.modal-trailer').classList.add('active');

      document
        .querySelector('[data-action="modal-close-trailer"]')
        .addEventListener('click', () => {
          modalTrailer.close();
        });
    });
}

function onModalTrailerShow() {
  window.addEventListener('keydown', onEscKeydown);
  document.querySelector('.modal').classList.remove('active');
}

function onModalTrailerClose() {
  window.removeEventListener('keydown', onEscKeydown);
  document.querySelector('.modal').classList.add('active');
}

function onEscKeydown(e) {
  if (
    e.code === 'Escape' &&
    document.querySelector('.modal-trailer').className.includes('active')
  ) {
    modalTrailer.close();
  }
}
// instance.show();
export { createTrailerModal };
export { OpenModal };
