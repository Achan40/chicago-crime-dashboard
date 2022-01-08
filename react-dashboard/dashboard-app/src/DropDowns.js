import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import cubejs from "@cubejs-client/core";
import { QueryRenderer } from "@cubejs-client/react";
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Card from 'react-bootstrap/Card'

import YrBarChart from './graphcomponents/YrBarChart';
import CountLineChart from './graphcomponents/CountLineChart';
import ArrestPieChart from './graphcomponents/ArrestPieChart';
import RawDataTable from './graphcomponents/RawDataTable';
import TypeBarChart from './graphcomponents/TypeBarChart';

import './styles/dropdowns.scss'

class DropDowns extends Component {
    constructor() {
        super()

        // saving state. We need to pass down cubejs API to each of our components
        this.state = {
            cubejsApi: cubejs(
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDA5MjcwMDIsImV4cCI6MTY0MzUxOTAwMn0.aZuu1QSHH_JXmXlvHYcVphzcHN-k-66yB7gd0AzzLEI',
                { apiUrl: 'http://localhost:4000/cubejs-api/v1' }
            ),
            isActive: false,
            commarea: "Select a community area",
            year: "Select a timeframe",
            filters: []
        }

        // used for generating jsx dropdown items in a loop
        this.commareadescarr = []
        this.yearsindb = []

        // bind custom methods
        this.handleAreaChange = this.handleAreaChange.bind(this)
        this.handleTimeChange = this.handleTimeChange.bind(this)
    }

    // updates the filter query with the selected commarea from the dropdown
    // clears out year filters and resets this.state.year when a commarea is selected
    handleAreaChange(event) {
        if (event.target.id === 'ENTIRE CITY') {
            this.setState({
                commarea: "ENTIRE CITY",
                year: "All available years",
                filters: []
            })
        } else {
            this.setState({
                commarea: event.target.id,
                year: "All available years",
                filters: [{
                    "member": "Commareas.communityDesc",
                    "operator": "equals",
                    "values": [
                        event.target.id
                    ]
                }]
            })
        }
        // show year filter only when an option is selected
        this.setState({isActive:true});
    }

    // dropdown for year is only shown when a commarea is selected
    handleTimeChange(event) {
        // make a copy of the state.filters arr, we never want to mutate state directly
        let tmp = [...this.state.filters]
        if (event.target.id === 'All available years') {
            
            // remove year filter if an there is an existing time filter applied
            for (let i = 0; i < tmp.length; i++) {
                if (tmp[i].member === 'Corecrimedata.year') {
                    tmp.splice(i, 1)
                }
            }
            this.setState({
                year: "All available years",
                filters: tmp
            })
        } else if (!this.state.filters || !this.state.filters.length) {
            // if there is no value for commarea filter, set the state for the year filter only
            // deals with the edge case of the data for the entire city being selected
            this.setState({
                year: event.target.id,
                filters: [{
                    "member": "Corecrimedata.year",
                    "operator": "equals",
                    "values": [
                        event.target.id
                    ]
                }]
            })
        } else {
            // flag to see if there already exists a filter for the year, if it does, we will edit it the current year filter and set the flag to false
            let flg = false;
            for (let i = 0; i < tmp.length; i++) {
                if (tmp[i].member === 'Corecrimedata.year') {
                    flg = true;
                    tmp[i] = {
                        "member": "Corecrimedata.year",
                        "operator": "equals",
                        "values": [
                            event.target.id
                        ]
                    }
                }
            }
            // if an existing year filter is not found, then add it to the filters
            if (flg === false) {
                tmp.push({
                    "member": "Corecrimedata.year",
                    "operator": "equals",
                    "values": [
                        event.target.id
                    ]
                })
            }

            this.setState({
                year: event.target.id,
                filters: tmp
            })
        }
    }

    render () {
        return (
            <QueryRenderer
                query={{
                    "measures": [
                        "Corecrimedata.count"
                        ],
                    "dimensions": [
                        "Commareas.communityDesc",
                        "Corecrimedata.year"
                        ],
                    "order": {
                        "Commareas.communityDesc": "asc"
                        },
                }}
                cubejsApi={this.state.cubejsApi}
                render={({ resultSet }) => {
                if (!resultSet) {
                    return "Loading Dashboard...";
                } else {
                    // Get array of all unique community areas, all unique years in the database (and sort them)
                    this.commareadescarr = [...new Set(resultSet.loadResponses["0"].data.map(x => x['Commareas.communityDesc']))];
                    this.yearsindb = [...new Set(resultSet.loadResponses["0"].data.map(x => x['Corecrimedata.year']))].sort((a,b)=>a-b)
                }
                return (
                    <div>
                        <Navbar bg="light" expand="lg" className='navbar-comp'>
                                <Container>
                                    <Navbar.Brand>Chicago Crime Dashboard</Navbar.Brand>
                                    <Navbar.Toggle aria-controls="navbar-nav" />
                                    <Navbar.Collapse id="navbar-nav">
                                        <Nav className="me-auto">
                                            <NavDropdown id="dropdown-commarea" title={this.state.commarea}>
                                                <NavDropdown.Item onClick={this.handleAreaChange} id ='ENTIRE CITY' key='ENTIRE CITY'>ENTIRE CITY</NavDropdown.Item>
                                            {this.commareadescarr.map(item => (
                                                <NavDropdown.Item onClick={this.handleAreaChange} id ={item} key={item}>{item}</NavDropdown.Item>
                                            ))}
                                            </NavDropdown>
                                            {this.state.isActive ? 
                                            <NavDropdown id="dropdown-year" title={this.state.year}>
                                                <NavDropdown.Item onClick={this.handleTimeChange} id ='All available years' key='All available years'>All available years</NavDropdown.Item>
                                            {this.yearsindb.map(item => (
                                                <NavDropdown.Item onClick={this.handleTimeChange} id ={item} key={item}>{item}</NavDropdown.Item>
                                            ))}
                                            </NavDropdown>
                                            : null}
                                        </Nav>
                                    </Navbar.Collapse>
                                </Container>
                        </Navbar>
                        <Container id="charts-container">
                            <Card>
                                <Card.Body>
                                    <YrBarChart filters={this.state.filters} cubejsApi={this.state.cubejsApi}/>
                                </Card.Body>
                                
                            </Card>
                            <Card>
                                <Card.Body>
                                    <CountLineChart filters={this.state.filters} cubejsApi={this.state.cubejsApi}/>
                                </Card.Body>
                            </Card>
                            
                            <Row>
                                <Col xs={12} md={4}>
                                    <Card>
                                        <Card.Body>
                                        <ArrestPieChart filters={this.state.filters} cubejsApi={this.state.cubejsApi}/>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                <Col>
                                    <Card>
                                        <Card.Body>
                                        <TypeBarChart filters={this.state.filters} cubejsApi={this.state.cubejsApi}/>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                            <Card>
                                <Card.Body>
                                    <RawDataTable filters={this.state.filters} cubejsApi={this.state.cubejsApi}/>
                                </Card.Body>
                            </Card>
                        </Container>
                        
                    </div>
                    );
                }}
            />
        )
    }
}
export default DropDowns