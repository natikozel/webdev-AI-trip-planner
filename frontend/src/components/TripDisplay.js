import {useSelector} from "react-redux";
import {Circles} from "react-loader-spinner";
import DayTripCard from "./DayTripCard";
import TripImage from "./TripImage";
import {LeafletMap} from "./LeafletMap";
import React from "react";

const TripDisplay = () => {
    const trip = useSelector((state) => state.trips);
    const {status, error, days} = trip;

    let content;
    if (status === 'loading') {
        content = (
            <div className="flexed">
                <Circles
                    height={80}
                    width={80}
                    color={"#4ffddd"}
                    ariaLabel="circles-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>
        );
    }

    if (error) {
        content = (
            <div className="flexed error-message">
                <p style={{color: "red", maxWidth: "300px"}}>{error}</p>
            </div>
        );
    }

    console.log(days)

    return (
        <div className="trip-container">
            {content ? content :
                !!days.length &&
                <>
                    <div className="trip-display">
                        <TripImage/>
                        {days?.map((day, index) => <DayTripCard key={index} {...day} />)}
                    </div>
                    <div className="map-container">
                        <LeafletMap poi={days}/>
                    </div>
                </>}
        </div>
    );
};

export default TripDisplay;