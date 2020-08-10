import React, { PureComponent } from "react";
import { Link, NavLink, withRouter } from 'react-router-dom';


class NavLinkPublicEmploymentUser extends PureComponent {

    render() {
        return (
            <>
                <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                    <div className="card-body">
                        <table>
                            <tbody>
                            <tr>
                                <td>
                                    <NavLink to={`/pro/${this.props.slug}/employments/`}>
                                         <b>Emplois & Services</b>
                                    </NavLink>
                                </td>
                                <td className="text-right"> {this.props.employments_count} {this.props.employments_count > 1 ? "annonces" : "annonce"}</td>
                            </tr>
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
export default withRouter(NavLinkPublicEmploymentUser);
