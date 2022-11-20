import { createMarkup } from '../search/render-search-query';
import { queueList } from './queue-add';
import { watchedList } from './watched-add';

export async function removeWatchedToQueue(e) {
    const movieId = e.target.closest('.modal').dataset.id;
    const path = `/movie/${movieId}`;
    const movie = await (await getMovies(path)).data;

    queueList.push(movie);
    watchedList = watchedList.filter(item => item.id !== movieId);
    localStorage.setItem('watchedList', JSON.stringify(watchedList));
    createMarkup(watchedList);
}