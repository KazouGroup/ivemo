import React, { Component } from "react";
import { Link,NavLink } from 'react-router-dom';
import AnnoncereservationList from "../../user/annoncereservation/AnnoncereservationList";


class FooterBigUserSite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            citiesannoncesreservations: [],
        }
    }

    loadItems(){
        let url = route('api.citiesannonces_reservations_site');
        fetch(url).then(res => res.json()).then((result) => {
                this.setState({
                    citiesannoncesreservations: [...result]
                });
            });
    }

    componentDidMount() {
        this.loadItems();
    }

    render() {
        const {citiesannoncesreservations} = this.state;

        return (
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
                                            <NavLink to={`/annonce/`} className="text-muted">
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
                                    <h5>Locations d'appartements</h5>
                                    <ul className="links-vertical">
                                        <li>
                                            <a href="#pablo" className="text-muted">
                                                Sales FAQ
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
                                                Affiliates Program
                            </a>
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
                                <h5>Top villes pour vos reservations</h5>
                                <ul className="links-vertical">

                                    {citiesannoncesreservations.map((item) => (

                                        <li key={item.id}>
                                            <a href="#pablo" className="text-muted">
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}



                                </ul>
                            </div>

                        </div>
                    </div>
                    <hr />
                    <div className="copyright">
                        Copyright © {new Date().getFullYear()}, Ivemo All Rights Reserved.
              </div>
                </div>
            </footer>
        )
    }
}
export default FooterBigUserSite;
