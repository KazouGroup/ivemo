import React, { Component } from "react";
import { Link,NavLink } from 'react-router-dom';
import LoginModalUser from "../../user/auth/LoginModalUser";


class FooterBigUserSite extends Component {
    constructor(props) {
        super(props);
        this.state = {
          //
        }
    }

    componentDidMount() {
        //
    }

    render() {

        return (
            <>

                <LoginModalUser/>
                <footer className="footer" data-background-color="black">
                    <div className="container">
                        <div className="content">
                            <div className="row">
                                <div className="col-md-5">
                                    <div className="column">
                                        <Link to={'/'}>
                                            <img src=".." className="logo" alt={$name_site} />
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

                                <div className="col-md-3 col-4">
                                    <div className="column">
                                        <h5>Company</h5>
                                        <ul className="links-vertical">
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
                                            <li>
                                                <NavLink to={`/advertisement/`} className="text-muted">
                                                    Faire la publicité sur le site
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

                                <div className="col-md-2 col-4">
                                    <div className="column">
                                        <h5>À propos</h5>
                                        <ul className="links-vertical">
                                            <li>
                                                <a href="#pablo" className="text-muted">
                                                    Ivemo/news
                                                </a>
                                            </li>
                                            <li>
                                                <Link to={`/employments/`} className="text-muted">
                                                    Offres d’emploi
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to={`/work_with_us/`} className="text-muted">
                                                    Travaillez avec nous
                                                </Link>
                                            </li>
                                            <li>
                                                <a href="#pablo" className="text-muted">
                                                    Receive Payment
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#pablo" className="text-muted">
                                                    Transactions Issues
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#pablo" className="text-muted">
                                                    Affiliates Program
                                                </a>
                                            </li>
                                            <li>
                                                <Link to={`/agences_immobilies/`} className="text-muted">
                                                    Agences immobiliés
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>

                                </div>

                                <div className="col-md-2 col-4">
                                    <h5>Aide</h5>
                                    <ul className="links-vertical">
                                        <li>
                                            <Link to={`/faqs/`} className="text-muted">
                                                Foire aux questions (FAQ)
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={`/contact/`} className="text-muted">
                                                Contactez ivemo
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
                            Copyright © 2020 - {new Date().getFullYear()}, <b>{$name_site}</b> All Rights Reserved Realisé par
                            <a href="/" className="pl-2 text-primary"><b>KazouGroup Srl</b></a>.
                        </div>
                    </div>
                </footer>
            </>

        )
    }
}
export default FooterBigUserSite;
