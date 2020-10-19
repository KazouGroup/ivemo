import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import {Remarkable} from "remarkable";
import { Badge } from "reactstrap";
import moment from "moment";
import {Button} from "reactstrap";
import ReadMoreAndLess from "react-read-more-less";


class MailcontactservicesendList extends Component {

    getDescription() {
        const md = new Remarkable();
        return { __html: md.render(this.props.message.length > 70 ? this.props.message.substring(0, 70) + "..." : this.props.message) };
    }
    render() {
        return (

            <tr>
                <td>
                    <div key={this.props.id} className="card-header d-flex align-items-center">
                        <div className="text-left pull-left">
                            <Link to={`/messages/ars/${this.props.from.slug}/${this.props.contactserviceable.annoncetype.slug}/${this.props.contactserviceable.slugin}/`}>
                                <div className={`ml-auto mr-auto`}>
                                    <b className={`${this.props.status_red ? "" : "text-primary"}`}>
                                        {this.props.status_red ? "" : <i className="fas fa-circle"></i> } {this.props.from_id === null ? <>{this.props.full_name}</>:<>{this.props.to.first_name}</>}
                                    </b>
                                    {/* {this.props.status_red ? <Badge className="mr-1" color="success">Lu</Badge> : <Badge className="mr-1" color="danger">Non lu</Badge> }*/}
                                </div>
                            </Link>
                        </div>

                        <div className="text-right ml-auto">


                            <Button
                                    className="btn btn-danger btn-icon btn-sm btn-neutral" rel="tooltip" data-original-title="Supprimer" title="Supprimer le message" data-placement="bottom">

                            </Button>
                            <span><b>{moment(this.props.created_at).fromNow()}</b></span>
                        </div>

                    </div>

                    <Link to={`/messages/ars/${this.props.from.slug}/${this.props.contactserviceable.annoncetype.slug}/${this.props.contactserviceable.slugin}/`} className={`${this.props.status_red ? "" : "text-primary"}`}>
                        {/*<span dangerouslySetInnerHTML={this.getDescription()}/>**/}
                        <span>
                                    <ReadMoreAndLess
                                        className="read-more-content"
                                        charLimit={86}
                                        readMoreText=""
                                        readLessText=""
                                    >
                                    {this.props.message || ""}
                                </ReadMoreAndLess>
                        </span>
                    </Link>

                </td>
            </tr>

        )
    }
}
export default MailcontactservicesendList;
