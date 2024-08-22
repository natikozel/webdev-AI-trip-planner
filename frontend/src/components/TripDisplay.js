import {useSelector} from "react-redux";
import {Circles} from "react-loader-spinner";
import DayTripCard from "./DayTripCard";

const TripDisplay = () => {

    const trip = useSelector((state) => state.trips);
    const {status, error, days} = trip
    let content
    if (status === 'loading') {
        content = (
            <div className="flexed">
                <Circles
                    height={80}
                    width={80}
                    color={"#4ffddd"}
                    ariaLabel="circles-loading"
                    wrappedStyle={{}}
                    wrapperClass=""
                    visible="true"
                >
                </Circles>
            </div>
        )
    }

    if (error)
        content =
            <div className="flexed error-message">
                <p style={{color: "red", maxWidth: "300px"}}>{error}</p>
            </div>

    console.log(days)
    return (
        <div className="trip-display">
            {content ? content :
                days.map((day, index) => (
                    <DayTripCard key={index} {...day}/>
                ))}
        </div>
    )
}
export default TripDisplay