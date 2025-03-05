import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navigation-view.scss";

export const NavigationView = ({ user, onLoggedOut }) => {
    return (
        <Navbar className="navbar navbar-light" expand="lg">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">
                    MyFlix App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup">
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                        { user && (
                            <>
                                <Nav.Link as={Link} to="/">
                                    Home
                                </Nav.Link>
                                <Nav.Link as={Link} to="/profile">
                                    Profile
                                </Nav.Link>
                                <Nav.Link onClick={onLoggedOut}>
                                    Logout
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};