import { useEffect } from "react";
import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";

const createRoutineMachineLayer = ({ coordinates }) => {
    console.log(coordinates);
    const instance = L.Routing.control({
        waypoints: coordinates.map((waypoint) => L.latLng(waypoint)),
        lineOptions: {
            styles: [{ color: "#ff0000", weight: 4 }]
        },
        show: false,
        addWaypoints: false,
        routeWhileDragging: true,
        draggableWaypoints: true,
        fitSelectedRoutes: true,
        showAlternatives: false
    });

    return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

const RoutingMachineWrapper = (props) => {
    useEffect(() => {
        const element = document.querySelector('.leaflet-routing-alternatives-container');
        if (element) {
            element.remove();
        }
    }, []);

    return <RoutingMachine {...props} />;
};

export default RoutingMachineWrapper;