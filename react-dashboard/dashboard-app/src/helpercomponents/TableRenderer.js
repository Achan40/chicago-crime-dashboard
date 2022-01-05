import { Table } from "antd";
import { useDeepCompareMemo } from 'use-deep-compare';

const formatTableData = (columns, data) => {
    function flatten(columns = []) {
      // change column names first
      for (let i = 0; i < columns.length; i++) {
        if (columns[i].key === 'Corecrimedata.count') {
          columns[i].title = 'Number of Crimes'
        }
        if (columns[i].key === 'Commareas.communityDesc') {
          columns[i].title = 'Community Area'
        }
      }
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

      // Adding commas to numbers in the table
      let tmp = parseInt(value)
      if (isNaN(tmp)) {
        return value.toString();
      } else {
        return tmp.toLocaleString();
      }
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
    <Table pagination={true} columns={tableColumns} dataSource={dataSource} />
    );
};

export default TableRenderer