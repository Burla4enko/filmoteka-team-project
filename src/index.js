import { renderTrending } from './js/trending/render-trending';
import { onSubmit } from './js/search/on-search-submit';
import { checkInputQuery } from './js/search/check-input-query';
import debounce from 'lodash.debounce';
import { onMovieCardClick } from './js/modal-movie-info';

$('.carousel').slick({
  dots: true,
  arrows: false,
  speed: 1000,
  easing: 'ease',
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnFocus: true,
  pauseOnHover: true,
  pauseOnDotsHover: true,
});

const refs = {
  searchForm: document.querySelector('#search-form'),
  searchInput: document.querySelector('[name="searchQuery"]'),
  films: document.querySelector('.films'),
};

renderTrending();

refs.searchInput.addEventListener('input', debounce(checkInputQuery, 300));
refs.searchForm.addEventListener('submit', onSubmit);
refs.films.addEventListener('click', onMovieCardClick);
