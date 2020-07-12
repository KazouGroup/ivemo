import React, { Component, Fragment } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Button, Form, Input } from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import AnnonceventeList from "./inc/AnnonceventeList";
import Categoriesannoncevente from "./inc/Categoriesannoncevente";
import AnnoncesListSkeleton from "../../../inc/user/annonce/AnnoncesListSkeleton";
import Swal from "sweetalert2";
import LinkValicationEmail from "../../../inc/user/LinkValicationEmail";
import FormModalContactannonceUser from "../../../inc/user/annonce/FormModalContactannonceUser";
import Navlinknewannoncevente from "./treatment/Navlinknewannoncevente";
import HelmetSite from "../../../inc/user/HelmetSite";


class AnnonceventeIndex extends Component {
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
            annonceventes: { annoncetype: [], categoryannoncevente: [], city: [], user: [] },
        };


        this.favoriteItem = this.favoriteItem.bind(this);
        this.statusItem = this.statusItem.bind(this);
        this.signalerUser = this.signalerUser.bind(this);
        this.signalemessageItem = this.signalemessageItem.bind(this);
        this.contactUser = this.contactUser.bind(this);
        this.sendmessageItem = this.sendmessageItem.bind(this);
        this.handleCheckClick = this.handleCheckClick.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);

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

    favoriteItem(item) {
        const url = route('favoriteannonceventes_favorite.favorite', [item.id]);
        dyaxios.get(url).then(() => {

            if(item.bookmarked){
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

    signalerUser(item) {
        $('#addNew').modal('show');
        this.setState({
            annonceItem: item
        });
    }

    contactUser(item) {
        $('#contactNew').modal('show');
        this.setState({
            annonceItem: item
        });
    }

    sendmessageItem(e) {
        e.preventDefault();

        let item = {
            email: this.state.email,
            full_name: this.state.full_name,
            phone: this.state.phone,
            subject: this.state.subject,
            user_id: this.state.annonceItem.user.id,
            annoncevente_id: this.state.annonceItem.id,
            message: this.state.message,
        };
        let url = route('contactusersventes.site');
        dyaxios.post(url, item)
            .then(() => {

                //Masquer le modal après la création
                $('#contactNew').modal('hide');

                $.notify({
                    message: `Votre message a bien été envoyé à cette utilisateur`
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
                    phone: "",
                    subject: "",
                    message: "",
                });
            }).catch(error => {
                this.setState({
                    errors: error.response.data.errors
                });
            })
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

    statusItem(item) {
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

                let isNotId = data => data.id !== item.id;
                let updatedItems = this.state.annonceventes.filter(isNotId);
                this.setState({ annonceventes: updatedItems });

                //Envoyer la requet au server
                let url = route('annonces_ventes_status.site', item.id);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    if(item.status){
                        $.notify({

                                //message: 'Annonce désactiver avec succès',
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

                                //message: 'Annonce désactiver avec succès',
                                message: "Annonce masquée visible aux utilisateurs",
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

    loadItems() {
        let itemAnnoncevente = this.props.match.params.annoncetype;
        let url = route('api.annonceventebyannoncetype_site', itemAnnoncevente);
        dyaxios.get(url).then(response => this.setState({ annonceventes: response.data }));
    }
    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    render() {
        const { annonceventes, annonceItem } = this.state;
        const mapAnnonceventes = annonceventes.length >= 0 ? (
            annonceventes.map(item => {
                return (
                    <AnnonceventeList key={item.id} {...item} favoriteItem={this.favoriteItem} statusItem={this.statusItem} signalerUser={this.signalerUser} contactUser={this.contactUser} />
                )
            })
        ) : (
                <AnnoncesListSkeleton />
            );
        return (
            <Fragment>
                <HelmetSite title={`Vendez un terrain, une maison, un appartement ou une boutique et plusieurs autres de vos biens - ${$name_site}`} />

                <div className="landing-page sidebar-collapse">


                    <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent" color-on-scroll="400">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">
                        <div className="page-header page-header-mini">
                            <div className="page-header-image" data-parallax="true" style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg32.jpg' + ")" }}>
                            </div>
                            <div className="content-center">
                                <div className="row">
                                    <div className="col-md-10 ml-auto mr-auto">
                                        <div className="text-center">
                                            <h3 className="title">Vendre ou acheter des biens</h3>
                                            <p className="description">
                                                <b> Vendez un terrain, une maison, un appartement ou une boutique </b>
                                            </p>
                                        </div>
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

                                        {!$guest && (
                                            <>
                                                {!$userIvemo.email_verified_at && (
                                                    <LinkValicationEmail />
                                                )}
                                            </>
                                        )}

                                        {mapAnnonceventes}

                                    </div>


                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        <div className="submit text-center">
                                            <Navlinknewannoncevente {...this.props} />
                                        </div>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                            <Categoriesannoncevente />

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
                                                                        <input id='full_name'
                                                                            type='text'
                                                                            required="required"
                                                                            className={`form-control ${this.hasErrorFor('full_name') ? 'is-invalid' : ''}`}
                                                                            name='full_name'
                                                                            placeholder="Nom complet"
                                                                            aria-label="Nom complet"
                                                                            autoComplete="full_name"
                                                                            value={this.state.full_name}
                                                                            onChange={this.handleFieldChange}
                                                                        />
                                                                        {this.renderErrorFor('full_name')}
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="input-group">
                                                                        <div className="input-group-prepend">
                                                                            <span className="input-group-text">
                                                                                <i className="now-ui-icons ui-1_email-85" /></span>
                                                                        </div>
                                                                        <input id='email'
                                                                            type='email'
                                                                            required="required"
                                                                            className={`form-control ${this.hasErrorFor('email') ? 'is-invalid' : ''}`}
                                                                            name='email'
                                                                            placeholder="Email"
                                                                            aria-label="Email"
                                                                            autoComplete="email"
                                                                            value={this.state.email}
                                                                            onChange={this.handleFieldChange}
                                                                        />
                                                                        {this.renderErrorFor('email')}
                                                                    </div>
                                                                </div>

                                                            </div>

                                                            <div className="row">

                                                                <div className="input-group">
                                                                    <textarea name="message" value={this.state.message}
                                                                        onChange={this.handleFieldChange}
                                                                        placeholder={'Pourquoi signalez-vous cette article?'}
                                                                        className={`form-control ${this.hasErrorFor('message') ? 'is-invalid' : ''} form-control-alternative"`}
                                                                        id="message"
                                                                        required="required"
                                                                        rows="10" />
                                                                    {this.renderErrorFor('message')}
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


                                    <FormModalContactannonceUser {...this.props} {...annonceItem}
                                        renderErrorFor={this.renderErrorFor}
                                        handleFieldChange={this.handleFieldChange}
                                        hasErrorFor={this.hasErrorFor}
                                        sendmessageItem={this.sendmessageItem} />

                                </div>
                            </div>



                        </div>

                        <FooterBigUserSite />
                    </div>
                </div>
            </Fragment>

        )
    }
}

export default AnnonceventeIndex;
