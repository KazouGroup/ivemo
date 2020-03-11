import React, { Component } from "react";
import { Link, NavLink, withRouter } from 'react-router-dom';
import NavNavigatePivateUser from "../NavNavigatePivateUser";


class NavLinkPublicAnnonceUser extends Component {
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
            <>
                <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                    <div className="card-body">
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    <NavLink to={`/@${this.props.slug}/annonces_locations/`}>
                                        Annones <b>locations</b>
                                    </NavLink>
                                </td>
                                {this.props.annoncelocations_count > 0 && (
                                    <td className="text-right"> {this.props.annoncelocations_count} annonces</td>
                                )}
                            </tr>
                            <tr>
                                <td>
                                    <NavLink to={`/@${this.props.slug}/annonces_reservations/`}>
                                        Annonces <b>reservations</b>
                                    </NavLink>
                                </td>
                                {this.props.annoncereservations_count > 0 && (
                                    <td className="text-right"> {this.props.annoncereservations_count} annonces</td>
                                )}
                            </tr>
                            <tr>
                                <td>
                                    <NavLink to={`/@${this.props.slug}/annonces_ventes/`}>
                                        Annonces <b>ventes</b>
                                    </NavLink>
                                </td>
                                {this.props.annonceventes_count > 0 && (
                                    <td className="text-right"> {this.props.annonceventes_count} annonces</td>
                                )}
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
