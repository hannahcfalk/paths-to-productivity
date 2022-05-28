import React from 'react';
import ReactDOM from 'react-dom/client';
import {Navbar, Container, Row, Col} from 'react-bootstrap';
import {BsInstagram, BsYoutube, BsTwitter, BsGoogle} from 'react-icons/bs'

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
            <Col><a style={{color:"black"}} target='_blank' href="https://www.instagram.com/explore/tags/productivity/"><BsInstagram /></a></Col>
            <Col><a style={{color:"black"}} target='_blank' href="https://twitter.com/search?q=productivity"><BsTwitter /></a></Col>
            <Col><a style={{color:"black"}} target='_blank' href="https://www.google.com/search?q=productivity"><BsGoogle /></a></Col>
            <Col><a style={{color:"black"}} target='_blank' href="https://www.youtube.com/results?search_query=productivity"><BsYoutube /></a></Col>
          </Row>
        </Navbar.Brand>
      </Container>
    </Navbar>
    <Tree />
  </div>

);