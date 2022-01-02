import React, {Component} from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import cubejs from "@cubejs-client/core";
import { QueryRenderer } from "@cubejs-client/react";
import 'bootstrap/dist/css/bootstrap.css';

import YrBarChart from './YrBarChart';
import CountLineChart from './CountLineChart';
import ArrestPieChart from './ArrestPieChart';
import RawDataTable from './RawDataTable';
import TypeBarChart from './TypeBarChart';

class CommDropDown extends Component {
    constructor() {
        super()

        // saving state. We need to pass down cubejs API to each of our components
        this.state = {
            cubejsApi: cubejs(
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDA5MjcwMDIsImV4cCI6MTY0MzUxOTAwMn0.aZuu1QSHH_JXmXlvHYcVphzcHN-k-66yB7gd0AzzLEI',
                { apiUrl: 'http://localhost:4000/cubejs-api/v1' }
            ),
            commarea: "Select a community area",
            filters: []
        }

        // used for generating jsx dropdown items in a loop
        this.commareadescarr = []

        // bind custom methods
        this.handleChange = this.handleChange.bind(this)
    }

    // update the selected commarea when one is selected from the dropdown
    // on the onClick event (once an item from the dropdown is selected), the state is set to the id of the selected dropdown item.
    // If 'ENTIRE CITY' Dropdown is selected, do not apply a filter
    handleChange(event) {
        if (event.target.id === 'ENTIRE CITY') {
            this.setState({
                commarea: "ENTIRE CITY",
                filters: []
            })
        } else {
            this.setState({
                commarea: event.target.id,
                filters: [{
                    "member": "Commareas.communityDesc",
                    "operator": "equals",
                    "values": [
                        event.target.id
                    ]
                }]
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
                        "Commareas.communityDesc"
                        ],
                    "order": {
                        "Commareas.communityDesc": "asc"
                        },
                }}
                cubejsApi={this.state.cubejsApi}
                render={({ resultSet }) => {
                if (!resultSet) {
                    return "Loading Analytics...";
                } else {
                    // set variable for the community area description object
                    this.commareadescarr = resultSet.loadResponses["0"].data;
                }
                return (
                    <div>
                        <DropdownButton id="dropdown-basic-button" title={this.state.commarea}>
                            <Dropdown.Item onClick={this.handleChange} id ='ENTIRE CITY'>ENTIRE CITY</Dropdown.Item>
                            {this.commareadescarr.map(item => (
                                <Dropdown.Item onClick={this.handleChange} id ={item['Commareas.communityDesc']} key={item['Commareas.communityDesc']}>{item['Commareas.communityDesc']}</Dropdown.Item>
                            ))}
                        </DropdownButton>
                        <YrBarChart filters={this.state.filters} cubejsApi={this.state.cubejsApi}/>
                        <CountLineChart filters={this.state.filters} cubejsApi={this.state.cubejsApi}/>
                        <ArrestPieChart filters={this.state.filters} cubejsApi={this.state.cubejsApi}/>
                        <TypeBarChart filters={this.state.filters} cubejsApi={this.state.cubejsApi}/>
                        <RawDataTable filters={this.state.filters} cubejsApi={this.state.cubejsApi}/>
                    </div>
                    );
                }}
            />
        )
    }
}
export default CommDropDown