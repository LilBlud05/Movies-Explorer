import { SAMPLE_MOVIES } from "../data/sampleMovies";

const TMBD_API_KEY = (import.meta.env.VITE_TMDB_API_KEY || "").trim();

const TMDB_BASE_URL = "https://api.moviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

/* Standard TMDB Genre ID lookup map */

const TMDB_GENRES = {
   28: "Action",
   12: "Adventure",
   16: "Animation",
   35: "Comedy",
   80: "Crime",
   99: "Documentary",
   18: "Drama",
   10751: "Family",
   14: "Fantasy",
   36: "History",
   27: "Horror",
   10402: "Music",
   9648: "Mystery",
   10749: "Romance",
   878: "Sci-Fi",
   10770: "TV Movie",
   53: "Thriller",
   10752: "War",
   37: "Western",
};

/* 
* Normalizes eaw TMDB movie data or fallback item into the standard app format:
* {id, title, year, posterURL, genre, rating, overview}
*/

export default function normalizeTmdbMovie(item) {
    let posterURL = null;
    if(item.poster_path) {
        posterURL = `${TMDB_IMAGE_BASE}${item.poster_path}`
    } else if (item.posterURL) {
        posterURL = item.posterURL
    }

    let genre = null;
    if (Array.isArray(item.genre_ids) && item.genre_ids.length > 0) {
        genre = item.genre_ids
            .map((gid) => TMDB_GENRES[gid])
            .filter(Boolean)
            .slice(0, 2)
            .join('/');
    } else if (item.genre) {
        genre = item.genre
    }

    const year = item.release_date
        ? String(item.release_date).slice(0, 4)
        : (item.year || 'N/A')

    const rating = item.vote_average != null
        ? Number(item.vote_average).toFixed(1)
        : (item.rating || null)
    
    return {
        id: String(item.id),
        title: item.title || item.original_title || 'Untitled Film',
        year,
        posterURL,
        genre,
        rating,
        overview: item.overview || '',
    }
}


function buildTmdbRequest(endpoint, params = {}) {
    const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
    const headers = {
        'Accept': 'application/json'
    }

    const isJwt = TMBD_API_KEY.startsWith('eyJ') ||
    TMBD_API_KEY.length > 45;

    if (isJwt) {
        headers['Authorization'] = `Bearer ${TMBD_API_KEY}`
    } else if (TMBD_API_KEY) {
        url.searchParams.set('api_key', TMBD_API_KEY)
    }

    Object.entries(params).forEach(([Key, val]) => {
        if (val !== undefined && val !== null && val !== ''){
            url.searchParams.set(Key, val)
        }
    })

    return { url: url.toString(), options: {headers} }
}

/* 
Fetches initial movie collection from TMDB (popular, top_rated, trending)
*/

export async function fetchInitialMovies (category = 'popular', signal)  {
    if (TMBD_API_KEY) {
        try {
            const endpoint = category === 'trending' ? '/trending/movie/week' : `/movie/${category}`;
            const { url, options} = buildTmdbRequest(endpoint, {
                language: 'en-US',
                page: '1'
            });

            const response = await fetch(url, {...options, signal });
            if (!response.ok) {
                throw new Error(`TMDB HTTP Error ${response.status}`);
            }
            const data = await response.json()
            if (Array.isArray(data.results) && data.results.length > 0 ) {
                return data.results.map(normalizeTmdbMovie);
            }
        } catch (err) {
            if (err.name === 'AbortError') throw err;
            console.warn('TMDB API request failed, serving sample archive collection', err)
        }
    }

    return [...SAMPLE_MOVIES]
}


export async function searchMovies(query, signal) {
    const trimmed = query ? query.trim() : '';
    if (!trimmed) {
        return fetchInitialMovies('popular', signal);
    }

    if (TMBD_API_KEY) {
        try {
            const { url, options} = buildTmdbRequest ('/search/movie', {
                query: trimmed,
                include_adult: 'true',
                language: 'en-US',
                page: 1,
            })

            const response = await fetch(url, {...options, signal})
            if (!response.ok) {
                throw new Error(`TMDB Search error ${response.status}`)
            }
            const data = await response.json()
            if (Array.isArray(data.results)) {
                return data.results.map(normalizeTmdbMovie)
            }
        } catch (err) {
            if (err.name === 'AbortError') throw err;
            console.warn('TMDB search error, Checking local archive:', err)
        }
    }

    const queryLower = trimmed.toLowerCase();
    return SAMPLE_MOVIES.filter(
        (m) =>
            m.title.toLowerCase().includes(queryLower) || 
            (m.genre && m.genre.toLowerCase().includes(queryLower))
    )
}


