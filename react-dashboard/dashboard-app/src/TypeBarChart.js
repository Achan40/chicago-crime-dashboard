import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { BarChart, Bar} from 'recharts';

import CartesianChart from './helpercomponents/CartesianChart';

class TypeBarChart extends Component {
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
              fill={this.colors[i]}
            />
          ))}
        </CartesianChart>
      );
    }

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
            "Corecrimedata.primaryType"
        ],
        "filters": this.props.filters,
        "limit": 100
        }}
            cubejsApi={this.props.cubejsApi}
            resetResultSetOnChange={false}
            render={(props) => this.renderChart({
                ...props,
                chartType: 'bar',
                pivotConfig: {
        "x": [
            "Corecrimedata.primaryType"
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

export default TypeBarChart