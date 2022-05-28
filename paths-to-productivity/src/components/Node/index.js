import React from 'react';
import {Modal, Button, Row, Col} from 'react-bootstrap';
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
            hasChildren: this.props.hasChildren
        }
        this.createNewNode = this.createNewNode.bind(this);
        this.setNewNodeTitle = this.setNewNodeTitle.bind(this);
    }

    setNewNodeTitle(e){
        this.setState({ nodeTitle: e.value, data: e });
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
    }
    
    refreshList = (id) => {
        axios   //Axios to send and receive HTTP requests
          .get("http://localhost:8000/api/items/"+ id + "/")
          .then(res => this.setState({ optionsList: res.data }))
          .catch(err => console.log(err));
      };

    openModal = () => this.setState({ modalIsOpen: true});
    closeModal = () => this.setState({ modalIsOpen: false });
  
    handleClick(id) {
        this.refreshList(id);
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
                        <label>
                            Node title:
                            <Select options={this.state.optionsList} onChange={this.setNewNodeTitle} />
                        </label>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.closeModal} variant="secondary">Cancel</Button><Button onClick={this.createNewNode} variant="primary">Submit</Button>
                    </Modal.Footer>
                </Modal>
            </div>
    
        );
    }
}

export default Node;