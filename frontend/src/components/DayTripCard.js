import React, {useRef} from 'react';
import Modal from './Modal';


const DayTripCard = ({day, route_length, points_of_interest, trekking}) => {

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
                    {/* Leaflet map will be constructed here */}
                    <p>Leaflet map goes here</p>
                </div>
            </Modal>
        </>
    );
}

export default DayTripCard;