import React, { Component } from "react";
import { Link,NavLink } from 'react-router-dom';
import LoginModalUser from "../../user/auth/LoginModalUser";
import LogoutModalUser from "../../user/auth/LogoutModalUser";


const FooterBigUserSite = () =>  {

    return (
        <>

            <LoginModalUser/>
            <LogoutModalUser />
            <footer className="footer" data-background-color="black">
                <div className="container">
                    <div className="content">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="column">
                                    <Link to={'/'}>
                                        {/* <img src=".." className="logo" alt={$name_site} />*/}
                                        <b>{$name_site}</b>
                                    </Link>
                                </div>
                                <div className="btn-wrapper profile text-left mt-3">
                                    <a target="_blank" href="https://twitter.com/creativetim" className="btn btn-sm"
                                       data-toggle="tooltip" data-original-title="Follow us">
                                        <i className="fab fa-twitter" />
                                    </a>

                                    <a target="_blank" href="https://www.facebook.com/creativetim"
                                       className="btn btn-sm" data-toggle="tooltip" data-original-title="Like us">
                                        <i className="fab fa-facebook-square" />
                                    </a>
                                    <a target="_blank" href="https://dribbble.com/creativetim"
                                       className="btn btn-sm" data-toggle="tooltip" data-original-title="Follow us">
                                        <i className="fab fa-instagram"/>
                                    </a>
                                </div>
                            </div>

                            <div className="col-md-2 col-3">
                                <div className="column">
                                    <h5>Company</h5>
                                    <ul className="links-vertical">
                                        {/*
                                          <li>
                                            <Link to={`/about/`} className="text-muted">
                                                Qui sommes-nous
                                            </Link>
                                        </li>
                                        <li>
                                            <NavLink to={`/annonces_reservations/reservations/`} className="text-muted">
                                                Presentation
                                            </NavLink>
                                        </li>
                                        */}

                                        <li>
                                            <NavLink to={`/advertisement/`} className="text-muted">
                                                Faire la publicit??
                                            </NavLink>
                                        </li>
                                        <li>
                                            <NavLink to={`/contact/`} className="text-muted">
                                                Contact
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className="col-md-2 col-3">
                                <div className="column">
                                    <h5>?? propos</h5>
                                    <ul className="links-vertical">
                                        <li>
                                            <a href="#pablo" className="text-muted">
                                                Ivemo/news
                                            </a>
                                        </li>
                                        <li>
                                            <Link to={`/employments/`} className="text-muted">
                                                Emplois & Services
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={`/work_with_us/`} className="text-muted">
                                                Travailler avec nous
                                            </Link>
                                        </li>
                                        {/*
                                         <li>
                                            <Link to={`/agences_immobilies/`} className="text-muted">
                                                Agences immobili??res
                                            </Link>
                                        </li>
                                        */}
                                    </ul>
                                </div>

                            </div>

                            <div className="col-md-2 col-3">
                                <h5>Aide</h5>
                                <ul className="links-vertical">
                                    <li>
                                        <Link to={`/faqs/`} className="text-muted">
                                            Foire aux questions
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={`/forums/`} className="text-muted">
                                            Forum
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/condition_utilisation/'} className="text-muted">
                                            Terms &amp; Conditions
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/policy_privacy/'} className="text-muted">
                                            Privacy Policy
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={'/licence_site/'} className="text-muted">
                                            Licence Site
                                        </Link>
                                    </li>

                                </ul>
                            </div>

                            <div className="col-md-2 col-3">
                                <h5>{$name_site} </h5>
                                <ul className="links-vertical">
                                    <li>
                                        <a href="/" className="text-muted">
                                            Cameroun
                                        </a>
                                    </li>

                                    {/**
                                    <li>
                                        <a href="/" className="text-muted">
                                            Congo
                                        </a>
                                    </li>

                                    <li>
                                        <a href="http://ivemogabon.test/" className="text-muted">
                                            Gabon
                                        </a>
                                    </li>

                                    <li>
                                        <a href="/" className="text-muted">
                                            Cote d'ivoir
                                        </a>
                                    </li>

                                    <li>
                                        <a href="/" className="text-muted">
                                            Senegal
                                        </a>
                                    </li> */}

                                </ul>
                            </div>

                        </div>
                    </div>
                    <hr />
                    {/*
                            <div className="row">
                            <div className="col-md-9">
                                <div className="column">
                                    <nav>
                                        <ul>
                                            <li className="d-inline-block">
                                                <Link to={'/condition_utilisation/'} className="nav-link">
                                                    Terms &amp; Conditions
                                                </Link>
                                            </li>
                                            <li className="d-inline-block">
                                                <Link to={'/policy_privacy/'} className="nav-link">
                                                    Privacy Policy
                                                </Link>
                                            </li>
                                            <li className="d-inline-block">
                                                <Link to={'/licence_site/'} className="nav-link">
                                                    Licence Site
                                                </Link>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="dropdown">
                                    Pays:
                                    <div className="btn btn-link text-primary " role="button"
                                         data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="ni ni-chat-round"/>
                                        <span>{$country}</span>
                                    </div>
                                    <div className="dropdown-menu" x-placement="top-start">
                                        <a href="#" className="dropdown-item">
                                            <span>Cameroun</span>
                                        </a>
                                        <a href="#" className="dropdown-item">
                                            <span>Cote d'ivoir</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        */}


                    <div className="text-center">
                        Copyright ?? 2020 - {new Date().getFullYear()}, <b>{$name_site}</b> All Rights Reserved Realis?? par
                        <a href="/" className="pl-2 text-primary"><b>KazouGroup Srl</b></a>.
                    </div>
                </div>
            </footer>
        </>

    )
};
export default FooterBigUserSite;
