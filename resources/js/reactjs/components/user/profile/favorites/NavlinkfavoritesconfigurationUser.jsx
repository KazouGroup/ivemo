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
                                    <div className="card-header" role="tab" id="headingAnnonceFRS">
                                        <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseAnnonceFRS" aria-expanded="false" aria-controls="collapseAnnonceFRS">
                                            <b>Sections</b>
                                        </a>
                                    </div>
                                    <div id="collapseAnnonceFRS" className="collapse show" role="tabpanel" aria-labelledby="headingAnnonceFRS">
                                        <div className="card-body">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <NavLink to={`/profile/${$userIvemo.slug}/personal_settings/favorite_employments/`}>
                                                                Emplois & service
                                                            </NavLink>
                                                        </td>
                                                        <td className="text-right"><b>{this.props.favoritesemployments_count || "0"}</b> {this.props.favoritesemployments_count > 1 ? "annonces" : "annonce"}</td>
                                                    </tr>

                                                    <tr>
                                                        <td>
                                                            <NavLink to={`/profile/${$userIvemo.slug}/personal_settings/favorite_forums/`}>
                                                                Forums
                                                            </NavLink>
                                                        </td>
                                                        <td className="text-right"><b>{this.props.favoritesforums_count || "0"}</b> {this.props.favoritesforums_count > 1 ? "posts" : "post"}</td>
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
