import React, { useEffect, useState ,setSearchTerm} from 'react';
import './App.css';
import SearchIcon from './search.png';


// OMDB website Key :- 2826bff2


const API_URL = 'http://www.omdbapi.com?apikey=2826bff2';

// Renaming the component to follow conventions
const DynamicMovies = (props) => {
    return (
        <>
            <div className='movie'>
                <div>
                    <p>{props.Year}</p>
                </div>
                <div>
                    <img src={props.Poster} alt={props.Title} />
                </div>
                <div>
                    <span>{props.Type}</span>
                    <h3>{props.Title}</h3>
                </div>
            </div>
        </>
    );
};



const App = () => {
    // For movies
    const [movies, setMovies] = useState([]);

    // For search
    const [searchTerm , setSearchTerm] = useState([]);

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();
        setMovies(data.Search);
    };

    // When First time page loads set default search as spiderman and load movies of spiderman
    useEffect(() => {
        searchMovies('Spiderman'); 
    }, []);

    return (
        <div className='app'>
            <h1>MovieLand</h1>
            <div className='search'>
                <input type='text' placeholder='search for movies' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <img src={SearchIcon} alt='search' onClick={() => searchMovies(searchTerm)} />
            </div>

            {movies?.length > 0 ? (
                <div className='container'>
                    {movies.map((movie) => (
                        <DynamicMovies key={movie.imdbID} {...movie} />
                    ))}
                </div>
            ) : (
                <h2>No Movies Found!!!</h2>
            )}
        </div>
    );
};

export default App;
