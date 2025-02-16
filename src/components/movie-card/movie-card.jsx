import React from "react";
import PropTypes from "prop-types";
import{ Card } from "react-bootstrap";
import { Link } from "react-router-dom";


export const MovieCard = ({ movie }) => {
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Director.Name}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                </Link>
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
   
};


