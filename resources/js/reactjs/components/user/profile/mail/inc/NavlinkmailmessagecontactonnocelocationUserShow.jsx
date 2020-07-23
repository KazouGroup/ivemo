import React, { Component } from "react";
import { Link, NavLink, withRouter } from 'react-router-dom';
import NavlinkmailmessageUser from "./NavlinkmailmessageUser";


class NavlinkmailmessagecontactonnocelocationUserShow extends Component {
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
   // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();

    }

    render() {
        const {usersprofile} = this.state;
        return (
            <>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                    <NavlinkmailmessageUser {...this.props} {...usersprofile}/>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                    <div className="card-body">
                                        <table>
                                            <tbody>
                                            <tr>
                                                <td> <NavLink to={`/profile/${usersprofile.slug}/personal_mails/archvement_annonces_locations/`}>{usersprofile.archvementcontactuserslocations_count > 1 ? "Messages archivés" : "Message archivé"}</NavLink></td>
                                                <td className="text-right"> {usersprofile.archvementcontactuserslocations_count} {usersprofile.archvementcontactuserslocations_count > 1 ? "messages" : "message"}</td>
                                            </tr>
                                            <tr>
                                                <td> <NavLink to={`/profile/${usersprofile.slug}/personal_mails/favorite_annonces_locations/`}>{usersprofile.favoritecontactuserslocations_count > 1 ? "Messages suivis" : "Message suivis"}</NavLink></td>
                                                <td className="text-right"> {usersprofile.favoritecontactuserslocations_count} {usersprofile.favoritecontactuserslocations_count > 1 ? "messages" : "message"}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>

                </div>

            </>




        )
    }
}
export default withRouter(NavlinkmailmessagecontactonnocelocationUserShow);
