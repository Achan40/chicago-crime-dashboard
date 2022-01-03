import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import React, { Component } from 'react';

import TableRenderer from './helpercomponents/TableRenderer';

class RawDataTable extends Component {
    constructor() {
        super()

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
                    "measures": [
                      "Corecrimedata.count"
                    ],
                    "timeDimensions": [],
                    "order": {
                      "Corecrimedata.count": "desc"
                    },
                    "dimensions": [
                      "Commareas.communityDesc",
                    ],
                    "filters": []
                  }}
                  cubejsApi={this.props.cubejsApi}
                  resetResultSetOnChange={false}
                  render={(props) => this.renderChart({
                  ...props,
                  chartType: 'table',
                  pivotConfig: {
                    "x": [
                      "Commareas.communityDesc"
                    ],
                    "y": [
                      "measures"
                    ],
                    "fillMissingDates": true,
                    "joinDateRange": false
                  }
                  })}
              />
          );
      };

}

export default RawDataTable