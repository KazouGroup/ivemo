import React, { Component } from "react";
import { Link, NavLink, withRouter } from 'react-router-dom';
import NavNavigatePivateUser from "../../NavNavigatePivateUser";


class NavLinkPublicBlogannoncesUser extends Component {
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
                                    <NavLink to={`/@${this.props.slug}/blogs/annonce_locations/`}>
                                        Articles sur les <b>locations</b>
                                    </NavLink>
                                </td>
                                {this.props.blogannoncelocations_count && (
                                    <td className="text-right"> {this.props.blogannoncelocations_count} {this.props.blogannoncelocations_count < 1 ? "article" : "articles"}</td>
                                )}
                            </tr>
                            <tr>
                                <td>
                                    <NavLink to={`/@${this.props.slug}/blogs/annonce_reservations/`}>
                                        Articles sur les <b>reservations</b>
                                    </NavLink>
                                </td>
                                {this.props.blogannoncereservations_count && (
                                    <td className="text-right"> {this.props.blogannoncereservations_count} {this.props.blogannoncereservations_count < 1 ? "article" : "articles"}</td>
                                )}
                            </tr>
                            <tr>
                                <td>
                                    <NavLink to={`/@${this.props.slug}/blogs/annonce_ventes/`}>
                                        Articles sur les <b>ventes</b>
                                    </NavLink>
                                </td>
                                {this.props.blogannonceventes_count && (
                                    <td className="text-right"> {this.props.blogannonceventes_count} {this.props.blogannonceventes_count < 1 ? "article" : "articles"}</td>
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
export default withRouter(NavLinkPublicBlogannoncesUser);
