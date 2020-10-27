import React, {Component} from "react";
import {Link, NavLink} from 'react-router-dom';
import NavUserSite from "../inc/user/NavUserSite";
import FooterBigUserSite from "../inc/user/FooterBigUserSite";
import SectionLocationbyCity from "../inc/user/section_indexsite/SectionLocationbyCity";
import SectionReservationbyCity from "../inc/user/section_indexsite/SectionReservationbyCity";
import SectionVentebyCity from "../inc/user/section_indexsite/SectionVentebyCity";
import SectionBlogannonce from "../inc/user/section_indexsite/SectionBlogannonce";
import HelmetSite from "../inc/user/HelmetSite";
import ButtonNewAnnonce from "../inc/user/ButtonNewAnnonce";


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
                <HelmetSite
                    title={`Trouvez une maison, un appartement, une villa, un terrain un boulo, evenement, job bien d\'autre service - ${$name_site}`}/>

                <div className="pricing sidebar-collapse">
                    <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent"
                         color-on-scroll="400">
                        <NavUserSite/>
                    </nav>

                    <div className="wrapper">

                        <div className="page-header page-header-small">
                            <div className="page-header-image" data-parallax="true"
                                 style={{backgroundImage: "url(" + '/assets/vendor/assets/img/bg32.jpg' + ")"}}>
                            </div>
                            <div className="content-center">
                                <div className="row">
                                    <div className="col-md-12 ml-auto mr-auto">

                                        {$guest ?
                                            <>
                                                <a href={route('login')} className="btn btn-secondary btn-lg">
                                                    <i className="now-ui-icons users_circle-08"/>
                                                    <b>Connexion</b>
                                                </a>
                                                <a href={route('register')} className="btn btn-primary btn-lg">
                                                    <i className="now-ui-icons tech_mobile"/>
                                                    <b>Inscription</b>
                                                </a>
                                            </>
                                            :
                                            <ButtonNewAnnonce classNameDrop={`btn btn-danger btn-sm`}/>
                                        }

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


                                <div className="row">
                                    <div className="col-md-11 ml-auto mr-auto">
                                        <h3 className="title">Poster vos annonces ou laisser toutes vos preocupations
                                            sur le forum </h3>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="container">

                            <div className="row mt-5">
                                <div className="col-md-4">
                                    <Link to={`/als/locations/`}>
                                        <div className="card card-background card-raised" data-background-color=""
                                             style={{backgroundImage: "url(" + '/assets/vendor/assets/img/project21.jpg' + ")"}}>
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

                                <div className="col-md-4">
                                    <Link to={`/ars/reservations/`}>
                                        <div className="card card-background card-raised" data-background-color=""
                                             style={{backgroundImage: "url(" + '/assets/vendor/assets/img/project22.jpg' + ")"}}>
                                            <div className="info">
                                                <div className="icon icon-white">
                                                    <i className="now-ui-icons education_agenda-bookmark"></i>
                                                </div>
                                                <div className="description">
                                                    <h4 className="info-title">RESERVATIONS</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>

                                <div className="col-md-4">
                                    <Link to={`/avs/ventes/`}>
                                        <div className="card card-background card-raised" data-background-color=""
                                             style={{backgroundImage: "url(" + '/assets/vendor/assets/img/project20.jpg' + ")"}}>
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

                            <div className="card">
                                <div className="card-body">
                                    <div className="row mt-5">

                                        <div className="col-md-3">
                                            <Link to={`/city/yaounde/`}>
                                                <div className="card card-background card-raised"
                                                     data-background-color=""
                                                     style={{backgroundImage: "url(" + '/assets/vendor/assets/img/project21.jpg' + ")"}}>
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
                                                <div className="card card-background card-raised"
                                                     data-background-color=""
                                                     style={{backgroundImage: "url(" + '/assets/vendor/assets/img/project21.jpg' + ")"}}>
                                                    <div className="info">
                                                        <div className="description">
                                                            <h4 className="info-title">Douala</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>

                                        <div className="col-md-3">
                                            <Link to={`/city/bafoussam/`}>
                                                <div className="card card-background card-raised"
                                                     data-background-color=""
                                                     style={{backgroundImage: "url(" + '/assets/vendor/assets/img/project20.jpg' + ")"}}>
                                                    <div className="info">
                                                        <div className="description">
                                                            <h4 className="info-title">Bafoussam</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>

                                        <div className="col-md-3">
                                            <Link to={`/city/dschang/`}>
                                                <div className="card card-background card-raised"
                                                     data-background-color=""
                                                     style={{backgroundImage: "url(" + '/assets/vendor/assets/img/project20.jpg' + ")"}}>
                                                    <div className="info">
                                                        <div className="description">
                                                            <h4 className="info-title">Dschang</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>


                                    </div>
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
                            <div className="row">

                                <div className="col-md-6">
                                    <SectionLocationbyCity/>
                                </div>

                                <div className="col-md-6">
                                    <SectionVentebyCity/>
                                </div>

                            </div>


                        </div>
                        <FooterBigUserSite/>
                    </div>
                </div>
            </>
        )
    }
}

export default IndexSite;
