import { getMovies } from "./get-movies";
import makeCard from '../templates/card-template.hbs'
import { makeGenres } from "./secondary-functions/genres";
import { makeYears } from "./secondary-functions/year";

const refs = {
    container: document.querySelector('.films'),
    pagination: document.querySelector('.pagination'),
    guard: document.querySelector('.guard'),
}

const options = {
    root: null,
    rootMargin: '20%',
    treshhold: 0.0,
}
    const observer = new IntersectionObserver(renderNextPages, options);

const path = 'trending/movie/day';
let page = 1;
let trending = null;

export async function renderTrendingWithScroll() {
    await renderMarkup();
    observer.observe(refs.guard);
}

async function renderNextPages(entries) {
    entries.forEach(async (entry) => {
        if(entry.isIntersecting) {
            page += 1;
            await renderMarkup();
        }
    })
}

async function renderMarkup() {
    trending = await (await getMovies(path, page)).data;
    await refs.container.insertAdjacentHTML('beforeend', makeCard(trending.results));
    makeYears('.films__date');
    await makeGenres('.films__genre');
}
