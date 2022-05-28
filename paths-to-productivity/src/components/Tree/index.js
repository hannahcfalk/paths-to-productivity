import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import Select from 'react-select';
import axios from 'axios';

import Branch from '../Branch';


class Tree extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rootNodeTitle: '',
            data: {},
            modalIsOpen: true,
            optionsList: []
        }
        this.setRootNodeTitle = this.setRootNodeTitle.bind(this);
        this.createRootNode = this.createRootNode.bind(this);
        this.getOptions = this.getOptions.bind(this);
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

    openModal = () => this.setState({ modalIsOpen: true});
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

    renderData() {
        console.log(this.state.optionsList);
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
                        <label>
                            Root word:
                            <Select options={this.getOptions()} onChange={this.setRootNodeTitle} />
                        </label>
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