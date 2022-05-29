import React from 'react';
import {Modal, Button, Row, Col, Container, Form} from 'react-bootstrap';
import Select from 'react-select';
import axios from 'axios';

import Branch from '../Branch';



class Tree extends React.Component {

    renderData() {
        let item = {
            id: '0',
            label: 'Beginning',
            children: [],
        };
        return <Branch key={item.id} item={item} level={0} />
    }

    render() {
        return (

            <div >
                <div className="text-center m-3">
                    <h5>Have you ever wanted to learn something but not known where to start?</h5>
                    <h5>Or known the big picture, but need help breaking it into chunks?</h5>
                    <p>This site helps you to build a tree, progressively breaking down a seemingly large task into smaller chunks</p>
                </div>
               {this.renderData()}
            </div>   
        )
    }
}

export default Tree;