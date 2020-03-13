import React  from "react";
import Skeleton from "react-loading-skeleton";

function NavblogannonceSkeleton(props) {

    return(
        <>
            <tr>
                <td>
                    <strong><Skeleton width={200} count={5}/></strong>
                </td>
                <td className="text-right"><Skeleton width={40} count={5}/> </td>
            </tr>
        </>
    )
}
export default NavblogannonceSkeleton
