import React, {useRef} from 'react';
import Modal from './Modal';
import {LeafletMap} from "./LeafletMap";


const DayTripCard = ({day, route_length, points_of_interest, trekking}) => {

    const modalRef = useRef();
    const handleCardClick = () => {
        modalRef.current.open();
    };


    return (
        <>
            <div className="trip-card" onClick={handleCardClick}>
                <h2>Day {day}</h2>

                <div>
                    <h3>Route length</h3>
                    <p>🚗 <strong>{route_length}</strong> kilometers</p>
                </div>

                <div className="points-of-interest">
                    <h3>Explore the Highlights:</h3>
                    {points_of_interest.map((poi, index) => (
                        <div key={index}>
                            <h4>{index + 1}. {poi.name}</h4>
                            <p>📍 <strong>KM {poi.beginKM} - {poi.endKM}</strong></p>
                        </div>
                    ))}
                </div>

                <div className="trekking-info">
                    <h3>Trekking Details:</h3>
                    <p>🏞️ <strong>Terrain:</strong> {trekking.terrain}</p>
                    <p>🌄 <strong>Incline:</strong> {trekking.incline}</p>
                    <p>🌅 <strong>Views:</strong> {trekking.views}</p>
                </div>
            </div>
            <Modal ref={modalRef}>
                <div className="modal-map">
                <LeafletMap poi={points_of_interest}/>
                </div>
            </Modal>
        </>
    );
}

export default DayTripCard;