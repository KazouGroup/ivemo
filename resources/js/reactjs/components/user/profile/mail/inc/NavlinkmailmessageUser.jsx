import React, { Component } from "react";
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

            <div className="card-body">
                <table>
                    <tbody>

                    <tr>
                        <td> <NavLink to={`/profile/${this.props.slug}/personal_mails/contacts/`}>Mail contacts</NavLink></td>
                        <td className="text-right"> {this.props.contactusers_count || " "} {this.props.contactusers_count < 1 ? "message" : "messages"}</td>
                    </tr>

                    <tr>
                        <td> <NavLink to={`/profile/personal_mails/annonces_locations/`}>Mail annonces locations</NavLink></td>
                        <td className="text-right"> {this.props.contactusers_count || " "} {this.props.contactusers_count < 1 ? "message" : "messages"}</td>

                    </tr>

                    </tbody>
                </table>
            </div>


        )
    }
}
export default withRouter(NavlinkmailmessageUser);
