import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import {Button, Form, Input, Navbar, UncontrolledTooltip} from "reactstrap";
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
import AnnoncelocationcommentIndex from "../../comments/AnnoncelocationcommentIndex";
import FieldInput from "../../../inc/vendor/FieldInput";
import moment from "moment";


class Annoncelocationbycategorycityshow extends Component {
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
            annoncelocation:{categoryannoncelocation:[],user:{profile:[]},city:[]},
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.favoriteItem = this.favoriteItem.bind(this);
        this.statusItem = this.statusItem.bind(this);
        this.statuscommentItem = this.statuscommentItem.bind(this);
        this.signalerUser = this.signalerUser.bind(this);


        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.handleCheckClick = this.handleCheckClick.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);
        this.signalemessageItem = this.signalemessageItem.bind(this);
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
            annoncelocation_id: this.state.annonceItem.id,
            full_name: this.state.full_name,
            object: this.state.object,
            message: this.state.message,
        };
        let url = route('signalannoncelocations.site');
        dyaxios.post(url, item)
            .then(() => {

                //Masquer le modal après la création
                $('#addNew').modal('hide');

                $.notify({
                        message: `Annonce signalé avec succès`
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


    favoriteItem(annoncelocation) {
        const url = route('favoriteannoncelocations_favorite.favorite', [annoncelocation.id]);
        dyaxios.get(url).then(() => {

            if(annoncelocation.bookmarked){
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
            }else {
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

    statuscommentItem(annoncelocation){
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
                let url = route('annonces_locations_status_comments.site',annoncelocation.id);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    if(annoncelocation.status_comments){
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

    statusItem(annoncelocation){
        Swal.fire({
            title: 'Changer le status de l\'annonce?',
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
                let url = route('annonces_locations_status.site',id);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    if(annoncelocation.status){
                        $.notify({
                                message: "Annonce masquée aux utilisateurs",
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
                                message: "Annonce activé avec succès",
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
        const {annoncelocation,annonceItem} = this.state;
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
                                                        <h5 className="text-dark"><b>{annoncelocation.price.formatMoney(2,'.',',')} <small><b>{$money_country} - le mois</b></small></b></h5>
                                                        :
                                                        <h5 className="text-dark"><b><Skeleton width={150} /></b></h5>
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
                                                                <Button onClick={() => this.favoriteItem(annoncelocation)}
                                                                        className="btn btn-danger btn-sm" title="Retirer de vos favoris">
                                                                    <i className="fas fa-bookmark"></i> <b>Sauvegardé</b>
                                                                </Button>
                                                            </>

                                                            :
                                                            <>
                                                                <Button onClick={() => this.favoriteItem(annoncelocation)}
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
                                                            {annoncelocation.price && (

                                                                <h3 className="text-dark"><b>{annoncelocation.price.formatMoney(2,'.',',')} <small>{$money_country} - le mois</small></b></h3>
                                                            )}
                                                        </div>
                                                        <div className="col-md-6">
                                                            <h5 className="info-title"><b>Informations suplementaires</b></h5>
                                                            {annoncelocation.award_price && (
                                                                <p>
                                                                    <b>Dépôt de garantie :</b>
                                                                    <span className="title text-dark"><b> {annoncelocation.award_price ? <>{annoncelocation.award_price.formatMoney(2,'.',',')} <small>{$money_country}</small></>:null} </b></span>
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-body">

                                              <ProfileForallAnnoncelocationShow {...annoncelocation} favoriteItem={this.favoriteItem}
                                                                                statuscommentItem={this.statuscommentItem}  statusItem={this.statusItem} deleteItem={this.deleteItem} signalerUser={this.signalerUser} copyToClipboard={this.copyToClipboard}/>

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


                                        {annoncelocation.status_comments ?

                                            <AnnoncelocationcommentIndex {...this.props} {...annoncelocation} />
                                            :
                                            <>
                                                {!$guest && (
                                                    <>
                                                        {($userIvemo.id === annoncelocation.user.id || $userIvemo.id === annoncelocation.user_id)  && (

                                                            <AnnoncelocationcommentIndex {...this.props} {...annoncelocation} />

                                                        )}
                                                    </>
                                                )}
                                            </>

                                        }

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
                                                                            <small className="d-block text-muted">{annoncelocation.statusOnline &&(<i className="fas fa-circle text-success"></i>)} {moment(annoncelocation.created_at).format('LL')}</small>
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

                                                        <p className="category">Spécifie le type d'erreur</p>

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
