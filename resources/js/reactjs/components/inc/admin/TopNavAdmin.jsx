import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class TopNavAdmin extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-transparent  navbar-absolute fixed-top">
                <div className="container-fluid">
                    <div className="navbar-wrapper">
                        <div className="navbar-minimize">
                            <button id="minimizeSidebar" className="btn btn-just-icon btn-white btn-fab btn-round">
                                <i className="material-icons text_align-center visible-on-sidebar-regular">more_vert</i>
                                <i className="material-icons design_bullet-list-67 visible-on-sidebar-mini">view_list</i>
                            </button>
                        </div>
                        <a className="navbar-brand" href="#pablo"><b></b></a>
                    </div>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation"
                            aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="navbar-toggler-icon icon-bar"/>
                        <span className="navbar-toggler-icon icon-bar"/>
                        <span className="navbar-toggler-icon icon-bar"/>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                            </li>
                            <li className="dropdown nav-item">
                                <a className="nav-link" href="http://example.com" id="navbarDropdownMenuLink"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="material-icons">email</i>
                                    <span className="notification">21</span>
                                    <p>
								<span className="d-lg-none d-md-block">Messages
									<b className="caret"/>
								</span>
                                    </p>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                    <a className="dropdown-item" href="#pablo">Message Contact Us</a>
                                    <a className="dropdown-item" href="#pablo">Message Aide & Contact</a>
                                    <a className="dropdown-item" href="#pablo">Message Work With Us</a>
                                </div>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#pablo" id="navbarDropdownProfile"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="material-icons">person</i>
                                    <p className="d-lg-none d-md-block">
                                        Account
                                    </p>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right dropdown-with-icons"
                                     aria-labelledby="navbarDropdownProfile">
                                    <Link to={'/dashboard/profile/'} className="dropdown-item">
                                        <i className="material-icons">account_circle</i>
                                        Profile
                                    </Link>
                                    <Link to={'/dashboard/profile/edit/'} className="dropdown-item">
                                        <i className="material-icons">settings_applications</i>
                                        Settings
                                    </Link>
                                    <div className="dropdown-divider"/>
                                    <a className="dropdown-item" id="btnShowAlertUnlock">
                                        <i className="material-icons">settings_power</i>
                                        <b>Unlock</b>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default TopNavAdmin;
