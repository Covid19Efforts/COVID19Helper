exports.handler = function(event, ctx, callback)
{
    const AWS = require('aws-sdk');
    const DDB  = new AWS.DynamoDB({
    apiVersion: "2012-08-10",
    region: "ap-south-1"
});

    const DDBGeo = require('dynamodb-geo');
    const config = new DDBGeo.GeoDataManagerConfiguration(DDB, 'CONVID19Geo');
    config.longitudeFirst = true;
    config.hashKeyLength = 6;
    const DDBGeoTableManager = new DDBGeo.GeoDataManager(config);
    const createTableInput = DDBGeo.GeoTableUtil.getCreateTableRequest(config);
    createTableInput.ProvisionedThroughput.ReadCapacityUnits = 2;
    console.log('Creating table with schema:');
    console.dir(createTableInput, {depth:null});

    DDB.createTable(createTableInput).promise()
    .then(
        function() {return DDB.waitFor('tableExists', {TableName: config.tableName}).promise() })
    .then(
        function() {console.log('Table created and ready'); return callback(null, "done");});
}
