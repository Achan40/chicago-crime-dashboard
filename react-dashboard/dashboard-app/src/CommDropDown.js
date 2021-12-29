import React, {Component} from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import cubejs from "@cubejs-client/core";
import { QueryRenderer } from "@cubejs-client/react";
import 'bootstrap/dist/css/bootstrap.css';
import YrCountChart from './YrCountChart';

class CommDropDown extends Component {
    constructor() {
        super()
        // link to cubejs
        this.cubejsApi = cubejs(
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDAxNDYyODMsImV4cCI6MTY0MDIzMjY4M30.zsUoQ48_CIY8os1KvfWYcaBBkS_YzxZ3RsgH5YV5GIc',
            { apiUrl: 'http://localhost:4000/cubejs-api/v1' }
        );

        // saving state
        this.state = {
            commarea: "Select a community area"
        }

        // used for generating jsx in a loop
        this.commareadescarr = []

        // bind custom methods
        this.handleChange = this.handleChange.bind(this)
    }

    // update the selected commarea when one is selected from the dropdown
    // on the onClick event (once an item from the dropdown is selected), the state is set to the id of the selected dropdown item.
    handleChange(event) {
        this.setState({
            commarea: event.target.id
        })
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
                cubejsApi={this.cubejsApi}
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
                            {/* genereate JSX in a loop */}
                            <Dropdown.Item onClick={this.handleChange} id ='ENTIRE CITY'>ENTIRE CITY</Dropdown.Item>
                            {this.commareadescarr.map(item => (
                                <Dropdown.Item onClick={this.handleChange} id ={item['Commareas.communityDesc']}>{item['Commareas.communityDesc']}</Dropdown.Item>
                            ))}
                        </DropdownButton>
                        <YrCountChart filter={this.state.commarea}/>
                    </div>
                    );
                }}
            />
        )
    }
}
export default CommDropDown