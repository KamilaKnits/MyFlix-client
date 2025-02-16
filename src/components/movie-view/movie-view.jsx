import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movie }) => {
    const { movieId } = useParams();

    const movie = movies.find((movie) => movie._id === movieId);

    return (
        <div>
            <div>
                <img className="w-100" src={movie.ImagePath} />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
            </div>
            <Link to={"/"}>
                <button className="back-button">Back</button>
            </Link>
        </div>
    );
};

