import React from "react";
import PropTypes from "prop-types";
import{ Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card onClick={() => onMovieClick(movie)}>
            <Card.Img variant="top" src={movie.iamge} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Director.Name}</Card.Text>
            </Card.Body>
        </Card>
    );
};

//below is where all props constraints for the MovieCard are defined

MovieCard.PropTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string,
        image: PropTypes.string,
        director: PropTypes.string,
        genre: PropTypes.string,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};


