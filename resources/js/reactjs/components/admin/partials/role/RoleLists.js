import React from "react";
import {Link} from "react-router-dom";
import moment from "moment";
import {Button} from "reactstrap";

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
            <Link className="btn btn-link btn-success btn-round btn-just-icon" data-toggle="tooltip" data-original-title="tooltip"
                  title="Edit" to={`/dashboard/roles/${props.id}/edit/`} key={props.id}>
                <i className="material-icons">edit</i>
            </Link>

            <Button onClick={() => this.deleteItem(props .id)}
                    className="btn btn-link btn-danger btn-round btn-just-icon"
                    color="danger" size="sm">
                <i className="material-icons">delete_forever</i>
            </Button>{" "}
        </td>
    </tr>;

export default RoleLists;
