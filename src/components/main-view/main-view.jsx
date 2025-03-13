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

    const storedToken = localStorage.getItem("token");
    const [token, setToken] = useState(storedToken ? storedToken : null);
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(null);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");


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
            });
    }, [token]);



    function addToFavorites(movieId) {
        // console.log("movieId: ", movieId);
        //api call to add movie to favorites
        fetch(`https://mymovieflix-a3c1af20a30e.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(movieId)
        })
            .then(response => {
                if (response.ok) {
                    setFavoriteMovies((favoriteMovies) => [...favoriteMovies, movieId]);
                    alert("added to favorites!");
                    window.location.reload();
                }

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
            body: JSON.stringify(movieId)
        })
            .then(response => {
                if (response.ok) {
                    setFavoriteMovies((favoriteMovies) => favoriteMovies.filter((movie) => movie._id !== movieId));
                }
            })
            .catch((error) => {
                console.error("Error removing from favorites:", error);
                return alert("unable to remove from favorites");
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
                                        <SearchView movies={movies}></SearchView>
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
