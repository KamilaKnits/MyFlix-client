import { useParams } from "react-router";
import { Link } from "react-router";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
    const { MovieID } = useParams();
    const movie = movies.find((m) => m._id === MovieID);

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

