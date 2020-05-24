import React from "react";
import Skeleton from "react-loading-skeleton";
import { Card,CardBody,Row } from "reactstrap";
import {NavLink} from "react-router-dom";


function AgenceimmobilieListSkeleton(props) {

    return(

     <>
         <Card>
             <CardBody>
                 <div className="card card-plain card-blog">
                     <Row>
                         <div className="col-md-4">

                             <Skeleton circle={false} height={123} width={200} />

                         </div>
                         <div className="col-md-8">
                             <div className="text-left pull-left">
                                 <Skeleton width={150} />
                             </div>

                             <h6 className="card-title">
                                 <Skeleton count={1}/>
                             </h6>

                             <Skeleton count={2}/>

                             <Skeleton height={20} width={60} />

                         </div>
                     </Row>
                 </div>

             </CardBody>
         </Card>
         <Card>
             <CardBody>
                 <div className="card card-plain card-blog">
                     <Row>
                         <div className="col-md-4">

                             <Skeleton circle={false} height={123} width={200} />

                         </div>
                         <div className="col-md-8">
                             <div className="text-left pull-left">
                                 <Skeleton width={150} />
                             </div>

                             <h6 className="card-title">
                                 <Skeleton count={1}/>
                             </h6>

                             <Skeleton count={2}/>

                             <Skeleton height={20} width={60} />

                         </div>
                     </Row>
                 </div>

             </CardBody>
         </Card>





     </>
    )
}
export default AgenceimmobilieListSkeleton;
