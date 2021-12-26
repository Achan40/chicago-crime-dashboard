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
    communityArea: {
      sql: `community_area`,
      type: `number`
    },
    
    communityDesc: {
      sql: `community_desc`,
      type: `string`
    }
  },
  
  dataSource: `default`
});
