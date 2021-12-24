cube(`Commareas`, {
  sql: `SELECT * FROM crimeinfo.commareas`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: []
    }
  },
  
  dimensions: {
    community: {
      sql: `${CUBE}.\`COMMUNITY\``,
      type: `string`
    }
  },
  
  dataSource: `default`
});
