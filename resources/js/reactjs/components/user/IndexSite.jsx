import React, { Component } from "react";
import { Link } from 'react-router-dom'
import NavUserSite from "../inc/user/NavUserSite";
import FooterBigUserSite from "../inc/user/FooterBigUserSite";


class IndexSite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        }
    }

    // lifecycle method
    componentDidMount() {
        const composantTitle = 'Creation montage - Ivemo';
        document.title = `${composantTitle}`;
    }

    render() {
        return (
            <div className="pricing sidebar-collapse">
                <nav className="navbar navbar-expand-lg bg-white fixed-top navbar-transparent" color-on-scroll="400">
                    <NavUserSite />
                </nav>

                <div className="wrapper">
                    <div id="carouselExampleIndicators" className="carousel slide">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className=""></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1" className="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2" className=""></li>
                        </ol>
                        <div className="carousel-inner" role="listbox">
                            <div className="carousel-item">
                                <div className="page-header header-filter">
                                    <div className="page-header-image" style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg40.jpg' + ")" }}></div>
                                    <div className="content-center text-center">
                                        <div className="row">
                                            <div className="col-md-8 ml-auto mr-auto">
                                                <h1 className="title">Finding the Perfect.</h1>
                                                <h4 className="description text-white">The haute couture crowds make stylish statements between shows during couture season in Paris...</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item active">
                                <div className="page-header header-filter">
                                    <div className="page-header-image" style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg41.jpg' + ")" }}></div>
                                    <div className="content-center">
                                        <div className="row">
                                            <div className="col-md-8 ml-auto mr-auto text-center">
                                                <h1 className="title">Street Style: Couture.</h1>
                                                <h4 className="description text-white">See what Karlie Kloss, Tracee Ellis Ross and others wore between the shows...</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <div className="page-header header-filter">
                                    <div className="page-header-image" style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg29.jpg' + ")" }}></div>
                                    <div className="content-center text-center">
                                        <div className="row">
                                            <div className="col-md-8 ml-auto mr-auto">
                                                <h1 className="title">For Men With Style.</h1>
                                                <h4 className="description text-white">Shirts that actually fit? Check. Linen shorts? Yup. Those wider pants suddenly in style? Got them, too....</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                            <i className="now-ui-icons arrows-1_minimal-left"></i>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                            <i className="now-ui-icons arrows-1_minimal-right"></i>
                        </a>
                    </div>


                    <div className="main">
                        <div className="pricing-4">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6 ml-auto mr-auto text-center">
                                        <h4 className="description">To get started, you will need to choose a plan for your needs. You have Free Unlimited Updates and Premium Support on each package.</h4>
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

export default IndexSite;
