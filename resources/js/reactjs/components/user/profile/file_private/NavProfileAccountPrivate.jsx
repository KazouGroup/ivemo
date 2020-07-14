import React, { Component } from "react";
import { Link, NavLink, withRouter } from 'react-router-dom';
import NavNavigatePivateUser from "../NavNavigatePivateUser";


class NavProfileAccountPrivate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userData:{profile:[]},
        }

    }

    loadItems() {
        dyaxios.get(route('api_profile_account.site')).then(response => this.setState({userData: response.data,}));
    }
    // lifecycle method
    componentDidMount() {
        this.loadItems();

    }
    render() {
        const {userData} = this.state;
        return (
            <>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-12">
                                <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                    <div className="card card-plain">
                                        <div className="card-header" role="tab" id="headingOne">
                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                <b>Configuration du profil</b>
                                            </a>
                                        </div>

                                        <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                            <div className="card-body">
                                                <table>
                                                    <tbody>
                                                    <tr>
                                                        <td> <Link to={`/profile/account/`}>Profil</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <td> <Link to={`/profile/${userData.profile.slug}/account/`}>Ajouter des informations au profil</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <td> <NavLink to={`/profile/change_password/`} >Changer le mot de passe</NavLink></td>
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

            </>


        )
    }
}
export default withRouter(NavProfileAccountPrivate);
