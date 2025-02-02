import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import PropTypes from "prop-types";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://mymovieflix-a3c1af20a30e.herokuapp.com")
        .then((response) => response.json())
        .then((data) => {
            // console.log("movies from api:", data);
            const moviesFromApi = data.docs.map((doc) => {
                return{
                    id: doc.key,
                    title: doc.title,
                    // image: "https://mymovieflix-a3c1af20a30e.herokuapp.com",
                    director: doc.director[0]
                };
            });

            setMovies(moviesFromApi);
        });
    }, []);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }


    return <div>
        {movies.map((movie) => (
            <MovieCard
                key={movie.id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                }}
            >
            </MovieCard>
        ))}</div>
};


