// import cubejs from '@cubejs-client/core';
// import { QueryRenderer } from '@cubejs-client/react';
// import { Spin } from 'antd';
// import 'antd/dist/antd.css';
// import React, { Component } from 'react';
// import { Row, Col, Statistic, Table } from 'antd';
// import { useDeepCompareMemo } from 'use-deep-compare'

import cubejs from '@cubejs-client/core';
import { QueryRenderer } from '@cubejs-client/react';
import { Spin } from 'antd';
import 'antd/dist/antd.css';
import React, { Component } from 'react';
import { Table } from 'antd';
import { useDeepCompareMemo } from 'use-deep-compare';


const formatTableData = (columns, data) => {
  function flatten(columns = []) {
    return columns.reduce((memo, column) => {
      if (column.children) {
        return [...memo, ...flatten(column.children)];
      }

      return [...memo, column];
    }, []);
  }

  const typeByIndex = flatten(columns).reduce((memo, column) => {
    return { ...memo, [column.dataIndex]: column };
  }, {});

  function formatValue(value, { type, format } = {}) {
    if (value == undefined) {
      return value;
    }

    if (type === 'boolean') {
      if (typeof value === 'boolean') {
        return value.toString();
      } else if (typeof value === 'number') {
        return Boolean(value).toString();
      }

      return value;
    }

    if (type === 'number' && format === 'percent') {
      return [parseFloat(value).toFixed(2), '%'].join('');
    }

    return value.toString();
  }

  function format(row) {
    return Object.fromEntries(
      Object.entries(row).map(([dataIndex, value]) => {
        return [dataIndex, formatValue(value, typeByIndex[dataIndex])];
      })
    );
  }

  return data.map(format);
};

const TableRenderer = ({ resultSet, pivotConfig }) => {
    const [tableColumns, dataSource] = useDeepCompareMemo(() => {
      const columns = resultSet.tableColumns(pivotConfig);
      return [
        columns,
        formatTableData(columns, resultSet.tablePivot(pivotConfig)),
      ];
    }, [resultSet, pivotConfig]);
    return (
      <Table pagination={false} columns={tableColumns} dataSource={dataSource} />
    );
  };
  

class RawDataTable extends Component {
    constructor() {
        super()

        this.cubejsApi = cubejs(
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDA5MjcwMDIsImV4cCI6MTY0MzUxOTAwMn0.aZuu1QSHH_JXmXlvHYcVphzcHN-k-66yB7gd0AzzLEI',
            { apiUrl: 'http://localhost:4000/cubejs-api/v1' }
            );

        this.renderChart = this.renderChart.bind(this)
    }

    renderChart = ({ resultSet, error, pivotConfig }) => {
        if (error) {
          return <div>{error.toString()}</div>;
        }
      
        if (!resultSet) {
          return <Spin />;
        }
      
        return <TableRenderer resultSet={resultSet} pivotConfig={pivotConfig} />;
      
      };
      
      render() {
          return (
              <QueryRenderer
                  query={{
              "measures": [],
              "timeDimensions": [],
              "order": [
              [
                  "Corecrimedata.updatedOn",
                  "desc"
              ],
              [
                  "Commareas.communityDesc",
                  "asc"
              ]
              ],
              "dimensions": [
              "Corecrimedata.caseNumber",
              "Corecrimedata.date",
              "Corecrimedata.primaryType",
              "Corecrimedata.description",
              "Corecrimedata.locationDescription",
              "Corecrimedata.arrest",
              "Corecrimedata.district",
              "Corecrimedata.xCoordinate",
              "Corecrimedata.yCoordinate",
              "Corecrimedata.updatedOn",
              "Corecrimedata.latitude",
              "Corecrimedata.longitude",
              "Commareas.communityDesc"
              ],
              "filters": this.props.filters,
              "limit": 100
          }}
                  cubejsApi={this.cubejsApi}
                  resetResultSetOnChange={false}
                  render={(props) => this.renderChart({
                  ...props,
                  chartType: 'table',
                  pivotConfig: {
              "x": [
              "Corecrimedata.caseNumber",
              "Corecrimedata.date",
              "Corecrimedata.primaryType",
              "Corecrimedata.description",
              "Corecrimedata.locationDescription",
              "Corecrimedata.arrest",
              "Corecrimedata.district",
              "Corecrimedata.xCoordinate",
              "Corecrimedata.yCoordinate",
              "Corecrimedata.updatedOn",
              "Corecrimedata.latitude",
              "Corecrimedata.longitude",
              "Commareas.communityDesc"
              ],
              "y": [],
              "fillMissingDates": true,
              "joinDateRange": false,
              "limit": 100
          }
                  })}
              />
          );
      };

}

export default RawDataTable
      
// const formatTableData = (columns, data) => {
//     function flatten(columns = []) {
//       return columns.reduce((memo, column) => {
//         if (column.children) {
//           return [...memo, ...flatten(column.children)];
//         }
  
//         return [...memo, column];
//       }, []);
//     }
  
//     const typeByIndex = flatten(columns).reduce((memo, column) => {
//       return { ...memo, [column.dataIndex]: column };
//     }, {});
  
//     function formatValue(value, { type, format } = {}) {
//       if (value === undefined) {
//         return value;
//       }
  
//       if (type === 'boolean') {
//         if (typeof value === 'boolean') {
//           return value.toString();
//         } else if (typeof value === 'number') {
//           return Boolean(value).toString();
//         }
  
//         return value;
//       }
  
//       if (type === 'number' && format === 'percent') {
//         return [parseFloat(value).toFixed(2), '%'].join('');
//       }
  
//       return value.toString();
//     }
  
//     function format(row) {
//       return Object.fromEntries(
//         Object.entries(row).map(([dataIndex, value]) => {
//           return [dataIndex, formatValue(value, typeByIndex[dataIndex])];
//         })
//       );
//     }
  
//     return data.map(format);
//   };

// const TableRenderer = ({ resultSet, pivotConfig }) => {
//     const [tableColumns, dataSource] = useDeepCompareMemo(() => {
//         const columns = resultSet.tableColumns(pivotConfig);
//         return [
//         columns,
//         formatTableData(columns, resultSet.tablePivot(pivotConfig)),
//         ];
//     }, [resultSet, pivotConfig]);
//     return (
//         <Table pagination={false} columns={tableColumns} dataSource={dataSource} />
//     );
//     };

// class RawDataTable extends Component {
//     constructor() {
//         super ()

//         this.colors = ['#FF6492', '#141446', '#7A77FF'];

//         this.cubejsApi = cubejs(
//             'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDAyMjYyNjEsImV4cCI6MTY0MDMxMjY2MX0.MyjDXXR7xRqL39X3m_tz4Gxo6H5IayVEWpz32W_nG0U',
//             { apiUrl: 'http://localhost:4000/cubejs-api/v1' }
//             );

//         this.renderChart = this.renderChart.bind(this);
//     }

    

//     renderChart = ({ resultSet, error, pivotConfig }) => {
//         if (error) {
//           return <div>{error.toString()}</div>;
//         }
      
//         if (!resultSet) {
//           return <Spin />;
//         }
      
//         return <TableRenderer resultSet={resultSet} pivotConfig={pivotConfig} />;
//       };
    

//     render() {
//         return (
//             <QueryRenderer
//               query={{
//           "measures": [],
//           "timeDimensions": [],
//           "order": [
//             [
//               "Corecrimedata.updatedOn",
//               "desc"
//             ],
//             [
//               "Commareas.communityDesc",
//               "asc"
//             ]
//           ],
//           "dimensions": [
//             "Corecrimedata.caseNumber",
//             "Corecrimedata.date",
//             "Corecrimedata.primaryType",
//             "Corecrimedata.description",
//             "Corecrimedata.locationDescription",
//             "Corecrimedata.arrest",
//             "Corecrimedata.district",
//             "Corecrimedata.xCoordinate",
//             "Corecrimedata.yCoordinate",
//             "Corecrimedata.updatedOn",
//             "Corecrimedata.latitude",
//             "Corecrimedata.longitude",
//             "Commareas.communityDesc"
//           ],
//           "filters": [
//             {
//               "member": "Commareas.communityDesc",
//               "operator": "equals",
//               "values": [
//                 "AUSTIN"
//               ]
//             }
//           ],
//           "limit": 100
//         }}
//               cubejsApi={this.cubejsApi}
//               resetResultSetOnChange={false}
//               render={(props) => this.renderChart({
//                 ...props,
//                 chartType: 'table',
//                 pivotConfig: {
//           "x": [
//             "Corecrimedata.caseNumber",
//             "Corecrimedata.date",
//             "Corecrimedata.primaryType",
//             "Corecrimedata.description",
//             "Corecrimedata.locationDescription",
//             "Corecrimedata.arrest",
//             "Corecrimedata.district",
//             "Corecrimedata.xCoordinate",
//             "Corecrimedata.yCoordinate",
//             "Corecrimedata.updatedOn",
//             "Corecrimedata.latitude",
//             "Corecrimedata.longitude",
//             "Commareas.communityDesc"
//           ],
//           "y": [],
//           "fillMissingDates": true,
//           "joinDateRange": false,
//           "limit": 100
//         }
//               })}
//             />
//           );
//     }
// }

// export default RawDataTable