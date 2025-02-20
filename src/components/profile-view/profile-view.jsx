import { useState } from 'react';
import { Form, Button, Card, Container, Col } from 'react-bootstrap';

export const ProfileView = () => {

    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user'));

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");


    const updateUser = () => {

        const updatedUser = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        fetch(`https://movie-flix-api-ca627b5a7961.herokuapp.com/users/${storedUser.username}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedUser)

        })
            .then(response => {
                if(!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                response.json()
            })

            .then(data=> {
                    localStorage.setItem("user", JSON.stringify(data));
                    console.log("Successfully updated: ", data);
                    alert("Successfully udpated")
                })
    
            // .catch((e) => {
            //     alert("Something went wrong");
            // });
    }

};


return (
    <>
        <Container>

        </Container>
        <Container>
            <Form >
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

                <Button variant="primary" onClick={updateUser}>
                    Update
                </Button>
            </Form>
        </Container>
    </>
);
