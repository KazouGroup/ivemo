import React from "react";
import Skeleton from "react-loading-skeleton";
import {Link, NavLink} from "react-router-dom";
import moment from "moment";
import {Button, UncontrolledTooltip} from "reactstrap";


function AnnoncesinteresseSkeleton(props) {

    return(

     <>

         <div className="col-md-6 mx-auto">
             <div className="card">
                 <div className="card-body">
                     <div className="card card-plain card-blog">
                         <div className="row">
                             <div className="col-md-5">
                                 <Skeleton circle={false} height={127} width={190} />

                                 <div className="text-center">
                                     <Skeleton width={35} />
                                 </div>
                             </div>
                             <div className="col-md-7">
                                 <div className="card-header d-flex align-items-center">
                                      <Skeleton width={60} />
                                 </div>
                                 <div className="row">

                                 </div>
                                 <h6 className="card-title">
                                     <Skeleton count={2}/>
                                 </h6>

                                 <div className="card-header d-flex align-items-center">
                                     <div className="d-flex align-items-center">

                                         <Skeleton circle={false} height={20} width={50} />

                                         <div className="mx-3">
                                             <small className="d-block text-muted"> <Skeleton width={35} /></small>
                                         </div>

                                     </div>

                                 </div>

                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>

         <div className="col-md-6 mx-auto">
             <div className="card">
                 <div className="card-body">
                     <div className="card card-plain card-blog">
                         <div className="row">
                             <div className="col-md-5">
                                 <Skeleton circle={false} height={127} width={190} />

                                 <div className="text-center">
                                     <Skeleton width={35} />
                                 </div>
                             </div>
                             <div className="col-md-7">
                                 <div className="card-header d-flex align-items-center">
                                      <Skeleton width={60} />
                                 </div>
                                 <div className="row">

                                 </div>
                                 <h6 className="card-title">
                                     <Skeleton count={2}/>
                                 </h6>

                                 <div className="card-header d-flex align-items-center">
                                     <div className="d-flex align-items-center">

                                         <Skeleton circle={false} height={20} width={50} />

                                         <div className="mx-3">
                                             <small className="d-block text-muted"> <Skeleton width={35} /></small>
                                         </div>

                                     </div>

                                 </div>

                             </div>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
     </>
    )
}
export default AnnoncesinteresseSkeleton;
