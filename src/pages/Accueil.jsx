import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useSearchParams } from 'react-router-dom';

function Accueil() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [inputPage, setInputPage] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const genres = [
    { id: 28, name: "Action" },
    { id: 12, name: "Aventure" },
    { id: 16, name: "Animation" },
    { id: 35, name: "Comédie" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentaire" },
    { id: 18, name: "Drame" },
    { id: 10751, name: "Familial" },
    { id: 14, name: "Fantastique" },
    { id: 36, name: "Histoire" },
    { id: 27, name: "Horreur" },
    { id: 10402, name: "Musique" },
    { id: 9648, name: "Mystère" },
    { id: 10749, name: "Romance" },
    { id: 878, name: "Science-Fiction" },
    { id: 10770, name: "Téléfilm" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "Guerre" },
    { id: 37, name: "Western" }
  ];

  // Fetch movies function
  const fetchMovies = useCallback(async (query, pageNumber) => {
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=fr-FR&page=${pageNumber}&with_genres=${selectedGenre}`;
      const options = {
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTIwNDg5OTE0YWQ0Y2VhZGE1MzE0ZjViYzJiODYzYSIsIm5iZiI6MTcyNDc0MjUzNC4yMjk4MzEsInN1YiI6IjY2Y2Q3YWYxNDlmOGJiODIzMDZhYTA2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.JTMm1gNyXve86vS8pusUZ6i5-qZunlQypfuatV2Zerg'
        }
      };

      const response = await axios.get(url, options);
      setMovies(response.data.results);
      setPage(response.data.page);
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Erreur:', error);
    }
  }, [selectedGenre]);

  useEffect(() => {
    const query = searchParams.get('query') || '';
    const page = parseInt(searchParams.get('page'), 10) || 1;
    const genre = searchParams.get('genre') || '';

    setQuery(query);
    setPage(page);
    setSelectedGenre(genre);

    fetchMovies(query, page);
  }, [searchParams, fetchMovies]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchParams({ query, page: 1, genre: selectedGenre });
    fetchMovies(query, 1);
  };

  const filterMoviesByGenre = (movies) => {
    if (!selectedGenre) return movies;
    return movies.filter((movie) => movie.genre_ids.includes(parseInt(selectedGenre)));
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setSearchParams({ query, page: newPage, genre: selectedGenre });
      fetchMovies(query, newPage);
    }
  };

  const handleInputPageChange = (e) => {
    setInputPage(e.target.value);
  };

  const handleGoToPage = (e) => {
    e.preventDefault();
    const pageNumber = parseInt(inputPage, 10);
    if (!isNaN(pageNumber)) {
      handlePageChange(pageNumber);
      setInputPage('');
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Trouver des films</h1>
      <form onSubmit={handleSearch} className="mb-6 flex items-center border border-gray-300 rounded-lg overflow-hidden">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Recherchez un film..."
          className="p-3 w-full border-none outline-none"
        />
        <button type="submit" className="p-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600">
          Rechercher
        </button>
      </form>
      <div className="mb-6 flex items-center">
        <label htmlFor="genre-select" className="mr-4 text-lg">Filtrer par genre :</label>
        <select
          id="genre-select"
          value={selectedGenre}
          onChange={(e) => {
            setSelectedGenre(e.target.value);
            setSearchParams({ query, page: 1, genre: e.target.value });
            fetchMovies(query, 1);
          }}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="">Tous les genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        {movies.length > 0 ? (
          <div>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterMoviesByGenre(movies).slice((page - 1) * 10, page * 10).map((movie) => (
                <li key={movie.id} className="border border-gray-300 p-4 rounded-lg shadow-lg">
                  <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://img.freepik.com/psd-premium/affiche-du-film-mettant-vedette-acteur_1144036-5343.jpg'}
                    alt={`${movie.title} Poster`}
                    className="mb-2 rounded-lg mx-auto"
                  />
                  <h2 className="text-lg font-bold mb-2 text-center">{movie.title}</h2>
                  <p className="text-gray-600 text-center mb-2">{movie.release_date.split('-')[0]}</p>
                  <p className="text-gray-700 text-center">{movie.overview.length > 100 ? `${movie.overview.substring(0, 100)}...` : movie.overview}</p>
                  <div className="text-center mt-4">
                    <Link to={`/film/${movie.id}`}>
                      <button className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                        Voir le détail
                      </button>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
            <div className='flex flex-col items-center mt-6'>
              <div className="flex space-x-2 mb-4">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={page === 1}
                  className="p-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                >
                  Début
                </button>
                {page > 1 && (
                  <button onClick={() => handlePageChange(page - 1)} className="p-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
                    Précédent
                  </button>
                )}
                <span className="p-2">Page {page} sur {totalPages}</span>
                {page < totalPages && (
                  <button onClick={() => handlePageChange(page + 1)} className="p-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400">
                    Suivant
                  </button>
                )}
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={page === totalPages}
                  className="p-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                >
                  Fin
                </button>
              </div>
              <form onSubmit={handleGoToPage} className="flex items-center space-x-2">
                <label htmlFor="page-input" className="text-lg">Accéder à la page :</label>
                <input
                  id="page-input"
                  type="text"
                  value={inputPage}
                  onChange={handleInputPageChange}
                  placeholder="Numéro"
                  className="p-2 border border-gray-300 rounded text-center"
                />
                <button
                  type="submit"
                  className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Y aller
                </button>
              </form>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-700 mt-6">Aucun résultat trouvé.</p>
        )}
      </div>
    </div>
  );
}

export default Accueil;