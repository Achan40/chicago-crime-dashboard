import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import React, { Component } from 'react';
import { LineChart, Line } from 'recharts';
import CartesianChart from './../helpercomponents/CartesianChart';

class CountLineChart extends Component {
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
        <CartesianChart resultSet={resultSet} ChartComponent={LineChart} cust="monthly">
            {resultSet.seriesNames().map((series, i) => (
            <Line
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
          "timeDimensions": [{
              "dimension": "Corecrimedata.date",
              "granularity": "month"
          }],
          "order": {},
          "dimensions": [],
          "filters": this.props.filters
        }}
              cubejsApi={this.props.cubejsApi}
              resetResultSetOnChange={false}
              render={(props) => this.renderChart({
                ...props,
                chartType: 'line',
                pivotConfig: {
          "x": [
            "Corecrimedata.date.month"
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

export default CountLineChart