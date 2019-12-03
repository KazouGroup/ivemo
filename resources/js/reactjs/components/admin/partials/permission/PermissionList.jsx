import React, {Component} from "react";
import moment from "moment";


class PermissionList extends Component{


    render() {
        return(
            <>
                <td><b>{this.props.name}</b></td>
                <td><b>{this.props.guard_name}</b></td>
                <td><b>{moment(this.props.created_at).fromNow()}</b></td>

            </>
        )
    }

}
export default PermissionList;
