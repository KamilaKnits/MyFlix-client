import React from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router";


export const MovieCard = ({ movie, addToFavorites, removeFromFavorites }) => {
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Director.Name}</Card.Text>
                <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
                    <Button variant="primary">Open</Button>
                </Link>
                {/* 
            IF Already favorited, show Remove from Favorites else show Add to Favorites
            */}
              
            
                <Button variant="link" onClick={() => removeFromFavorites(movie._id)}>
                    Remove from Favorite
                </Button>

                <Button variant="link" onClick={() => addToFavorites(movie._id)}>
                    Add to Favorite
                </Button>
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


