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

                        <tr>
                            <td>
                                <NavLink to={`/profile/${this.props.slug}/personal_mails/contacts/`}>
                                    Mail contacts
                                </NavLink>
                            </td>
                            <td className="text-right"> {this.props.contactusers_count} {this.props.contactusers_count < 1 ? "message" : "messages"}</td>
                        </tr>

                        <tr>
                            <td>
                                <NavLink to={`/profile/${this.props.slug}/personal_mails/annonces_locations/`}>
                                    Mail annonces locations
                                </NavLink>
                            </td>
                            <td className="text-right"> {this.props.contactuserslocations_count} {this.props.contactuserslocations_count < 1 ? "message" : "messages"}</td>

                        </tr>

                        <tr>
                            <td> <NavLink to={`/profile/${this.props.slug}/personal_mails/annonces_ventes/`}>Mail annonces ventes</NavLink></td>
                            <td className="text-right"> {this.props.contactusersventes_count} {this.props.contactusersventes_count < 1 ? "message" : "messages"}</td>

                        </tr>

                        </tbody>
                    </table>
                </div>

                {/* <div className="card-body">
                    <table>
                        <tbody>

                        <tr>
                            <td>
                                <NavLink to={`/profile/${this.props.slug}/personal_mails/annonces_locations/`}>
                                     Annonces locations
                                </NavLink>
                            </td>

                        </tr>

                        <tr>
                            <td>
                                <NavLink to={`/profile/${this.props.slug}/personal_mails/annonces_ventes_by_mail/`}>
                                 Annonces ventes
                                </NavLink>
                            </td>

                        </tr>

                        </tbody>
                    </table>
                </div>*/}


            </Fragment>




        )
    }
}
export default withRouter(NavlinkmailmessageUser);
