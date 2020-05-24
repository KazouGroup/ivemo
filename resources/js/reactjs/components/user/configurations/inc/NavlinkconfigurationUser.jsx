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

            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-12">
                            <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                <div className="card card-plain">
                                    <div className="card-header" role="tab" id="headingAnnonce">
                                        <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseAnnonce" aria-expanded="false" aria-controls="collapseAnnonce">
                                            <b>Toutes mes annonces</b>
                                        </a>
                                    </div>
                                    <div id="collapseAnnonce" className="collapse" role="tabpanel" aria-labelledby="headingAnnonce">
                                        <div className="card-body">
                                            <table>
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <NavLink to={`/profile/${this.props.slug}/personal_settings/annonces_locations/`}>
                                                            annonces sur les locations
                                                        </NavLink>
                                                    </td>
                                                    <td className="text-right"> {this.props.annoncelocations_count} {this.props.annoncelocations_count > 1 ? "annonces" : "annonce"}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <NavLink to={`/profile/${this.props.slug}/personal_settings/annonces_reservations/`}>
                                                            annonces sur les reservations
                                                        </NavLink>
                                                    </td>
                                                    <td className="text-right"> {this.props.annoncereservations_count} {this.props.annoncereservations_count > 1 ? "annonces" : "annonce"}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <NavLink to={`/profile/${this.props.slug}/personal_settings/annonces_ventes/`}>
                                                            annonces sur les ventes
                                                        </NavLink>
                                                    </td>
                                                    <td className="text-right"> {this.props.annonceventes_count} {this.props.annonceventes_count > 1 ? "annonces" : "annonce"}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div className="card card-plain">
                                    <div className="card-header" role="tab" id="headingAnnonceFRS">
                                        <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseAnnonceFRS" aria-expanded="false" aria-controls="collapseAnnonceFRS">
                                            <b>Toutes mes annonces Formations, services & recrutement</b>
                                        </a>
                                    </div>
                                    <div id="collapseAnnonceFRS" className="collapse" role="tabpanel" aria-labelledby="headingAnnonceFRS">
                                        <div className="card-body">
                                            <table>
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <NavLink to={`/profile/${this.props.slug}/personal_settings/employments/`}>
                                                            Formations service recrutement
                                                        </NavLink>
                                                    </td>
                                                    <td className="text-right">{this.props.employments_count} {this.props.employments_count > 1 ? "annonces" : "annonce"}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div className="card card-plain">
                                    <div className="card-header" role="tab" id="headingArticle">
                                        <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseArticle" aria-expanded="false" aria-controls="collapseArticle">
                                            <b>Toutes mes articles</b>
                                        </a>
                                    </div>
                                    <div id="collapseArticle" className="collapse" role="tabpanel" aria-labelledby="headingArticle">
                                        <div className="card-body">
                                            <table>
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <NavLink to={`/profile/${this.props.slug}/personal_settings/blogs/annonce_locations/`}>
                                                            articles sur la location
                                                        </NavLink>
                                                    </td>
                                                    <td className="text-right">{this.props.blogannoncelocations_count} {this.props.blogannoncelocations_count > 1 ? "articles" : "article"}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <NavLink to={`/profile/${this.props.slug}/personal_settings/blogs/annonce_reservations/`}>
                                                            articles sur la reservation
                                                        </NavLink>
                                                    </td>
                                                    <td className="text-right"> {this.props.blogannoncereservations_count} {this.props.blogannoncereservations_count > 1 ? "articles" : "article"}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <NavLink to={`/profile/${this.props.slug}/personal_settings/blogs/annonce_ventes/`}>
                                                            article sur la vente
                                                        </NavLink>
                                                    </td>
                                                    <td className="text-right"> {this.props.blogannonceventes_count} {this.props.blogannonceventes_count > 1 ? "articles" : "article"}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div className="card card-plain">
                                    <div className="card-header" role="tab" id="headingInfopersonnel">
                                        <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseInfopersonnel" aria-expanded="false" aria-controls="collapseInfopersonnel">
                                            <b>Inforations personnel</b>
                                        </a>
                                    </div>
                                    <div id="collapseInfopersonnel" className="collapse" role="tabpanel" aria-labelledby="headingInfopersonnel">
                                        <div className="card-body">
                                            <table>
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <NavLink to={`/profile/${this.props.slug}/personal_settings/teams/`}>
                                                            Notre Teams
                                                        </NavLink>
                                                    </td>
                                                    <td className="text-right"> {this.props.teamusers_count} {this.props.teamusers_count > 1 ? "membres" : "membre"}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <NavLink to={`/profile/${this.props.slug}/personal_settings/subscriber_users/`}>
                                                            Email des abonnements
                                                        </NavLink>
                                                    </td>
                                                    <td className="text-right"> {this.props.subscriberusers_count} {this.props.subscriberusers_count > 1 ? "emails" : "email"}</td>
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
export default withRouter(NavlinkconfigurationUser);
