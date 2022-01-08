import React, {Component} from 'react';
import Card from 'react-bootstrap/Card'

import '../styles/dropdowns.scss'

class DropDownCard extends Component {
    render() {
        return (
            <Card bg="light" className='dropdown-card'>
                <Card.Body>
                    {this.props.children}
                </Card.Body>
            </Card>
        )
    }
}
export default DropDownCard