import React,{Component} from "react";
import moment from "moment";
import {Link} from "react-router-dom";
import {Button} from "reactstrap";


class ContactList extends Component {

    render() {
        return(
            <>
                <tr key={this.props.id}>
                    <td><b>{this.props.full_name}</b></td>
                    <td><b>{(this.props.subject.length > 30 ? this.props.subject.substring(0, 30) + "..." : this.props.subject)}</b></td>
                    <td><b>{this.props.email}</b></td>
                    <td><b>{moment(this.props.created_at).fromNow()}</b></td>
                    <td className="text-right">
                        <Link to={`/dashboard/contact/${this.props.slug}`} key={this.props.id}
                              className="btn btn-link btn-warning btn-round btn-just-icon" data-toggle="tooltip"
                              data-original-title="Show message">
                            <i className="material-icons">visibility</i>
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
export default ContactList;
