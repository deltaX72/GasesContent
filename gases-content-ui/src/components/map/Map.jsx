import React from 'react';
import {MapContainer, TileLayer, ZoomControl} from 'react-leaflet'
import './style.scss';

const Map = () => {
    return (
        <MapContainer id='map' center={[56.4884, 84.9480]} zoom={13} scrollWheelZoom={false} zoomControl={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <ZoomControl position="bottomleft" />
        </MapContainer>
    );
};

export default Map;
