import React from 'react'

const MovieCard = ({movie:
    {title, release_date, vote_average, poster_path, original_language}
 }) => {
  return (
    <div className='movie-card' >
        <img 
            src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path} ` : './no-movie.png '  } alt={title} 
        />
        <div className='mg-4 text-amber-50' >
            <h4>{title}</h4>
            <div className='content' >
                <div className='rating'>
                    <img src="./star.svg" alt="star icon" />
                    <p>{vote_average ? vote_average.toFixed(1) : 'N/A' }</p>
                </div>
                <span>•</span>
                <p className='lang'>{original_language}</p>

                <span>•</span>
                <p className='year'>{release_date ? release_date.split('-')[0] : 'N/A' }</p>

            </div>
        </div>
    </div>
    
  )
}

export default MovieCard