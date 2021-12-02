import React from "react";
import { Navbar, Container, Nav, Button } from "react-bootstrap";

function Menu() {
  return (
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">야보자 이거어때?</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">뭐볼까?</Nav.Link>
            <Nav.Link href="#features">어디서볼까?</Nav.Link>
            <Nav.Link href="#pricing">언제나오지?</Nav.Link>
            <Nav className="search">
              <input type={Text} />
              <Button variant="secondary" size="sm">Search</Button>
            </Nav>
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default Menu;