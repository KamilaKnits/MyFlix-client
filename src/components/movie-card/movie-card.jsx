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
        Title: PropTypes.string,
        Description: PropTypes.string,
        Director: PropTypes.string 
    }),
    onMovieClick: PropTypes.func.isRequired
};


