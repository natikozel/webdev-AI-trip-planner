import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchImage} from "../store/slices/TripImageSlice";
import {ProgressBar} from "react-loader-spinner";

const TripImage = () => {
    const dispatch = useDispatch();
    const {imageId, prompt_for_image} = useSelector((state) => state.trips);
    const {imageUrl, status, wait_time} = useSelector((state) => state.image);

    useEffect(() => {
        if (imageId) {
            dispatch(fetchImage(imageId));
        }
    }, [dispatch, imageId]);

    if (status === 'loading')
        return (
            <>
                <h4>{`Approximate amount of seconds until image is ready: ${wait_time}`}</h4>
                <div className="trip-image">
                    <ProgressBar
                        visible={true}
                        height="80"
                        width="80"
                        color="#4fa94d"
                        ariaLabel="progress-bar-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            </>
        )
    console.log(wait_time)

    return (
        imageUrl && (
            <>
                <div className="trip-image">
                    <div className={"image-prompt"}>
                        <h1 style={{paddingBottom: "20px"}}>Image's generating prompt:</h1>
                        <p>{prompt_for_image}</p>
                    </div>
                    <img
                        src={imageUrl}
                        alt="trip"/>
                </div>
            </>
        )
    );
};

export default TripImage;