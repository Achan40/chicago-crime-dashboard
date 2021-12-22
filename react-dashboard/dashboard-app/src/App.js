import cubejs from "@cubejs-client/core";
import { QueryRenderer } from "@cubejs-client/react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

const cubejsApi = cubejs(
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDAxNDYyODMsImV4cCI6MTY0MDIzMjY4M30.zsUoQ48_CIY8os1KvfWYcaBBkS_YzxZ3RsgH5YV5GIc',
  { apiUrl: 'http://localhost:4000/cubejs-api/v1' }
);

const App = () => {
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
        "filters": [],
        "dimensions": [
          "Corecrimedata.year"
        ],
        "limit": 5000
      }}
      cubejsApi={cubejsApi}
      render={({ resultSet }) => {
        if (!resultSet) {
          return "Loading Analytics...";
        }
        return (
          <BarChart width={600} height={300} data={resultSet.rawData()}>
            <XAxis dataKey="Corecrimedata.year" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <Bar barSize={30} dataKey="Corecrimedata.count" stroke="#8884d8" />
          </BarChart>
        );
      }}
    />
  );
};

export default App;
