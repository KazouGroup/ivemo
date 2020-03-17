import React from "react";
import Skeleton from "react-loading-skeleton";
import { Card,CardBody,Row } from "reactstrap";


function AnnoncesListSkeleton(props) {

    return(

     <>
         <Card>
             <CardBody>
                 <div className="card card-plain card-blog">
                     <Row>
                         <div className="col-md-5">

                             <Skeleton circle={false} height={179} width={270} />

                             <br />
                         </div>
                         <div className="col-md-7">
                             <div className="card-header d-flex align-items-center">
                                 <div className="text-left pull-left">
                                     <Skeleton width={100} />
                                 </div>
                                 <div className="text-right ml-auto">
                                     <h5 className="text-success"> <Skeleton width={100} /></h5>
                                 </div>
                             </div>
                             <div className="row">
                                 <div className="col-md-5 col-6">
                                     <Skeleton width={250} />
                                 </div>
                                 <div className="col-md-7 col-6">

                                     <Skeleton width={10} /> <Skeleton width={60} />

                                 </div>

                             </div>
                             <h6 className="card-title">
                                 <Skeleton count={1}/>
                             </h6>

                             <Skeleton count={2}/>

                             <div className="card-header d-flex align-items-center">
                                 <div className="d-flex align-items-center">

                                     <Skeleton circle={false} height={40} width={80} />

                                     <div className="mx-3">
                                         <small className="d-block text-muted"> <Skeleton width={35} /></small>
                                     </div>
                                 </div>

                                 <div className="text-right mx-auto">

                                     <Skeleton width={60} />

                                 </div>

                             </div>
                         </div>
                     </Row>
                 </div>

             </CardBody>
         </Card>
         <Card>
             <CardBody>
                 <div className="card card-plain card-blog">
                     <Row>
                         <div className="col-md-5">

                             <Skeleton circle={false} height={179} width={270} />

                             <br />
                         </div>
                         <div className="col-md-7">
                             <div className="card-header d-flex align-items-center">
                                 <div className="text-left pull-left">
                                     <Skeleton width={100} />
                                 </div>
                                 <div className="text-right ml-auto">
                                     <h5 className="text-success"> <Skeleton width={100} /></h5>
                                 </div>
                             </div>
                             <div className="row">
                                 <div className="col-md-5 col-6">
                                     <Skeleton width={250} />
                                 </div>
                                 <div className="col-md-7 col-6">

                                     <Skeleton width={10} /> <Skeleton width={60} />

                                 </div>

                             </div>
                             <h6 className="card-title">
                                 <Skeleton count={1}/>
                             </h6>

                             <Skeleton count={2}/>

                             <div className="card-header d-flex align-items-center">
                                 <div className="d-flex align-items-center">

                                     <Skeleton circle={false} height={40} width={80} />

                                     <div className="mx-3">
                                         <small className="d-block text-muted"> <Skeleton width={35} /></small>
                                     </div>
                                 </div>

                                 <div className="text-right mx-auto">

                                     <Skeleton width={60} />

                                 </div>

                             </div>
                         </div>
                     </Row>
                 </div>

             </CardBody>
         </Card>
         <Card>
             <CardBody>
                 <div className="card card-plain card-blog">
                     <Row>
                         <div className="col-md-5">

                             <Skeleton circle={false} height={179} width={270} />

                             <br />
                         </div>
                         <div className="col-md-7">
                             <div className="card-header d-flex align-items-center">
                                 <div className="text-left pull-left">
                                     <Skeleton width={100} />
                                 </div>
                                 <div className="text-right ml-auto">
                                     <h5 className="text-success"> <Skeleton width={100} /></h5>
                                 </div>
                             </div>
                             <div className="row">
                                 <div className="col-md-5 col-6">
                                     <Skeleton width={250} />
                                 </div>
                                 <div className="col-md-7 col-6">

                                     <Skeleton width={10} /> <Skeleton width={60} />

                                 </div>

                             </div>
                             <h6 className="card-title">
                                 <Skeleton count={1}/>
                             </h6>

                             <Skeleton count={2}/>

                             <div className="card-header d-flex align-items-center">
                                 <div className="d-flex align-items-center">

                                     <Skeleton circle={false} height={40} width={80} />

                                     <div className="mx-3">
                                         <small className="d-block text-muted"> <Skeleton width={35} /></small>
                                     </div>
                                 </div>

                                 <div className="text-right mx-auto">

                                     <Skeleton width={60} />

                                 </div>

                             </div>
                         </div>
                     </Row>
                 </div>

             </CardBody>
         </Card>

     </>
    )
}
export default AnnoncesListSkeleton;
