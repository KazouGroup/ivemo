import React  from "react";
import Skeleton from "react-loading-skeleton";
import moment from "moment";
import {Button, CardBody, CardFooter, Row, UncontrolledTooltip} from "reactstrap";


function BlogannoncePublicuserSkeleton(props) {

    return(
       <>
           <div className="col-md-4 mx-auto">
               <div className="card card-blog">
                   <div className="card-image">
                       <Skeleton circle={false} height={200} width={340}  />
                   </div>
                   <CardBody>
                       <p className="card-description">
                           <Skeleton count={3}/>
                       </p>
                   </CardBody>
               </div>
           </div>
       </>
    )
}
export default BlogannoncePublicuserSkeleton
