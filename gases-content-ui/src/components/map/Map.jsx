import React from 'react';
import {MapContainer, TileLayer, useMap, ZoomControl} from 'react-leaflet'
import './style.scss';
import "leaflet.idw/src/leaflet-idw";

const Map = () => {
    function MyComponent() {
        const map = useMap();

        let L = window.L;
        L.idwLayer(
            [[56.4884, 84.9480, 0.2],[56.3884, 84.5480, 0.5]],
            {opacity: 0.3, cellSize: 3, exp: 2, max: 1200}).addTo(map);

        return null
    }
    return (
        <MapContainer id='map' center={[56.4884, 84.9480]} zoom={13} scrollWheelZoom={true} zoomControl={false}>
            <TileLayer
                reuseTiles={true}
                preferCanvas={true}
                updateWhenZooming={false}
                detectRetina={true}
                minZoom={3}
                maxZoom={15}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MyComponent />

            <ZoomControl position="bottomleft" />
        </MapContainer>
    );
};

export default Map;
