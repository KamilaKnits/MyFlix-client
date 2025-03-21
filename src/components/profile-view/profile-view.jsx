import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card, Container } from 'react-bootstrap';
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ movies }) => {
    
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [username, setUsername] = useState(user.Username);
    const [password, setPassword] = useState(user.Password);
    const [email, setEmail] = useState(user.Email);
    const [birthday, setBirthday] = useState(user.Birthday);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    useEffect(() => {
        const favoriteMovies = movies.filter(m => user.FavoriteMovies.includes(m._id));
        setFavoriteMovies(favoriteMovies);
    }, [user, movies]);

    const updateUser = (event) => {
        event.preventDefault();


        const updatedUser = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch(`https://mymovieflix-a3c1af20a30e.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedUser)

        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json()
            })

            .then(data => {
                alert("Successfully udpated");
                setUser(data);
                localStorage.setItem("user", JSON.stringify(data));
                console.log("Successfully updated: ", data);

            })
            .catch(error => {
                console.error("Error updating account:", error);
                alert("Failed to update your account. Please try again.");
            })

    };

    const deregisterUser = () => {
        if (!window.confirm("Are you sure you want to delete your account?")) {
            return;
        }

        fetch(`https://mymovieflix-a3c1af20a30e.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                } return response.json();
            })
            .then(() => {
                localStorage.clear();
                alert("Your account has been deleted");
                window.location.href = "/login"
            })
            .catch(error => {
                console.error("Error deleting account:", error);
                alert("Failed to delete account. Please try again.");
            });

    };


    return (
        <Row>

            <Col md={6}>
                <h2>Profile View</h2>
                <Form onSubmit={updateUser}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}

                        />
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}

                        />
                    </Form.Group>

                    <Form.Group controlId="formDate">
                        <Form.Label>Birthday:</Form.Label>
                        <Form.Control
                            type="date"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}

                        />
                    </Form.Group>

                    <Button variant="primary" onClick={updateUser}>Update Account</Button>
                    <Button variant="danger" onClick={deregisterUser} >Delete Account</Button>
                </Form>
            </Col>

            <Col md={6}>
                <h4>Favorite Movies</h4>
                <Row>
                    {favoriteMovies.length === 0 ? (
                        <div>Favorite Movie List is empty...</div>
                    ) : (
                        favoriteMovies.map(movie => (
                            <Col md={5} key={movie._id}>
                                <MovieCard movie={movie} />
                            </Col>
                        ))
                    )}
                </Row>
            </Col>
        </Row>
    );
};
