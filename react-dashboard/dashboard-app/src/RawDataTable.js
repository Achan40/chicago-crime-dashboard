import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import React, { Component } from 'react';

import TableRenderer from './helpercomponents/TableRenderer';

class RawDataTable extends Component {
    constructor() {
        super()

        this.cubejsApi = cubejs(
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDA5MjcwMDIsImV4cCI6MTY0MzUxOTAwMn0.aZuu1QSHH_JXmXlvHYcVphzcHN-k-66yB7gd0AzzLEI',
            { apiUrl: 'http://localhost:4000/cubejs-api/v1' }
            );

        this.renderChart = this.renderChart.bind(this)
    }

    renderChart = ({ resultSet, error, pivotConfig }) => {
        if (error) {
          return <div>{error.toString()}</div>;
        }
      
        if (!resultSet) {
          return <Spin />;
        }
      
        return <TableRenderer resultSet={resultSet} pivotConfig={pivotConfig} />;
      
      };
      
      render() {
          return (
              <QueryRenderer
                  query={{
              "measures": [],
              "timeDimensions": [],
              "order": [
              [
                  "Corecrimedata.updatedOn",
                  "desc"
              ],
              [
                  "Commareas.communityDesc",
                  "asc"
              ]
              ],
              "dimensions": [
              "Corecrimedata.caseNumber",
              "Corecrimedata.date",
              "Corecrimedata.primaryType",
              "Corecrimedata.description",
              "Corecrimedata.locationDescription",
              "Corecrimedata.arrest",
              "Corecrimedata.district",
              "Corecrimedata.xCoordinate",
              "Corecrimedata.yCoordinate",
              "Corecrimedata.updatedOn",
              "Corecrimedata.latitude",
              "Corecrimedata.longitude",
              "Commareas.communityDesc"
              ],
              "filters": this.props.filters,
              "limit": 50
          }}
                  cubejsApi={this.cubejsApi}
                  resetResultSetOnChange={false}
                  render={(props) => this.renderChart({
                  ...props,
                  chartType: 'table',
                  pivotConfig: {
              "x": [
              "Corecrimedata.caseNumber",
              "Corecrimedata.date",
              "Corecrimedata.primaryType",
              "Corecrimedata.description",
              "Corecrimedata.locationDescription",
              "Corecrimedata.arrest",
              "Corecrimedata.district",
              "Corecrimedata.xCoordinate",
              "Corecrimedata.yCoordinate",
              "Corecrimedata.updatedOn",
              "Corecrimedata.latitude",
              "Corecrimedata.longitude",
              "Commareas.communityDesc"
              ],
              "y": [],
              "fillMissingDates": true,
              "joinDateRange": false,
              "limit": 50
          }
                  })}
              />
          );
      };

}

export default RawDataTable