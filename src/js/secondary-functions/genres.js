import { getMovies } from "../get-movies";

export function makeGenres(selector) {
    const genreFields = document.querySelectorAll(selector);
    console.log(genreFields);
    genreFields.forEach(item => { 
        getGenreFromId(item.textContent).then(result => item.textContent = result);
    });
}

async function getGenreFromId(id) {
    const path = 'genre/movie/list';
    const genres = await (await getMovies(path)).data.genres;
    const arrOfIds =id.split(',');
    const arrOfGenres = [];

    if (arrOfIds.length > 3) {
        arrOfIds.length = 3;
        arrOfIds[2] = 'Other';
    }

    arrOfIds.forEach(i => {
        if(i === 'Other') {
            arrOfGenres.push(i);
        }
        else {
            arrOfGenres.push(genres.find(genre => genre.id === +i).name);
        }
    });
    return arrOfGenres.join(', ');

}