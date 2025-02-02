export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
            onClick={() => {
                onMovieClick(movie);
            }}
        >
            {movie.title}
        </div>
    );
};

<<<<<<< Updated upstream
=======

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string,
        image: PropTypes.string,
        director: PropTypes.string,
        genre: PropTypes.string,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};
>>>>>>> Stashed changes
