import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import React from 'react';
import { CartesianGrid, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CartesianChart = ({ resultSet, children, ChartComponent }) => (
  <ResponsiveContainer width="100%" height={350}>
    <ChartComponent data={resultSet.chartPivot()}>
      <XAxis dataKey="x" />
      <YAxis />
      <CartesianGrid />
      {children}
      <Legend />
      <Tooltip />
    </ChartComponent>
  </ResponsiveContainer>
);

const colors = ['#FF6492', '#141446', '#7A77FF'];

const cubejsApi = cubejs(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDAyMjYyNjEsImV4cCI6MTY0MDMxMjY2MX0.MyjDXXR7xRqL39X3m_tz4Gxo6H5IayVEWpz32W_nG0U',
  { apiUrl: 'http://localhost:4000/cubejs-api/v1' }
);

const renderChart = ({ resultSet, error, pivotConfig }) => {
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
            stroke={colors[i]}
            fill={colors[i]}
        />
        ))}
    </CartesianChart>
    );
};

const ChartRenderer = () => {
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
  "filters": [
    {
      "member": "Corecrimedata.year",
      "operator": "inDateRange",
      "values": [
        "2010","2020"
      ]
    }
  ],
  "dimensions": [
    "Corecrimedata.year"
  ],
  "limit": 5000
}}
      cubejsApi={cubejsApi}
      resetResultSetOnChange={false}
      render={(props) => renderChart({
        ...props,
        chartType: 'area',
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
};

export default ChartRenderer