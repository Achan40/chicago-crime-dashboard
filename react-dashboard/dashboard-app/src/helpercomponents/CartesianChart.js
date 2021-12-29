import React from "react"
import { CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

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

export default CartesianChart