import Notiflix from 'notiflix';
import { getMovies } from '../fetch-functions/get-movies';
import { createMarkup } from '../search/render-search-query';

//список фильмов для рендера странички
export const queueList = JSON.parse(localStorage.getItem('queueList')) || [];

//добавления фильма в очередь просмотра (кнопка на модалке)
export async function addToQueueOnClick(e) {
  const movieId = e.target.closest('.modal').dataset.id;
  const path = `/movie/${movieId}`;
  const movie = await (await getMovies(path)).data;
  movie.genre_ids = movie.genres.map(genre => genre.id);
  const messageInQueue = `"${movie.title}" is already added to the queue.`;
  const messageAddedtoQueue = `${movie.title} was added to the queue.`;

  // проверка на наличие в очереди
  if (queueList.find(item => item.id === +movieId)) {
    return Notiflix.Notify.warning(messageInQueue);
  }
  else {
    movie.watched = false;  //  ???? 
    queueList.push(movie);
    localStorage.setItem('queueList', JSON.stringify(queueList));
    Notiflix.Notify.success(messageAddedtoQueue);
  }

//удаление фильма, добавленного в очередь просмотра, из списка просмотренных

let watchedList = JSON.parse(localStorage.getItem('watchedList'));

  if (watchedList.find(item => item.id === +movieId)) {
    watchedList = watchedList.filter(item => item.id !== +movieId);
    
    //рендер обновленного списка просмотренніх фильмов
    if (document.querySelector('#watched-btn.active')) {
      createMarkup(watchedList);
    }
    //удаление пустого массива просмотренных фильмов или обновление непустого
    if (!watchedList) {
      localStorage.removeItem('watchedList');
    } else {
      localStorage.setItem('watchedList', JSON.stringify(watchedList));
    }

    // уведомление при пустом списке просмотренных фильмов 
    if (!watchedList.length) {
      const messageMoviesInQueue = `You have ${queueList.length} great movies left in the queue.`;
      Notiflix.Notify.info(messageMoviesInQueue);
    }
   }
}