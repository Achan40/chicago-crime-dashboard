import React, {Component} from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import cubejs from "@cubejs-client/core";
import { QueryRenderer } from "@cubejs-client/react";
import 'bootstrap/dist/css/bootstrap.css';

class CommDropDown extends Component {
    constructor() {
        super()
        this.cubejsApi = cubejs(
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDAxNDYyODMsImV4cCI6MTY0MDIzMjY4M30.zsUoQ48_CIY8os1KvfWYcaBBkS_YzxZ3RsgH5YV5GIc',
            { apiUrl: 'http://localhost:4000/cubejs-api/v1' }
        );
    }

    render () {
        return (
            <div>
                <QueryRenderer
                    query={{
                        "measures": [
                            "Corecrimedata.count"
                          ],
                        "dimensions": [
                            "Commareas.communityDesc"
                          ],
                    }}
                    cubejsApi={this.cubejsApi}
                    render={({ resultSet }) => {
                    if (!resultSet) {
                        return "Loading Analytics...";
                    }
                    return (
                        <div>tmp
                            {console.log(resultSet.loadResponses["0"])}
                        </div>
                        );
                    }}
                />
                <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                </DropdownButton>
            </div>
        )
    }
}
export default CommDropDown