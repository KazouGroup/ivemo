import React, { PureComponent } from "react";
import {Link, NavLink, withRouter} from 'react-router-dom';

class NavUserSite extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};
        this.navLogout = this.navLogout.bind(this);
    }

    navLogout(e) {
        axios.post('/logout')
            .then(() => {
                window.location.reload(true);
            });
    }

    render() {
        return (

            <div className="container">

                <div className="navbar-translate">
                    <Link to={'/'} className="navbar-brand" >
                        <img src=".." />
                        {$name_site}
                        </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-bar top-bar"></span>
                        <span className="navbar-toggler-bar middle-bar"></span>
                        <span className="navbar-toggler-bar bottom-bar"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse" data-nav-image="../assets/img/blurred-image-1.jpg" data-color="orange">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink to={'/'} className="nav-link">
                                <i className="now-ui-icons shopping_shop"/>
                                <b>Acceuil</b>
                            </NavLink>
                        </li>

                        {!$guest &&(
                            <li className="nav-item">
                                <a href={`/dashboard/premium/${$userIvemo.slug}/`} className="nav-link">
                                    <i className="now-ui-icons design_app"/>
                                    <b>Premium dashboard</b>
                                </a>
                            </li>
                        )}

                        <li className={`nav-item dropdown`}>
                            <a href="#" className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown">
                                <i className="now-ui-icons files_paper" aria-hidden="true"/>
                                <p>Annonces</p>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                <a href={`/annonces_locations/locations/`} className="dropdown-item">
                                    <i className="now-ui-icons files_paper"/> Locations
                                </a>
                                <a href={`/annonces_reservations/reservations/`} className="dropdown-item">
                                    <i className="now-ui-icons business_money-coins"/> Reservations
                                </a>
                                <a href={`/annonces_ventes/ventes/`} className="dropdown-item">
                                    <i className="now-ui-icons business_money-coins"/> Ventes
                                </a>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown">
                                <i className="now-ui-icons text_align-left" aria-hidden="true"/>
                                <p>Conseils</p>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                <a href={`/blogs/annonce_locations/`} className="dropdown-item">
                                    <i className="now-ui-icons files_paper"/> Locations
                                </a>
                                <a href={`/blogs/annonce_reservations/`} className="dropdown-item">
                                    <i className="now-ui-icons business_money-coins"/> Reservations
                                </a>
                                <a href={`/blogs/annonce_ventes/`} className="dropdown-item">
                                    <i className="now-ui-icons business_money-coins"/> Ventes
                                </a>
                            </div>
                        </li>
                        {$guest ?

                            <>
                                <li className="nav-item">
                                    <a href={`/login`} data-toggle="modal" data-target="#loginModal" className="nav-link">
                                        <i className="now-ui-icons users_circle-08"/>
                                        <p>Login</p>
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <Link to={`/register/`} className="nav-link btn btn-primary text-left">
                                        <i className="now-ui-icons tech_mobile"/>
                                        <p>Signup</p>
                                    </Link>
                                </li>
                            </>
                            :
                            <>
                                <li className="nav-item dropdown">
                                    <a href=".." className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown">
                                        <i className="now-ui-icons users_single-02"/>
                                        <b>{$userIvemo.first_name}</b>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">

                                        {$userIvemo.status_user && (
                                            <a href="/dashboard" className="dropdown-item">
                                                <i className="now-ui-icons business_bulb-63" /> Dashboard
                                            </a>
                                        )}

                                        <a href="/profile/account" className="dropdown-item">
                                            <i className="now-ui-icons users_circle-08"/> Editer mon profile
                                        </a>
                                        {$userIvemo.status_profile === 1 ?
                                            <a href={`/pro/${$userIvemo.slug}/`} className="dropdown-item">
                                                <i className="now-ui-icons users_single-02"/> Profile
                                            </a>
                                            :
                                            <a href={`/user/${$userIvemo.slug}/`} className="dropdown-item">
                                                <i className="now-ui-icons users_single-02"/> Profile
                                            </a>
                                        }
                                        <a style={{ cursor: "pointer" }} className="dropdown-item" onClick={() => this.navLogout()}>
                                            <i className="now-ui-icons ui-1_simple-remove" /> Déconnexion
                                        </a>

                                    </div>
                                </li>

                                <li className="nav-item dropdown">
                                    <a href="#" className="nav-link" id="navbarDropdownMenuLink" data-toggle="dropdown">
                                        <i className="now-ui-icons business_chart-pie-36"/>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                        <a href={`/profile/personal_reservations/`} className="dropdown-item">
                                            <i className="now-ui-icons shopping_tag-content"/>Mes reservations
                                        </a>
                                        <a href={`/profile/${$userIvemo.slug}/personal_settings/annonces_locations/`} className="dropdown-item">
                                            <i className="now-ui-icons text_align-left"/>Annonces
                                        </a>
                                        <a href={`/profile/${$userIvemo.slug}/personal_settings/blogs/annonce_ventes/`} className="dropdown-item">
                                            <i className="now-ui-icons text_align-center"/>Blog annonces
                                        </a>
                                        <a href={`/profile/${$userIvemo.slug}/personal_settings/teams/`} className="dropdown-item">
                                            <i className="now-ui-icons users_circle-08"/>Team
                                        </a>
                                        <a href={`/profile/annonces_reservations_booked/`} className="dropdown-item">
                                            <i className="now-ui-icons shopping_bag-16"/>Reservations
                                        </a>
                                        <a href={`/profile/${$userIvemo.slug}/personal_mails/contacts/`} className="dropdown-item">
                                            <i className="now-ui-icons location_pin"/>Messages
                                        </a>
                                    </div>
                                </li>
                            </>

                        }

                    </ul>
                </div>
            </div>



        )
    }
}

export default withRouter(NavUserSite);
