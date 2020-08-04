import React, { PureComponent } from "react";
import { NavLink, withRouter } from 'react-router-dom';


class NavLinkPublicAnnonceUser extends PureComponent {

    render() {
        return (
            <>
                <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                    <div className="card-body">
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    <NavLink to={`/pro/${this.props.slug}/annonces_locations/`}>
                                        Annonces <b>locations</b>
                                    </NavLink>
                                </td>
                                <td className="text-right"> {this.props.annoncelocations_count} {this.props.annoncelocations_count > 1 ? "annonces" : "annonce"}</td>
                            </tr>
                            <tr>
                                <td>
                                    <NavLink to={`/pro/${this.props.slug}/annonces_reservations/`}>
                                        Annonces <b>réservations</b>
                                    </NavLink>
                                </td>
                                <td className="text-right"> {this.props.annoncereservations_count} {this.props.annoncereservations_count > 1 ? "annonces" : "annonce"}</td>
                            </tr>
                            <tr>
                                <td>
                                    <NavLink to={`/pro/${this.props.slug}/annonces_ventes/`}>
                                        Annonces <b>ventes</b>
                                    </NavLink>
                                </td>
                                <td className="text-right"> {this.props.annonceventes_count} {this.props.annonceventes_count > 1 ? "annonces" : "annonce"}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(NavLinkPublicAnnonceUser);
