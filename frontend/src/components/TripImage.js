import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchImage} from "../store/slices/TripImageSlice";

const TripImage = () => {
    const dispatch = useDispatch();
    const {imageUrl, imageId} = useSelector((state) => state.image);
    console.log(imageUrl, imageId)
    useEffect(() => {
        if (imageId) {
            dispatch(fetchImage(imageId));
        }
    }, [dispatch, imageId]);

    return (
        // <>
        //     {imageUrl && (
        <div className="trip-image">
            <img
                src={"https://a223539ccf6caa2d76459c9727d276e6.r2.cloudflarestorage.com/stable-horde/63827707-8083-4eaf-acdd-8d833ca5f841.webp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=246782cc9101762ba914350d8058cd83%2F20240824%2Fauto%2Fs3%2Faws4_request&X-Amz-Date=20240824T220749Z&X-Amz-Expires=1800&X-Amz-SignedHeaders=host&X-Amz-Signature=963f02c7a5f0622cf0ce3b3fb22e0d781dfb2fae4154438e01290347f3bc28cc"}
                alt="trip"/>
        </div>
        // )}
        // </>
    );
};

export default TripImage;