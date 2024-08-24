import {MapContainer, Marker, Popup, TileLayer, useMap} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import RoutingMachine from "./RoutingMachine";
import RoutingMachineWrapper from "./RoutingMachine";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

export const LeafletMap = ({poi, coordinates}) => {
    const initialPosition = coordinates[0];


    return (
        <MapContainer center={initialPosition} zoom={13} scrollWheelZoom className="leaflet-container">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {coordinates.map((position, idx) => (
                <Marker key={idx} position={position}/>
            ))}
            <RoutingMachineWrapper coordinates={coordinates}/>
        </MapContainer>
    );
};