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
                                        Annones <b>Emplois, Formation & Services</b>
                                    </NavLink>
                                </td>
                                <td className="text-right"> {this.props.employments_count} {this.props.employments_count > 1 ? "annonces" : "annonce"}</td>
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
