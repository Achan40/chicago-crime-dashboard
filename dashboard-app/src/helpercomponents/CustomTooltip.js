import React from "react"

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
        <h6 className="label">{label}</h6>
        <p className="custlabel">{getMeasure(payload[0].dataKey)} : {payload[0].value.toLocaleString()}</p>
    </div>
    );
}
return null;
};
export default CustomToolTip