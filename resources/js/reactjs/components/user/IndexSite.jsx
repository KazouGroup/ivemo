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
                <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent" color-on-scroll="400">
                    <NavUserSite />
                </nav>

                <div className="wrapper">

                    <div className="page-header page-header-small">
                        <div className="page-header-image" data-parallax="true"
                            style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg32.jpg' + ")" }}>
                        </div>
                        <div className="content-center">
                            <div className="row">
                                <div className="col-md-8 ml-auto mr-auto">
                                    <h2 className="title">About Ivemo</h2>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="container">


                        <div className="row d-flex align-items-end">
                            <div className="col-lg-6 col-md-8">
                                <h5 className="title">De quel service avez-vous besoin ?</h5>
                                <p className="text-muted">
                                    Pour chaque situation, trouvez le prestataire dont les compétences répondent à vos attentes et à votre niveau d’exigence.
                                </p>
                            </div>
                        </div>
                        <div className="row">



                            <div className="col-md-4">

                                <Link to={`/annonces_locations/locations/`}>
                                    <div className="card card-background card-raised" data-background-color=""
                                        style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/examples/card-blog15.jpg' + ")" }}>
                                        <div className="info">
                                            <div className="icon icon-white">
                                                <i className="now-ui-icons business_badge"></i>
                                            </div>
                                            <div className="description">
                                                <h4 className="info-title">LOCATIONS</h4>
                                                <Link to={`/annonces_locations/locations/`} className="btn btn-danger">Voir les annonces</Link>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                            </div>

                            <div className="col-md-4">
                                <Link to={`/annonces_reservations/reservations/`}>
                                    <div className="card card-background card-raised" data-background-color=""
                                        style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/examples/card-blog15.jpg' + ")" }}>
                                        <div className="info">
                                            <div className="icon icon-white">
                                                <i className="now-ui-icons location_map-big"></i>
                                            </div>
                                            <div className="description">
                                                <h4 className="info-title">RESERVATIONS</h4>

                                                <Link to={`/annonces_reservations/reservations/`} className="btn btn-info">Voir les annonces</Link>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                            </div>

                            <div className="col-md-4">

                                <Link to={`/annonces_ventes/ventes/`}>

                                    <div className="card card-background card-raised" data-background-color=""
                                        style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/examples/card-blog15.jpg' + ")" }}>
                                        <div className="info">
                                            <div className="icon icon-white">
                                                <i className="now-ui-icons business_bulb-63"></i>
                                            </div>
                                            <div className="description">
                                                <h4 className="info-title">VENTES/ACHATS</h4>
                                                <Link to={`/annonces_ventes/ventes/`} className="btn btn-primary">Voir les annonces</Link>

                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>


                        <div className="row">
                            <div className="col-md-4">
                                <div className="info info-hover">
                                    <div className="icon icon-primary">
                                        <i className="now-ui-icons ui-2_chat-round"></i>
                                    </div>
                                    <h4 className="info-title">tester</h4>
                                    <p className="description">J'aimerais acheter ou</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="info info-hover">
                                    <div className="icon icon-success">
                                        <i className="now-ui-icons business_chart-pie-36"></i>
                                    </div>
                                    <h4 className="info-title">Analyze Performance</h4>
                                    <p className="description">Unify data from Facebook, Instagram, Twitter,
                                        LinkedIn, and Youtube to gain rich insights.</p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="info info-hover">
                                    <div className="icon icon-warning">
                                        <i className="now-ui-icons design-2_ruler-pencil"></i>
                                    </div>
                                    <h4 className="info-title">Measure Conversions</h4>
                                    <p className="description">Track actions taken on your website, understand the
                                        impact on your bottom line.</p>
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
