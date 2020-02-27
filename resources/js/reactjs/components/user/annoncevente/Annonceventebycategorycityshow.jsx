import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from "reactstrap";
import NavUserSite from "../../inc/user/NavUserSite";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";
import BlogannonceventeIntesseAnnonseShow from "../blog/blognnoncevente/BlogannonceventeIntesseAnnonseShow";
import FormcontactuseronannonceventeShow from "./inc/FormcontactuseronannonceventShow";
import AnnonceventeInteresseList from "./inc/AnnonceventeInteresseList";


class Annonceventebycategorycityshow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annoncevente:{annoncetype:[],categoryannoncevente:[],user:[],imagereservations:[]},
        };

    }

    // lifecycle method
    componentDidMount() {
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemCategoryannoncevente = this.props.match.params.categoryannoncevente;
        let itemcityannonce = this.props.match.params.city;
        let itemdate = this.props.match.params.date;
        let itemannoncevente = this.props.match.params.annoncevente;
        /*Ici c'est pour recuperer les annonce par villes*/
        let url = route('api.annonceventebycategoryannonceventeslug_site',[itemannoncetype,itemCategoryannoncevente,itemcityannonce,itemdate,itemannoncevente]);
        dyaxios.get(url).then(response => this.setState({annoncevente: response.data,}));
    }

    render() {
        const {annoncevente} = this.state;
        return (
            <>
                <Helmet>
                    <title>{`${annoncevente.title || "Ivemo"}`} - Ivemo</title>
                </Helmet>

                <div className="about-us sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">

                        <div className="main main-raised">

                            <div className="container">
                                <br />
                                <div className="row">

                                    <div className="col-lg-8 col-md-12 mx-auto">

                                        <div className="card-body">
                                            <div className="submit text-left">
                                                <button type="button" className="btn btn-neutral btn-sm" onClick={this.props.history.goBack}>
                                                    <i className="now-ui-icons arrows-1_minimal-left"/> <b>Retour au annonces</b>
                                                </button>
                                            </div>

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
                                            <div className="d-flex align-items-center">
                                                <div className="text-left pull-left">
                                                    <NavLink to={`/annonces_ventes/${annoncevente.annoncetype.slug}/${annoncevente.categoryannoncevente.slug}/`}>
                                                        <h6 className={`text-${annoncevente.categoryannoncevente.color_name} ml-auto mr-auto`}>
                                                            {annoncevente.categoryannoncevente.name}
                                                        </h6>
                                                    </NavLink>
                                                </div>

                                                {/*
                                                <div className="text-center ml-auto">
                                                    <a href="#pablo" className="btn btn-primary btn-round">
                                                        <i className="now-ui-icons ui-2_favourite-28"/> Dejà sauvegarder
                                                    </a>
                                                </div>
                                                */}

                                                <div className="text-right ml-auto">
                                                    <h5 className="text-success"><b>{(annoncevente.price)} <small>FCFA</small></b></h5>
                                                </div>
                                            </div>


                                        </div>

                                        <div className="card">
                                            <div className="card-body">
                                                <h6 className="card-title">
                                                    Description
                                                </h6>
                                                <span>Eres' daring 'Grigri Fortune' swimsuit has
                                                    the fit and coverage of a bikini in a one-piece silhouette.
                                                    This fuchsia style is crafted from the label's sculpting peau
                                                    douce fabric and has flattering
                                                    cutouts through the torso and back. Wear yours with mirrored sunglasses on vacation.
                                                </span>
                                                <hr />
                                                <h6 className="card-title">
                                                    A L'interieur
                                                </h6>
                                                <span>Eres' daring 'Grigri Fortune' swimsuit has
                                                    the fit and coverage of a bikini in a one-piece silhouette.
                                                    This fuchsia style is crafted from the label's sculpting peau
                                                    douce fabric and has flattering
                                                    cutouts through the torso and back. Wear yours with mirrored sunglasses on vacation.
                                                </span>



                                            </div>
                                        </div>


                                        <div className="card">
                                            <div className="card-body">
                                                <div className="card-title">
                                                    <b>Contacter l'agence</b>
                                                </div>
                                                <div className="card-header d-flex align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        <NavLink to={`/@${annoncevente.user.slug}/`}>
                                                            <img src={annoncevente.user.avatar} style={{ height: "40px", width: "80px" }} alt={annoncevente.user.first_name} className="avatar" />
                                                        </NavLink>
                                                        <div className="mx-3">
                                                            <NavLink to={`/@${annoncevente.user.slug}/`} className="text-dark font-weight-600 text-sm"><b>{annoncevente.user.first_name}</b>
                                                                <small className="d-block text-muted">12 janv 2019</small>
                                                            </NavLink>
                                                        </div>
                                                    </div>
                                                    <div className="text-right ml-auto">
                                                        <Button className="btn btn-icon btn-sm btn-info" rel="tooltip" title="3426712192" data-placement="bottom">
                                                            <i className="now-ui-icons tech_mobile"/>
                                                        </Button>
                                                        <a href="https://www.kazoutech.com" className="btn btn-icon btn-sm btn-primary" target="_banck">
                                                            <i className="now-ui-icons objects_globe"/>
                                                        </a>

                                                        {!$guest && (
                                                            <>
                                                                {$userIvemo.id === annoncevente.user_id && (
                                                                    <>
                                                                        <NavLink to={`/annonces/`} className="btn btn-icon btn-sm btn-success" rel="tooltip" title="Editer" data-placement="bottom">
                                                                            <i className="now-ui-icons ui-1_simple-delete"/>
                                                                        </NavLink>
                                                                        <Button
                                                                            className="btn btn-icon btn-sm btn-danger" rel="tooltip" title="Supprimer" data-placement="bottom">
                                                                            <i className="now-ui-icons ui-1_simple-remove"/>
                                                                        </Button>{" "}
                                                                    </>
                                                                )}

                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="card-title">
                                                    <i className="now-ui-icons location_pin"/> <b>91 RUE DU FAUBOURG SAINT HONORE 75008 PARIS 8EME</b>
                                                    <br />
                                                    <div className="container">
                                                        <div className="row">
                                                            <div className="col-md-6 col-6">
                                                                <Link to={`/@${annoncevente.user.slug}/`} title={annoncevente.user.first_name}>
                                                                    <small><b>Consulter le profil de l'agence</b></small>
                                                                </Link>
                                                            </div>
                                                            <div className="col-md-6 col-6">
                                                                <a href="https://www.kazoutech.com" title="Site internet de agence">
                                                                    <small><b>Consulter le site de l'agence</b></small>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr />
                                                <b>Informations légales de l'agence</b>
                                                <br />
                                                <span>
                                                    EIFFEL HOUSING SAS, au capital de 10000,00€

                                                    Carte professionnelle 6282 délivrée par la Préfecture de Paris.

                                                    Siège : 91, rue du Faubourg Saint Honoré 75008 PARIS FRANCE

                                                    Garantie Financière Galian pour un montant de 120000,00€

                                                    RCS : Paris 801151929
                                                </span>

                                                <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                    <div className="card card-plain">
                                                        <div className="card-header" role="tab" id="headingOne">
                                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                <b>Envie de visiter ? Une question sur cet appartement ?</b>
                                                                <i className="now-ui-icons arrows-1_minimal-down"/>
                                                            </a>
                                                        </div>
                                                        <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                                            <div className="card-body">
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                                            <FormcontactuseronannonceventeShow {... this.props}/>


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

                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        <div className="submit text-center">
                                            <NavLink className="btn btn-danger" to={`/annonce/show/create/`}>
                                                <i className="now-ui-icons ui-1_simple-add"/> <b>Poster votre annonce</b>
                                            </NavLink>
                                        </div>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                            <div className="card-header d-flex align-items-center">
                                                                <div className="d-flex align-items-center">
                                                                    <NavLink to={`/@${annoncevente.user.slug}/`}>
                                                                        <img src={annoncevente.user.avatar} style={{ height: "40px", width: "80px" }} alt={annoncevente.user.first_name} className="avatar" />
                                                                    </NavLink>
                                                                    <div className="mx-3">
                                                                        <NavLink to={`/@${annoncevente.user.slug}/`} className="text-dark font-weight-600 text-sm"><b>{annoncevente.user.first_name}</b>
                                                                            <small className="d-block text-muted">12 janv 2019</small>
                                                                        </NavLink>
                                                                    </div>
                                                                </div>
                                                                <Button className="btn btn-sm btn-info" rel="tooltip" title="3426712192" data-placement="bottom">
                                                                    <i className="now-ui-icons tech_mobile"/>
                                                                </Button>
                                                                <a href="https://www.kazoutech.com" className="btn btn-sm btn-success" target="_banck">
                                                                    <i className="now-ui-icons ui-2_chat-round"/>
                                                                </a>
                                                            </div>
                                                            <div className="card-header text-center">
                                                                <div className="card-title">
                                                                    <a href="#pablo" className="btn btn-sm btn-outline-success">
                                                                        <i className="now-ui-icons tech_mobile"/> <b>3425712192 / 34569821 ou 677688066</b>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className="card-header text-center">
                                                                <div className="card-title">
                                                                    Contacter <b>{annoncevente.user.first_name} </b>
                                                                </div>
                                                            </div>

                                                                    <FormcontactuseronannonceventeShow {... this.props}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <AnnonceventeInteresseList {...this.props}/>

                                <BlogannonceventeIntesseAnnonseShow {...this.props} />

                            </div>

                        </div>

                        <FooterBigUserSite />
                    </div>
                </div>
            </>

        )
    }
}

export default Annonceventebycategorycityshow;
