export default class Util
{
    static GetGeoDistance(point1, point2)
    {
        let dist = 0.0;
        if(point1 && point1.length == 2 && point2 && point2.length == 2)
        {
            dist = Math.sqrt(Math.pow(point1[0] - point2[0],2) + Math.pow(point1[1] - point2[1],2))
        }
        else
        {
            console.log("GetGeoDistance() - improper format ", point1, point2);
        }
        console.log(point1, point2, dist);
        return dist;
    }
}