import {useSelector} from "react-redux";
import {Circles} from "react-loader-spinner";
import DayTripCard from "./DayTripCard";
import TripImage from "./TripImage";

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
    return (
        <div className="trip-container">
            <div className="trip-display">
                {content ? content : (
                    <>
                        <TripImage/>
                        {days?.map((day, index) => <DayTripCard key={index} {...day} />)}
                    </>
                )}
            </div>
        </div>
    );
};

export default TripDisplay;