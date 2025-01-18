import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([

        {
            id: 1,
            title: "Death Becomes Her",
            image: "https://www.https://www.imdb.com/title/tt0104070/mediaviewer/rm1183163393",
            genre: "Drama",
            director: "Robert Zemeckis",

        },
        {
            id: 2,
            title: "Back to the Future",
            image: "https://www.imdb.com/title/tt0088763/mediaviewer/rm554638848/?ref_=tt_ov_i",
            genre: "High-Concept Comedy",
            director: "Robert Zemeckis"
        },
        {
            id: 3,
            title: "Up",
            image: "https://www.imdb.com/title/tt1049413/mediaviewer/rm3826338560/?ref_=tt_ov_i",
            genre: "Adventure",
            director: "Peter Docter"
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

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


