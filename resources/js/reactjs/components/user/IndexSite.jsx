import React, { Component } from "react";
import { Link } from 'react-router-dom';
import NavUserSite from "../inc/user/NavUserSite";
import FooterBigUserSite from "../inc/user/FooterBigUserSite";
import SectionLocationbyCity from "../inc/user/section_indexsite/SectionLocationbyCity";
import SectionReservationbyCity from "../inc/user/section_indexsite/SectionReservationbyCity";
import SectionVentebyCity from "../inc/user/section_indexsite/SectionVentebyCity";
import SectionBlogannonce from "../inc/user/section_indexsite/SectionBlogannonce";
import HelmetSite from "../inc/user/HelmetSite";


class IndexSite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        }
    }

   // Lifecycle Component Method
    componentDidMount() {
        //
    }

    render() {
        return (
            <>
                <HelmetSite title={`Trouvez un boulo, evenement, job bien d\'autre service - ${$name_site}`}/>

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
                                    <div className="col-md-10 ml-auto mr-auto">
                                        <h4 className="title">Le portail immobilier pour trouver des maisons à vendre et à louer. Recherchez l'appartement idéal au cameroun et aussi trouvez un Job ou participer à un événement</h4>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12 ml-auto mr-auto">
                                        <Link to={`/employments/`} className="btn btn-danger btn-lg">
                                            Emplois et Services
                                        </Link>

                                        <Link to={`/forums/`} className="btn btn-info btn-lg">
                                            Forums
                                        </Link>

                                        {/*
                                        <Link to={`/als/locations/`} className="btn btn-danger btn-lg">
                                            Locations
                                        </Link>

                                        <Link to={`/annonces_reservations/reservations/`} className="btn btn-info btn-lg">
                                            Réservations
                                        </Link>

                                        <Link to={`/annonces_ventes/ventes/`} className="btn btn-primary btn-lg">
                                            Achats
                                        </Link>
                                        */}


                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="container">


                            <div className="row mt-5">
                                <div className="col-md-6">
                                    <Link to={`/als/locations/`}>
                                        <div className="card card-background card-raised" data-background-color=""
                                            style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/project21.jpg' + ")" }}>
                                            <div className="info">
                                                <div className="icon icon-white">
                                                    <i className="now-ui-icons business_bank"></i>
                                                </div>
                                                <div className="description">
                                                    <h4 className="info-title">LOCATIONS</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                                <div className="col-md-6">
                                    <Link to={`/avs/ventes/`}>
                                        <div className="card card-background card-raised" data-background-color=""
                                            style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/project20.jpg' + ")" }}>
                                            <div className="info">
                                                <div className="icon icon-white">
                                                    <i className="now-ui-icons location_map-big"></i>
                                                </div>
                                                <div className="description">
                                                    <h4 className="info-title">VENTES / ACHATS</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                
                                </div>
                            </div>

                            <div className="row mt-5">

                                <div className="col-md-3">
                                    <Link to={`/city/yaounde/`}>
                                        <div className="card card-background card-raised" data-background-color=""
                                             style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg1.jpg' + ")" }}>
                                            <div className="info">

                                                <div className="description">
                                                    <h4 className="info-title">Yaounde</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                                <div className="col-md-3">
                                    <Link to={`/city/douala/`}>
                                        <div className="card card-background card-raised" data-background-color=""
                                             style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg4.jpg' + ")" }}>
                                            <div className="info">
                                                <div className="description">
                                                    <h4 className="info-title">Douala</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                                <div className="col-md-3">
                                    <Link to={`/city/bafousam/`}>
                                        <div className="card card-background card-raised" data-background-color=""
                                             style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg4.jpg' + ")" }}>
                                            <div className="info">
                                                <div className="description">
                                                    <h4 className="info-title">Bafousam</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                                <div className="col-md-3">
                                    <Link to={`/city/dschang/`}>
                                        <div className="card card-background card-raised" data-background-color=""
                                             style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg3.jpg' + ")" }}>
                                            <div className="info">
                                                <div className="description">
                                                    <h4 className="info-title">Dschang</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>


                            </div>

                            {/*

                            <div className="row mt-5">
                                <div className="col-md-4">
                                    <div className="card card-background card-raised" data-background-color=""
                                         style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg1.jpg' + ")" }}>
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
                                         style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg4.jpg' + ")" }}>
                                        <div className="info">
                                            <div className="icon icon-white">
                                                <i className="now-ui-icons location_map-big"></i>
                                            </div>
                                            <div className="description">
                                                <h4 className="info-title">RÉSERVATIONS</h4>

                                                <Link to={`/annonces_reservations/reservations/`} className="btn btn-info">Voir les annonces</Link>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="col-md-4">

                                    <div className="card card-background card-raised" data-background-color=""
                                         style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg3.jpg' + ")" }}>
                                        <div className="info">
                                            <div className="icon icon-white">
                                                <i className="now-ui-icons business_bulb-63"></i>
                                            </div>
                                            <div className="description">
                                                <h4 className="info-title">VENTES / ACHATS</h4>
                                                <Link to={`/annonces_ventes/ventes/`} className="btn btn-primary">Voir les annonces</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                             <SectionBlogannonce/>
                             <div className="row d-flex align-items-end">
                                <div className="col-md-12 mx-auto">
                                    <h5 className="title">Vous cherchez des biens par ville ? Terrains, Maisons, Appartements à vendre, ... </h5>
                                </div>
                            </div>

                            <div className="row">

                                <div className="col-md-4">
                                    <SectionLocationbyCity/>
                                </div>

                                <div className="col-md-4">
                                    <SectionReservationbyCity/>
                                </div>

                                <div className="col-md-4">
                                    <SectionVentebyCity/>
                                </div>

                            </div>
                            */}


                        </div>
                        <FooterBigUserSite />
                    </div>
                </div>
            </>
        )
    }
}

export default IndexSite;
