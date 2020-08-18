import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import {Remarkable} from "remarkable";
import moment from "moment";


class NotificationsList extends Component {

    getDescription() {
        const md = new Remarkable();
        return { __html: md.render(this.props.data.userFromBodyUser) };
    }
    render() {
        return (

            <tr>
                <td>
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
                    {this.props.read_at === null ?
                        <a href={void(0)} style={{cursor:"pointer"}} onClick={() => this.props.readnotificationItem(this.props)} className="text-primary">
                            <span dangerouslySetInnerHTML={this.getDescription()}/>
                        </a>
                        :
                        <a href={void(0)} style={{cursor:"pointer"}}>
                            <span dangerouslySetInnerHTML={this.getDescription()}/>
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
