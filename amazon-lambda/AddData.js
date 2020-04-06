{
/*
Database attributes - name, alternate names, address {line 1, line2, city, state, country, zip}, phone numbers, geolocation, operating timings + days
 */    
}

exports.handler = function(event, ctx, callback)
{
    const AWS = require('aws-sdk');
    const DDB  = new AWS.DynamoDB({
    apiVersion: "2012-08-10",
    region: "ap-south-1"
});
    const uuids = require('uuid');
    const DDBGeo = require('dynamodb-geo');
    const config = new DDBGeo.GeoDataManagerConfiguration(DDB, 'CONVID19Geo');
    config.longitudeFirst = true;
    config.hashKeyLength = 6;
    const DDBGeoTableManager = new DDBGeo.GeoDataManager(config);
    
    DDBGeoTableManager.putPoint
    (
        {   
            RangeKeyValue:{
                S: uuids.v4()
            },

            GeoPoint: 
            {
                latitude : 73.8529991,
                longitude : 18.5297608
            },
            
            PutItemInput : 
            {
                Item : {
                    "name" : event.name ? { S: event.name } : {S: 'Sancheti'},
                    "type" : {S: "medicine"},
                    "alternatenames" : event.alternatenames ? { S: event.alternatenames } : {S: ','},
                    "phonenumbers" : event.phonenumbers ? { S: event.phonenumbers } : {S:'9650277790'},
                    "address_line1" : event.address_line1 ? { S: event.address_line1 } : {S: 'a-3/268'},
                    "address_line2" : event.address_line2 ? { S: event.address_line2 } : {S: 'paschim vihar'},
                    "address_city" : event.address_city ? { S: event.address_city } :{S: 'Delhi'},
                    "address_state" : event.address_state ? { S: event.address_state } : {S : "Delhi"},
                    "address_country" : event.address_country ? { S: event.address_country } :{S : "India"},
                    "address_zip" : event.address_zip ? { S: event.address_zip } : {S : "110063"},
                    "timings" : event.timings ? { S: event.timings } : {S : 'monday,0930-1330,15:30-22:00'}
                },
            }

        }
    ).promise()
    .then(function(){
        console.log('sancheti added');

        DDBGeoTableManager.putPoint
    (
        {   
            RangeKeyValue:{
                S: uuids.v4()
            },

            GeoPoint: 
            {
                latitude : 73.9347549,
                longitude : 18.5183906

            },
            
            PutItemInput : 
            {
                Item : {
                    "name" : event.name ? { S: event.name } : {S: 'LensKart'},
                    "type" : {S: "food"},
                    "alternatenames" : event.alternatenames ? { S: event.alternatenames } : {S: ','},
                    "phonenumbers" : event.phonenumbers ? { S: event.phonenumbers } : {S:'9650277790'},
                    "address_line1" : event.address_line1 ? { S: event.address_line1 } : {S: 'a-3/268'},
                    "address_line2" : event.address_line2 ? { S: event.address_line2 } : {S: 'paschim vihar'},
                    "address_city" : event.address_city ? { S: event.address_city } :{S: 'Delhi'},
                    "address_state" : event.address_state ? { S: event.address_state } : {S : "Delhi"},
                    "address_country" : event.address_country ? { S: event.address_country } :{S : "India"},
                    "address_zip" : event.address_zip ? { S: event.address_zip } : {S : "110063"},
                    "timings" : event.timings ? { S: event.timings } : {S : 'monday,0930-1330,15:30-22:00'}
                },
            }

        }
    ).promise()
    .then(function(){
        console.log('lenskart added');
        
        DDBGeoTableManager.putPoint
    (
        {   
            RangeKeyValue:{
                S: uuids.v4()
            },

            GeoPoint: 
            {
                latitude : 77.1068733,
                longitude : 28.6700763
            },
            
            PutItemInput : 
            {
                Item : {
                    "name" : event.name ? { S: event.name } : {S: 'Nazar'},
                    "type" : {S: "medicine"},
                    "alternatenames" : event.alternatenames ? { S: event.alternatenames } : {S: ','},
                    "phonenumbers" : event.phonenumbers ? { S: event.phonenumbers } : {S:'9650277790'},
                    "address_line1" : event.address_line1 ? { S: event.address_line1 } : {S: 'a-3/268'},
                    "address_line2" : event.address_line2 ? { S: event.address_line2 } : {S: 'paschim vihar'},
                    "address_city" : event.address_city ? { S: event.address_city } :{S: 'Delhi'},
                    "address_state" : event.address_state ? { S: event.address_state } : {S : "Delhi"},
                    "address_country" : event.address_country ? { S: event.address_country } :{S : "India"},
                    "address_zip" : event.address_zip ? { S: event.address_zip } : {S : "110063"},
                    "timings" : event.timings ? { S: event.timings } : {S : 'monday,0930-1330,15:30-22:00'}
                },
            }

        }
    ).promise()
    .then(function(){
        console.log('Nazar Added');
        console.log('Done');
        callback(null, "done");
    })
    })
        
    })
}