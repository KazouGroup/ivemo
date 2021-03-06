import React, { Component } from "react";
import {Link, NavLink} from 'react-router-dom';

function Navlinknewblogannoncereservation(props) {

    return (
        <div className="submit text-center">
            {!$guest ?
                <NavLink className="btn btn-danger" to={`/blogs/annonce_reservations/ab/new/`}>
                    <i className="now-ui-icons ui-1_simple-add"/> <b>Poster votre article sur la reservation</b>
                </NavLink>
                :
                <a href={`/login`} data-toggle="modal" data-target="#loginModal" className="btn btn-danger">
                    <i className="now-ui-icons ui-1_simple-add"/> <b>Poster votre article sur la reservation</b>
                </a>
            }
        </div>
    )
}

export default React.memo(Navlinknewblogannoncereservation);
