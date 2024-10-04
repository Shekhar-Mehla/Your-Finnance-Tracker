import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useContext } from "react";
import { CentralState } from "../context/ContextApi.jsx";

const NavigationBar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(CentralState);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/" className="logo">
            YFT
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              {isLoggedIn ? (
                <>
                  <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                  <Nav.Link href="/transactions">Transactions</Nav.Link>
                  <Nav.Link href="/login">Logout</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
