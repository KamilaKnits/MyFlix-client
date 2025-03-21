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
import { SearchView } from "../search-view/search-view";


export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [renderedMovies, setRenderedMovies] = useState([]);

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://mymovieflix-a3c1af20a30e.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })

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
                setRenderedMovies(moviesFromApi);
            });
    }, [token]);



    function addToFavorites(movieId) {
        //api call to add movie to favorites
        fetch(`https://mymovieflix-a3c1af20a30e.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },

        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json()
            })
            .then(data => {
                // console.log(data);
                setUser(data);
                localStorage.setItem("user", JSON.stringify(data));

            })
            .catch((error) => {
                console.error("Error adding to favorites:", error);
                return alert("unable to add to favorites");
            });
    }


    function removeFromFavorites(movieId) {
        //api call to remove movie from favorites
        fetch(`https://mymovieflix-a3c1af20a30e.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },

        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json()
                    // setFavoriteMovies((favoriteMovies) => favoriteMovies.filter((movie) => movie._id !== movieId));          
            })

            .then(data => {
                setUser(data);
                localStorage.setItem("user", JSON.stringify(data));
            })
            .catch((error) => {
                console.error("Error removing from favorites:", error);
                return alert("Unable to remove from favorites");
            })
    }



    return (
        <BrowserRouter>
            <NavigationView
                user={user}
                onLoggedOut={() => {
                    setUser(null)
                    setToken(null)
                    localStorage.clear();
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
                                        <SignupView />
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
                                        <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token); }} />
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
                                        <SearchView setRenderedMovies={setRenderedMovies} movies={movies}></SearchView>
                                        {renderedMovies.map((movie) => (
                                            <Col className="mb-4" key={movie._id} md={3}>
                                                <MovieCard
                                                    movie={movie}
                                                    addToFavorites={addToFavorites}
                                                    removeFromFavorites={removeFromFavorites}
                                                    favoriteMovies={user.FavoriteMovies} />

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
                                    <ProfileView movies={movies} />
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};
