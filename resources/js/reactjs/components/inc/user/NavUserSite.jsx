import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';

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
                                <i className="now-ui-icons shopping_shop"></i>
                                <b>Acceuil</b>
                            </NavLink>
                        </li>
                        <li className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown">
                                <i className="now-ui-icons files_paper" aria-hidden="true"></i>
                                <p>Sections</p>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" href="../sections.html#projects">
                                    <i className="now-ui-icons education_paper"></i> Projects
                                    </a>
                                <a className="dropdown-item" href="../sections.html#pricing">
                                    <i className="now-ui-icons business_money-coins"></i> Pricing
                                    </a>
                                <a className="dropdown-item" href="../sections.html#testimonials">
                                    <i className="now-ui-icons ui-2_chat-round"></i> Testimonials
                                    </a>
                                <a className="dropdown-item" href="../sections.html#contactus">
                                    <i className="now-ui-icons tech_mobile"></i> Contact Us
                                    </a>
                            </div>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="../sections.html#blogs">
                                <i className="now-ui-icons text_align-left"></i>
                                <b>Blogs</b>
                            </a>
                        </li>
                        {$guest ?

                            <>
                                <li className="nav-item">
                                    <NavLink to={'/login/'} className="nav-link">
                                        <i className="now-ui-icons users_circle-08"></i>
                                        <p>Login</p>
                                    </NavLink>
                                </li>

                                <li className="nav-item">
                                    <a className="nav-link btn btn-primary text-left" href="/register/">
                                        <i className="now-ui-icons tech_mobile"></i>
                                        <p>Signup</p>
                                    </a>
                                </li>
                            </>
                            :
                            <>
                                <li className="nav-item dropdown">
                                    <a href=".." className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown">
                                        <i className="now-ui-icons users_single-02"></i>
                                        <b>{$userIvemo.first_name}</b>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">

                                        {$userIvemo.my_status === 'active' && (
                                            <a href="/dashboard" className="dropdown-item">
                                                <i className="now-ui-icons business_bulb-63" /> Dashboard
                                            </a>
                                        )}
                                        <a className="dropdown-item" href="../examples/profile-page.html">
                                            <i className="now-ui-icons users_single-02"></i> Profile Page
                                            </a>
                                        <a style={{ cursor: "pointer" }} className="dropdown-item" onClick={() => this.navLogout()}>
                                            <i className="now-ui-icons ui-1_simple-remove" /> Déconnexion
                                            </a>
                                    </div>
                                </li>

                                <li className="nav-item dropdown">
                                    <a href="#" className="nav-link" id="navbarDropdownMenuLink" data-toggle="dropdown">
                                        <i className="now-ui-icons business_chart-pie-36"></i>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                        <NavLink to={'/about/'} className="dropdown-item">
                                            <i className="now-ui-icons business_bulb-63"></i> About-us
                                            </NavLink>
                                        <a className="dropdown-item" href="../examples/blog-post.html">
                                            <i className="now-ui-icons text_align-left"></i> Blog Post
                                            </a>
                                        <NavLink to={'/contact/'} className="dropdown-item">
                                            <i className="now-ui-icons location_pin"></i> Contact
                                            </NavLink>
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

export default NavUserSite;
