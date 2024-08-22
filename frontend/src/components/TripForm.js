import {useDispatch, useSelector} from "react-redux";
import CountryDropdown from './CountryDropdown';
import Sidebar from './Sidebar';
import FormRow from './FormRow';
import TripTypeDropdown from "./TripTypeDropdown"
import {fetchTrips} from "../store/slices/TripSlice";

const TripForm = () => {

    const dispatch = useDispatch();
    const tripDetails = useSelector(state => state.trips.tripDetails)

    const handleFormSubmit = (e) => {
        e.preventDefault()
        console.log(tripDetails)
        dispatch(fetchTrips(tripDetails))
    }

    return (
        <Sidebar>
            <form className="form" onSubmit={handleFormSubmit}>
                <FormRow label="Country">
                    <CountryDropdown/>
                </FormRow>
                <FormRow label="Trip Type">
                    <TripTypeDropdown/>
                </FormRow>
                <button type="submit" className="form__btn">Submit</button>
            </form>
        </Sidebar>
    )
}

export default TripForm