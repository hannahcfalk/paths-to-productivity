import React from 'react';
import {Modal, Button, Row, Col, Container, Form} from 'react-bootstrap';
import Select from 'react-select';
import axios from 'axios';

import Branch from '../Branch';
import NameForm from '../Form';


class Tree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rootNodeTitle: '',
            data: {},
            modalIsOpen: true,
            formIsOpen: false,
            optionsList: [],
            formData: {
                label: '',
                description: '',
                color: '',
                link: '',
                contributor: '',
            },
        }
        this.setRootNodeTitle = this.setRootNodeTitle.bind(this);
        this.createRootNode = this.createRootNode.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.refreshList()
    }
    
    refreshList = () => {
        axios   //Axios to send and receive HTTP requests
          .get("http://localhost:8000/api/items/")
          .then(res => this.setState({ optionsList: res.data }))
          .catch(err => console.log(err));
    };

    handleSubmit(event) {
        axios
        .post("http://localhost:8000/api/items/", this.state.formData)
        .then(res => this.refreshList())
        .catch(err => console.log(err.response));
        event.preventDefault();
        this.closeForm()
    }

    
    renderForm() {
        return (
          <Form className="m-1" onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3">
                  <Form.Label>Label</Form.Label>
                  <Form.Control
                      type="text" 
                      placeholder="Enter the title of the topic"
                      value={this.state.formData.label}
                      onChange={e =>  {
                          let formData = this.state.formData
                          formData.label = e.target.value
                          this.setState({ formData: formData })
                      }}
                  />
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                      type="text" 
                      placeholder="Enter a brief description of the topic"
                      value={this.state.formData.description}
                      onChange={e =>  {
                          let formData = this.state.formData
                          formData.description = e.target.value
                          this.setState({ formData: formData })
                      }}
                  />
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                      type="text" 
                      placeholder="Enter the hex color code, starting with # e.g. #CD6211"
                      value={this.state.formData.color}
                      onChange={e =>  {
                          let formData = this.state.formData
                          formData.color = e.target.value
                          this.setState({ formData: formData })
                      }}
                  />
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Link</Form.Label>
                  <Form.Control
                      type="text" 
                      placeholder="Add a URL to tell others about a tutorial information"
                      value={this.state.formData.link}
                      onChange={e =>  {
                          let formData = this.state.formData
                          formData.link = e.target.value
                          this.setState({ formData: formData })
                      }}
                  />
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Contributor</Form.Label>
                  <Form.Control
                      type="text" 
                      placeholder="Enter your name or nickname"
                      value={this.state.formData.contributor}
                      onChange={e =>  {
                          let formData = this.state.formData
                          formData.contributor = e.target.value
                          this.setState({ formData: formData })
                      }}
                  />
              </Form.Group>
              <Button variant="primary" type="submit">
                  Submit
              </Button>
          </Form>
        );
      }

    closeModal = () => this.setState({ modalIsOpen: false});

    setRootNodeTitle(e){
        this.setState({ rootNodeTitle: e.label, data: e });
    }

    createRootNode() {
        if (this.state.rootNodeTitle !== '') {
            let data = this.state.data;
            data["children"] = [];
            this.setState({ data: data });
            this.closeModal(); 
        }

    }

    getOptions() {
        return this.state.optionsList.filter((option) => option.related_items.length === 0);
    }

    openForm = () => this.setState({ formIsOpen: true});
    closeForm = () => this.setState({ formIsOpen: false});

    renderData() {
        let item = this.state.data;
        if (Object.keys(item).length > 1) {
            return <Branch key={item.id} item={item} level={0} />
        }
       
    }

    render() {
        return (

            <div >
                <div className="text-center m-3">
                    <h5>Have you ever wanted to learn something but not known where to start?</h5>
                    <h5>Or known the big picture, but need help breaking it into chunks?</h5>
                    <p>Start building your tree here, and with the help of past users you can break down the 
                    big idea, big plan, big project into sizeable chunks</p>
                </div>
               
                <Modal show={this.state.modalIsOpen}>
                    <Modal.Header>
                        <Modal.Title>What do you want to do?</Modal.Title>
                        <p>Enter a word to get started on your productivity journey</p>
                    </Modal.Header>

                    <Modal.Body>
                        <Container>
                            <Row>
                                <Col>
                                    Root word:
                                </Col>
                                <Col>
                                    <Select options={this.getOptions()} onChange={this.setRootNodeTitle} />
                                </Col>
                            </Row>
                            <Row className="text-center mt-5">
                                <p>Can't see the word you want?</p>
                            </Row>
                            <Row>
                                <Button onClick={() => this.openForm()} variant="secondary" className="mx-2">Create a new word</Button>
                                {this.state.formIsOpen && this.renderForm()}
                            </Row>
                        </Container>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.createRootNode}>Begin my path to productivity</Button>
                    </Modal.Footer>
                </Modal>
                {this.renderData()}
            </div>
        )
    }
}

export default Tree;