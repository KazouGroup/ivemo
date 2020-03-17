import React  from "react";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import {Button, CardBody, CardFooter, Row, UncontrolledTooltip} from "reactstrap";
import {Link, NavLink} from "react-router-dom";


function BlogannoncePublicuserSkeleton(props) {

    return(
       <>
           <div className="col-md-6 mx-auto">
               <div className="card card-blog">
                   <div className="card-image">
                       <Skeleton circle={false} height={198}  />
                   </div>
                   <CardBody>
                       <Row>
                           <div className="mx-auto">
                               <Skeleton height={20} width={60} />
                           </div>
                       </Row>
                       <h6 className="card-title text-center">
                           <Skeleton width={200} count={2}/>
                       </h6>
                       <p className="card-description">
                           <Skeleton count={3}/>
                       </p>
                       <CardFooter>
                           <div className="author">
                               <Skeleton circle={true} height={30} width={30} />
                               <Skeleton height={10} width={60} />
                           </div>
                           <div className="stats stats-right">
                               <Skeleton height={20} width={60} />
                           </div>
                       </CardFooter>
                   </CardBody>
               </div>
           </div>

           <div className="col-md-6 mx-auto">
               <div className="card card-blog">
                   <div className="card-image">
                       <Skeleton circle={false} height={198}  />
                   </div>
                   <CardBody>
                       <Row>
                           <div className="mx-auto">
                               <Skeleton height={20} width={60} />
                           </div>
                       </Row>
                       <h6 className="card-title text-center">
                           <Skeleton width={200} count={2}/>
                       </h6>
                       <p className="card-description">
                           <Skeleton count={3}/>
                       </p>
                       <CardFooter>
                           <div className="author">
                               <Skeleton circle={true} height={30} width={30} />
                               <Skeleton height={10} width={60} />
                           </div>
                           <div className="stats stats-right">
                               <Skeleton height={20} width={60} />
                           </div>
                       </CardFooter>
                   </CardBody>
               </div>
           </div>

       </>
    )
}
export default BlogannoncePublicuserSkeleton
