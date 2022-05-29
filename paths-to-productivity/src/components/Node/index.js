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
            possibleParents: [],
        }
        this.createNewNode = this.createNewNode.bind(this);
        this.setNewNodeTitle = this.setNewNodeTitle.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    
    componentDidMount() {
        this.refreshList()
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
            if (!this.state.formData.related_items.includes(this.props.item.id)) {
                let formData = this.state.formData
                formData.related_items.push(this.props.item.id);
                this.setState({ formData: formData })
            }
            axios
            .post("http://localhost:8000/api/items/", this.state.formData)
            .then(res => this.refreshList( this.props.item.id))
            .catch(err => console.log(err.response));
            event.preventDefault();
            this.closeForm();
        }

    }

    refreshList = (id) => {
        if (id == null) {

            axios   //Axios to send and receive HTTP requests
            .get("http://localhost:8000/api/items/")
            .then(res => this.setState({ optionsList: res.data, possibleParents: res.data }))
            .catch(err => console.log(err));
        }
        else {
            axios   //Axios to send and receive HTTP requests
            .get("http://localhost:8000/api/items/"+ id + "/")
            .then(res => this.setState({ optionsList: res.data }))
            .catch(err => console.log(err));
        }
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
                  <p>Help provide suggestions to other users, by sharing your nodes with related nodes</p>
                  <Form.Label>Related Nodes</Form.Label>
                  <Select
                    defaultValue={[this.props.item]}
                    options={this.state.possibleParents}
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

    openModal = () => this.setState({ modalIsOpen: true});
    closeModal = () => this.setState({ modalIsOpen: false, formIsOpen: false });
    
    openForm = () => this.setState({ formIsOpen: true});
    closeForm = () => this.setState({ formIsOpen: false});
  
    handleClick(item) {
        if (item.label === "Beginning") {
            this.refreshList();
        }
        else {
            this.refreshList(item.id);
        }
        this.openModal();
    }

    renderButtonInfo(item) {
        if (item.label === "Beginning") {
            return <p>Click here to get started</p>
        }
        else {
            return (
                <div>
                    <h4>{item.label}</h4>
                    <p>{item.description}</p>
                    <p><i>Contributed by: {item.contributor}</i></p>
                </div>

            );
        }
    }
    
    renderHyperLink(item) {
        if (item.link != null) {
            return <a target='_blank' href={this.props.item.link}>Learn more about {this.props.item.label}</a>
        }
      
    }
      
    render() {
        return (
            <div>
                <Row className="mx-5 my-2">
                    <div  className="mx-1">
                        <Row>
                            <Button className="m-1" as={Col} onClick={() => this.handleClick(this.props.item)} style={{backgroundColor: this.props.item.color}}>
                                {this.renderButtonInfo(this.props.item)}
                            </Button>
                        </Row>
                        <Row className="text-center">
                            {this.renderHyperLink(this.props.item)}
                        </Row>
                        <Row>
                        {this.state.hasChildren && <Button as={Col} onClick={this.props.onToggle} variant="primary" className="mx-1">Show/Hide Children</Button>}
                        </Row>
                    </div>
                    

                </Row>
                <Modal show={this.state.modalIsOpen}  onHide={this.closeModal}>
                    <Modal.Header>
                        <Modal.Title>Add a new node to your tree</Modal.Title>
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
                        <Button onClick={this.closeModal} variant="secondary">Cancel</Button><Button onClick={this.createNewNode} variant="primary">Add node to tree</Button>
                    </Modal.Footer>
                    <p className='text-center'>{this.state.errorText}</p>
                </Modal>
            </div>
    
        );
    }
}

export default Node;