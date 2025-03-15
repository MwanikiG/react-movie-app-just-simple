import React, {useEffect, useState } from 'react'
import Search from './components/Search'
import Spinner from './components/Spinner'
import MovieCard from './components/MovieCard'
import { useDebounce } from 'react-use'
import { getTrendingMovies, updateSearchCount } from './appwrite.js'
import { API_BASE_URL, API_OPTIONS } from './config';

const App = () => {

  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState("");

  const [movieList, setMovieList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isTrendingLoading, setIsTrendingLoading] = useState(false);
  const [trendingError, setTrendingError] = useState('');




  useDebounce( () => setDebouncedSearchTerm(searchTerm), 1000,[searchTerm])

  const fetchMovies = async (query = '') => {
    setErrorMessage('');
    setIsLoading(true);
    try {
        const endpoint = query
            ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
            : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

        const response = await fetch(endpoint, API_OPTIONS);

        if (!response.ok) {
            throw new Error('Failed to fetch the movie');
        }

        const data = await response.json();

        setMovieList(data.results || []);

        if (query &&  data.results.length > 0) {
            await updateSearchCount(query, data.results[0]);
        }
    } catch (error) {
        console.error(`Error fetching movies: ${error}`);
        setErrorMessage('Error fetching movies. Please try again later.');
    } finally {
        setIsLoading(false);
    }
};

const loadTrendingMovies = async () => {
  setIsTrendingLoading(true);
  setTrendingError('');

  try {
    const movies = await getTrendingMovies();
    setTrendingMovies(movies);



  } catch (error) {
    console.error(`Error fetching movies: ${error}`); 
    setTrendingError("Failed to load trending movies. Try again later");
  }finally{
    setIsTrendingLoading(false);
  }
}

  useEffect(() => {
    fetchMovies(debouncedSearchTerm)
  }, [debouncedSearchTerm]);


  useEffect(() =>  {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className='pattern'/>

      <div className='wrapper'>
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1> 
              Find <span className='text-gradient'>recent</span> and  <span className='text-gradient'>trending</span> movies with no hassle 
          </h1>

          <Search searchTerm = {searchTerm} setSearchTerm= {setSearchTerm} />
        </header>

        {isTrendingLoading ? (
  <div className='text-white'>
    <Spinner />
  </div>
) : trendingError ? (
  <p className='text-red-500'>{trendingError}</p>
) : trendingMovies.length > 0 && (
  <section className='trending'>
    <h2>Trending Movies</h2>
    <ul>
      {trendingMovies.map((movie, index) => (
        <li key={movie.$id}>
          <p>{index + 1}</p>
          <img src={movie.poster_url} alt={movie.title} />
        </li>
      ))}
    </ul>
  </section>
)}

        <section className='all-movies' >
          <h2 className='mt-[20px]' > All movies</h2>

          { isLoading ? (
            <div className='text-white' >
              <Spinner/>
            </div>
          ) : errorMessage ? (
            <p className='text-red-500'> {errorMessage} </p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          ) }

        </section>

      </div>
    </main>
  )
}

export default App