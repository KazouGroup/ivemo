import React  from "react";
import Skeleton from "react-loading-skeleton";
import moment from "moment";


function ActivitycityinteresseSkeleton(props) {

    return(
       <>
           <div className="col-md-4 mx-auto">
               <div className="card card-blog card-plain">
                   <div className="card-image">
                       <Skeleton circle={false} height={198} width="100%" />
                   </div>
                   <div className="card-body">
                       <div className="text-center">
                           <Skeleton height={20} width="100%" />
                       </div>
                       <p className="card-description">
                           <Skeleton count={2}/>
                       </p>

                   </div>
               </div>
           </div>

           <div className="col-md-4 mx-auto">
               <div className="card card-blog card-plain">
                   <div className="card-image">
                       <Skeleton circle={false} height={198} width="100%" />
                   </div>
                   <div className="card-body">
                       <div className="text-center">
                           <Skeleton height={20} width="100%" />
                       </div>
                       <p className="card-description">
                           <Skeleton count={2}/>
                       </p>

                   </div>
               </div>
           </div>

           <div className="col-md-4 mx-auto">
               <div className="card card-blog card-plain">
                   <div className="card-image">
                       <Skeleton circle={false} height={198} width="100%" />
                   </div>
                   <div className="card-body">
                       <div className="text-center">
                           <Skeleton height={20} width="100%" />
                       </div>
                       <p className="card-description">
                           <Skeleton count={2}/>
                       </p>

                   </div>
               </div>
           </div>
       </>
    )
}
export default ActivitycityinteresseSkeleton
