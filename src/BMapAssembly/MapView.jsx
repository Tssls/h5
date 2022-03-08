import React, { useEffect } from "react";

const BMap = window.BMap;

function MapView(props) {
    useEffect(() => {
        getMap()
    }, [props])
    const getMap = () => {
        var map = new BMap.Map("container");
        var point = new BMap.Point(props.lng, props.lat);
        var mk = new BMap.Marker(point);
        map.addOverlay(mk)
        map.centerAndZoom(point, 17);
        map.enableScrollWheelZoom(true);
    };
    return (
        <div style={{ width: "100%", height: "100%" }}>
            <div id="container" style={{ width: "100%", height: "100%" }}></div>
        </div>
    );
}

export default MapView;