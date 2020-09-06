import React from "react";
import Skeleton from "react-loading-skeleton";
import { Card,CardBody,Row } from "reactstrap";


function AnnoncesListOnSkeleton(props) {

    return(

     <>
         <Card>
             <CardBody>
                 <div className="card card-plain card-blog">
                     <Row>
                         <div className="col-md-5">

                             <Skeleton circle={false} height={179} width="100%" />

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
                                 <h5 className="text-success">
                                     <Skeleton width={50} /> <Skeleton width={60} />
                                 </h5>
                             </div>

                             <h6 className="card-title">
                                 <Skeleton count={1}/>
                             </h6>

                             <Skeleton count={2}/>

                             <Skeleton circle={false} height={40} width={80} />

                         </div>
                     </Row>
                 </div>

             </CardBody>
         </Card>


     </>
    )
}
export default AnnoncesListOnSkeleton;
