import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import {Remarkable} from "remarkable";
import moment from "moment";
import ReadMoreAndLess from "react-read-more-less";


class NotificationsList extends Component {

    render() {
        return (

            <tr>
                <td>
                    <br/>
                    <div key={this.props.id} className="card-header d-flex align-items-center">
                        <div className="text-left pull-left">
                            {this.props.read_at === null ?
                                <a href={void(0)} onClick={() => this.props.readnotificationItem(this.props)} style={{cursor:"pointer"}}>
                                    <div className={`ml-auto mr-auto`}>
                                        <b className="text-primary">
                                            {this.props.data.userFromName}
                                        </b>
                                    </div>
                                </a>
                                :
                                <a href={void(0)} style={{cursor:"pointer"}}>
                                    <div className={`ml-auto mr-auto`}>
                                        <b>{this.props.data.userFromName}</b>
                                    </div>
                                </a>
                            }

                        </div>

                        <div className="text-right ml-auto">
                            <span><b>{moment(this.props.created_at).fromNow()}</b></span>
                        </div>

                    </div>
                    <br/>
                    {this.props.read_at === null ?
                        <a href={void(0)} style={{cursor:"pointer"}} onClick={() => this.props.readnotificationItem(this.props)} className="text-primary">
                            <span>
                                <ReadMoreAndLess
                                        className="read-more-content"
                                        charLimit={100}
                                        readMoreText="lire plus"
                                        readLessText="Masquer"
                                    >
                                    {this.props.data.userFromBodyUser || ""}
                                </ReadMoreAndLess>
                            </span>
                        </a>
                        :
                        <a href={void(0)} style={{cursor:"pointer"}}>
                              <span>
                                    <ReadMoreAndLess
                                        className="read-more-content"
                                        charLimit={100}
                                        readMoreText="lire plus"
                                        readLessText="Masquer"
                                    >
                                    {this.props.data.userFromBodyUser || ""}
                                </ReadMoreAndLess>
                            </span>
                        </a>
                    }
                </td>
                <td className="text-right">

                </td>
            </tr>

        )
    }
}
export default NotificationsList;
