import {MapContainer, TileLayer, useMap} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import RoutingMachineWrapper from "./RoutingMachine";

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

export const LeafletMap = ({poi}) => {

    let allPoi = poi;
    if (poi[0]?.day)
        allPoi = poi.flatMap(day => day.points_of_interest);
    const initialPosition = allPoi[0].coordinates_arr;

    return (
        <MapContainer center={initialPosition} zoom={13} scrollWheelZoom className="leaflet-container">
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <RoutingMachineWrapper allPoi={allPoi}/>
        </MapContainer>

    );
};