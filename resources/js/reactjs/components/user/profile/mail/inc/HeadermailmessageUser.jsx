import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import {Remarkable} from "remarkable";
import { Badge } from "reactstrap";
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
                    <div key={this.props.id} className="card-header d-flex align-items-center">
                        <div className="text-left pull-left">
                            <a href={void(0)} onClick={() => this.props.readItem(this.props)} style={{cursor:"pointer"}}>
                                <div className={`ml-auto mr-auto`}>
                                    <b className={`${this.props.status_red ? "text-primary" : ""}`}>
                                        {this.props.subject}
                                    </b>
                                    {this.props.status_red ? <Badge className="mr-1" color="danger">Non lus</Badge> : <Badge className="mr-1" color="success">Lus</Badge>}
                                </div>
                            </a>
                        </div>
                        <div className="text-right ml-auto">
                        <Button onClick={() => this.props.deleteItem(this.props.id)}
                            className="btn btn-danger btn-icon btn-sm btn-neutral" rel="tooltip" data-original-title="Supprimer" title="Supprimer" data-placement="bottom">
                            <i className="now-ui-icons ui-1_simple-remove"/>
                        </Button>{" "}
                            <span><b>{moment(this.props.created_at).calendar()}</b></span>
                        </div>
                    </div>
                    <a href={void(0)} style={{cursor:"pointer"}} onClick={() => this.props.readItem(this.props)} className={`${this.props.status_red ? "text-primary" : ""}`}>
                        <span dangerouslySetInnerHTML={this.getDescription()}/>
                    </a>

                </td>
                <td className="text-right">

                </td>
            </tr>

        )
    }
}
export default HeadermailmessageUser;
