import React, {Fragment} from "react";
import { Helmet } from 'react-helmet';

export default function HelmetSite({title}){
    return(
        <Fragment>
            <Helmet>
                <title>{title}</title>
            </Helmet>
        </Fragment>
    )
}
