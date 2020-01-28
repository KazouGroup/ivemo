import React from "react";
import {Link} from "react-router-dom";

const UserLists= (props)=>

    <li className="list-group-item px-0">
        <div className="row align-items-center">
            <div className="col-auto">

                <Link to={`/dashboard/users/${props.id}/edit/`} className="avatar rounded-circle">
                    <img src={`${props.avatar}`} alt={`${props.name}`}/>
                </Link>
            </div>
            <div className="col ml--2">
                <h4 className="mb-0">
                    <a href="#!">{props.first_name} {props.last_name}</a>
                </h4>
                {props.statusOnline ?
                    <div>
                        <span className="text-success">●</span>
                        <small>Online</small>
                    </div>
                    :
                    <div>
                        <span className="text-danger">●</span>
                        <small>Offline</small>
                    </div>
                }
            </div>
            <div className="col-auto">
                {props.roles.map((role,index) => (
                    <button key={index} type="button" className="btn btn-sm btn-primary">{role}</button>
                ))}
                <Link to={`/dashboard/users/${props.id}/edit/`} className="btn btn-sm btn-info" title="Edit">
                    Edit
                </Link>
            </div>
        </div>
    </li>;

export default UserLists;
