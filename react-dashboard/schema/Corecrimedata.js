cube(`Corecrimedata`, {
  sql: `SELECT * FROM crimeinfo.corecrimedata`,
  
  preAggregations: {
    // Pre-Aggregations definitions go here
    // Learn more here: https://cube.dev/docs/caching/pre-aggregations/getting-started  
  },
  
  joins: {
    Commareas: {
      relationship: `belongsTo`,
      sql: `${Corecrimedata}.community_area = ${Commareas}.community_area`
    }
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

    date: {
      sql: `date`,
      type: `time`
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

    arrest: {
      sql: `arrest`,
      type: `boolean`
    },

    domestic: {
      sql: `domestic`,
      type: `boolean`
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

    communityArea: {
      sql: `community_area`,
      type: `number`
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

    year: {
      sql: `year`,
      type: `number`
    },
        
    updatedOn: {
      sql: `updated_on`,
      type: `time`
    },
    
    latitude: {
      sql: `latitude`,
      type: `string`
    },
    
    longitude: {
      sql: `longitude`,
      type: `string`
    }
  },
  
  dataSource: `default`
});
