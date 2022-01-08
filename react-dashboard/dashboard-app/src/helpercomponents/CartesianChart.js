import React from "react"
import { CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './../styles/custom-tooltip.css'
import CustomToolTip from "./CustomTooltip";

// ternary operator used because I wanted to customize the "Number of Crimes by Year by Month" chart.
// works fine as long as I don't customize the values of another chart (use nested ternary if we ever need to get to that...)
const CartesianChart = ({ resultSet, children, ChartComponent, cust=''}) => (
    <ResponsiveContainer width="100%" height={350}>
      {cust === 'monthly' ? 
      <ChartComponent data={resultSet.chartPivot().map((element) => {
        var d = new Date(element.x);
        return {"x":`${d.getMonth()+1}-${d.getFullYear()}`,"Corecrimedata.count":element['Corecrimedata.count']};
      })}>
        <XAxis dataKey="x" />
        <YAxis />
        <CartesianGrid />
        {children}
        <Tooltip content={<CustomToolTip />} cursor={{fill: '#141446'}}/>
      </ChartComponent>
  : 
      <ChartComponent data={resultSet.chartPivot()}>
        <XAxis dataKey="x" />
        <YAxis />
        <CartesianGrid />
        {children}
        <Tooltip content={<CustomToolTip />} cursor={{fill: '#141446'}}/>
      </ChartComponent>
      }
    </ResponsiveContainer>
)
  

export default CartesianChart