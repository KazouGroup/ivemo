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
                <footer className="footer footer-big" data-background-color="black">
                    <div className="container">
                        <div className="content">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="column">
                                        <Link to={'/'}>
                                            <img src=".." className="logo" alt="Ivemo" />
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

                                <div className="col-md-2 col-6">
                                    <div className="column">
                                        <h5>Company</h5>
                                        <ul className="links-vertical">
                                            <li>
                                                <Link to={`/blog/`} className="text-muted">
                                                    Blog
                                                </Link>
                                            </li>
                                            <li>
                                                <NavLink to={`/about/`} className="text-muted">
                                                    About
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to={`/annonces_reservations/reservations/`} className="text-muted">
                                                    Presentation
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

                                <div className="col-md-2 col-6">
                                    <div className="column">
                                        <h5>À propos</h5>
                                        <ul className="links-vertical">
                                            <li>
                                                <a href="#pablo" className="text-muted">
                                                    Qui sommes-nous
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#pablo" className="text-muted">
                                                    Ivemo/news
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#pablo" className="text-muted">
                                                    Offres d’emploi
                                                </a>
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

                                <div className="col-md-2 col-6">
                                    <h5>Reservation Hotel</h5>
                                    <ul className="links-vertical">
                                        <li>
                                            <a href="#pablo" className="text-muted">
                                                Akwa palace
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#pablo" className="text-muted">
                                                How to Register
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#pablo" className="text-muted">
                                                Sell Goods
                                            </a>
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
                                                Affiliates
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="col-md-2 col-6">
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
                                            <Link to={`/cookies_site/`} className="text-muted">
                                                Confidentialité
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={`/cookies_site/`} className="text-muted">
                                                Cookies
                                            </Link>
                                        </li>
                                        <li>
                                            <a href="#pablo" className="text-muted">
                                                Conditions générales
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </div>
                        <hr />
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
                                                <Link to={'/politique_confidentialité/'} className="nav-link">
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
                                    <div className="btn btn-link text-primary " href="#" role="button"
                                         data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="ni ni-chat-round"/>
                                        <span>Cameroun</span>
                                    </div>
                                    <div className="dropdown-menu kazouTech-dropdown" x-placement="top-start">
                                        <a href="#" className="dropdown-item active">
                                            <span>Cameroun</span>
                                        </a>
                                        <a href="#" className="dropdown-item">
                                            <span>Cote d'ivoire</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="copyright">
                            Copyright © {new Date().getFullYear()}, Ivemo All Rights Reserved Realisé par
                            <a href="/" className="pl-2 text-primary">KazouGroup Srl</a>.
                        </div>
                    </div>
                </footer>
            </>

        )
    }
}
export default FooterBigUserSite;
