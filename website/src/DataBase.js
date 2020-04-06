var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
    //url = "https://c6uyraja33.execute-api.ap-south-1.amazonaws.com/prod?myLat=73.9347549&myLong=18.5183906&myRadiusInMeter=100000";
}

var DataBase = function () {
    function DataBase() {
        _classCallCheck(this, DataBase);
    }

    _createClass(DataBase, null, [{
        key: "getLocations",
        value: function getLocations(latitude, longitude) {
            var radiusMetres = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
            var callback = arguments[3];

            var url = "https://c6uyraja33.execute-api.ap-south-1.amazonaws.com/prod?";
            var fetchUrl = "https://c6uyraja33.execute-api.ap-south-1.amazonaws.com/prod?myLat=73.9347549&myLong=18.5183906&myRadiusInMeter=100000";
            //const fetchUrl = url + "myLat=" + latitude + "&myLong=" + longitude + "&myRadiusInMeter=" + radiusMetres;
            fetch(fetchUrl).then(function (response) {
                return response.json();
            }).then(function (jsonData) {
                if (jsonData.statusCode == 200) {
                    callback(null, jsonData.body);
                } else {
                    console.error("fetch failed");
                }
            }).catch(function (error) {
                console.error(error);
                callback(error, null);
            });
        }
    }]);

    return DataBase;
}();

export default DataBase;
;