import React, { Component } from "react";
import { Link, NavLink, withRouter } from 'react-router-dom';


class NavlinkconfigurationUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        }

    }

    // lifecycle method
    componentDidMount() {
        //

    }

    render() {
        return (
            <div className="col-lg-4 col-md-12 mx-auto">

                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                    <div className="card card-plain">
                                        <div className="card-header" role="tab" id="headingOne">
                                            <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                                <b>Inforations personnel</b>
                                            </a>
                                        </div>
                                        <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                            <div className="card-body">
                                                <table>
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            <NavLink to={`/profile/personal_settings/teams/`}>
                                                                Notre Teams
                                                            </NavLink>
                                                        </td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card card-plain">
                                        <div className="card-header" role="tab" id="headingOne">
                                            <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                                <b>Toutes mes annonces</b>
                                            </a>
                                        </div>
                                        <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                            <div className="card-body">
                                                <table>
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            <NavLink to={`/profile/personal_settings/annonces_locations/`}>
                                                                annonces sur locations
                                                            </NavLink>
                                                        </td>
                                                        <td className="text-right"> 200 annonces</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <NavLink to={`/profile/personal_settings/annonces_reservations/`}>
                                                                annonces sur reservations
                                                            </NavLink>
                                                        </td>
                                                        <td className="text-right"> 1 300 annonces</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <NavLink to={`/profile/personal_settings/annonces_ventes/`}>
                                                                annonces sur reservations
                                                            </NavLink>
                                                        </td>
                                                        <td className="text-right"> 380 annonces</td>
                                                    </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card card-plain">
                                        <div className="card-header" role="tab" id="headingOne">
                                            <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                                <b>Toutes mes articles</b>
                                            </a>
                                        </div>
                                        <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                            <div className="card-body">
                                                <table>
                                                    <tbody>
                                                    <tr>
                                                        <td>
                                                            <NavLink to={`/profile/personal_settings/blogs/annonce_locations/`}>
                                                                articles sur la location
                                                            </NavLink>
                                                        </td>
                                                        <td className="text-right"> 200 articles</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <NavLink to={`/profile/personal_settings/annonces_reservations/`}>
                                                                articles sur la reservation
                                                            </NavLink>
                                                        </td>
                                                        <td className="text-right"> 1 300 articles</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <NavLink to={`/profile/personal_settings/annonces_ventes/`}>
                                                                article sur la vente
                                                            </NavLink>
                                                        </td>
                                                        <td className="text-right"> 380 articles</td>
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


            </div>

        )
    }
}
export default withRouter(NavlinkconfigurationUser);
