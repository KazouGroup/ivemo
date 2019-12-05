import React, {Component} from "react";
import moment from "moment";
import {Link} from "react-router-dom";
import {Button} from "reactstrap";


class PermissionList extends Component{


    render() {
        return(
            <>
                <tr key={this.props.id}>
                    <td><b>{this.props.name}</b></td>
                    <td><b>{this.props.guard_name}</b></td>
                    <td><b>{moment(this.props.created_at).fromNow()}</b></td>
                    <td className="text-right">
                        <Link to={`/dashboard/permissions/${this.props.id}/edit/`} key={this.props.id}
                              className="btn btn-link btn-success btn-round btn-just-icon" data-toggle="tooltip"
                              data-original-title="Edit permissions">
                            <i className="material-icons">edit</i>
                        </Link>

                        <Button onClick={() => this.props.deleteItem(this.props.id)}
                                className="btn btn-link btn-danger btn-round btn-just-icon"
                                color="danger" size="sm">
                            <i className="material-icons">delete_forever</i>
                        </Button>{" "}
                    </td>
                </tr>

            </>
        )
    }

}
export default PermissionList;
