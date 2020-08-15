import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import {Remarkable} from "remarkable";
import { Badge } from "reactstrap";
import moment from "moment";
import {Button} from "reactstrap";
import {archvementaddItem, archvementremoveItem} from "../../../../../redux/actions/contactuserActions";


class HeadermailmessageUser extends Component {

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
                                        {this.props.status_red ? <i className="fas fa-circle"></i> : "" } {this.props.subject}
                                    </b>
                                    {/*{this.props.status_red ? <Badge className="mr-1" color="danger">Non lu</Badge> : <Badge className="mr-1" color="success">Lu</Badge>}*/}
                                </div>
                            </a>
                        </div>
                        <div className="text-right ml-auto">

                            {this.props.status_favorite ?
                                <Button onClick={() => this.props.favoriteremoveItem(this.props.id)}
                                        className="btn btn-warning btn-icon btn-sm btn-neutral" title="Suivis">
                                    <i className="fas fa-star"/>
                                </Button>
                                :
                                <Button onClick={() => this.props.favoriteaddItem(this.props.id)}
                                        className="btn btn-warning btn-icon btn-sm btn-neutral" title="Non suivis">
                                    <i className="far fa-star"/>
                                </Button>
                            }
                            {this.props.status_red ?
                                <Button onClick={() => this.props.activecontactremoveItem(this.props.id)}
                                        className="btn btn-primary btn-icon btn-sm btn-neutral" title="Marquer comme lu">
                                    <i className="fas fa-envelope"></i>
                                </Button>
                                :
                                <Button onClick={() => this.props.activecontactaddItem(this.props.id)}
                                        className="btn btn-success btn-icon btn-sm btn-neutral" title="Marquer comme non lu">
                                    <i className="fas fa-envelope-open"></i>
                                </Button>
                            }
                            {this.props.status_archvement ?
                                <Button onClick={() => this.props.archvementremoveItem(this.props.id)}
                                        className="btn btn-info btn-icon btn-sm btn-neutral" title="Non archiver">
                                    <i className="fas fa-bookmark"></i>
                                </Button>
                                :
                                <Button onClick={() => this.props.archvementaddItem(this.props.id)}
                                        className="btn btn-info btn-icon btn-sm btn-neutral" title="Archiver">
                                    <i className="far fa-bookmark"></i>
                                </Button>
                            }


                        <Button onClick={() => this.props.deletecontactItem(this.props.id)}
                            className="btn btn-danger btn-icon btn-sm btn-neutral" rel="tooltip" data-original-title="Supprimer" title="Supprimer le message" data-placement="bottom">
                            <i className="far fa-trash-alt"></i>
                        </Button>
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
