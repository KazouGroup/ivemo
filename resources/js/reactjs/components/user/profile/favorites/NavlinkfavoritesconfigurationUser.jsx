import React, { PureComponent } from "react";
import { Link, NavLink, withRouter } from 'react-router-dom';
const abbrev = ['', 'k', 'M', 'B', 'T'];


class NavlinkfavoritesconfigurationUser extends PureComponent {


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
                                            <b>Tous mes annonces</b>
                                        </a>
                                    </div>
                                    <div id="collapseAnnonce" className="collapse show" role="tabpanel" aria-labelledby="headingAnnonce">
                                        <div className="card-body">
                                            <table>
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <NavLink to={`/profile/${$userIvemo.slug}/personal_settings/favorite_annonces_locations/`}>
                                                            annonces sur les locations
                                                        </NavLink>
                                                    </td>
                                                    <td className="text-right"> <b>{this.props.favoriteannoncelocations_count || "0"}</b> {this.props.favoriteannoncelocations_count > 1 ? "annonces" : "annonce"}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <NavLink to={`/profile/${$userIvemo.slug}/personal_settings/annonces_reservations/`}>
                                                            annonces sur les reservations
                                                        </NavLink>
                                                    </td>
                                                    <td className="text-right"> {this.props.annoncereservations_count || "0"} {this.props.annoncereservations_count > 1 ? "annonces" : "annonce"}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <NavLink to={`/profile/${$userIvemo.slug}/personal_settings/favorite_annonces_ventes/`}>
                                                            annonces sur les ventes
                                                        </NavLink>
                                                    </td>
                                                    <td className="text-right"> <b>{this.props.favoriteannonceventes_count || "0"}</b> {this.props.favoriteannonceventes_count > 1 ? "annonces" : "annonce"}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div className="card card-plain">
                                    <div className="card-header" role="tab" id="headingAnnonceFRS">
                                        <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseAnnonceFRS" aria-expanded="false" aria-controls="collapseAnnonceFRS">
                                            <b>Tous mes annonces Formations, services & recrutement</b>
                                        </a>
                                    </div>
                                    <div id="collapseAnnonceFRS" className="collapse show" role="tabpanel" aria-labelledby="headingAnnonceFRS">
                                        <div className="card-body">
                                            <table>
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <NavLink to={`/profile/${$userIvemo.slug}/personal_settings/favorite_employments/`}>
                                                            Formations, services, recrutements
                                                        </NavLink>
                                                    </td>
                                                    <td className="text-right"><b>{this.props.favoritemployments_count || "0"}</b> {this.props.favoritemployments_count > 1 ? "annonces" : "annonce"}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <div className="card card-plain">
                                    <div className="card-header" role="tab" id="headingArticle">
                                        <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseArticle" aria-expanded="false" aria-controls="collapseArticle">
                                            <b>Tous mes articles</b>
                                        </a>
                                    </div>
                                    <div id="collapseArticle" className="collapse show" role="tabpanel" aria-labelledby="headingArticle">
                                        <div className="card-body">
                                            <table>
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <NavLink to={`/profile/${$userIvemo.slug}/personal_settings/favorite_blogannoncelocations/`}>
                                                            articles sur la location
                                                        </NavLink>
                                                    </td>
                                                    <td className="text-right"><b>{this.props.favoriteblogannoncelocations_count || "0"}</b> {this.props.favoriteblogannoncelocations_count > 1 ? "articles" : "article"}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <NavLink to={`/profile/${$userIvemo.slug}/personal_settings/favorite_blogannoncereservations/`}>
                                                            articles sur la reservation
                                                        </NavLink>
                                                    </td>
                                                    <td className="text-right"> <b>{this.props.favoriteblogannoncereservations_count || "0"}</b> {this.props.favoriteblogannoncereservations_count > 1 ? "articles" : "article"}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <NavLink to={`/profile/${$userIvemo.slug}/personal_settings/favorite_blogannonceventes/`}>
                                                            article sur la vente
                                                        </NavLink>
                                                    </td>
                                                    <td className="text-right"> <b>{this.props.favoriteblogannonceventes_count || "0"}</b> {this.props.favoriteblogannonceventes_count > 1 ? "articles" : "article"}</td>
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
export default withRouter(NavlinkfavoritesconfigurationUser);
