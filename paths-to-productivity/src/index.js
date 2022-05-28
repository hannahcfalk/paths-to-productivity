import React from 'react';
import ReactDOM from 'react-dom/client';
import {Navbar, Container, Row, Col} from 'react-bootstrap';
import {BsInstagram, BsFacebook, BsTwitter, BsGoogle} from 'react-icons/bs'

import Tree from './components/Tree';
import './index.css';

import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <Navbar expand="lg" variant="light" bg="light">
      <Container>
        <Navbar.Brand>
        <h1>Paths to Productivity</h1>
        </Navbar.Brand>
        <Navbar.Brand className="ml-auto">
          <Row>
            <Col><BsInstagram /></Col>
            <Col><BsFacebook /></Col>
            <Col><BsTwitter /></Col>
            <Col><BsGoogle /></Col>
          </Row>
        </Navbar.Brand>
      </Container>
    </Navbar>
    <Tree />
  </div>

);