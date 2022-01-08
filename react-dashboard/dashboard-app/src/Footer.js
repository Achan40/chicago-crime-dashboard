import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/faked-footer.css'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Footer extends Component {
    render() {
        return (
            <div className='faked-footer'>
                <Container>
                    <Row>
                        <Col sm={12} md={5}>
                            <div className='footer-text'>
                                <h3>About</h3>
                                <hr></hr>
                                <p>This dashboard is updated every _______ at ____ CST.</p>
                                <p>Data is gathered from the <a href='https://data.cityofchicago.org/Public-Safety/Crimes-2001-to-present-Dashboard/5cd6-ry5g'>Chicago Data Portal</a>.</p>
                                <p>©2021 Chan</p>
                            </div>
                        </Col>
                        <Col>
                            <div className='footer-text'>
                                <h3>Links</h3>
                                <hr></hr>
                                <p><a href='https://github.com/Achan40'>GitHub</a></p>
                                <p><a href='https://www.linkedin.com/in/aaron-chan-30393115a/'>LinkedIn</a></p>
                            </div>
                        </Col>
                    </Row>
                    
                </Container>
            </div>
        )
    }
}
export default Footer