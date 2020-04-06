{
/*
Database attributes - name, alternate names, address {line 1, line2, city, state, country, zip}, phone numbers, geolocation, operating timings + days
 */    
}

exports.handler = function(event, ctx, callback)
{
    console.log("event received", event);
    console.dir(event, {depth:null});

    let errorCode = 502;

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
    
    let radiusMetre = event.myRadiusInMeter ? event.myRadiusInMeter : 5000;
    if(radiusMetre > 20000)
    {
        radiusMetre = 20000;
    }

    if(!event.myLat || !event.myLong)
    {
        console.log("parameter missing");
        callback({statusCode : 400, body:"parameter missing"}, null);
    }

    DDBGeoTableManager.queryRadius({
        RadiusInMeter : radiusMetre,
        CenterPoint : {
            latitude : event.myLat,
            longitude : event.myLong
        }
    })
    .then((locations) => {console.log(locations);
        errorCode = 200;
        
        const response = {
            statusCode : errorCode,
            header : {
                "Content-Type" : "application/json"
            },
            body    : locations
        };
        console.log("success");
        callback(null, response);
    });
}