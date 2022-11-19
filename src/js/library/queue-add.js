import Notiflix from 'notiflix';
import { getMovies } from '../fetch-functions/get-movies';
import { watchedList } from './watched-add';

//список фильмов для рендера странички
export const queueList = JSON.parse(localStorage.getItem('queueList')) || [];

//кнопка добавления фильма в список (на модалке)

export async function addToQueueOnClick(e) {
  const movieId = e.target.closest('.modal').dataset.id;
  const path = `/movie/${movieId}`;
  const movie = await (await getMovies(path)).data;
  movie.genre_ids = movie.genres.map(genre => genre.id);
  const messageInQueue = `"${movie.title}" is already added to the queue.`;
  const messageWatched = `You have already watched ${movie.title}.`;
  const messageAddedtoQueue = `${movie.title} was added to the queue.`;

  // проверка на наличие в очереди
  if (queueList.find(item => item.id === +movieId)) {
    return Notiflix.Notify.warning(messageInQueue);
  }
  // проверка в просмотренных
  else if (watchedList.find(item => item.id === +movieId)) {
    return Notiflix.Notify.warning(messageWatched);
  } else {
    queueList.push(movie);
    localStorage.setItem('queueList', JSON.stringify(queueList));
    return Notiflix.Notify.success(messageAddedtoQueue);
  }
}


//---------перемещение фильма из просмотренных в очередь для просмотра
export async function removeWatchedToQueue(e) {
  const movieId = e.target.closest('.modal').dataset.id;
  const path = `/movie/${movieId}`;
  const movie = await (await getMovies(path)).data;
  movie.genre_ids = movie.genres.map(genre => genre.id);
  const messageWatched = `"${movie.title}" is already added to the watched list.`;



  //-----------------------------РАЗОБРАТЬСЯ И ПЕРЕДЕЛАТЬ!!!!!!!

  
  if (watchedList.find(item => item.id === +movieId)) {
    return Notiflix.Notify.warning(messageWatched);
  } else {
    movie.watched = true;
    watchedList.push(movie);
    localStorage.setItem('watchedList', JSON.stringify(watchedList));
    Notiflix.Notify.success(`You added the "${movie.title}" to Watched!`);
  }

  let queueList = JSON.parse(localStorage.getItem('queueList'));

  if (queueList.find(item => item.id === +movieId)) {
    queueList = queueList.filter(item => item.id !== +movieId);
    //обновляет очередь без просмотренного фильма
    if (document.querySelector('#queue-btn.active')) {
      createMarkup(queueList);
    }
    // удаляет пустой массив фильмов или перезаписывает
    if (!queueList) {
      localStorage.removeItem('queueList');
    } else {
      localStorage.setItem('queueList', JSON.stringify(queueList));
    }

    // уведомление об оставшихся в очереди фильмах
    if (!queueList.length) {
      const messageAllWatched = `Great! You have watched all the movies from your queue. It's time for... More movies!`;
      Notiflix.Notify.info(messageAllWatched);
    } else if (queueList.length === 1) {
      const messageMovieInQueue = `Nice! You have 1 great movie left in the queue.`;
      Notiflix.Notify.info(messageMovieInQueue);
    } else {
      const messageMoviesInQueue = `Nice! You have ${queueList.length} great movies left in the queue.`;
      Notiflix.Notify.info(messageMoviesInQueue);
    }
  }
}
