cube(`Corecrimedata`, {
  sql: `SELECT * FROM crimeinfo.corecrimedata`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    
  },
  
  measures: {
    count: {
      type: `count`,
      drillMembers: [id, updatedOn, date]
    }
  },
  
  dimensions: {
    id: {
      sql: `${CUBE}.\`ID\``,
      type: `string`,
      primaryKey: true
    },
    
    caseNumber: {
      sql: `${CUBE}.\`Case Number\``,
      type: `string`
    },
    
    block: {
      sql: `${CUBE}.\`Block\``,
      type: `string`
    },
    
    iucr: {
      sql: `${CUBE}.\`IUCR\``,
      type: `string`
    },
    
    primaryType: {
      sql: `${CUBE}.\`Primary Type\``,
      type: `string`
    },
    
    description: {
      sql: `${CUBE}.\`Description\``,
      type: `string`
    },
    
    locationDescription: {
      sql: `${CUBE}.\`Location Description\``,
      type: `string`
    },
    
    arrest: {
      sql: `${CUBE}.\`Arrest\``,
      type: `string`
    },
    
    domestic: {
      sql: `${CUBE}.\`Domestic\``,
      type: `string`
    },
    
    fbiCode: {
      sql: `${CUBE}.\`FBI Code\``,
      type: `string`
    },
    
    updatedOn: {
      sql: `${CUBE}.\`Updated On\``,
      type: `time`
    },
    
    date: {
      sql: `${CUBE}.\`Date\``,
      type: `time`
    }
  },
  
  dataSource: `default`
});
