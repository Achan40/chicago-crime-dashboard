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
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDAyMjYyNjEsImV4cCI6MTY0MDMxMjY2MX0.MyjDXXR7xRqL39X3m_tz4Gxo6H5IayVEWpz32W_nG0U',
        { apiUrl: 'http://localhost:4000/cubejs-api/v1' }
        );

        this.renderChart = ({ resultSet, error, pivotConfig }) => {
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

        this.renderChart = this.renderChart.bind(this)
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