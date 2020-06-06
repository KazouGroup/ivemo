import React, { Component } from "react";
import { Link, NavLink, withRouter } from 'react-router-dom';
const abbrev = ['', 'k', 'M', 'B', 'T'];


class NavlinkfavoritesconfigurationUser extends Component {


    data_countFormatter(favoritemployments_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(favoritemployments_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (favoritemployments_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
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
                                            <b><i className="now-ui-icons location_bookmark"/> Toutes mes favoris</b>
                                        </a>
                                    </div>
                                    <div id="collapseAnnonce" className="collapse show" role="tabpanel" aria-labelledby="headingAnnonce">
                                        <div className="card-body">
                                            <table>
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <NavLink to={`/profile/${$userIvemo.slug}/personal_settings/annonces_locations/`}>
                                                            annonces sur les locations
                                                        </NavLink>
                                                    </td>
                                                    <td className="text-right"> {this.props.annoncelocations_count} {this.props.annoncelocations_count > 1 ? "annonces" : "annonce"}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <NavLink to={`/profile/${$userIvemo.slug}/personal_settings/annonces_reservations/`}>
                                                            annonces sur les reservations
                                                        </NavLink>
                                                    </td>
                                                    <td className="text-right"> {this.props.annoncereservations_count} {this.props.annoncereservations_count > 1 ? "annonces" : "annonce"}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <NavLink to={`/profile/${$userIvemo.slug}/personal_settings/annonces_ventes/`}>
                                                            annonces sur les ventes
                                                        </NavLink>
                                                    </td>
                                                    <td className="text-right"> {this.props.annonceventes_count} {this.props.annonceventes_count > 1 ? "annonces" : "annonce"}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <NavLink to={`/profile/${$userIvemo.slug}/personal_settings/favorite_employments/`}>
                                                            Emplois et services
                                                        </NavLink>
                                                    </td>
                                                    <td className="text-right"> <b>{this.data_countFormatter(this.props.favoritemployments_count || "0")}</b> {this.props.favoritemployments_count > 1 ? "annonces" : "annonce"}</td>
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
