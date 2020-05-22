import React, { Component } from "react";
import {Link, NavLink} from 'react-router-dom';

function Navlinknewemployment (props) {

    return (
        <div className="submit text-center">
            {!$guest ?
                <>
                {$userIvemo.email_verified_at ?
                    <NavLink className="btn btn-danger" to={`/employment/ab/new/`}>
                        <i className="now-ui-icons ui-1_simple-add"/> <b>Poster votre annonce</b>
                    </NavLink>
                    :
                    <NavLink className="btn btn-danger" to={`/email/verify/`}>
                         <i className="now-ui-icons ui-1_simple-add"/> <b>Poster votre annonce</b>
                    </NavLink>
                }
                </>
                :
                <a href={`/login`} data-toggle="modal" data-target="#loginModal" className="btn btn-danger">
                    <i className="now-ui-icons ui-1_simple-add"/> <b>Poster votre annonce</b>
                </a>
            }
        </div>
    )
}

export default React.memo(Navlinknewemployment);
