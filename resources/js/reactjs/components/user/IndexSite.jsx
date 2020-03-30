import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NavUserSite from "../inc/user/NavUserSite";
import FooterBigUserSite from "../inc/user/FooterBigUserSite";
import SectionLocationbyCity from "../inc/user/section_indexsite/SectionLocationbyCity";
import SectionReservationbyCity from "../inc/user/section_indexsite/SectionReservationbyCity";
import SectionVentebyCity from "../inc/user/section_indexsite/SectionVentebyCity";


class IndexSite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        }
    }

    // lifecycle method
    componentDidMount() {
      //
    }

    render() {
        return (
            <>
                <Helmet title={`Location, reservation et vente de maisons, appartements, studio et bien d'autre bien - Ivemo`} />
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
                                        <h4 className="title">La meilleure façon de reserver un bien, de trouver votre futur logement</h4>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 ml-auto mr-auto">
                                        <Link to={`/annonces_locations/locations/`} className="btn btn-danger btn-lg">
                                            Location
                                        </Link>

                                        <Link to={`/annonces_reservations/reservations/`} className="btn btn-info btn-lg">
                                            Reservation
                                        </Link>

                                        <Link to={`/annonces_ventes/ventes/`} className="btn btn-primary btn-lg">
                                            Achat
                                        </Link>
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

                                </div>

                                <div className="col-md-4">
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

                                </div>

                                <div className="col-md-4">

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
                                </div>
                            </div>





                            <div className="row d-flex align-items-end">
                                <div className="col-md-12 mx-auto">
                                    <h5 className="title">Chercher des biens par ville : terrains, maisons et appartements à vendre </h5>
                                </div>


                            </div>

                            <div className="row">

                                <SectionLocationbyCity/>
                                <SectionReservationbyCity/>
                                <SectionVentebyCity/>

                            </div>


                        </div>


                        <FooterBigUserSite />
                    </div>
                </div>

            </>

        )
    }
}

export default IndexSite;
