import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const MainView = () => {
    // const storedUser = JSON.parse(localStorage.getItem("user"));
    // const storedToken = localStorage.getItem("token");
    // const [token, setToken] = useState(null);
    const [user, setUser] = useState(true);
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        // if (!token) return ;

        fetch("https://mymovieflix-a3c1af20a30e.herokuapp.com/movies" 
            // {
        //     headers: { Authorization: `Bearer ${token}` } }
        )
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);

                const moviesFromApi = data.map((movie) => {
                    return {
                        _id: movie._id,
                        Title: movie.Title,
                        Description: movie.Description,
                        Genre: {
                            Name: movie.Genre.Name,
                            Description: movie.Genre.Description,
                        },
                        Director: {
                            Name: movie.Director.Name,
                            Bio: movie.Director.Bio,
                            Birth: movie.Director.Birth,
                            Death: movie.Director.Death
                        },
                        ImagePath: movie.ImagePath,
                    };
                });

                setMovies(moviesFromApi);
            });

    }, []);

    
        return (
            <Row className="justify-content-md-center mt-5">
            {!user ? (
            
                <Col md={5}>
            <LoginView
                onLoggedIn={(user) => setUser(user)}
            />
            or 
            <SignupView></SignupView>  
            </Col>
            
        ) : selectedMovie ? (
            <Col md={8} style={{ border: "1px solid black"}}>
            <MovieView
                movie={selectedMovie} 
                onBackClick={() => setSelectedMovie(null)} 
                />
                </Col>
            ) : movies.length === 0 ? (
            <div>The list is empty!</div>
            ) : (
               <div>
                {movies.map((movie) => (
                    <Col className="mb-5" key={movie._id} md={3}>
                <MovieCard
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                >
                </MovieCard>
                </Col>
            ))}
         </div>
            )}
            </Row>
        );
    };
    

    // return (
    //     <div>
    //         <button
    //             onClick={() => {
    //                 setUser(null); setToken(null); localStorage.clear();
    //             }}
    //         >
    //             Logout
    //         </button>
    // </div>

            
    // );

