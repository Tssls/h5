export function parseQueryString(url) {
    let queryString = decodeURIComponent(url ? url.split('?')[1] : window.location.href);
    let obj = {};
    if (queryString.indexOf("?") === -1) {
        return obj;
    }
    let keyvalue = [];
    let key = "",
        value = "";
    let paraString = queryString.substring(queryString.indexOf("?") + 1, queryString.length).split("&");
    for (let i in paraString) {
        keyvalue = paraString[i].split("=");
        key = keyvalue[0];
        value = keyvalue[1];
        obj[key] = value;
    }
    return obj;
}

export function bd_decrypt(bd_lat, bd_lon) {
    var X_PI = Math.PI * 3000.0 / 180.0;
    var x = bd_lon - 0.0065;
    var y = bd_lat - 0.006;
    var z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI);
    var theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI);
    var gg_lng = z * Math.cos(theta);
    var gg_lat = z * Math.sin(theta);
    return {bd_lat: gg_lat, bd_lon: gg_lng}
}

export function bMapTransqqMap(lng, lat) {
    let x_pi = (3.14159265358979324 * 3000.0) / 180.0;
    let x = lng - 0.0065;
    let y = lat - 0.006;
    let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
    let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
    let lngs = z * Math.cos(theta);
    let lats = z * Math.sin(theta);
    return {
      bd_lat: lngs,
      bd_lon: lats
    };
}


function Rad(d) {
    return d * Math.PI / 180.0;//经纬度转换成三角函数中度分表形式。
}


export function GetDistance(lat1, lng1, lat2, lng2) {//传入两个点的经纬度
    var radLat1 = Rad(lat1);
    var radLat2 = Rad(lat2);
    var a = radLat1 - radLat2;
    var b = Rad(lng1) - Rad(lng2);
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;// EARTH_RADIUS;
    s = Math.round(s * 10000) / 1; //输出为公里
    // s = s.toFixed(2);//保留小数点后两位小数
    return s;
}

