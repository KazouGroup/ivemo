import React, { Component } from "react";
import { Link, NavLink, withRouter } from 'react-router-dom';


class NavlinkmailmessageUserShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usersprofile:[],
        };

    }

    loadItems() {
        let itemuser = this.props.match.params.user;
        dyaxios.get(route('api_user_profile_account.site', [itemuser])).then(response => this.setState({ usersprofile: response.data, }));
    }
    // lifecycle method
    componentDidMount() {
        this.loadItems();

    }

    render() {
        const {usersprofile} = this.state;
        return (

            <div className="card-body">
                <table>
                    <tbody>

                    <tr>
                        <td> <NavLink to={`/profile/${usersprofile.slug}/personal_mails/contacts/`}>Mail contacts</NavLink></td>
                        <td className="text-right"> {usersprofile.contactusers_count || " "} {usersprofile.contactusers_count < 1 ? "message" : "messages"}</td>
                    </tr>

                    <tr>
                        <td> <NavLink to={`/profile/personal_mails/annonces_locations/`}>Mail annonces locations</NavLink></td>
                        <td className="text-right"> {usersprofile.contactusers_count || " "} {usersprofile.contactusers_count < 1 ? "message" : "messages"}</td>

                    </tr>

                    </tbody>
                </table>
            </div>


        )
    }
}
export default withRouter(NavlinkmailmessageUserShow);
