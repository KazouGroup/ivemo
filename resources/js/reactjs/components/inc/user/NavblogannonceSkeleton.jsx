import React  from "react";
import Skeleton from "react-loading-skeleton";

function NavblogannonceSkeleton(props) {

    return(
        <>
            <tr>
                <td>
                    <strong><Skeleton width={200} /></strong>
                </td>
                <td className="text-right"><Skeleton width={40} /> </td>
            </tr>
            <tr>
                <td>
                    <strong><Skeleton width={200} /></strong>
                </td>
                <td className="text-right"><Skeleton width={40} /> </td>
            </tr>
            <tr>
                <td>
                    <strong><Skeleton width={200} /></strong>
                </td>
                <td className="text-right"><Skeleton width={40} /> </td>
            </tr>
            <tr>
                <td>
                    <strong><Skeleton width={200} /></strong>
                </td>
                <td className="text-right"><Skeleton width={40} /> </td>
            </tr>
        </>
    )
}
export default NavblogannonceSkeleton
