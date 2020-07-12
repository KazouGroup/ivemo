import React, { Component } from "react";
import { Link, NavLink, withRouter } from 'react-router-dom';


class NavNavigatePivateUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        };

    }
    // lifecycle method
    componentDidMount() {
        //
    }

    render() {
        return (

            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                <div className="card card-plain">
                                    <div className="card-header" role="tab" id="headingFour">
                                        <a data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
                                            <b>Configuration et édition</b>
                                            <i className="now-ui-icons arrows-1_minimal-down"/>
                                        </a>
                                    </div>

                                    <div id="collapseFour" className="collapse show" role="tabpanel" aria-labelledby="headingFour">
                                        <div className="card-body">
                                            <table>
                                                <tbody>
                                                <tr>
                                                    <td> <Link to={`/profile/account/`}>Profil</Link></td>
                                                </tr>
                                                <tr>
                                                    <td> <Link to={`/articles_reservations/`}>Annonces</Link></td>
                                                </tr>
                                                <tr>
                                                    <td> <a href="#pablo">Articles</a></td>
                                                </tr>
                                                <tr>
                                                    <td> <Link to={`/profile/personal_mails/contacts/`}>Contacts et messages</Link></td>
                                                </tr>
                                                <tr>
                                                    <td> <Link to={`/profile/personal_reservations/`}>Reservations personnelles</Link></td>
                                                </tr>
                                                <tr>
                                                    <td> <Link to={`/profile/annonces_reservations_booked/`}>Reservations des utilisateurs</Link></td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        )
    }
}
export default withRouter(NavNavigatePivateUser);
