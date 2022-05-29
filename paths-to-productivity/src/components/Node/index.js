import React from 'react';
import {Modal, Button, Row, Col, Form, Container} from 'react-bootstrap';
import Select from 'react-select';
import axios from 'axios';

class Node extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nodeTitle: '',
            modalIsOpen: false,
            data: {},
            allOptionsList: [],
            optionsList: [],
            hasChildren: this.props.hasChildren,
            formData: {
                label: '',
                description: '',
                color: '',
                link: '',
                contributor: '',
                related_items: [],
            },
            validated: false,
            errorText: '',
        }
        this.createNewNode = this.createNewNode.bind(this);
        this.setNewNodeTitle = this.setNewNodeTitle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    setNewNodeTitle(e){
        this.setState({ nodeTitle: e.value, data: e });
    }

    handleSubmit(event) {
        const form = event.currentTarget;
        this.setState({validated: true});
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
        else {
            axios
            .post("http://localhost:8000/api/items/", this.state.formData)
            .then(res => this.getChildrenList( this.props.item.id))
            .catch(err => console.log(err.response));
            event.preventDefault();
            this.closeForm();
        }

    }

    componentDidMount() {
        this.refreshList()
    }

    refreshList = () => {
        axios   //Axios to send and receive HTTP requests
          .get("http://localhost:8000/api/items/")
          .then(res => this.setState({ allOptionsList: res.data }))
          .catch(err => console.log(err));
    };

    renderForm() {
        return (
            
          <Form noValidate validated={this.state.validated} className="m-1" onSubmit={this.handleSubmit}>
              <Form.Group className="mb-3">
                  <Form.Label>Label</Form.Label>
                  <Form.Control
                      required
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
                      required
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
                      required
                      type="text" 
                      placeholder="Enter the hex color code, starting with # e.g. #CD6211"
                      value={this.state.formData.color}
                      onChange={e =>  {
                          let formData = this.state.formData
                          formData.color = e.target.value
                          this.setState({ formData: formData })
                      }}
                      pattern="#[A-Za-z0-9]{6}"
                  />
                  <Form.Control.Feedback type="invalid">
                    Color needs to be in the form #CD6211, click <a href="https://htmlcolorcodes.com/" target="_blank">here</a> for ideas.
                  </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                  <Form.Label>Link (Optional)</Form.Label>
                  <Form.Control
                      type="text" 
                      placeholder="Add an URL to tell others about tutorial information"
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
                      required
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
              <Form.Group className="mb-3">
                  <p>Help other users build trees by making this a child of different parents</p>
                  <Form.Label>Other parents</Form.Label>
                  <Select
                    defaultValue={[this.props.item]}
                    options={this.state.allOptionsList}
                    isMulti
                    onChange={e =>  {
                          let formData = this.state.formData
                          formData.related_items = e.map((node => node.id));
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
    
    createNewNode(){
        if (this.state.nodeTitle !== '') {
            let data = this.state.data;
            data["children"] = [];
            this.props.item.children.push(data);
            this.setState(
                {
                    hasChildren: true,
                }
            );
            this.closeModal();
        }
        else {
            this.setState({ errorText: 'You need to select a label to create a node!' });
        }
    }
    
    getChildrenList = (id) => {
        axios   //Axios to send and receive HTTP requests
          .get("http://localhost:8000/api/items/"+ id + "/")
          .then(res => this.setState({ optionsList: res.data }))
          .catch(err => console.log(err));
      };

    openModal = () => this.setState({ modalIsOpen: true});
    closeModal = () => this.setState({ modalIsOpen: false });
    
    openForm = () => this.setState({ formIsOpen: true});
    closeForm = () => this.setState({ formIsOpen: false});
  
    handleClick(id) {
        this.getChildrenList(id);
        this.openModal();
    }
      
    render() {
        return (
            <div>
                <Row className="mx-5 my-2">
                    <div  className="mx-1">
                        <Row>
                            <Button as={Col} onClick={() => this.handleClick(this.props.item.id)} style={{backgroundColor: this.props.item.color}}>
                                <h4>{this.props.item.label}</h4>
                                <p>{this.props.item.description}</p>
                                <p><i>Contributed by: {this.props.item.contributor}</i></p>
                            </Button>
                        </Row>
                        <Row className="text-center">
                            <a target='_blank' href={this.props.item.link}>Learn more about {this.props.item.label}</a>
                        </Row>
                    </div>
                    
                    {this.state.hasChildren && <Button as={Col} onClick={this.props.onToggle} variant="primary" className="mx-1">Show/Hide Children</Button>}
                </Row>
                <Modal show={this.state.modalIsOpen}  onHide={this.closeModal}>
                    <Modal.Header>
                        <Modal.Title>Enter the title of your node</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                    
                        <Container>
                            <Row>
                                <Col>
                                    Node title:
                                </Col>
                                <Col>
                                    <Select options={this.state.optionsList} onChange={this.setNewNodeTitle} />
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
                        <Button onClick={this.closeModal} variant="secondary">Cancel</Button><Button onClick={this.createNewNode} variant="primary">Submit</Button>
                    </Modal.Footer>
                    <p className='text-center'>{this.state.errorText}</p>
                </Modal>
            </div>
    
        );
    }
}

export default Node;