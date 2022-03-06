import React, { useEffect } from "react";
import {Map, Marker, NavigationControl, InfoWindow} from 'react-bmapgl';

const BMap = window.BMap;

function MapView() {
    useEffect(() => {
        getMap()
    }, [window.lng, window.lat])
    const getMap = () => {
        var map = new BMap.Map("container");
        var point = new BMap.Point(window.lng, window.lat);
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