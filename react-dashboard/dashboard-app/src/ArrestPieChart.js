import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import React, { Component } from 'react';


class ArrestPieChart extends Component {
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
            <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                    <Pie
                        isAnimationActive={true}
                        data={resultSet.chartPivot()}
                        nameKey="x"
                        dataKey={resultSet.seriesNames()[0].key}
                        fill="#8884d8"
                    >
                        {resultSet.chartPivot().map((e, index) => (
                        <Cell key={index} fill={this.colors[index % this.colors.length]} />
                        ))}
                    </Pie>
                <Legend />
                <Tooltip />
                </PieChart>
            </ResponsiveContainer>
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
            "Corecrimedata.arrest"
          ],
          "filters": this.props.filters
        }}
              cubejsApi={this.props.cubejsApi}
              resetResultSetOnChange={false}
              render={(props) => this.renderChart({
                ...props,
                chartType: 'pie',
                pivotConfig: {
          "x": [
            "Corecrimedata.arrest"
          ],
          "y": [
            "measures"
          ],
          "fillMissingDates": true,
          "joinDateRange": false
        }
              })}
            />)
    }
}

export default ArrestPieChart