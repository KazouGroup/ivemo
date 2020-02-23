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
                                        Articles sur la <b>locations</b>
                                    </NavLink>
                                </td>
                                {this.props.blogannoncelocations_count && (
                                    <td className="text-right"> {this.props.blogannoncelocations_count} articles</td>
                                )}
                            </tr>
                            <tr>
                                <td>
                                    <NavLink to={`/@${this.props.slug}/blogs/annonce_reservations/`}>
                                        Articles sur la <b>reservations</b>
                                    </NavLink>
                                </td>
                                {this.props.blogannoncereservations_count && (
                                    <td className="text-right"> {this.props.blogannoncereservations_count} articles</td>
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
