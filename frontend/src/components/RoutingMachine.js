// import { useEffect } from "react";
// import L from "leaflet";
// import { createControlComponent } from "@react-leaflet/core";
// import "leaflet-routing-machine";
//
// const createRoutineMachineLayer = ({ coordinates }) => {
//     const instance = L.Routing.control({
//         waypoints: coordinates.map((waypoint) => L.latLng(waypoint)),
//         lineOptions: {
//             styles: [{ color: "#ff0000", weight: 4 }]
//         },
//         show: false,
//         addWaypoints: false,
//         routeWhileDragging: true,
//         draggableWaypoints: true,
//         fitSelectedRoutes: true,
//         showAlternatives: false
//     });
//
//
//     return instance;
// };
//
// const RoutingMachine = createControlComponent(createRoutineMachineLayer);
//
// const RoutingMachineWrapper = (props) => {
//     // Hide route details
//     // useEffect(() => {
//     //     const element = document.querySelector('.leaflet-routing-alternatives-container');
//     //     if (element) {
//     //         element.remove();
//     //     }
//     // }, []);
//
//     return <RoutingMachine {...props} />;
// };
//
// export default RoutingMachineWrapper;

import {useEffect} from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import {useMap} from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png"
});

export default function RoutingMachineWrapper({allPoi}) {
    const map = useMap();
    const coordinates = allPoi.map(point => point.coordinates_arr)

    useEffect(() => {
        if (!map) return;


        L.Routing.control({
            waypoints: coordinates.map((waypoint) => L.latLng(waypoint)),
            createMarker: (waypointIndex, waypoint) => {
                if (allPoi[waypointIndex])
                    return L.marker(waypoint.latLng).bindPopup(`${allPoi[waypointIndex].name + '\n'} ${allPoi[waypointIndex].coordinates_arr}`).addTo(map)
                else
                    return L.marker(waypoint.latLng).addTo(map)
            },
            routeWhileDragging: true,
        }).addTo(map);

    }, [map]);

    return null;
}
