import React, { Component } from "react";
import { Link, NavLink, withRouter } from 'react-router-dom';


class NavlinkconfigurationUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        }
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
                                                            <NavLink to={`/profile/${this.props.slug}/personal_settings/annonces_locations/`}>
                                                                annonces sur locations
                                                            </NavLink>
                                                        </td>
                                                        <td className="text-right"> {this.props.annoncelocations_count} {this.props.annoncelocations_count < 1 ? "annonce" : "annonces"}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <NavLink to={`/profile/${this.props.slug}/personal_settings/annonces_reservations/`}>
                                                                annonces sur reservations
                                                            </NavLink>
                                                        </td>
                                                        <td className="text-right"> {this.props.annoncereservations_count} {this.props.annoncereservations_count < 1 ? "annonce" : "annonces"}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <NavLink to={`/profile/${this.props.slug}/personal_settings/annonces_ventes/`}>
                                                                annonces sur reservations
                                                            </NavLink>
                                                        </td>
                                                        <td className="text-right"> {this.props.annonceventes_count} {this.props.annonceventes_count < 1 ? "annonce" : "annonces"}</td>
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
                                                            <NavLink to={`/profile/${this.props.slug}/personal_settings/blogs/annonce_locations/`}>
                                                                articles sur la location
                                                            </NavLink>
                                                        </td>
                                                        <td className="text-right">{this.props.blogannoncelocations_count} {this.props.blogannoncelocations_count < 1 ? "article" : "articles"}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <NavLink to={`/profile/${this.props.slug}/personal_settings/blogs/annonce_reservations/`}>
                                                                articles sur la reservation
                                                            </NavLink>
                                                        </td>
                                                        <td className="text-right"> {this.props.blogannoncereservations_count} {this.props.blogannoncereservations_count < 1 ? "article" : "articles"}</td>
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <NavLink to={`/profile/${this.props.slug}/personal_settings/blogs/annonce_ventes/`}>
                                                                article sur la vente
                                                            </NavLink>
                                                        </td>
                                                        <td className="text-right"> {this.props.blogannonceventes_count} {this.props.blogannonceventes_count < 1 ? "article" : "articles"}</td>
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
