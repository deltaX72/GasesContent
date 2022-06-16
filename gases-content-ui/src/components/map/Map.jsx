import React, {useState} from 'react';
import {MapContainer, TileLayer, useMap, useMapEvents, ZoomControl} from 'react-leaflet'
import './style.scss';
import "leaflet.idw/src/leaflet-idw";
import axios from "axios";

let idw;
const Map = ({updateCoords}) => {
    const [mapXY, setMapXY] = useState([56.4884, 84.9480]);

    function MyComponent() {
        const map = useMap();
        let L = window.L;

        const mapAction = useMapEvents(
            {
                click: (ev) => {
                    console.log('=======================')
                    console.log(`Широта: ${ev.latlng.lat}`);
                    updateCoords([ev.latlng.lat, ev.latlng.lng]);
                    console.log(`Долгота: ${ev.latlng.lng}`);
                    console.log(`Ширина и высота: ${map.getSize()}`);
                    console.log(`Zoom: ${map.getZoom()}`);
                },
                zoom: (ev) => {
                    console.log('ZOOOOOOOOM!!!!!!')
                }
            }
        );

        // if (idw !== undefined){
        //     idw.remove();
        // }
        // idw = L.idwLayer(
        //     [[56.4884, 84.9480, 1200], [56.3884, 84.5480, 100]],
        //     {opacity: 0.2, cellSize: 3, exp: 2, max: 1200, gradient: {
        //             0.0: 'blue',
        //             0.25: 'cyan',
        //             0.5: 'green',
        //             0.75: 'yellow',
        //             1: 'red'
        //         }}
        // ).addTo(map);

        return null
    }

    return (
        <MapContainer id='map' center={mapXY} zoom={13} scrollWheelZoom={true} zoomControl={false}>
            <TileLayer
                reuseTiles={true}
                preferCanvas={true}
                updateWhenZooming={false}
                detectRetina={true}
                minZoom={3}
                maxZoom={19}
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MyComponent />

            <ZoomControl position="bottomleft" />
        </MapContainer>
    );
};

export default Map;
