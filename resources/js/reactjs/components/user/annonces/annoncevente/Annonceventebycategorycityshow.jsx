import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import {Button, Form, Input} from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import BlogannonceventeIntesseAnnonseShow from "../../blog/blognnoncevente/BlogannonceventeIntesseAnnonseShow";
import FormcontactuseronannonceventeShow from "./inc/FormcontactuseronannonceventShow";
import AnnonceventeInteresse from "./AnnonceventeInteresse";
import Skeleton from "react-loading-skeleton";
import ProfileForallAnnonceventeShow from "./ProfileForallAnnonceventeShow";
import Swal from "sweetalert2";
import Navlinknewannoncevente from "./treatment/Navlinknewannoncevente";
import HelmetSite from "../../../inc/user/HelmetSite";
import AnnoncereseventecommentIndex from "../../comments/AnnoncereseventecommentIndex";
import FieldInput from "../../../inc/vendor/FieldInput";
import moment from "moment";


class Annonceventebycategorycityshow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            full_name: '',
            message: '',
            subject: '',
            object: 'Annonce double',
            errors: [],
            annonceItem: { user: [] },
            annoncevente:{annoncetype:[],categoryannoncevente:[],user:{profile:[]},imagereservations:[]},
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.favoriteItem = this.favoriteItem.bind(this);
        this.statusItem = this.statusItem.bind(this);
        this.statuscommentItem = this.statuscommentItem.bind(this);
        this.signalerUser = this.signalerUser.bind(this);
        this.signalemessageItem = this.signalemessageItem.bind(this);

        this.renderErrorFor = this.renderErrorFor.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.handleCheckClick = this.handleCheckClick.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);

    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
        this.state.errors[event.target.name] = '';
    }

    handleCheckClick(event) {
        this.setState({
            object: event.target.value
        });

    };
    // Handle Errors
    hasErrorFor(field) {
        return !!this.state.errors[field];
    }

    renderErrorFor(field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }

    signalerUser(item) {
        $('#addNew').modal('show');
        this.setState({
            annonceItem: item
        });
    }

    signalemessageItem(e) {
        e.preventDefault();

        let item = {
            email: this.state.email,
            annoncevente_id: this.state.annonceItem.id,
            full_name: this.state.full_name,
            object: this.state.object,
            message: this.state.message,
        };
        let url = route('signalannonceventes.site');
        dyaxios.post(url, item)
            .then(() => {

                //Masquer le modal après la création
                $('#addNew').modal('hide');

                $.notify({
                        message: `Cette annonce a été signalé avec succès`
                    },
                    {
                        allow_dismiss: false,
                        type: 'info',
                        placement: {
                            from: 'top',
                            align: 'center'
                        },
                        animate: {
                            enter: "animate__animated animate__fadeInDown",
                            exit: "animate__animated animate__fadeOutUp"
                        },
                    });

                this.setState({
                    email: "",
                    full_name: "",
                    message: "",
                });
            }).catch(error => {
            this.setState({
                errors: error.response.data.errors
            });
        })
    }

    favoriteItem(annoncevente) {
        const url = route('favoriteannonceventes_favorite.favorite', [annoncevente.id]);
        dyaxios.get(url).then(() => {

            if(annoncevente.bookmarked){
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
            }else {
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
            }
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

    statuscommentItem(annoncevente){
        Swal.fire({
            text: "êtes vous sure de vouloir changer le status des commentaires de cette annonce?",
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
                let url = route('annonces_ventes_status_comments.site',annoncevente.id);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    if(annoncevente.status_comments){
                        $.notify({

                                message: "Commentaire desactivé sur cette annonce",
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
                    }else {
                        $.notify({

                                message: "Commentaire activés sur cette annonce",
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
                    }

                    /** End alert ***/
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
        })

    }

    statusItem(annoncevente){
        Swal.fire({
            title: 'Changer le status l\'annonce?',
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
                let url = route('annonces_ventes_status.site',annoncevente.id);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({

                            //message: 'Annonce désactiver avec succès',
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
                    this.props.history.push("/annonces_ventes/"+ this.props.match.params.annoncetype +"/");
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

                let isNotId = data => data.id !== id;
                let updatedItems = this.state.annoncevente.filter(isNotId);
                this.setState({ annoncevente: updatedItems });

                const url = route('annonces_ventes_delete.site',[id]);
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
                    this.props.history.push(`/`);

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
        let itemCategoryannoncevente = this.props.match.params.categoryannoncevente;
        let itemcityannonce = this.props.match.params.city;
        let itemannoncevente = this.props.match.params.annoncevente;
        /*Ici c'est pour recuperer les annonce par villes*/
        let url = route('api.annonceventebycategoryannonceventeslug_site',[itemannoncetype,itemCategoryannoncevente,itemcityannonce,itemannoncevente]);
        dyaxios.get(url).then(response => this.setState({annoncevente: response.data,}));
    }

    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    getDescription(annoncevente) {
        return { __html: (annoncevente.description) };
    }
    render() {
        const {annoncevente,annonceItem} = this.state;
        return (
            <>
                <HelmetSite title={`${annoncevente.title || $name_site} - ${$name_site}`}/>

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

                                                <div className="text-center ml-auto">
                                                    <h6 className="text-dark">{annoncevente.pieces} p . {annoncevente.rooms && (<>{annoncevente.rooms} ch</>)}. {annoncevente.surface && (<>{annoncevente.surface} m<sup>2</sup></>)}</h6>
                                                </div>

                                                <div className="text-right ml-auto">
                                                {annoncevente.price ?
                                                    <h5 className="text-dark"><b>{annoncevente.price.formatMoney(2,'.',',')} {$money_country.length > 2 ? <small><b>{$money_country}</b></small> : <>{$money_country}</>}</b></h5>
                                                        :
                                                        null
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
                                                        {annoncevente.bookmarked ?

                                                            <>
                                                                <Button onClick={() => this.favoriteItem(annoncevente)}
                                                                        className="btn btn-danger btn-sm" title="Retirer de vos favoris">
                                                                    <i className="fas fa-bookmark"></i> <b>Sauvegardé</b>
                                                                </Button>
                                                            </>

                                                            :
                                                            <>
                                                                <Button onClick={() => this.favoriteItem(annoncevente)}
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
                                                <h6 className="card-title">
                                                    Description
                                                </h6>

                                                {annoncevente.description ? <span className="title text-justify" dangerouslySetInnerHTML={this.getDescription(annoncevente)} />: <Skeleton count={3}/>}

                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="social-line social-line-big-icons">
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <h5 className="info-title"><b>Ce bien est au prix de</b></h5>
                                                            {annoncevente.price && (
                                                                <h3 className="text-dark"><b>{annoncevente.price.formatMoney(2,'.',',')} {$money_country.length > 2 ? <small><b>{$money_country}</b></small> : <>{$money_country}</>}</b></h3>
                                                            )}
                                                        </div>
                                                        <div className="col-md-6">
                                                            <h5 className="info-title"><b>Informations suplementaires</b></h5>
                                                            {annoncevente.award_price && (
                                                                <p>
                                                                    <b>Ce bien revient a :</b>
                                                                    <span className="title text-dark"><b> {annoncevente.award_price ? <>{annoncevente.award_price.formatMoney(2,'.',',')} {$money_country.length > 2 ? <small><b>{$money_country} - le m<sup>2</sup></b></small> : <>{$money_country}<small><b> - le m<sup>2</sup></b></small></>}</>:null} </b></span>
                                                                </p>
                                                            )}

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-body">

                                                <ProfileForallAnnonceventeShow {...annoncevente} favoriteItem={this.favoriteItem}
                                                                                statusItem={this.statusItem} signalerUser={this.signalerUser}
                                                                               statuscommentItem={this.statuscommentItem} copyToClipboard={this.copyToClipboard}/>

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

                                        {/* Ici l'utilisateur peux masquer le commentaire*/}

                                        {annoncevente.status_comments ?

                                            <AnnoncereseventecommentIndex {...this.props} {...annoncevente} />
                                            :
                                            <>
                                                {!$guest && (
                                                   <>
                                                       {($userIvemo.id === annoncevente.user.id || $userIvemo.id === annoncevente.user_id)  && (

                                                           <AnnoncereseventecommentIndex {...this.props} {...annoncevente} />

                                                       )}
                                                   </>
                                                )}
                                            </>

                                        }



                                    </div>

                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        <div className="submit text-center">
                                            <Navlinknewannoncevente {...this.props}/>
                                        </div>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                            <div className="card-header d-flex align-items-center">
                                                                <div className="d-flex align-items-center">
                                                                    {annoncevente.user.avatar ?
                                                                        <NavLink to={`/pro/${annoncevente.user.slug}/annonces_ventes/`}>
                                                                            <img src={annoncevente.user.avatar}
                                                                                 style={{ height: "40px", width: "80px" }}
                                                                                 alt={annoncevente.user.first_name}
                                                                                 className="avatar" />
                                                                        </NavLink>
                                                                        : <Skeleton circle={false} height={40} width={80} />}
                                                                        <div className="mx-3">
                                                                            <NavLink to={`/pro/${annoncevente.user.slug}/annonces_ventes/`} className="text-dark font-weight-600 text-sm"><b>{annoncevente.user.first_name}</b>
                                                                                <small className="d-block text-muted">{annoncevente.statusOnline &&(<i className="fas fa-circle text-success"></i>)} {moment(annoncevente.user.created_at).format('LL')}</small>
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
                                                                    Contacter <b>{annoncevente.user.first_name}</b> pour ce bien
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

                                <AnnonceventeInteresse {...this.props}/>

                                <BlogannonceventeIntesseAnnonseShow {...this.props} />


                                <div className="modal fade" id="addNew" tabIndex="-1" role="dialog" aria-labelledby="addNewLabel"
                                     aria-hidden="true">
                                    <div className="modal-dialog modal-lg">
                                        <div className="modal-content">
                                            <div className="modal-header">
                                                <h5 className="modal-title"><b>Signaler des erreurs publicitaires</b></h5>
                                                <button type="button" className="close" data-dismiss="modal"
                                                        aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </div>

                                            <Form role="form" onSubmit={this.signalemessageItem} acceptCharset="UTF-8">

                                                <div className="modal-body">

                                                    <div className="card-body">

                                                        <div className="alert alert-danger text-center" role="alert">
                                                            <div className="container">
                                                                {annonceItem.title}
                                                            </div>
                                                        </div>

                                                        <p className="category">Spécifier le type d'erreur</p>

                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="form-check form-check-radio">
                                                                    <label className="form-check-label">
                                                                        <Input className="form-check-input" type="radio"
                                                                               name="object" id="object"
                                                                               value="Annonce double" onChange={this.handleCheckClick} checked={this.state.object === "Annonce double"} />
                                                                        <span className="form-check-sign"></span>
                                                                        Annonce double
                                                                    </label>
                                                                </div>
                                                                <div className="form-check form-check-radio">
                                                                    <label className="form-check-label">
                                                                        <input className="form-check-input" type="radio"
                                                                               name="object" id="object"
                                                                               value="Mauvaise catégorie" onChange={this.handleCheckClick} checked={this.state.object === "Mauvaise catégorie"} />
                                                                        <span className="form-check-sign"></span>
                                                                        Mauvaise catégorie
                                                                    </label>
                                                                </div>
                                                                <div className="form-check form-check-radio">
                                                                    <label className="form-check-label">
                                                                        <input className="form-check-input" type="radio"
                                                                               name="object" id="object"
                                                                               value="Mauvaise ville" onChange={this.handleCheckClick} checked={this.state.object === "Mauvaise ville"} />
                                                                        <span className="form-check-sign"></span>
                                                                        Mauvaise ville
                                                                    </label>
                                                                </div>
                                                                <div className="form-check form-check-radio">
                                                                    <label className="form-check-label">
                                                                        <Input className="form-check-input" type="radio"
                                                                               name="object" id="object"
                                                                               value="Téléphone / e-mail incorrect" onChange={this.handleCheckClick} checked={this.state.object === "Téléphone / e-mail incorrect"} />
                                                                        <span className="form-check-sign"></span>
                                                                        Téléphone / e-mail incorrect
                                                                    </label>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6">
                                                                <div className="form-check form-check-radio">
                                                                    <label className="form-check-label">
                                                                        <Input className="form-check-input" type="radio"
                                                                               name="object" id="object"
                                                                               value="Erreur d'adresse / de carte" onChange={this.handleCheckClick} checked={this.state.object === "Erreur d'adresse / de carte"} />
                                                                        <span className="form-check-sign"></span>
                                                                        Erreur d'adresse / de carte
                                                                    </label>
                                                                </div>

                                                                <div className="form-check form-check-radio">
                                                                    <label className="form-check-label">
                                                                        <Input className="form-check-input" type="radio"
                                                                               name="object" id="object"
                                                                               value="Propriété inexistante" onChange={this.handleCheckClick} checked={this.state.object === "Propriété inexistante"} />
                                                                        <span className="form-check-sign"></span>
                                                                        Propriété inexistante
                                                                    </label>
                                                                </div>
                                                                <div className="form-check form-check-radio">
                                                                    <label className="form-check-label">
                                                                        <Input className="form-check-input" type="radio"
                                                                               name="object" id="object"
                                                                               value="Arnaque possible" onChange={this.handleCheckClick} checked={this.state.object === "Arnaque possible"} />
                                                                        <span className="form-check-sign"></span>
                                                                        Arnaque possible
                                                                    </label>
                                                                </div>
                                                                <div className="form-check form-check-radio">
                                                                    <label className="form-check-label">
                                                                        <Input className="form-check-input" type="radio"
                                                                               name="object" id="object"
                                                                               value="Autre (précisez dans le commentaire)" onChange={this.handleCheckClick} checked={this.state.object === "Autre (précisez dans le commentaire)"} />
                                                                        <span className="form-check-sign"></span>
                                                                        Autre (précisez dans le commentaire)
                                                                    </label>
                                                                </div>
                                                            </div>

                                                        </div>

                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                            <span className="input-group-text">
                                                                                <i className="now-ui-icons users_circle-08" /></span>
                                                                    </div>
                                                                    <FieldInput name="full_name" type='text' minLength="4" maxLength="50" placeholder="Nom complete" value={this.state.full_name}
                                                                                handleFieldChange={this.handleFieldChange}
                                                                                hasErrorFor={this.hasErrorFor}
                                                                                required="required"
                                                                                renderErrorFor={this.renderErrorFor}/>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="input-group">
                                                                    <div className="input-group-prepend">
                                                                            <span className="input-group-text">
                                                                                <i className="now-ui-icons ui-1_email-85" /></span>
                                                                    </div>
                                                                    <FieldInput name="email" type='email' minLength="3" maxLength="50" placeholder="Email" value={this.state.email}
                                                                                handleFieldChange={this.handleFieldChange}
                                                                                hasErrorFor={this.hasErrorFor}
                                                                                required="required"
                                                                                renderErrorFor={this.renderErrorFor}/>
                                                                </div>
                                                            </div>

                                                        </div>

                                                        <div className="row">

                                                            <div className="input-group">
                                                                <FieldInput name="message" type='textarea' minLength="5" maxLength="5000" placeholder="Pourquoi signalez-vous cette article ?" value={this.state.message}
                                                                            handleFieldChange={this.handleFieldChange}
                                                                            hasErrorFor={this.hasErrorFor}
                                                                            required="required"
                                                                            renderErrorFor={this.renderErrorFor} rows="17"/>
                                                            </div>
                                                        </div>


                                                        <div className="submit text-center">
                                                            <button className="btn btn-primary btn-lg btn-block" type="submit">
                                                                <b>Signaler</b>
                                                            </button>
                                                        </div>


                                                    </div>

                                                </div>

                                            </Form>


                                        </div>
                                    </div>
                                </div>

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
