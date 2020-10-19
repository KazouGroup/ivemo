import React, { Component, Fragment } from "react";
import { NavLink, withRouter } from 'react-router-dom';
import Skeleton from "react-loading-skeleton";


class NavlinkmailmessageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        };

    }

    render() {
        return (

            <Fragment>
                <div className="card card-plain">
                    <div id="accordion" role="tablist" aria-multiselectable="true"
                         className="card-collapse">
                    <div className="card-header" role="tab" id="headingOne">
                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <b>Mes messages</b>
                            <i className="now-ui-icons arrows-1_minimal-down"/>
                        </a>
                    </div>

                    <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingTwo">
                        <div className="card-body">
                    <table>
                        <tbody>

                        {$userIvemo.status_profile ?
                            <>
                                <tr>
                                    <td className="pb-2 pt-2">
                                        <NavLink to={`/messages/contacts/`}>
                                            <b>Contacts</b>
                                        </NavLink>
                                    </td>
                                    <td>
                                        {this.props.contactusers_count >= 0 ? <span
                                            className="text-right ivemoItemsCount">{this.props.contactusers_count} </span> : <Skeleton height={25} width={25} />}
                                    </td>
                                </tr>

                                <tr>
                                    <td className="pb-2 pt-2">
                                        <NavLink to={`/messages/employments/`}>
                                            <b>Contacts emplois & services</b>
                                        </NavLink>
                                    </td>
                                    <td>{this.props.contactservicesemployments_count >= 0 ? <span
                                        className="text-right ivemoItemsCount">{this.props.contactservicesemployments_count} </span> : <Skeleton height={25} width={25} />}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="pb-2 pt-2">
                                        <NavLink to={`/messages/als/`}>
                                            <b>Contacts Locations</b>
                                        </NavLink>
                                    </td>
                                    <td>{this.props.contactservicesannoncelocations_count >= 0 ? <span
                                        className="text-right ivemoItemsCount">{this.props.contactservicesannoncelocations_count} </span> : <Skeleton height={25} width={25} />}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="pb-2 pt-2">
                                        <NavLink to={`/messages/ars/`}>
                                            <b>Contacts Reservations</b>
                                        </NavLink>
                                    </td>
                                    <td>{this.props.contactservicesannoncereservations_count >= 0 ? <span
                                        className="text-right ivemoItemsCount">{this.props.contactservicesannoncereservations_count} </span> : <Skeleton height={25} width={25} />}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="pb-2 pt-2">
                                        <NavLink to={`/messages/avs/`}>
                                            <b>Contacts Ventes</b>
                                        </NavLink>
                                    </td>
                                    <td>{this.props.contactservicesannonceventes_count >= 0 ? <span
                                        className="text-right ivemoItemsCount">{this.props.contactservicesannonceventes_count} </span> : <Skeleton height={25} width={25} />}
                                    </td>
                                </tr>

                                <tr>
                                    <td className="pb-2 pt-2">
                                        <NavLink to={`/messages/notifications/`}>
                                            <b>Notifications</b>
                                        </NavLink>
                                    </td>
                                    <td>{this.props.unread_notifications_count >= 0 ? <span
                                        className="text-right ivemoItemsCount">{this.props.unread_notifications_count}</span> : <Skeleton height={25} width={25} />}
                                    </td>
                                </tr>
                            </>
                            :
                            <>
                                <tr>
                                    <td className="pb-2 pt-2">
                                        <NavLink to={`/messages/notifications/`}>
                                            <b>Notifications</b>
                                        </NavLink>
                                    </td>
                                    <td>{this.props.unread_notifications_count >= 0 ? <span
                                        className="text-right ivemoItemsCount">{this.props.unread_notifications_count} </span> : <Skeleton height={25} width={25} />}
                                    </td>
                                </tr>
                            </>
                        }


                        {/*

                         <tr>
                            <td>
                                <NavLink to={`/profile/${this.props.slug}/personal_mails/annonces_locations/`}>
                                    Emplois & services
                                </NavLink>
                            </td>
                            <td className="text-right"> {this.props.contactuserslocations_count} {this.props.contactuserslocations_count > 1 ? "messages" : "message"}</td>

                        </tr>

                        <tr>
                            <td>
                                <NavLink to={`/profile/${this.props.slug}/personal_mails/annonces_locations/`}>
                                    Annonces locations
                                </NavLink>
                            </td>
                            <td className="text-right"> {this.props.contactuserslocations_count} {this.props.contactuserslocations_count > 1 ? "messages" : "message"}</td>

                        </tr>

                        <tr>
                            <td> <NavLink to={`/profile/${this.props.slug}/personal_mails/annonces_ventes/`}>Mail annonces ventes</NavLink></td>
                            <td className="text-right"> {this.props.contactusersventes_count} {this.props.contactusersventes_count > 1 ? "messages" : "message"}</td>

                        </tr>

                        */}


                        </tbody>
                    </table>
                        </div>
                        </div>
                    </div>
                </div>

                {/*ö*/}


            </Fragment>


        )
    }
}

export default withRouter(NavlinkmailmessageUser);
