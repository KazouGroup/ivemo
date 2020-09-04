import React, { Component,Fragment } from "react";
import { Link, NavLink, withRouter } from 'react-router-dom';


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
                <div className="card-body">
                    <table>
                        <tbody>


                        {$userIvemo.status_profile ?
                            <>
                                <tr>
                                    <td>
                                        <NavLink to={`/profile/${this.props.slug}/personal_mails/contacts/`}>
                                            <b>Contacts</b>
                                        </NavLink>
                                    </td>
                                    <td> <span className="text-right">{this.props.contactusers_count} </span></td>
                                </tr>

                                <tr>
                                    <td>
                                        <NavLink to={`/profile/${this.props.slug}/personal_mails/employments/`}>
                                            <b>Contacts emplois & services</b>
                                        </NavLink>
                                    </td>
                                    <td> <span className="text-right">{this.props.contactservicesemployments_count} </span></td>
                                </tr>
                                <tr>
                                    <td>
                                        <NavLink to={`/profile/${this.props.slug}/personal_mails/als/`}>
                                            <b>Contacts Locations</b>
                                        </NavLink>
                                    </td>
                                    <td> <span className="text-right">{this.props.contactservicesannoncelocations_count} </span></td>
                                </tr>

                                <tr>
                                    <td>
                                        <NavLink to={`/profile/${this.props.slug}/notifications/`}>
                                            <b>Notifications</b>
                                        </NavLink>
                                    </td>
                                    <td> <span className="text-right">{this.props.unread_notifications_count} </span></td>
                                </tr>
                            </>
                            :
                            <>
                                <tr>
                                    <td>
                                        <NavLink to={`/profile/${this.props.slug}/notifications/`}>
                                            <b>Notifications</b>
                                        </NavLink>
                                    </td>
                                    <td> <span className="text-right">{this.props.unread_notifications_count} </span></td>
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

                {/*ö*/}


            </Fragment>




        )
    }
}
export default withRouter(NavlinkmailmessageUser);
