import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import {Button, Navbar, UncontrolledTooltip} from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import FormcontactuseronlocationShow from "./inc/FormcontactuseronlocationShow";
import BlogannoncelocationIntesseAnnonseShow from "../../blog/blogannoncelocation/BlogannoncelocationIntesseAnnonseShow";
import Swal from "sweetalert2";
import AnnoncelocationInteresse from "./AnnoncelocationInteresse";
import Skeleton from "react-loading-skeleton";
import ProfileForallAnnoncelocationShow from "./inc/ProfileForallAnnoncelocationShow";
import Navlinknewannoncelocation from "./treatment/Navlinknewannoncelocation";
import HelmetSite from "../../../inc/user/HelmetSite";
import ButonFavoris from "../../../inc/vendor/ButonFavoris";


class Annoncelocationbycategorycityshow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annoncelocation:{categoryannoncelocation:[],user:{profile:[]},city:[]},
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.favoriteItem = this.favoriteItem.bind(this);
        this.unfavoriteItem = this.unfavoriteItem.bind(this);
        this.unactiveItem = this.unactiveItem.bind(this);
    }

    favoriteItem(id) {
        const url = route('favoriteannoncelocations_favorite.favorite', [id]);
        dyaxios.get(url).then(() => {
            $.notify({
                    message: "Annonce ajoutée à vos favoris",
                },
                {
                    allow_dismiss: false,
                    type: 'info',
                    placement: {
                        from: 'bottom',
                        align: 'center'
                    },
                    animate: {
                        enter: "animate__animated animate__fadeInUp",
                        exit: "animate__animated animate__fadeOutDown"
                    },
                });
            this.loadItems();

        }).catch(() => {
            //Failled message
            $.notify("Ooop! Something wrong. Try later", {
                type: 'danger',
                animate: {
                    enter: 'animate__animated animate__bounceInDown',
                    exit: 'animate__animated animate__bounceOutUp'
                }
            });
        })
    }

    unfavoriteItem(id) {
        const url = route('favoriteannoncelocations_unfavorite.unfavorite', [id]);
        dyaxios.get(url).then(() => {
            $.notify({
                    message: "Annonce retirée de vos favoris",
                },
                {
                    allow_dismiss: false,
                    type: 'info',
                    placement: {
                        from: 'bottom',
                        align: 'center'
                    },
                    animate: {
                        enter: "animate__animated animate__fadeInUp",
                        exit: "animate__animated animate__fadeOutDown"
                    },
                });
            this.loadItems();

        }).catch(() => {
            //Failled message
            $.notify("Ooop! Something wrong. Try later", {
                type: 'danger',
                animate: {
                    enter: 'animate__animated animate__bounceInDown',
                    exit: 'animate__animated animate__bounceOutUp'
                }
            });
        })
    }

    copyToClipboard(){
        navigator.clipboard.writeText(window.location.toString());
        $.notify({
            message: "Lien copié correctement avec succès",
        },{
            allow_dismiss: false,
            type: 'success',
            placement: {
                from: 'top',
                align: 'center'
            },
            animate: {
                enter: "animate__animated animate__fadeInDown",
                exit: "animate__animated animate__fadeOutUp"
            },
        });
    }

    unactiveItem(id){
        Swal.fire({
            title: 'Désactiver l\'annonce?',
            text: "êtes vous sure de vouloir confirmer cette action?",
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

                //Envoyer la requet au server
                let url = route('annonces_locations_unactivated.site',id);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            message: "Cette annonce a été masquée au utilisateur",
                        },
                        {
                            allow_dismiss: false,
                            type: 'info',
                            placement: {
                                from: 'bottom',
                                align: 'center'
                            },
                            animate: {
                                enter: "animate__animated animate__fadeInUp",
                                exit: "animate__animated animate__fadeOutDown"
                            },
                        });
                    /** End alert ***/
                    this.props.history.push("/annonces_locations/"+ this.props.match.params.annoncetype +"/");
                }).catch(() => {
                    //Failled message
                    $.notify("Ooop! Something wrong. Try later", {
                        type: 'danger',
                        animate: {
                            enter: 'animate__animated animate__bounceInDown',
                            exit: 'animate__animated animate__bounceOutUp'
                        }
                    });
                })
            }
        })

    }

    deleteItem(id) {
        Swal.fire({
            title: 'Confirmer la supression?',
            text: "êtes-vous sûr de vouloir executer cette action?",
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
                            message: 'Annonce suprimée avec succès'
                        },
                        {
                            allow_dismiss: false,
                            type: 'primary',
                            placement: {
                                from: 'bottom',
                                align: 'right'
                            },
                            animate: {
                                enter: 'animate__animated animate__fadeInRight',
                                exit: 'animate__animated animate__fadeOutRight'
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
                            enter: 'animate__animated animate__bounceInDown',
                            exit: 'animate__animated animate__bounceOutUp'
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
        let itemannoncelocation = this.props.match.params.annoncelocation;
        let url = route('api.annoncelocationbycategoryannoncelocationslug_site',[itemannoncetype,itemCategoryannoncelocation,itemCity,itemannoncelocation]);
        dyaxios.get(url).then(response => this.setState({annoncelocation: response.data,}));
    }

    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }
    getDescription(annoncelocation) {
        return { __html: (annoncelocation.description) };
    }
    render() {
        const {annoncelocation} = this.state;
        return (
            <>
                <HelmetSite title={`${annoncelocation.title || $name_site} - ${$name_site}`}/>

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
                                                    <i className="now-ui-icons arrows-1_minimal-left"/> <b>Retour au annonces </b>
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
                                                    {annoncelocation.categoryannoncelocation.name ?
                                                        <h6 className={`text-${annoncelocation.categoryannoncelocation.color_name} ml-auto mr-auto`}>
                                                            {annoncelocation.categoryannoncelocation.name}
                                                        </h6>
                                                        :
                                                        <h6 className={`ml-auto mr-auto`}>
                                                            <Skeleton width={150} />
                                                        </h6>
                                                    }
                                                </div>

                                                <div className="text-center ml-auto">
                                                    <h6 className="text-dark">{annoncelocation.pieces} p . {annoncelocation.rooms && (<>{annoncelocation.rooms} ch</>)}. {annoncelocation.surface && (<>{annoncelocation.surface} m<sup>2</sup></>)}</h6>
                                                </div>

                                                <div className="text-right ml-auto">
                                                    {annoncelocation.price ?
                                                        <h5 className="text-success"><b>{annoncelocation.price.formatMoney(2,'.',',')} <small>FCFA/mois</small></b></h5>
                                                        :
                                                        <h5 className="text-success"><b><Skeleton width={150} /></b></h5>
                                                    }
                                                </div>
                                            </div>

                                            <div className="text-center">
                                                {$guest ?
                                                    <Button data-toggle="modal" data-target="#loginModal"
                                                            className="btn btn-facebook btn-sm btn-neutral btn-round" title="Ajouter à vos favoris">
                                                        <i className="far fa-bookmark"></i> <b>Sauvegarder</b>
                                                    </Button>
                                                    :
                                                    <>
                                                        {annoncelocation.bookmarked ?

                                                            <>
                                                                <Button onClick={() => this.unfavoriteItem(annoncelocation.id)}
                                                                        className="btn btn-danger btn-sm" title="Retirer de vos favoris">
                                                                    <i className="fas fa-bookmark"></i> <b>Sauvegardé</b>
                                                                </Button>
                                                            </>

                                                            :
                                                            <>
                                                                <Button onClick={() => this.favoriteItem(annoncelocation.id)}
                                                                        className="btn btn-facebook btn-sm btn-neutral" title="Ajouter à vos favoris">
                                                                    <i className="far fa-bookmark"></i> <b>Sauvegarder</b>
                                                                </Button>
                                                            </>
                                                        }
                                                    </>
                                                }
                                            </div>

                                        </div>

                                        <div className="card">
                                            <div className="card-body">
                                                <h5 className="card-title">
                                                    À propos de <b>{annoncelocation.categoryannoncelocation.label} {annoncelocation.pieces} pièces à {annoncelocation.district}</b>
                                                </h5>

                                                {annoncelocation.description ? <span className="title text-justify" dangerouslySetInnerHTML={this.getDescription(annoncelocation)} />: <Skeleton count={3}/>}

                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="social-line social-line-big-icons">
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <h5 className="info-title"><b>Le loyer mensuel est de</b></h5>
                                                            {annoncelocation.price ?
                                                                <h3 className="text-success"><b>{annoncelocation.price.formatMoney(2,'.',',')} <small>FCFA/mois</small></b></h3>
                                                                :
                                                                <h5 className="text-success"><b><Skeleton width={150} /></b></h5>
                                                            }
                                                        </div>
                                                        <div className="col-md-6">
                                                            <h5 className="info-title"><b>Informations suplementaires</b></h5>
                                                            <p>
                                                                <b>Dépôt de garantie :</b>
                                                                <span className="title text-dark"><b> {annoncelocation.award_price ? <>{annoncelocation.award_price.formatMoney(2,'.',',')} <small>FCFA</small></>:null} </b></span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-body">

                                              <ProfileForallAnnoncelocationShow {...annoncelocation} favoriteItem={this.favoriteItem} unfavoriteItem={this.unfavoriteItem} deleteItem={this.deleteItem} unactiveItem={this.unactiveItem} copyToClipboard={this.copyToClipboard}/>

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
                                            <Navlinknewannoncelocation {...this.props} />
                                        </div>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                            <div className="card-header d-flex align-items-center">
                                                                <div className="d-flex align-items-center">
                                                                    {annoncelocation.user.avatar ?
                                                                        <NavLink to={`/pro/${annoncelocation.user.slug}/annonces_locations/`}>
                                                                            <img src={annoncelocation.user.avatar}
                                                                                 style={{ height: "40px", width: "80px" }}
                                                                                 alt={annoncelocation.user.first_name}
                                                                                 className="avatar" />
                                                                        </NavLink>
                                                                        : <Skeleton circle={false} height={40} width={80} />}
                                                                    <div className="mx-3">
                                                                        <NavLink to={`/pro/${annoncelocation.user.slug}/annonces_locations/`} className="text-dark font-weight-600 text-sm"><b>{annoncelocation.user.first_name}</b>
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
                                                                    Contacter <b>{annoncelocation.user.first_name}</b> pour ce bien
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

                                <AnnoncelocationInteresse {...this.props}/>

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
