import React, {useRef} from 'react';
import Modal from './Modal';
import {LeafletMap} from "./LeafletMap";


const DayTripCard = ({day, route_length, coordinates_arr, points_of_interest, trekking}) => {

    const modalRef = useRef();
    const handleCardClick = () => {
        modalRef.current.open();
    };


    return (
        <>
            <div className="trip-card" onClick={handleCardClick}>
                <h2>Day {day}</h2>
                <p><strong>Route Length:</strong> {route_length} km</p>
                <div className="points-of-interest">
                    <h3>Points of Interest:</h3>
                    <ul>
                        {points_of_interest.map((poi, index) => (
                            <li key={index}>
                                <strong>{poi.name}</strong> (KM {poi.beginKM} - {poi.endKM})
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="trekking-info">
                    <h3>Trekking Information:</h3>
                    <p><strong>Terrain:</strong> {trekking.terrain}</p>
                    <p><strong>Incline:</strong> {trekking.incline}</p>
                    <p><strong>Views:</strong> {trekking.views}</p>
                </div>
            </div>
            <Modal ref={modalRef}>
                <div className="modal-map">
                    <LeafletMap poi={points_of_interest} coordinates={coordinates_arr}/>
                </div>
            </Modal>
        </>
    );
}

export default DayTripCard;