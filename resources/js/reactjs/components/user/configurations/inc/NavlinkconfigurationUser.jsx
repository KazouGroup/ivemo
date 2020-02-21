import React, { Component } from "react";
import { Link, NavLink, withRouter } from 'react-router-dom';


class NavlinkconfigurationUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        }

    }

    // lifecycle method
    componentDidMount() {
        //

    }

    render() {
        return (
            <div className="col-lg-4 col-md-12 mx-auto">

                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">


                                    <div className="card-body">
                                        <table>
                                            <tbody>

                                                <tr>
                                                    <td> <NavLink to={`/profile/personal_settings/teams/`}>Notre Teams</NavLink></td>
                                                </tr>
                                                <tr>
                                                    <td> <NavLink to={`/profile/personal_settings/annonces_locations/`}>Annonces locations</NavLink></td>
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

        )
    }
}
export default withRouter(NavlinkconfigurationUser);
