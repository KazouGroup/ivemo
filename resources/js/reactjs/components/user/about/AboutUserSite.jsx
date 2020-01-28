import React, { Component } from "react";
import { Link } from 'react-router-dom'
import NavUserSite from "../../inc/user/NavUserSite";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";


class AboutUserSite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        }
    }

    // lifecycle method
    componentDidMount() {
        const composantTitle = 'About - Ivemo';
        document.title = `${composantTitle}`;
    }

    render() {
        return (
            <div className="about-us sidebar-collapse">
                <nav className="navbar navbar-expand-lg bg-white fixed-top navbar-transparent" color-on-scroll="400">
                    <NavUserSite />
                </nav>

                <div className="wrapper">
                    <div className="page-header page-header-mini">
                        <div className="page-header-image" data-parallax="true" style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg32.jpg' + ")" }}>
                        </div>
                        <div className="content-center">
                            <div className="row">
                                <div className="col-md-8 ml-auto mr-auto">
                                    <h2 className="title">About Ivemo</h2>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="main">
                        <div className="pricing-4">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6 ml-auto mr-auto text-center">
                                        <h4 className="description">Notre team et tous les informations concernant la plate forme. </h4>
                                        <div className="section-space"></div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="card card-pricing card-plain">
                                            <div className="card-body">
                                                <h6 className="category">Starter</h6>
                                                <div className="icon icon-info">
                                                    <i className="now-ui-icons business_briefcase-24"></i>
                                                </div>
                                                <h3 className="card-title">
                                                    <small>$</small>10</h3>
                                                <ul>
                                                    <li>1000 MB</li>
                                                    <li>3 email</li>
                                                    <li>5 Databases</li>
                                                </ul>
                                                <a href="#pablo" className="btn btn-info btn-round">
                                                    Get it Now
                  </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card card-pricing" data-background-color="black">
                                            <div className="card-body">
                                                <h6 className="category">Professional</h6>
                                                <div className="icon icon-success">
                                                    <i className="now-ui-icons tech_headphones"></i>
                                                </div>
                                                <h3 className="card-title">
                                                    <small>$</small>40</h3>
                                                <ul>
                                                    <li>Unlimited MB</li>
                                                    <li>Unlimited emails</li>
                                                    <li>Full Support</li>
                                                </ul>
                                                <a href="#pablo" className="btn btn-neutral btn-primary disabled btn-round">
                                                    Current Plan
                  </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card card-pricing card-plain">
                                            <div className="card-body">
                                                <h6 className="category">Basic</h6>
                                                <div className="icon icon-danger">
                                                    <i className="now-ui-icons design_palette"></i>
                                                </div>
                                                <h3 className="card-title">
                                                    <small>$</small>20</h3>
                                                <ul>
                                                    <li>1000 MB</li>
                                                    <li>3 email</li>
                                                    <li>No Support</li>
                                                </ul>
                                                <a href="#pablo" className="btn btn-danger btn-round">
                                                    Upgrade Plan
                  </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <FooterBigUserSite />
                </div>
            </div>
        )
    }
}

export default AboutUserSite;
