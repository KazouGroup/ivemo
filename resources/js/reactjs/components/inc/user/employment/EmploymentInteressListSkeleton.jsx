import React  from "react";
import Skeleton from "react-loading-skeleton";


function EmploymentInteressListSkeleton(props) {

    return(
       <>
           <div className="col-md-6 mx-auto">
               <div className="card">
                   <div className="card-body">

                       <div className="card card-plain card-blog">
                           <div className="row">

                               <div className="col-md-8">

                            <span className="title">
                                <Skeleton width={250} />   <Skeleton width={80} /> <Skeleton width={60} />
                            </span>
                                   <br/>
                                   <Skeleton count={2}/>

                                   <div className="card-footer">
                                       <Skeleton circle={false} height={40} width={80} />
                                   </div>
                               </div>
                               <div className="col-md-4">

                                   <div className="card-image">
                                       <Skeleton circle={false} height={100} width="100%" />
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

                               <div className="col-md-8">

                            <span className="title">
                                <Skeleton width={250} />   <Skeleton width={80} /> <Skeleton width={60} />
                            </span>
                                   <br/>
                                   <Skeleton count={2}/>

                                   <div className="card-footer">
                                       <Skeleton circle={false} height={40} width={80} />
                                   </div>
                               </div>
                               <div className="col-md-4">

                                   <div className="card-image">
                                       <Skeleton circle={false} height={100} width="100%" />
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
export default EmploymentInteressListSkeleton
