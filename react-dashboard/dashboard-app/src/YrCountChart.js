import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import React, { Component } from 'react';
import { AreaChart, Area } from 'recharts';
import CartesianChart from './helpercomponents/CartesianChart';

class YrCountChart extends Component {
    constructor() {
        super()

        this.colors = ['#FF6492', '#141446', '#7A77FF'];

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
    
      return (
        <CartesianChart resultSet={resultSet} ChartComponent={AreaChart}>
            {resultSet.seriesNames().map((series, i) => (
            <Area
                key={series.key}
                stackId="a"
                dataKey={series.key}
                name={series.title}
                stroke={this.colors[i]}
                fill={this.colors[i]}
            />
            ))}
        </CartesianChart>
        );
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
            "Corecrimedata.year"
          ],
          "filters": this.props.filters
        }}
              cubejsApi={this.cubejsApi}
              resetResultSetOnChange={false}
              render={(props) => this.renderChart({
                ...props,
                chartType: 'table',
                pivotConfig: {
          "x": [
            "Corecrimedata.year"
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
    }
}

export default YrCountChart