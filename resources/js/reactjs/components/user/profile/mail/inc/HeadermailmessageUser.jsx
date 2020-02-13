import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import {Remarkable} from "remarkable";
import moment from "moment";
import {Button} from "reactstrap";


class HeadermailmessageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        };

    }
    getDescription() {
        const md = new Remarkable();
        return { __html: md.render(this.props.message.length > 80 ? this.props.message.substring(0, 80) + "..." : this.props.message) };
    }
    render() {
        return (

            <tr>
                <td>
                    <div className="card-header d-flex align-items-center">
                        <div className="text-left pull-left">
                            <NavLink to={`${location.pathname}${this.props.slug}/`}>
                                <div className="ml-auto mr-auto">
                                    <b>{this.props.subject}</b>
                                </div>
                            </NavLink>
                        </div>
                        <div className="text-right ml-auto">
                            <span><b>{moment(this.props.created_at).calendar()}</b></span>
                        </div>
                    </div>
                    <NavLink to={`${location.pathname}${this.props.slug}/`}>
                        <span dangerouslySetInnerHTML={this.getDescription()}/>
                    </NavLink>

                </td>
                <td className="text-right">
                    <Button onClick={() => this.props.deleteItem(this.props.id)}
                        className="btn btn-danger btn-icon btn-sm btn-neutral" rel="tooltip" data-original-title="Supprimer" title="Supprimer" data-placement="bottom">
                        <i className="now-ui-icons ui-1_simple-remove"/>
                    </Button>{" "}
                </td>
            </tr>

        )
    }
}
export default HeadermailmessageUser;
