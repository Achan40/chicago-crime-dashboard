import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import React, { Component } from 'react';
import { BarChart, Bar } from 'recharts';
import CartesianChart from '../helpercomponents/CartesianChart';

class YrBarChart extends Component {
    constructor() {
        super()

        this.colors = ['#FF6492', '#141446', '#7A77FF'];

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
        <CartesianChart resultSet={resultSet} ChartComponent={BarChart}>
            {resultSet.seriesNames().map((series, i) => (
            <Bar
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
          "order": [
            [
              "Corecrimedata.year",
              "asc"
            ]
          ],
          "dimensions": [
            "Corecrimedata.year"
          ],
          "filters": this.props.filters
        }}
              cubejsApi={this.props.cubejsApi}
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

export default YrBarChart