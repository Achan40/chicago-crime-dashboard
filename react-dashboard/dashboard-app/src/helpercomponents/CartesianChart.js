import React from "react"
import { CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const getMeasure = (objname) => {
  if (objname === 'Corecrimedata.count') {
    return "Number of Crimes"
  }
  return "";
}

const CustomToolTip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{label}</p>
        <p className="custlabel">{getMeasure(payload[0].dataKey)} : {payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

const CartesianChart = ({ resultSet, children, ChartComponent }) => (
    <ResponsiveContainer width="100%" height={350}>
      <ChartComponent data={resultSet.chartPivot()}>
        <XAxis dataKey="x" />
        <YAxis />
        <CartesianGrid />
        {children}
        <Tooltip content={<CustomToolTip />}/>
      </ChartComponent>
    </ResponsiveContainer>
  );

export default CartesianChart