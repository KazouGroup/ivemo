import React, {Component} from "react";
import {Link, NavLink} from "react-router-dom";
import {Remarkable} from 'remarkable';
import {Button, UncontrolledTooltip} from "reactstrap";
import moment from "moment";
import Skeleton from "react-loading-skeleton";


const NavProfileTraitement = () => {
    return (

        <div className="d-flex align-items-center">
            {$userIvemo.avatar === null ?
                <img style={{height: "40px", width: "80px"}} alt={$userIvemo.first_name}
                     src={`/assets/vendor/assets/img/blurredimage1.jpg`}/>
                :
                <img src={$userIvemo.avatar}
                     style={{height: "40px", width: "80px"}} alt={$userIvemo.first_name}
                     className="avatar"/>
            }
            <div className="mx-3">
            <span className="text-dark font-weight-600 text-sm">
                <b>{$userIvemo.first_name}</b>
                  <small className="d-block text-muted">
                     <b>{moment($userIvemo.created_at).format('LL')}</b>
                  </small>
             </span>
            </div>
        </div>

    )

};

export default NavProfileTraitement;
