import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {Button, Navbar, UncontrolledTooltip} from "reactstrap";
import NavUserSite from "../../inc/user/NavUserSite";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";
import FormcontactuseronlocationShow from "./inc/FormcontactuseronlocationShow";
import BlogannoncelocationIntesseAnnonseShow from "../blog/blogannoncelocation/BlogannoncelocationIntesseAnnonseShow";
import Swal from "sweetalert2";
import moment from "moment";


class Annoncelocationbycategorycityshow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annoncelocation:{categoryannoncelocation:[],user:{profile:[]},city:[]},
        };
        this.deleteItem = this.deleteItem.bind(this);
    }

    deleteItem(id) {
        Swal.fire({
            title: 'Confirmer la supression?',
            text: "êtes-vous sûr de vouloir executer cette action",
            type: 'warning',
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'Oui, confirmer',
            cancelButtonText: 'Non, annuller',
            showCancelButton: true,
            reverseButtons: true,
        }).then((result) => {
            if (result.value) {

                const url = route('annonces_locations_delete.site',[id]);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update',
                            message: 'Annonce suprimée avec success'
                        },
                        {
                            allow_dismiss: false,
                            type: 'primary',
                            placement: {
                                from: 'bottom',
                                align: 'right'
                            },
                            animate: {
                                enter: 'animated fadeInRight',
                                exit: 'animated fadeOutRight'
                            },
                        });
                    /** End alert ***/
                    this.props.history.push('/annonces_locations/locations/');
                }).catch(() => {
                    //Failled message
                    $.notify("Ooop! Une erreur est survenue", {
                        allow_dismiss: false,
                        type: 'danger',
                        animate: {
                            enter: 'animated bounceInDown',
                            exit: 'animated bounceOutUp'
                        }
                    });
                })
            }
        });
    }

    loadItems(){
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemCategoryannoncelocation = this.props.match.params.categoryannoncelocation;
        let itemCity = this.props.match.params.city;
        let itemdate = this.props.match.params.date;
        let itemannoncelocation = this.props.match.params.annoncelocation;
        let url = route('api.annoncelocationbycategoryannoncelocationslug_site',[itemannoncetype,itemCategoryannoncelocation,itemCity,itemdate,itemannoncelocation]);
        dyaxios.get(url).then(response => this.setState({annoncelocation: response.data,}));
    }

    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }
    render() {
        const {annoncelocation} = this.state;
        return (
            <>
                <Helmet>
                    <title>{`${annoncelocation.title || "Ivemo"}`} - Ivemo</title>
                </Helmet>

                <div className="landing-page sidebar-collapse">

                    <Navbar className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </Navbar>

                    <div className="wrapper">

                        <div className="main main-raised">

                            <div className="container">
                                <br />
                                <div className="row">

                                    <div className="col-lg-8 col-md-12 mx-auto">

                                        <div className="card-body">
                                            <div className="submit text-left">
                                                <button type="button" className="btn btn-neutral btn-sm" onClick={this.props.history.goBack}>
                                                    <i className="now-ui-icons arrows-1_minimal-left"/> <b>Retour à vos résultats </b>
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
                                                    <h6 className={`text-${annoncelocation.categoryannoncelocation.color_name} ml-auto mr-auto`}>
                                                        {annoncelocation.categoryannoncelocation.name}
                                                    </h6>
                                                </div>

                                                <div className="text-center ml-auto">
                                                    <h6 className="text-dark">{annoncelocation.pieces} pièces . {annoncelocation.rooms && (<>{annoncelocation.rooms} chambres</>)}. {annoncelocation.surface && (<>{annoncelocation.surface} m<sup>2</sup></>)}</h6>
                                                </div>

                                                {/*
                                                  <div className="text-center ml-auto">
                                                    <a href="#pablo" className="btn btn-primary btn-round">
                                                        <i className="now-ui-icons ui-2_favourite-28"></i> Dejà sauvegarder
                                                </a>
                                                </div>
                                                */}


                                                <div className="text-right ml-auto">
                                                    <h5 className="text-success"><b>{annoncelocation.price} <small>FCFA/mois</small></b></h5>
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
                                                        <NavLink to={`/@${annoncelocation.user.slug}/`}>
                                                            <img src={annoncelocation.user.avatar} style={{ height: "40px", width: "80px" }} alt={annoncelocation.user.first_name} className="avatar" />
                                                        </NavLink>
                                                        <div className="mx-3">
                                                            <NavLink to={`/@${annoncelocation.user.slug}/`} className="text-dark font-weight-600 text-sm"><b>{annoncelocation.user.first_name}</b>
                                                                <small className="d-block text-muted">{moment(annoncelocation.created_at).format('LL')}</small>
                                                            </NavLink>
                                                        </div>
                                                    </div>
                                                    <div className="text-right ml-auto">
                                                        <UncontrolledTooltip placement="bottom" target="TooltipPhone">
                                                            3425712192
                                                        </UncontrolledTooltip>
                                                        <Button className="btn btn-icon btn-sm btn-info" id="TooltipPhone">
                                                            <i className="now-ui-icons tech_mobile"/>
                                                        </Button>
                                                        {annoncelocation.user.profile.site_internet && (
                                                            <a href={`${annoncelocation.user.profile.site_internet}`} className="btn btn-icon btn-sm btn-primary" target="_banck">
                                                                <i className="now-ui-icons objects_globe"/>
                                                            </a>
                                                        )}

                                                        {!$guest && (
                                                            <>
                                                                {($userIvemo.id === annoncelocation.user.id || $userIvemo.id === annoncelocation.user_id) && (
                                                                    <>
                                                                        <UncontrolledTooltip placement="bottom" target="TooltipEditer">
                                                                            Editer cette annonce
                                                                        </UncontrolledTooltip>
                                                                        <NavLink to={`/annonces/`} className="btn btn-icon btn-sm btn-success" id="TooltipEditer">
                                                                            <i className="now-ui-icons ui-1_simple-delete"/>
                                                                        </NavLink>

                                                                        <UncontrolledTooltip placement="bottom" target="TooltipDelete">
                                                                            Supprimer cette annonce
                                                                        </UncontrolledTooltip>
                                                                        <Button onClick={() => this.deleteItem(annoncelocation.id)}
                                                                                className="btn btn-icon btn-sm btn-danger" id="TooltipDelete">
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
                                                                <UncontrolledTooltip placement="bottom" target="TooltipShowprofile">
                                                                    Profile de l'agence
                                                                </UncontrolledTooltip>
                                                                <Link to={`/@${annoncelocation.user.slug}/annonces_locations/`} title="Profil agence" id="TooltipShowprofile">
                                                                    <small><b>Consulter le profil de l'agence</b></small>
                                                                </Link>
                                                            </div>
                                                            {annoncelocation.user.profile.site_internet && (
                                                                <div className="col-md-6 col-6">
                                                                    <a href={`${annoncelocation.user.profile.site_internet}`} title="Site internet de agence">
                                                                        <small><b>Consulter le site de l'agence</b></small>
                                                                    </a>
                                                                </div>
                                                            )}

                                                        </div>
                                                    </div>
                                                </div>
                                                <hr />
                                                {annoncelocation.user.profile.description && (
                                                    <>
                                                        <b>Informations légales de l'agence</b>
                                                        <br />
                                                        <span>
                                                    EIFFEL HOUSING SAS, au capital de 10000,00€

                                                    Carte professionnelle 6282 délivrée par la Préfecture de Paris.

                                                    Siège : 91, rue du Faubourg Saint Honoré 75008 PARIS FRANCE

                                                    Garantie Financière Galian pour un montant de 120000,00€

                                                    RCS : Paris 801151929
                                                    </span>
                                                    </>
                                                )}


                                                <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                    <div className="card card-plain">
                                                        <div className="card-header" role="tab" id="headingOne">
                                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                <b>Envie de visiter ? Une question sur cet(te) {annoncelocation.categoryannoncelocation.name} ?</b>
                                                                <i className="now-ui-icons arrows-1_minimal-down"></i>
                                                            </a>
                                                        </div>
                                                        <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                                            <div className="card-body">
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                                            <FormcontactuseronlocationShow {...this.props}/>

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
                                                <i className="now-ui-icons ui-1_simple-add"></i> <b>Poster votre annonce</b>
                                            </NavLink>
                                        </div>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                            <div className="card-header d-flex align-items-center">
                                                                <div className="d-flex align-items-center">
                                                                    <NavLink to={`/@${annoncelocation.user.slug}/`}>
                                                                        <img src={annoncelocation.user.avatar} style={{ height: "40px", width: "80px" }} alt={annoncelocation.user.first_name} className="avatar" />
                                                                    </NavLink>
                                                                    <div className="mx-3">
                                                                        <NavLink to={`/@${annoncelocation.user.slug}/`} className="text-dark font-weight-600 text-sm"><b>{annoncelocation.user.first_name}</b>
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
                                                                    Contacter <b>{annoncelocation.user.first_name} </b>
                                                                </div>
                                                            </div>

                                                            <FormcontactuseronlocationShow {...this.props}/>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>


                                <BlogannoncelocationIntesseAnnonseShow {...this.props} />



                            </div>



                        </div>




                        <FooterBigUserSite />
                    </div>
                </div>
            </>



        )
    }
}

export default Annoncelocationbycategorycityshow;
