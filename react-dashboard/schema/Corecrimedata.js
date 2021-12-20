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
      sql: `id`,
      type: `string`,
      primaryKey: true
    },
    
    caseNumber: {
      sql: `case_number`,
      type: `string`
    },
    
    block: {
      sql: `block`,
      type: `string`
    },
    
    iucr: {
      sql: `iucr`,
      type: `string`
    },
    
    primaryType: {
      sql: `primary_type`,
      type: `string`
    },
    
    description: {
      sql: `description`,
      type: `string`
    },
    
    locationDescription: {
      sql: `location_description`,
      type: `string`
    },
    
    beat: {
      sql: `beat`,
      type: `string`
    },
    
    district: {
      sql: `district`,
      type: `string`
    },
    
    ward: {
      sql: `ward`,
      type: `string`
    },
    
    fbiCode: {
      sql: `fbi_code`,
      type: `string`
    },
    
    xCoordinate: {
      sql: `x_coordinate`,
      type: `string`
    },
    
    yCoordinate: {
      sql: `y_coordinate`,
      type: `string`
    },
    
    latitude: {
      sql: `latitude`,
      type: `string`
    },
    
    longitude: {
      sql: `longitude`,
      type: `string`
    },
    
    updatedOn: {
      sql: `updated_on`,
      type: `time`
    },
    
    date: {
      sql: `date`,
      type: `time`
    },
    
    year: {
      sql: `year`,
      type: `time`
    }
  },
  
  dataSource: `default`
});
