import React, {Component} from "react";
import {Link} from 'react-router-dom'
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
        const composantTitle = `About - ${$name_site}`;
        document.title = `${composantTitle}`;
    }

    render() {
        return (
            <div className="about-us sidebar-collapse">
                <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent" color-on-scroll="400">
                    <NavUserSite/>
                </nav>

                <div className="wrapper">
                    <div className="page-header page-header-mini">
                        <div className="page-header-image" data-parallax="true"
                             style={{backgroundImage: "url(" + '/assets/vendor/assets/img/bg32.jpg' + ")"}}>
                        </div>
                        <div className="content-center">
                            <div className="row">
                                <div className="col-md-8 ml-auto mr-auto">
                                    <h2 className="title">About Ivemo</h2>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="main main-raised">

                        <div className="container">


                            <div className="row">

                                <div className="col-md-4 mx-auto">
                                    <div className="card card-profile card-plain">
                                        <div className="card-avatar">
                                            <a href="#pablo">
                                                <img className="img img-raised" src="/assets/vendor/assets/img/james.jpg"/>
                                            </a>
                                        </div>
                                        <div className="card-body">
                                            <h6 className="card-category">CEO / Co-Founder</h6>
                                            <h4 className="card-title">James Thompson</h4>
                                            <p className="card-description">
                                                Don't be scared of the truth because we need to restart the human
                                                foundation in truth.
                                            </p>
                                            <a href="#pablo" className="btn btn-primary btn-round">Follow</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4 mx-auto">
                                    <div className="card card-profile card-plain">
                                        <div className="card-avatar">
                                            <a href="#pablo">
                                                <img className="img img-raised" src="/assets/vendor/assets/img/james.jpg"/>
                                            </a>
                                        </div>
                                        <div className="card-body">
                                            <h4 className="card-title">James Thompson</h4>
                                            <h6 className="card-category">CEO / Co-Founder</h6>
                                            <p className="card-description">
                                                Don't be scared of the truth because we need to restart the human
                                                foundation in truth.
                                            </p>
                                            <a href="#pablo" className="btn btn-primary btn-round">Follow</a>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4 mx-auto">
                                    <div className="card card-profile card-plain">
                                        <div className="card-avatar">
                                            <a href="#pablo">
                                                <img className="img img-raised" src="/assets/vendor/assets/img/james.jpg"/>
                                            </a>
                                        </div>
                                        <div className="card-body">
                                            <h4 className="card-title">James Thompson</h4>
                                            <h6 className="card-category">CEO / Co-Founder</h6>
                                            <p className="card-description">
                                                Don't be scared of the truth because we need to restart the human
                                                foundation in truth.
                                            </p>
                                            <a href="#pablo" className="btn btn-primary btn-round">Follow</a>
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>


                    </div>


                    <FooterBigUserSite/>
                </div>
            </div>
        )
    }
}

export default AboutUserSite;
