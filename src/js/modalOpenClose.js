import * as basicLightbox from 'basiclightbox';
import { getMovies } from './get-movies';
import modalFilm from '../templates/modalFilm.hbs';

const backdrop = document.querySelector('.backdrop');
const films = document.querySelector('.films');
console.log(films);

//films.addEventListener('click', onOpenModal);

export async function renderModal() {
  const path = `movie/${movie_id}`;
  let filmForModal = await (await getMovies(path)).data;
  console.log(filmForModal);
  backdrop.innerHTML = modalFilm(filmForModal.results);
}

// export function onOpenModal(evt) {
//   evt.preventDefault();
//   // if (evt.target.nodeName !== 'IMG') {
//   //   return;
//   // }

//   const currentItem = evt.target;

//   const modalBackdrop = document.querySelector('.backdrop');
//   const instance = basicLightbox.create(modalBackdrop, {
//     onShow: () => {
//       document.addEventListener('keydown', onCloseModalEsc);
//     },
//     onClose: () => {
//       document.removeEventListener('keydown', onCloseModalEsc);
//     },
//   });

//   instance.show();

//   const modalBtn = document.querySelector('.modal-close-btn');
//   modalBtn.addEventListener('click', onCloseModalBtn);
//   function onCloseModalBtn(evt) {
//     instance.close();
//     document.removeEventListener('click', onCloseModalBtn);
//   }

//   function onCloseModalEsc(evt) {
//     if (evt.code === 'Escape') {
//       instance.close();
//     }
//   }
// }

export function renderModalFilm(film) {
  backdrop.insertAdjacentHTML('beforeend', modalFilm(film));
}
