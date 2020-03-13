import React  from "react";
import Skeleton from "react-loading-skeleton";


function BlogannonceListSkeleton(props) {

    return(
       <>
           <div className="card">
               <div className="card-body">

                   <div className="card card-plain card-blog">
                       <div className="row">

                           <div className="col-md-8">

                            <span className="title">
                                <Skeleton width={250} /> <Skeleton width={10} /> <Skeleton width={60} />
                            </span>
                               <br/>
                               <Skeleton count={2}/>

                               <div className="card-footer">
                                   <div className="author">
                                       <Skeleton circle={true} height={35} width={35} />
                                   </div>

                                   <div className="stats stats-right">
                                       <Skeleton width={58} /> <Skeleton width={50} /> <Skeleton width={5} /> <Skeleton width={50} /> <Skeleton width={50} />
                                   </div>
                               </div>
                           </div>
                           <div className="col-md-4">

                               <div className="card-image">
                                   <Skeleton circle={false} height={123} width={210} />
                               </div>

                           </div>

                       </div>
                   </div>

               </div>
           </div>
           <div className="card">
               <div className="card-body">

                   <div className="card card-plain card-blog">
                       <div className="row">

                           <div className="col-md-8">

                            <span className="title">
                                <Skeleton width={250} /> <Skeleton width={10} /> <Skeleton width={60} />
                            </span>
                               <br/>
                               <Skeleton />
                               <Skeleton />

                               <div className="card-footer">
                                   <div className="author">
                                       <Skeleton circle={true} height={35} width={35} />
                                   </div>

                                   <div className="stats stats-right">
                                       <Skeleton width={58} /> <Skeleton width={50} /> <Skeleton width={5} /> <Skeleton width={50} /> <Skeleton width={50} />
                                   </div>
                               </div>
                           </div>
                           <div className="col-md-4">

                               <div className="card-image">
                                   <Skeleton circle={false} height={123} width={210} />
                               </div>

                           </div>

                       </div>
                   </div>

               </div>
           </div>
           <div className="card">
               <div className="card-body">

                   <div className="card card-plain card-blog">
                       <div className="row">

                           <div className="col-md-8">

                            <span className="title">
                                <Skeleton width={250} /> <Skeleton width={10} /> <Skeleton width={60} />
                            </span>
                               <br/>
                               <Skeleton count={2}/>

                               <div className="card-footer">
                                   <div className="author">
                                       <Skeleton circle={true} height={35} width={35} />
                                   </div>

                                   <div className="stats stats-right">
                                       <Skeleton width={58} /> <Skeleton width={50} /> <Skeleton width={5} /> <Skeleton width={50} /> <Skeleton width={50} />
                                   </div>
                               </div>
                           </div>
                           <div className="col-md-4">

                               <div className="card-image">
                                   <Skeleton circle={false} height={123} width={210} />
                               </div>

                           </div>

                       </div>
                   </div>

               </div>
           </div>
       </>
    )
}
export default BlogannonceListSkeleton
