import PropTypes from "prop-types";

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

//below is where all props constraints for the mMovieCard are defined

MovieCard.PropTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        director: PropTypes.string 
    }),
    onMovieClick: PropTypes.func.isRequired
};


