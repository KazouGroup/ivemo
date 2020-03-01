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


                    <div className="section">
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
                                    <a href="#">


                                        <div className="card card-background card-raised" data-background-color=""
                                             style={{backgroundImage: "url(" + '/assets/vendor/assets/img/examples/card-blog15.jpg' + ")"}}>
                                            <div className="info">
                                                <div className="icon icon-white">
                                                    <i className="now-ui-icons business_bulb-63"></i>
                                                </div>
                                                <div className="description">
                                                    <h4 className="info-title">Collaborate on ideas</h4>
                                                    <p>Your designer will come back to you with an initial set of ideas.</p>
                                                    <Link to={`/`} className="btn btn-primary">Vendre/acheter des biens</Link>

                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                                <div className="col-md-4">

                                    <a href="#">
                                        <div className="card card-background card-raised" data-background-color=""
                                             style={{backgroundImage: "url(" + '/assets/vendor/assets/img/examples/card-blog15.jpg' + ")"}}>
                                            <div className="info">
                                                <div className="icon icon-white">
                                                    <i className="now-ui-icons business_badge"></i>
                                                </div>
                                                <div className="description">
                                                    <h4 className="info-title">Pick your designer</h4>
                                                    <p>Havenly interior designers are vetted professionals and real
                                                        people.</p>
                                                    <Link to={`/`} className="btn btn-danger">Trouver des biens</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </a>

                                </div>
                                <div className="col-md-4">
                                    <a href="#">
                                        <div className="card card-background card-raised" data-background-color=""
                                             style={{backgroundImage: "url(" + '/assets/vendor/assets/img/examples/card-blog15.jpg' + ")"}}>
                                            <div className="info">
                                                <div className="icon icon-white">
                                                    <i className="now-ui-icons location_map-big"></i>
                                                </div>
                                                <div className="description">
                                                    <h4 className="info-title">Visualize your room</h4>
                                                    <p>Share a floor plan, and we'll create a visualization of your
                                                        room.</p>

                                                    <Link to={`/`} className="btn btn-info">Reserver des annonces</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </a>

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

export default IndexSite;
