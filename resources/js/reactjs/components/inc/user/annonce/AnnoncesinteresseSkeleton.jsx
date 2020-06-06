import React from "react";
import Skeleton from "react-loading-skeleton";


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
                                 <div className="text-left pull-left">
                                     <Skeleton width={100} />
                                 </div>
                                 <div className="text-right ml-auto">
                                     <h5 className="text-success"> <Skeleton width={100} /></h5>
                                 </div>

                                 <div className="text-left pull-left">
                                     <Skeleton width={100} />
                                 </div>
                                 <div className="text-right ml-auto">
                                     <Skeleton width={60} /> <Skeleton width={60} />
                                 </div>

                                 <h6 className="card-title">
                                     <Skeleton count={2}/>
                                 </h6>

                                 <Skeleton circle={false} height={20} width={50} />

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
                                 <div className="text-left pull-left">
                                     <Skeleton width={100} />
                                 </div>
                                 <div className="text-right ml-auto">
                                     <h5 className="text-success"> <Skeleton width={100} /></h5>
                                 </div>

                                 <div className="text-left pull-left">
                                     <Skeleton width={100} />
                                 </div>
                                 <div className="text-right ml-auto">
                                     <Skeleton width={60} /> <Skeleton width={60} />
                                 </div>

                                 <h6 className="card-title">
                                     <Skeleton count={2}/>
                                 </h6>

                                 <Skeleton circle={false} height={20} width={50} />

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
