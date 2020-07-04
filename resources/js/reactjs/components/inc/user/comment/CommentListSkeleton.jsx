import React  from "react";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import ReadMoreAndLess from "react-read-more-less";
import {Button} from "reactstrap";


function CommentListSkeleton(props) {

    return(

        <>
            <div className="author">
                <div className="media-body">

                    <Skeleton circle={true} height={40} width={40} />

                    <Skeleton width={250} />
                    <Skeleton count={2}/>
                </div>
            </div>
        </>
    )
}
export default CommentListSkeleton
