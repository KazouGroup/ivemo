import React  from "react";
import Skeleton from "react-loading-skeleton";
import moment from "moment";


function BlogannonceinteresseSkeleton(props) {

    return(
       <>
           <div className="col-md-4 mx-auto">
               <div className="card card-blog card-plain">
                   <div className="card-image">
                       <Skeleton circle={false} height={198} width={336} />
                   </div>
                   <div className="card-body">
                       <div className="text-center">
                           <Skeleton height={20} width={60} />
                           <h6 className="card-title">
                               <Skeleton width={200} count={2}/>
                           </h6>
                       </div>
                       <p className="card-description">
                           <Skeleton count={3}/>
                       </p>

                   </div>
               </div>
           </div>

           <div className="col-md-4 mx-auto">
               <div className="card card-blog card-plain">
                   <div className="card-image">
                       <Skeleton circle={false} height={198} width={336} />
                   </div>
                   <div className="card-body">
                       <div className="text-center">
                           <Skeleton height={20} width={60} />
                           <h6 className="card-title">
                               <Skeleton width={200} count={2}/>
                           </h6>
                       </div>
                       <p className="card-description">
                           <Skeleton count={3}/>
                       </p>

                   </div>
               </div>
           </div>

           <div className="col-md-4 mx-auto">
               <div className="card card-blog card-plain">
                   <div className="card-image">
                       <Skeleton circle={false} height={198} width={336} />
                   </div>
                   <div className="card-body">
                       <div className="text-center">
                           <Skeleton height={20} width={60} />
                           <h6 className="card-title">
                               <Skeleton width={200} count={2}/>
                           </h6>
                       </div>
                       <p className="card-description">
                           <Skeleton count={3}/>
                       </p>

                   </div>
               </div>
           </div>
       </>
    )
}
export default BlogannonceinteresseSkeleton
