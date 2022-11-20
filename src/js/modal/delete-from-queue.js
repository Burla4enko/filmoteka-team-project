import { createMarkup } from '../search/render-search-query';
import { queueList } from '../library/queue-add';

export function deleteFromQueue(evt) {
  const id = +evt.target.dataset.id;
  let queueList = JSON.parse(localStorage.getItem('queueList'));
  queueList = queueList.filter(item => item.id !== id);
  localStorage.setItem('queueList', JSON.stringify(queueList));
  createMarkup(queueList);
}

export function deleteFromWatched(evt) {
  const id = +evt.target.dataset.id;
  let watchedList = JSON.parse(localStorage.getItem('watchedList'));
  watchedList = watchedList.filter(item => item.id !== id);
  localStorage.setItem('watchedList', JSON.stringify(watchedList));
  createMarkup(watchedList);
}

// export async function removeWatchedToQueue(evt) {
//   const id = +evt.target.dataset.id;
//   let watchedList = JSON.parse(localStorage.getItem('watchedList'));
//   watchedList = watchedList.filter(item => item.id !== id);
//   localStorage.setItem('watchedList', JSON.stringify(watchedList));
//   createMarkup(watchedList);
//   queueList.push()
//   console.log('deleteFromWatched выполняется 2');
// }
