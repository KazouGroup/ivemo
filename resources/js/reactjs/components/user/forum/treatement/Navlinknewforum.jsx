import React, { Component } from "react";
import {Link, NavLink} from 'react-router-dom';

function Navlinknewforum (props) {

    return (
        <div className="submit text-center">
            {!$guest ?
                <NavLink className="btn btn-danger" to={`/forums/ab/new/`}>
                    <i className="now-ui-icons ui-1_simple-add"/> <b>Poser votre question</b>
                </NavLink>
                :
                <a href={`/login`} data-toggle="modal" data-target="#loginModal" className="btn btn-danger">
                    <i className="now-ui-icons ui-1_simple-add"/> <b>Poser votre question</b>
                </a>
            }
        </div>
    )
}

export default React.memo(Navlinknewforum);
