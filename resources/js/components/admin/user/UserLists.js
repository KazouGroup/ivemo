import React from "react";
import {Link} from "react-router-dom";

const UserLists= (props)=>

    <div  className="col-md-4 col-sm-4 ">
        <div className="card card-profile">
            <div className="card-avatar">
                <Link to={`/dashboard/users/${props.id}/edit/`} >
                    <img className="img" src={`${props.avatar}`} alt={`${props.name}`}/>
                </Link>
            </div>
            <div className="stats text-center">
                <Link to={`/dashboard/users/${props.id}/edit/`}  className="btn btn-warning btn-just-icon btn-fill btn-round btn-sm">
                    <i className="material-icons">visibility</i>
                </Link>
                <Link to={`/dashboard/users/${props.id}/edit/`} className="btn btn-success btn-just-icon btn-fill btn-sm btn-round btn-wd" title="Edit">
                    <i className="material-icons">mode_edit</i>
                    <div className="ripple-container"></div>
                </Link>
            </div>
            <div className="card-body">
                { props.statusOnline ?
                    <h6><span className="badge badge-success" title="User online">Online</span></h6>
                    :
                    <h6><span className="badge badge-danger" title="User online">Offline</span></h6>
                }
                <h4 className="card-title"><b>{props.first_name} {props.last_name}</b></h4>
                <h4 className="card-title"><b>Sex:</b> {props.sex}</h4>
                <h4 className="card-title"><b>Age:</b> 12 ans</h4>
            </div>
        </div>
    </div>;

export default UserLists;
