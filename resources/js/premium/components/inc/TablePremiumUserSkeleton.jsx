import React, {Fragment} from "react";
import {Link, NavLink} from "react-router-dom";
import {Button} from "reactstrap";
import Skeleton from "react-loading-skeleton";


function TablePremiumUserSkeleton(props) {

    return(

        <Fragment>

            <tr>

                <td> <Skeleton width={120} /></td>
                <td> <Skeleton width={120} /></td>
                <td> <Skeleton width={120} /></td>
                <td> <Skeleton width={15} /></td>
                <td> <Skeleton width={50} /></td>
                <td> <Skeleton width={100} /></td>
                <td className="text-right">
                    <Skeleton width={110} />
                </td>
            </tr>

            <tr>

                <td> <Skeleton width={120} /></td>
                <td> <Skeleton width={120} /></td>
                <td> <Skeleton width={120} /></td>
                <td> <Skeleton width={15} /></td>
                <td> <Skeleton width={50} /></td>
                <td> <Skeleton width={100} /></td>
                <td className="text-right">
                    <Skeleton width={110} />
                </td>
            </tr>

            <tr>

                <td> <Skeleton width={120} /></td>
                <td> <Skeleton width={120} /></td>
                <td> <Skeleton width={120} /></td>
                <td> <Skeleton width={15} /></td>
                <td> <Skeleton width={50} /></td>
                <td> <Skeleton width={100} /></td>
                <td className="text-right">
                    <Skeleton width={110} />
                </td>
            </tr>

            <tr>

                <td> <Skeleton width={120} /></td>
                <td> <Skeleton width={120} /></td>
                <td> <Skeleton width={120} /></td>
                <td> <Skeleton width={15} /></td>
                <td> <Skeleton width={50} /></td>
                <td> <Skeleton width={100} /></td>
                <td className="text-right">
                    <Skeleton width={110} />
                </td>
            </tr>


        </Fragment>
    )
}
export default TablePremiumUserSkeleton;
