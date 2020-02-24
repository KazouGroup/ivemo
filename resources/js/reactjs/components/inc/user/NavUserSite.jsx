import React, { Component } from "react";
import {Link, NavLink, withRouter} from 'react-router-dom';

class NavUserSite extends Component {
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
                    <Link to={'/'} className="navbar-brand" rel="tooltip" title="Ivemo home page" data-placement="bottom">
                        <img src=".." />
                        Ivemo
                        </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-bar top-bar"></span>
                        <span className="navbar-toggler-bar middle-bar"></span>
                        <span className="navbar-toggler-bar bottom-bar"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse" data-nav-image="../assets/img//blurred-image-1.jpg" data-color="orange">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink to={'/'} className="nav-link">
                                <i className="now-ui-icons shopping_shop"/>
                                <b>Acceuil</b>
                            </NavLink>
                        </li>
                        <li className={`nav-item dropdown`}>
                            <a href="#" className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown">
                                <i className="now-ui-icons files_paper" aria-hidden="true"/>
                                <p>Sections</p>
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
                                    <a className="nav-link btn btn-primary text-left" href="/register/">
                                        <i className="now-ui-icons tech_mobile"/>
                                        <p>Signup</p>
                                    </a>
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

                                        {$userIvemo.my_status === 'active' && (
                                            <a href="/dashboard" className="dropdown-item">
                                                <i className="now-ui-icons business_bulb-63" /> Dashboard
                                            </a>
                                        )}
                                        <Link className="dropdown-item" to={`/profile/account/`}>
                                            <i className="now-ui-icons users_single-02"/> Profile Page
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
                                        <NavLink to={'/about/'} className="dropdown-item">
                                            <i className="now-ui-icons business_bulb-63"/> About-us
                                            </NavLink>
                                        <a className="dropdown-item" href="../examples/blog-post.html">
                                            <i className="now-ui-icons text_align-left"/> Blog Post
                                        </a>
                                        <Link to={'/profile/personal_reservations/'} className="dropdown-item">
                                            <i className="now-ui-icons shopping_tag-content"/>Mes reservations
                                        </Link>
                                        <Link to={'/profile/personal_settings/teams/'} className="dropdown-item">
                                            <i className="now-ui-icons users_circle-08"/>Team
                                        </Link>
                                        <Link to={'/profile/annonces_reservations_booked/'} className="dropdown-item">
                                            <i className="now-ui-icons shopping_bag-16"/>Reservations
                                        </Link>
                                        <Link to={'/profile/personal_mails/contacts/'} className="dropdown-item">
                                            <i className="now-ui-icons location_pin"/>Messages Contacts
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
