import React  from "react";
import Skeleton from "react-loading-skeleton";

function UserFollowSkeleton(props) {

    return(
       <>
           <div className="card">
               <div className="card-body">
                   <div className="media">
                       <Skeleton circle={false} height={50} width={80} />
                       <div className="media-body">
                           <h6 className="media-heading"> <Skeleton width={250} /></h6>
                           <Skeleton />
                       </div>
                   </div>

               </div>
           </div>

           <div className="card">
               <div className="card-body">
                   <div className="media">
                       <Skeleton circle={false} height={50} width={80} />
                       <div className="media-body">
                           <h6 className="media-heading"> <Skeleton width={250} /></h6>
                           <Skeleton />
                       </div>
                   </div>

               </div>
           </div>
       </>
    )
}
export default UserFollowSkeleton
