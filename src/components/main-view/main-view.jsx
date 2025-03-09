import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationView } from "../navigation-view/navigation-view";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';


export const MainView = () => {

    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(null);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [genreFilter, setGenreFilter] = useState([]);
    const [directorFilter, setDirectorFilter] = useState([]);
    const [titleFilter, setTitleFilter] = useState([]);
    
    

    useEffect(() => {
        fetch("https://mymovieflix-a3c1af20a30e.herokuapp.com/movies")
            .then((response) => response.json())
            .then((data) => {

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
    
    const filterMovies = (movies) => {
        return movies.filter((movie) => {
            genreFilter ? movie.Genre.Name.includes(genreFilter) : true &&
            directorFilter ? movie.Director.Name.includes(directorFilter) : true &&
            titleFilter ? movie.Title.includes(titleFilter) : true 
        });
    }


    const addToFavorites = (movieId) => {
        // console.log("movieId: ", movieId);
        //api call to add movie to favorites
        fetch(`https://mymovieflix-a3c1af20a30e.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body:JSON.stringify(movieId)
        })
        .then(response => {

            if (response.ok) {
                setFavoriteMovies((favoriteMovies) => [...favoriteMovies, movieId]);
                alert("added to favorites!");
                window.location.reload();
            }
                else { 
                console.log("Error adding to favorites:", error)
                return alert("unable to add to favorites!");
                
            }
        });
    }
    

    const removeFromFavorites = (movieId) => {
            //api call to remove movie from favorites
            fetch(`https://mymovieflix-a3c1af20a30e.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(movieId)
            })
            .then(response => {

                if (response.ok) {
                    setFavoriteMovies((favoriteMovies) => favoriteMovies.filter((movie) => movie._id !== movieId));
                }
                else {
                    console.log("Error removing from favorites:", error);
                    return alert("unable to remove from favorites");
                }
            });
        }
    

    return (
        <BrowserRouter>
            <NavigationView
                user={user}
                // searchValue={searchValue}
                // setSearchValue={setSearchValue}
                onLoggedOut={() => {
                    setUser(null);
                }}
            />
            <Row className="justify-content-md-center">
                <Routes>
                    <Route //create a new user;signup
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <SignupView></SignupView>
                                    </Col>
                                )}
                            </>
                        }
                    />

                    <Route //login page
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView onLoggedIn={(user) => setUser(user)} />
                                    </Col>
                                )}
                            </>
                        }
                    />

                    <Route //select a Movie
                        path="/movies/:MovieID"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView movies={movies} />
                                    </Col>
                                )}
                            </>
                        }
                    />

                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <>
                                        {movies.map((movie) => (
                                            <Col className="mb-4" key={movie._id} md={3}>
                                                <MovieCard movie={movie} addToFavorites={addToFavorites} removeFromFavorites={removeFromFavorites} />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />

                    <Route //profile view
                        path="/profile"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <ProfileView user={user} movies={movies} />
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};
