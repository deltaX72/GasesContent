import React, {useState} from 'react';
import {MapContainer, TileLayer, useMap, useMapEvents, ZoomControl} from 'react-leaflet'
import './style.scss';
import "leaflet.idw/src/leaflet-idw";
import axios from "axios";

let idw;
const Map = ({updateCoords}) => {
    const [mapXY, setMapXY] = useState([56.4884, 84.9480]);
    // async function fetchData(){
    //     const response = await axios.get('https://jsonplaceholder.typicode.com/comments');
    //     console.log(response.data);
    // }
    function MyComponent() {
        const map = useMap();
        let L = window.L;

        // async function fetchData() {
        //     const response = await axios.get('');
        // }
        const mapAction = useMapEvents(
            {
                click: (ev) => {
                    console.log('=======================')
                    console.log(`Широта: ${ev.latlng.lat}`);
                    updateCoords([ev.latlng.lat, ev.latlng.lng]);
                    console.log(`Долгота: ${ev.latlng.lng}`);
                },
            }
        );
        //
        // if (idw !== undefined){
        //     idw.remove();
        // }
        // idw = L.idwLayer(
        //     [[56.4884, 84.9480, 0.2], [56.3884, 84.5480, 0.5]],
        //     {opacity: 0.3, cellSize: 3, exp: 2, max: 1200}).addTo(map);

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
