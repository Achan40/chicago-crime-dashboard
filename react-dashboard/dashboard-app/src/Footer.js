import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './styles/faked-footer.scss'
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
                                <div class="link-cont">
                                    <div class="link-wrapper">
                                        Data is gathered from the <a class="link hover-2" href='https://data.cityofchicago.org/Public-Safety/Crimes-2001-to-present-Dashboard/5cd6-ry5g' target="_blank" rel="noopener noreferrer">Chicago Data Portal</a>
                                    </div>

                                </div>
                                <p>©2021 Chan</p>
                            </div>
                        </Col>
                        <Col>
                            <div className='footer-text'>
                                <h3>Links</h3>
                                <hr></hr>
                                <div class="link-cont">
                                    <div class="link-wrapper">
                                        <a class="link hover-2" href='https://github.com/Achan40' target="_blank" rel="noopener noreferrer">GitHub</a>
                                    </div>
                                    <div clas="link-wrapper">
                                        <a class="link hover-2" href='https://github.com/Achan40' target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default Footer