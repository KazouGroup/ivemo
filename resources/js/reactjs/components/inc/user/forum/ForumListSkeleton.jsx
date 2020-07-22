import React  from "react";
import Skeleton from "react-loading-skeleton";
import {Link, NavLink} from "react-router-dom";
import moment from "moment";
import {Button} from "reactstrap";


function ForumListSkeleton(props) {

    return(
       <>

           <div className="card">
               <div className="card-body">
                   <div className="card-header d-flex align-items-center">
                       <div className="d-flex align-items-center">
                           <Skeleton circle={true} height={35} width={35} />  <Skeleton width={80} />
                       </div>
                       <div className="text-right ml-auto">
                           <Skeleton width={80} />
                       </div>
                   </div>

                   <>
                       <h5 className="card-title">
                           <Skeleton />
                       </h5>

                   </>

                   <Skeleton count={2}/>

                   <br/>
                   <div className="card-header d-flex align-items-center">
                       <div className="d-flex align-items-center">
                           <Skeleton width={80} />
                       </div>

                       <div className="text-right ml-auto">
                           <Skeleton width={80} />
                       </div>
                   </div>



               </div>
           </div>

           <div className="card">
               <div className="card-body">
                   <div className="card-header d-flex align-items-center">
                       <div className="d-flex align-items-center">
                           <Skeleton circle={true} height={35} width={35} />  <Skeleton width={80} />
                       </div>
                       <div className="text-right ml-auto">
                           <Skeleton width={80} />
                       </div>
                   </div>

                   <>
                       <h5 className="card-title">
                           <Skeleton />
                       </h5>

                   </>

                   <Skeleton count={2}/>

                   <br/>
                   <div className="card-header d-flex align-items-center">
                       <div className="d-flex align-items-center">
                           <Skeleton width={80} />
                       </div>

                       <div className="text-right ml-auto">
                           <Skeleton width={80} />
                       </div>
                   </div>



               </div>
           </div>

           <div className="card">
               <div className="card-body">
                   <div className="card-header d-flex align-items-center">
                       <div className="d-flex align-items-center">
                           <Skeleton circle={true} height={35} width={35} />  <Skeleton width={80} />

                       </div>
                       <div className="text-right ml-auto">
                           <Skeleton width={80} />
                       </div>
                   </div>

                   <>
                       <h5 className="card-title">
                           <Skeleton />
                       </h5>

                   </>

                   <Skeleton count={2}/>

                   <br/>
                   <div className="card-header d-flex align-items-center">
                       <div className="d-flex align-items-center">
                           <Skeleton width={80} />
                       </div>

                       <div className="text-right ml-auto">
                           <Skeleton width={80} />
                       </div>
                   </div>



               </div>
           </div>

       </>
    )
}
export default ForumListSkeleton
