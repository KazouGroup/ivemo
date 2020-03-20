import React  from "react";
import Skeleton from "react-loading-skeleton";
import {Badge, Button} from "reactstrap";
import moment from "moment";


function MailListSkeleton(props) {

    return(
       <>
           <tr>
               <td>
               <div className="card-header d-flex align-items-center">
                   <div className="text-left pull-left">
                       <div className={`ml-auto mr-auto`}>
                           <Skeleton width={250} />
                       </div>
                   </div>
               </div>
               <Skeleton width={500}  count={2}/>
             </td>
           </tr>

       </>
    )
}
export default MailListSkeleton
