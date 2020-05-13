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
                window.location.reload();
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
>= 0
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
                                <Link to={`/annonces_locations/locations/`} className="dropdown-item" >
                                    <i className="now-ui-icons files_paper"/> Locations
                                </Link>
                                <Link to={`/annonces_reservations/reservations/`} className="dropdown-item">
                                    <i className="now-ui-icons business_money-coins"/> Reservations
                                </Link>
                                <Link to={`/annonces_ventes/ventes/`} className="dropdown-item">
                                    <i className="now-ui-icons business_money-coins"/> Ventes
                                </Link>
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown">
                                <i className="now-ui-icons text_align-left" aria-hidden="true"/>
                                <p>Conseils</p>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                <Link to={`/blogs/annonce_locations/`} className="dropdown-item" >
                                    <i className="now-ui-icons files_paper"/> Locations
                                </Link>
                                <Link to={`/blogs/annonce_reservations/`} className="dropdown-item">
                                    <i className="now-ui-icons business_money-coins"/> Reservations
                                </Link>
                                <Link to={`/blogs/annonce_ventes/`} className="dropdown-item">
                                    <i className="now-ui-icons business_money-coins"/> Ventes
                                </Link>
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
                                        <Link className="dropdown-item" to={`/profile/account/`}>
                                            <i className="now-ui-icons users_circle-08"/> Editer mon profile
                                        </Link>
                                        <Link className="dropdown-item" to={`/pro/${$userIvemo.slug}/`}>
                                            <i className="now-ui-icons users_single-02"/> Profile
                                        </Link>
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
                                        <Link to={'/profile/personal_reservations/'} className="dropdown-item">
                                            <i className="now-ui-icons shopping_tag-content"/>Mes reservations
                                        </Link>
                                        <Link to={`/profile/${$userIvemo.slug}/personal_settings/annonces_locations/`} className="dropdown-item">
                                            <i className="now-ui-icons text_align-left"/>Annonces
                                        </Link>
                                        <Link to={`/profile/${$userIvemo.slug}/personal_settings/blogs/annonce_ventes/`} className="dropdown-item">
                                            <i className="now-ui-icons text_align-center"/>Blog annonces
                                        </Link>
                                        <Link to={`/profile/${$userIvemo.slug}/personal_settings/teams/`} className="dropdown-item">
                                            <i className="now-ui-icons users_circle-08"/>Team
                                        </Link>
                                        <Link to={'/profile/annonces_reservations_booked/'} className="dropdown-item">
                                            <i className="now-ui-icons shopping_bag-16"/>Reservations
                                        </Link>
                                        <Link to={`/profile/${$userIvemo.slug}/personal_mails/contacts/`} className="dropdown-item">
                                            <i className="now-ui-icons location_pin"/>Messages
                                        </Link>
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
