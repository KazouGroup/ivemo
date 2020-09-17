import React, { PureComponent } from "react";
import { Link, NavLink, withRouter } from 'react-router-dom';


class NavLinkPublicUser extends PureComponent {

    render() {
        return (
            <>
                <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                    <div className="card-body">
                        <table>
                            <tbody>

                            {this.props.status_profile && (
                                <>
                                <tr>
                                    <td>
                                        <NavLink to={`/pro/${this.props.slug}/als/locations/`}>
                                            <b>Locations</b>
                                        </NavLink>
                                    </td>
                                    <td className="text-right"> {this.props.annoncelocations_count} {this.props.annoncelocations_count > 1 ? "annonces" : "annonce"}</td>
                                </tr>
                                    <tr>
                                    <td>
                                        <NavLink to={`/pro/${this.props.slug}/avs/ventes/`}>
                                            <b>Ventes</b>
                                        </NavLink>
                                    </td>
                                    <td className="text-right"> {this.props.annonceventes_count} {this.props.annonceventes_count > 1 ? "annonces" : "annonce"}</td>
                                </tr>
                                <tr>
                                    <td>
                                        <NavLink to={`/pro/${this.props.slug}/employments/`}>
                                            <b>Emplois & Services</b>
                                        </NavLink>
                                    </td>
                                    <td className="text-right"> {this.props.employments_count} {this.props.employments_count > 1 ? "annonces" : "annonce"}</td>
                                </tr>
                                </>
                            )}

                            <tr>
                                <td>
                                    <NavLink to={`/pro/${this.props.slug}/forums/`}>
                                         <b>Forums</b>
                                    </NavLink>
                                </td>
                                <td className="text-right"> {this.props.forums_count} {this.props.forums_count > 1 ? "posts" : "post"}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

            </>




        )
    }
}
export default withRouter(NavLinkPublicUser);
