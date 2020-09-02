import React  from "react";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import ReadMoreAndLess from "react-read-more-less";
import {Button} from "reactstrap";


function UploadimageListSkeleton(props) {

    return(

        <>
            <Skeleton circle={false} height={400} width="100%" />
        </>
    )
}
export default UploadimageListSkeleton
