import PropTypes from "prop-types";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <div
            onClick={() => {
                onMovieClick(movie);
            }}
        >
            {movie.Title}
        </div>
    );
};

//below is where all props constraints for the mMovieCard are defined

MovieCard.PropTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string,
        image: PropTypes.string,
        director: PropTypes.string,
        genre: PropTypes.string,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};


