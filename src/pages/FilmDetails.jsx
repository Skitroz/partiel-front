import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function FilmDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                const url = `https://api.themoviedb.org/3/movie/${id}?language=fr-FR`;
                const options = {
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkOTIwNDg5OTE0YWQ0Y2VhZGE1MzE0ZjViYzJiODYzYSIsIm5iZiI6MTcyNDc0MjU2MC4zMzAyODQsInN1YiI6IjY2Y2Q3YWYxNDlmOGJiODIzMDZhYTA2MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hAZukLYPvfmLlqhwbGDmnBd6aeIm4bWHupIG0EncZ-g'
                    }
                };

                const response = await axios.get(url, options);
                setMovie(response.data);
            } catch (error) {
                console.error('Erreur:', error);
            }
        };

        fetchMovieDetail();
    }, [id]);

    if (!movie) return <p>Chargement...</p>;

    const formatCurrency = (value) => {
        if (value === 0) return 'N/A';
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'EUR',
        }).format(value);
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <button
                onClick={() => navigate(-1)}
                className="p-2 bg-gray-300 text-gray-700 rounded mb-6 flex items-center"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
                Revenir à la recherche
            </button>
            <div className="flex flex-col lg:flex-row">
                <img
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://img.freepik.com/psd-premium/affiche-du-film-mettant-vedette-acteur_1144036-5343.jpg'}
                    alt={`${movie.title} Poster`}
                    className="mb-4 lg:mb-0 lg:w-1/3 rounded shadow-lg"
                />
                <div className="lg:ml-6 lg:w-2/3">
                    <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
                    <p className="text-gray-600 mb-4"><strong>Date de sortie:</strong> {new Date(movie.release_date).toLocaleDateString('fr-FR')}</p>
                    <p className="text-gray-600 mb-4"><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
                    <p className="text-gray-600 mb-4"><strong>Synopsis:</strong> {movie.overview}</p>
                    <p className="text-gray-600 mb-4"><strong>Durée:</strong> {movie.runtime} minutes</p>
                    <p className="text-gray-600 mb-4"><strong>Note moyenne:</strong> {movie.vote_average} / 10 sur {movie.vote_count} avis</p>
                    <p className="text-gray-600 mb-4"><strong>Production:</strong> {movie.production_companies.map(company => company.name).join(', ')}</p>
                    {movie.homepage && (
                        <p className="text-blue-600 mb-4">
                            <a href={movie.homepage} target="_blank" rel="noopener noreferrer" className="underline">Site officiel</a>
                        </p>
                    )}
                    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-2">Finances</h2>
                        <p className="text-gray-700 mb-2"><strong>Budget:</strong> {formatCurrency(movie.budget)}</p>
                        <p className="text-gray-700"><strong>Recettes:</strong> {formatCurrency(movie.revenue)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FilmDetail;
