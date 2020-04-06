{
    //url = "https://c6uyraja33.execute-api.ap-south-1.amazonaws.com/prod?myLat=73.9347549&myLong=18.5183906&myRadiusInMeter=100000";
}

export default class DataBase
{
    
    static getLocations(latitude, longitude, radiusMetres = 1000, callback)
    {
        const url = "https://c6uyraja33.execute-api.ap-south-1.amazonaws.com/prod?";
        const fetchUrl = url + "myLat=" + latitude + "&myLong=" + longitude + "&myRadiusInMeter=" + radiusMetres;
        fetch(fetchUrl).then(
            function(response)
            {
                return response.json();
            }
        )
        .then(
            function(jsonData)
            {
                if(jsonData.statusCode == 200)
                {
                    callback(null,jsonData.body);
                }
                else
                {
                    console.error("fetch failed");
                }
            }
        )
        .catch(
            function(error)
            {
                console.error(error);
                callback(error,null);
            }
        );
    }
};