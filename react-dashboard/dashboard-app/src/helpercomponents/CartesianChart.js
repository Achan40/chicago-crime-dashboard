import React from "react"
import { CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './../styles/custom-tooltip.css'
import CustomToolTip from "./CustomTooltip";

const CartesianChart = ({ resultSet, children, ChartComponent }) => (
    <ResponsiveContainer width="100%" height={350}>
      <ChartComponent data={resultSet.chartPivot()}>
        <XAxis dataKey="x" />
        <YAxis />
        <CartesianGrid />
        {children}
        <Tooltip content={<CustomToolTip />} cursor={{fill: '#141446'}}/>
      </ChartComponent>
    </ResponsiveContainer>
  );

export default CartesianChart