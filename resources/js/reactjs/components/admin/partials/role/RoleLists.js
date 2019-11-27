import React from "react";
import {Link} from "react-router-dom";
import moment from "moment";

const RoleLists= (props)=>

    <tr>
        <td><b>{props.name}</b></td>
        <td>
            {props.permissions.map((permission,index) => (
                <span key={index} className="badge badge-success badge-purple">
                  {permission}
                </span>
            ))}
        </td>
        <td><b>{moment(props.created_at).fromNow()}</b>
        </td>
        <td className="text-right">
            <Link className="table-action table-active"  data-original-title="tooltip"
                  title="Edit" to={`/dashboard/roles/${props.id}/edit/`} key={props.id}>
                <i className="fas fa-edit"></i>
            </Link>

            <a href={'#!'} onClick={() => this.deleteItem(props.id)}
                    className="table-action table-action-delete"  data-original-title="Delete">
                <i className="fas fa-trash"></i>
            </a>
        </td>
    </tr>;

export default RoleLists;
