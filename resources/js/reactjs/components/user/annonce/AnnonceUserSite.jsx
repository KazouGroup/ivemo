import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Button } from "reactstrap";
import NavUserSite from "../../inc/user/NavUserSite";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";


class AnnonceUserSite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        }
    }

    // lifecycle method
    componentDidMount() {
        const composantTitle = 'Annonce - Ivemo';
        document.title = `${composantTitle}`;
    }

    render() {
        return (
            <div className="about-us sidebar-collapse">
                <NavUserSite />

                <div className="wrapper">
                    <div className="page-header page-header-mini">
                        <div className="page-header-image" data-parallax="true" style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg32.jpg' + ")" }}>
                        </div>
                        <div className="content-center">
                            <div className="row">
                                <div className="col-md-8 ml-auto mr-auto">
                                    <h3 className="title">Annonce</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="main main-raised">
                        <div className="container">
                            <div className="row">
                            </div>
                        </div>

                        <div className="container">
                            <br />
                            <div className="row">


                                <div className="col-lg-8 col-md-12 mx-auto">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="card mb-3 text-center">
                                                <div className="card-body">
                                                    <p className="h5 font-weight-normal mb-3 text-success">Vous avez une annonce?</p>
                                                    <button className="btn btn-success mb-2"
                                                        type="button" disabled="">
                                                        <span
                                                            className="spinner-grow spinner-grow-sm"
                                                            role="status" aria-hidden="true" />
                                                        Annonce
                                                                        </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="card card-plain card-blog">
                                                <div className="row">
                                                    <div className="col-md-5">
                                                        <div className="card-image">
                                                            <div id="carouselAnnonceIndicators" className="carousel slide" data-ride="carousel">
                                                                <ol className="carousel-indicators">
                                                                    <li data-target="#carouselAnnonceIndicators" data-slide-to="0" className=""></li>
                                                                    <li data-target="#carouselAnnonceIndicators" data-slide-to="1" className=""></li>
                                                                    <li data-target="#carouselAnnonceIndicators" data-slide-to="2" className="active"></li>
                                                                </ol>
                                                                <div className="carousel-inner" role="listbox">
                                                                    <div className="carousel-item">
                                                                        <img className="d-block" src="/assets/vendor/assets/img/bg1.jpg" alt="First slide" />
                                                                    </div>
                                                                    <div className="carousel-item">
                                                                        <img className="d-block" src="/assets/vendor/assets/img/bg3.jpg" alt="Second slide" />
                                                                    </div>
                                                                    <div className="carousel-item active">
                                                                        <img className="d-block" src="/assets/vendor/assets/img/bg4.jpg" alt="Third slide" />
                                                                    </div>
                                                                </div>
                                                                <a className="carousel-control-prev" href="#carouselAnnonceIndicators" role="button" data-slide="prev">
                                                                    <i className="now-ui-icons arrows-1_minimal-left"></i>
                                                                </a>
                                                                <a className="carousel-control-next" href="#carouselAnnonceIndicators" role="button" data-slide="next">
                                                                    <i className="now-ui-icons arrows-1_minimal-right"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <br />
                                                        <div className="card-header d-flex align-items-center">
                                                            <div className="text-left pull-left">
                                                                <NavLink to={`/charbonneur/`}>
                                                                    <h6 className="text-info ml-auto mr-auto">
                                                                        Yaounde
                                                                        </h6>
                                                                </NavLink>
                                                            </div>
                                                            <div className="text-right ml-auto">
                                                                <a href="#pablo">
                                                                    <b>Partager</b>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-7">
                                                        <div className="card-header d-flex align-items-center">
                                                            <div className="text-left pull-left">
                                                                <NavLink to={`/charbonneur/`}>
                                                                    <h6 className="text-info ml-auto mr-auto">
                                                                        Enterprise
                                                                        </h6>
                                                                </NavLink>
                                                            </div>
                                                            <div className="text-right ml-auto">
                                                                <a href="#pablo" className="btn btn-sm btn-outline-primary">
                                                                    <i className="now-ui-icons ui-2_favourite-28"></i> Sauvegarder
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6 col-6">
                                                                <h6 className="category text-dark">4 p . 3 ch . 180 m2</h6>
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <strong className="text-dark"><b>50 000 FCFA/mois</b></strong>
                                                            </div>

                                                        </div>
                                                        <h6 className="card-title">
                                                            <a href="#pablo">Warner Music Group buys concert</a>
                                                        </h6>
                                                        <p>
                                                            Warner Music Group announced today it’s
                                                            acquiring the selected .
                                                        </p>
                                                        <div className="card-header d-flex align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <NavLink to={`/charbonneur/`}>
                                                                    <img src="/assets/vendor/assets/img/bg1.jpg" style={{ height: "40px", width: "80px" }} alt="" className="avatar" />
                                                                </NavLink>
                                                                <div className="mx-3">
                                                                    <NavLink to={`/charbonneur/`} className="text-dark font-weight-600 text-sm">Boclair Temgoua
                                                                    <small className="d-block text-muted">12 janv 2019</small>
                                                                    </NavLink>
                                                                </div>
                                                            </div>
                                                            <Button className="btn btn-sm btn-info" rel="tooltip" title="3426712192" data-placement="bottom">
                                                                <i className="now-ui-icons tech_mobile"></i>
                                                            </Button>
                                                            <NavLink to={`/annonces/`} className="btn btn-sm btn-primary">
                                                                <i className="now-ui-icons location_pin"></i>
                                                            </NavLink>
                                                            <NavLink to={`/annonces/`} className="btn btn-sm btn-success" rel="tooltip" title="Editer" data-placement="bottom">
                                                                <i className="now-ui-icons ui-1_simple-delete"></i>
                                                            </NavLink>
                                                            <Button
                                                                className="btn btn-sm btn-danger" rel="tooltip" title="Supprimer" data-placement="bottom">
                                                                <i className="now-ui-icons ui-1_simple-remove"></i>
                                                            </Button>{" "}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="card-body">
                                            <div className="card card-plain card-blog">
                                                <div className="row">
                                                    <div className="col-md-5">
                                                        <div className="card-image">
                                                            <div id="carouselAnnonceIndicators" className="carousel slide" data-ride="carousel">
                                                                <ol className="carousel-indicators">
                                                                    <li data-target="#carouselAnnonceIndicators" data-slide-to="0" className=""></li>
                                                                    <li data-target="#carouselAnnonceIndicators" data-slide-to="1" className=""></li>
                                                                    <li data-target="#carouselAnnonceIndicators" data-slide-to="2" className="active"></li>
                                                                </ol>
                                                                <div className="carousel-inner" role="listbox">
                                                                    <div className="carousel-item">
                                                                        <img className="d-block" src="/assets/vendor/assets/img/bg1.jpg" alt="First slide" />
                                                                    </div>
                                                                    <div className="carousel-item">
                                                                        <img className="d-block" src="/assets/vendor/assets/img/bg3.jpg" alt="Second slide" />
                                                                    </div>
                                                                    <div className="carousel-item active">
                                                                        <img className="d-block" src="/assets/vendor/assets/img/bg4.jpg" alt="Third slide" />
                                                                    </div>
                                                                </div>
                                                                <a className="carousel-control-prev" href="#carouselAnnonceIndicators" role="button" data-slide="prev">
                                                                    <i className="now-ui-icons arrows-1_minimal-left"></i>
                                                                </a>
                                                                <a className="carousel-control-next" href="#carouselAnnonceIndicators" role="button" data-slide="next">
                                                                    <i className="now-ui-icons arrows-1_minimal-right"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <br />
                                                        <div className="card-header d-flex align-items-center">
                                                            <div className="text-left pull-left">
                                                                <NavLink to={`/charbonneur/`}>
                                                                    <h6 className="text-info ml-auto mr-auto">
                                                                        Yaounde
                                                                        </h6>
                                                                </NavLink>
                                                            </div>
                                                            <div className="text-right ml-auto">
                                                                <a href="#pablo">
                                                                    <b>Partager</b>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-7">
                                                        <div className="card-header d-flex align-items-center">
                                                            <div className="text-left pull-left">
                                                                <NavLink to={`/charbonneur/`}>
                                                                    <h6 className="text-info ml-auto mr-auto">
                                                                        Enterprise
                                                                        </h6>
                                                                </NavLink>
                                                            </div>
                                                            <div className="text-right ml-auto">
                                                                <a href="#pablo" className="btn btn-sm btn-outline-primary">
                                                                    <i className="now-ui-icons ui-2_favourite-28"></i> Sauvegarder
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6 col-6">
                                                                <h6 className="category text-dark">4 p . 3 ch . 180 m2</h6>
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <strong className="text-dark"><b>50 000 FCFA/mois</b></strong>
                                                            </div>

                                                        </div>
                                                        <h6 className="card-title">
                                                            <a href="#pablo">Warner Music Group buys concert</a>
                                                        </h6>
                                                        <p>
                                                            Warner Music Group announced today it’s
                                                            acquiring the selected .
                                                        </p>
                                                        <div className="card-header d-flex align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <NavLink to={`/charbonneur/`}>
                                                                    <img src="/assets/vendor/assets/img/bg1.jpg" style={{ height: "40px", width: "80px" }} alt="" className="avatar" />
                                                                </NavLink>
                                                                <div className="mx-3">
                                                                    <NavLink to={`/charbonneur/`} className="text-dark font-weight-600 text-sm">Boclair Temgoua
                                                                    <small className="d-block text-muted">12 janv 2019</small>
                                                                    </NavLink>
                                                                </div>
                                                            </div>
                                                            <Button className="btn btn-sm btn-info" rel="tooltip" title="3426712192" data-placement="bottom">
                                                                <i className="now-ui-icons tech_mobile"></i>
                                                            </Button>
                                                            <NavLink to={`/annonces/`} className="btn btn-sm btn-primary">
                                                                <i className="now-ui-icons location_pin"></i>
                                                            </NavLink>
                                                            <NavLink to={`/annonces/`} className="btn btn-sm btn-success" rel="tooltip" title="Editer" data-placement="bottom">
                                                                <i className="now-ui-icons ui-1_simple-delete"></i>
                                                            </NavLink>
                                                            <Button
                                                                className="btn btn-sm btn-danger" rel="tooltip" title="Supprimer" data-placement="bottom">
                                                                <i className="now-ui-icons ui-1_simple-remove"></i>
                                                            </Button>{" "}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="card card-plain card-blog">
                                                <div className="row">
                                                    <div className="col-md-5">
                                                        <div className="card-image">
                                                            <div id="carouselAnnonceIndicators" className="carousel slide" data-ride="carousel">
                                                                <ol className="carousel-indicators">
                                                                    <li data-target="#carouselAnnonceIndicators" data-slide-to="0" className=""></li>
                                                                    <li data-target="#carouselAnnonceIndicators" data-slide-to="1" className=""></li>
                                                                    <li data-target="#carouselAnnonceIndicators" data-slide-to="2" className="active"></li>
                                                                </ol>
                                                                <div className="carousel-inner" role="listbox">
                                                                    <div className="carousel-item">
                                                                        <img className="d-block" src="/assets/vendor/assets/img/bg1.jpg" alt="First slide" />
                                                                    </div>
                                                                    <div className="carousel-item">
                                                                        <img className="d-block" src="/assets/vendor/assets/img/bg3.jpg" alt="Second slide" />
                                                                    </div>
                                                                    <div className="carousel-item active">
                                                                        <img className="d-block" src="/assets/vendor/assets/img/bg4.jpg" alt="Third slide" />
                                                                    </div>
                                                                </div>
                                                                <a className="carousel-control-prev" href="#carouselAnnonceIndicators" role="button" data-slide="prev">
                                                                    <i className="now-ui-icons arrows-1_minimal-left"></i>
                                                                </a>
                                                                <a className="carousel-control-next" href="#carouselAnnonceIndicators" role="button" data-slide="next">
                                                                    <i className="now-ui-icons arrows-1_minimal-right"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <br />
                                                        <div className="card-header d-flex align-items-center">
                                                            <div className="text-left pull-left">
                                                                <NavLink to={`/charbonneur/`}>
                                                                    <h6 className="text-info ml-auto mr-auto">
                                                                        Yaounde
                                                                        </h6>
                                                                </NavLink>
                                                            </div>
                                                            <div className="text-right ml-auto">
                                                                <a href="#pablo">
                                                                    <b>Partager</b>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-7">
                                                        <div className="card-header d-flex align-items-center">
                                                            <div className="text-left pull-left">
                                                                <NavLink to={`/charbonneur/`}>
                                                                    <h6 className="text-info ml-auto mr-auto">
                                                                        Enterprise
                                                                        </h6>
                                                                </NavLink>
                                                            </div>
                                                            <div className="text-right ml-auto">
                                                                <a href="#pablo" className="btn btn-sm btn-primary">
                                                                    <i className="now-ui-icons ui-2_favourite-28"></i> Annuler la sauvegarde
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-6 col-6">
                                                                <h6 className="category text-dark">4 p . 3 ch . 180 m2</h6>
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <strong className="text-dark"><b>50 000 FCFA/mois</b></strong>
                                                            </div>

                                                        </div>
                                                        <h6 className="card-title">
                                                            <a href="#pablo">Warner Music Group buys concert</a>
                                                        </h6>
                                                        <p>
                                                            Warner Music Group announced today it’s
                                                            acquiring the selected .
                                                        </p>
                                                        <div className="card-header d-flex align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <NavLink to={`/charbonneur/`}>
                                                                    <img src="/assets/vendor/assets/img/bg1.jpg" style={{ height: "40px", width: "80px" }} alt="" className="avatar" />
                                                                </NavLink>
                                                                <div className="mx-3">
                                                                    <NavLink to={`/charbonneur/`} className="text-dark font-weight-600 text-sm">Boclair Temgoua
                                                                    <small className="d-block text-muted">12 janv 2019</small>
                                                                    </NavLink>
                                                                </div>
                                                            </div>
                                                            <Button className="btn btn-sm btn-info" rel="tooltip" title="3426712192" data-placement="bottom">
                                                                <i className="now-ui-icons tech_mobile"></i>
                                                            </Button>
                                                            <NavLink to={`/annonces/`} className="btn btn-sm btn-primary">
                                                                <i className="now-ui-icons location_pin"></i>
                                                            </NavLink>
                                                            <NavLink to={`/annonces/`} className="btn btn-sm btn-success" rel="tooltip" title="Editer" data-placement="bottom">
                                                                <i className="now-ui-icons ui-1_simple-delete"></i>
                                                            </NavLink>
                                                            <Button
                                                                className="btn btn-sm btn-danger" rel="tooltip" title="Supprimer" data-placement="bottom">
                                                                <i className="now-ui-icons ui-1_simple-remove"></i>
                                                            </Button>{" "}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="col-lg-4 col-md-12 mx-auto">

                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                        <div className="card card-plain">
                                                            <div className="card-header" role="tab" id="headingOne">
                                                                <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                    <b>Location à Douala</b>
                                                            <i className="now-ui-icons arrows-1_minimal-down"></i>
                                                                </a>
                                                            </div>
                                                            <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                                                <div className="card-body">
                                                                <tr> 
                                                                        <td> <a href="#pablo">Locations studio à Douala</a></td>
                                                                        <td> 200 annonces</td>
                                                                    </tr>
                                                                    <tr> 
                                                                        <td> <a href="#pablo">Locations chambre à Douala</a></td>
                                                                        <td> 1 300 annonces</td>
                                                                    </tr>
                                                                    <tr> 
                                                                        <td> <a href="#pablo">Locations appartement 2 pièces à Douala</a></td>
                                                                        <td> 380 annonces</td>
                                                                    </tr>
                                                                    <tr> 
                                                                        <td> <a href="#pablo">Locations appartement 3 pièces à Douala</a></td>
                                                                        <td> 9 200 annonces</td>
                                                                    </tr>
                                                                    <tr> 
                                                                        <td> <a href="#pablo">Locations appartement 4 pièces à Douala</a></td>
                                                                        <td> 5 200 annonces</td>
                                                                    </tr>
                                                                    <tr> 
                                                                        <td> <a href="#pablo">Locations appartement 5 pièces à Douala</a></td>
                                                                        <td> 1 200 annonces</td>
                                                                    </tr>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="card card-plain">
                                                            <div className="card-header" role="tab" id="headingThree">
                                                                <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                   <b>Autres transactions à Douala </b>
                                                            <i className="now-ui-icons arrows-1_minimal-down"></i>
                                                                </a>
                                                            </div>
                                                            <div id="collapseThree" className="collapse" role="tabpanel" aria-labelledby="headingThree">
                                                                <div className="card-body">
                                                                    <tr> 
                                                                        <td> <a href="#pablo">Toutes les ventes de maison Douala</a></td>
                                                                        <td> 200 annonces</td>
                                                                    </tr>
                                                                    <tr> 
                                                                        <td> <a href="#pablo">Toutes les ventes de terrains Douala</a></td>
                                                                        <td> 1 300 annonces</td>
                                                                    </tr>
                                                                    <tr> 
                                                                        <td> <a href="#pablo">Tous les achats de maison de prestige Douala</a></td>
                                                                        <td> 380 annonces</td>
                                                                    </tr>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
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

export default AnnonceUserSite;
