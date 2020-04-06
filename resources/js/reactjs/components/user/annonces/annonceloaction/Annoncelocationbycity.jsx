import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {Button, Form, Input} from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import PropTypes from "prop-types";
import AnnonceslocationList from "./inc/AnnonceslocationList";
import Categoriesannoncereselocation from "./inc/Categoriesannoncereselocation";
import Swal from "sweetalert2";
import NavannoncecategorySkeleton from "../../../inc/user/NavannoncecategorySkeleton";
import LinkValicationEmail from "../../../inc/user/LinkValicationEmail";


class Annoncelocationbycity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            full_name: '',
            message: '',
            subject: 'Annonce double',
            errors: [],
            annonceItem: [],
            annoncelocationbycity: {annoncelocations:[]},
            cityannoncelocations:[],

        };
        this.deleteItem = this.deleteItem.bind(this);
        this.unactiveItem = this.unactiveItem.bind(this);
        this.signalerUser = this.signalerUser.bind(this);
        this.handleCheckClick = this.handleCheckClick.bind(this);
        this.signalemessageItem = this.signalemessageItem.bind(this);
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

    handleCheckClick(event){
        this.setState({
            subject: event.target.value
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
            annoncelocation: item
        });
    }

    signalemessageItem(e) {
        e.preventDefault();

        let item = {
            email: this.state.email,
            annoncelocation_id: this.state.annonceItem.id,
            full_name: this.state.full_name,
            subject: this.state.subject,
            message: this.state.message,
        };
        let url = route('signalannoncelocations.site');
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
                            enter: "animated fadeInDown",
                            exit: "animated fadeOutUp"
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


    loadItems(){
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemCategoryannoncelocation = this.props.match.params.categoryannoncelocation;
        let itemCity = this.props.match.params.city;
        let url = route('api.annoncelocationbycities_site',[itemannoncetype,itemCategoryannoncelocation,itemCity]);
        dyaxios.get(url).then(response => this.setState({annoncelocationbycity: response.data,}));

        let url1 = route('api.annoncelocationcategorybycitycount_site',[itemCategoryannoncelocation,itemCity]);
        dyaxios.get(url1).then(response => this.setState({cityannoncelocations: response.data,}));

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
                            // title: 'Update FAQ',
                            //message: 'Annonce désactiver avec succès',
                            message: "Cette annonce a été masquée au utilisateur <a href=\"/profile/personal_settings/annonces_locations/\" target=\"_blank\">Modifier ici</a>",
                            url: "/profile/personal_settings/annonces_locations/",
                            target: "_blank"
                        },
                        {
                            allow_dismiss: false,
                            type: 'info',
                            placement: {
                                from: 'bottom',
                                align: 'center'
                            },
                            animate: {
                                enter: "animated fadeInUp",
                                exit: "animated fadeOutDown"
                            },
                        });
                    /** End alert ***/
                    this.loadItems();
                }).catch(() => {
                    //Failled message
                    $.notify("Ooop! Something wrong. Try later", {
                        type: 'danger',
                        animate: {
                            enter: 'animated bounceInDown',
                            exit: 'animated bounceOutUp'
                        }
                    });
                })
            }
        })

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
                    this.loadItems();

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


    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    getcountcategoryannonceString (annoncelocations_count) {
        annoncelocations_count = annoncelocations_count +'';
        if (annoncelocations_count < 1000) {
            return annoncelocations_count;
        }
        if (annoncelocations_count < 10000) {
            return annoncelocations_count.charAt(0) + ',' + annoncelocations_count.substring(1);
        }
        return (annoncelocations_count/1000).toFixed(annoncelocations_count % 1000 !== 0)+'k';
    }
    render() {
        const {annoncelocationbycity,cityannoncelocations,annonceItem} = this.state;
        const allannoncelocationbycity = annoncelocationbycity.annoncelocations;
        let itemCategoryannoncelocation = this.props.match.params.categoryannoncelocation;
        return (
            <>
                <Helmet>
                    <title>Locations {`${itemCategoryannoncelocation || "Ivemo"}`} dans la ville de {`${annoncelocationbycity.name || ""}`} - Ivemo</title>
                </Helmet>

                <div className="about-us sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">

                        <div className="main main-raised">
                            <div className="container">
                                <div className="row">
                                </div>
                            </div>

                            <div className="container">
                                <br />
                                <div className="row">

                                    <div className="col-lg-8 col-md-12 mx-auto">
                                        <div className="submit text-left">
                                            <button type="button" className="btn btn-neutral btn-sm" onClick={this.props.history.goBack}>
                                                <i className="now-ui-icons arrows-1_minimal-left"/> <b>Retour à vos résultats </b>
                                            </button>
                                        </div>
                                        {!$guest &&(
                                            <>
                                                {!$userIvemo.email_verified_at &&(
                                                    <LinkValicationEmail/>
                                                )}
                                            </>
                                        )}

                                        {allannoncelocationbycity.length >= 0 && (
                                            <>

                                                {allannoncelocationbycity.map((item) => (
                                                    <AnnonceslocationList key={item.id} {...item} deleteItem={this.deleteItem} unactiveItem={this.unactiveItem} signalerUser={this.signalerUser}/>
                                                ))}

                                            </>
                                        )}


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

                                                            <div className="card card-plain">
                                                                <div className="card-header" role="tab" id="headingThree">
                                                                    <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                                                        <b>Locations à {annoncelocationbycity.name} </b>
                                                                        <i className="now-ui-icons arrows-1_minimal-down"/>
                                                                    </a>
                                                                </div>
                                                                <div id="collapseThree" className="collapse show" role="tabpanel" aria-labelledby="headingThree">
                                                                    <div className="card-body">
                                                                        <table>
                                                                            <tbody>

                                                                            {cityannoncelocations.length ?
                                                                                <>
                                                                                    {cityannoncelocations.map((item) => (
                                                                                        <tr key={item.id}>
                                                                                            <td>
                                                                                                <NavLink to={`/annonces_locations/locations/${item.slug}/${annoncelocationbycity.slug}/`}>
                                                                                                    locations <b style={{ textTransform: "lowercase" }}>{item.name}</b> à <b>{annoncelocationbycity.name}</b>
                                                                                                </NavLink>
                                                                                            </td>
                                                                                            <td className="text-right"> {this.getcountcategoryannonceString(item.annoncelocations_count)} {item.annoncelocations_count > 1 ? "annonces" : "annonce"}</td>
                                                                                        </tr>
                                                                                    ))}
                                                                                </>:<NavannoncecategorySkeleton/>}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <Categoriesannoncereselocation/>

                                                            <div className="card card-plain">
                                                                <div className="card-header" role="tab" id="headingAutre">
                                                                    <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseAutre" aria-expanded="false" aria-controls="collapseAutre">
                                                                        <b>Autres transactions à {`${annoncelocationbycity.name}`}</b>
                                                                        <i className="now-ui-icons arrows-1_minimal-down"/>
                                                                    </a>
                                                                </div>
                                                                <div id="collapseAutre" className="collapse" role="tabpanel" aria-labelledby="headingAutre">
                                                                    <div className="card-body">
                                                                        <table>
                                                                            <tbody>
                                                                            <tr>
                                                                                <td> <a href="#pablo">Toutes les ventes de maison Douala</a></td>
                                                                                <td className="text-right"> 200 annonces</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td> <a href="#pablo">Toutes les ventes de terrains Douala</a></td>
                                                                                <td className="text-right"> 1 300 annonces</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td> <a href="#pablo">Tous les achats de maison de prestige Douala</a></td>
                                                                                <td className="text-right"> 380 annonces</td>
                                                                            </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
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

                                                <Form role="form"  onSubmit={this.signalemessageItem}  acceptCharset="UTF-8">

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
                                                                                   name="subject" id="subject"
                                                                                   value="Annonce double" onChange={this.handleCheckClick} checked={this.state.subject === "Annonce double"}/>
                                                                            <span className="form-check-sign"></span>
                                                                            Annonce double
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check form-check-radio">
                                                                        <label className="form-check-label">
                                                                            <input className="form-check-input" type="radio"
                                                                                   name="subject" id="subject"
                                                                                   value="Mauvaise catégorie" onChange={this.handleCheckClick} checked={this.state.subject === "Mauvaise catégorie"}/>
                                                                            <span className="form-check-sign"></span>
                                                                            Mauvaise catégorie
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check form-check-radio">
                                                                        <label className="form-check-label">
                                                                            <input className="form-check-input" type="radio"
                                                                                   name="subject" id="subject"
                                                                                   value="Mauvaise ville" onChange={this.handleCheckClick} checked={this.state.subject === "Mauvaise ville"}/>
                                                                            <span className="form-check-sign"></span>
                                                                            Mauvaise ville
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check form-check-radio">
                                                                        <label className="form-check-label">
                                                                            <Input className="form-check-input" type="radio"
                                                                                   name="subject" id="subject"
                                                                                   value="Téléphone / e-mail incorrect" onChange={this.handleCheckClick} checked={this.state.subject === "Téléphone / e-mail incorrect"}/>
                                                                            <span className="form-check-sign"></span>
                                                                            Téléphone / e-mail incorrect
                                                                        </label>
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-6">
                                                                    <div className="form-check form-check-radio">
                                                                        <label className="form-check-label">
                                                                            <Input className="form-check-input" type="radio"
                                                                                   name="subject" id="subject"
                                                                                   value="Erreur d'adresse / de carte" onChange={this.handleCheckClick} checked={this.state.subject === "Erreur d'adresse / de carte"}/>
                                                                            <span className="form-check-sign"></span>
                                                                            Erreur d'adresse / de carte
                                                                        </label>
                                                                    </div>

                                                                    <div className="form-check form-check-radio">
                                                                        <label className="form-check-label">
                                                                            <Input className="form-check-input" type="radio"
                                                                                   name="subject" id="subject"
                                                                                   value="Propriété inexistante" onChange={this.handleCheckClick} checked={this.state.subject === "Propriété inexistante"}/>
                                                                            <span className="form-check-sign"></span>
                                                                            Propriété inexistante
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check form-check-radio">
                                                                        <label className="form-check-label">
                                                                            <Input className="form-check-input" type="radio"
                                                                                   name="subject" id="subject"
                                                                                   value="Arnaque possible" onChange={this.handleCheckClick} checked={this.state.subject === "Arnaque possible"}/>
                                                                            <span className="form-check-sign"></span>
                                                                            Arnaque possible
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check form-check-radio">
                                                                        <label className="form-check-label">
                                                                            <Input className="form-check-input" type="radio"
                                                                                   name="subject" id="subject"
                                                                                   value="Autre (précisez dans le commentaire)" onChange={this.handleCheckClick} checked={this.state.subject === "Autre (précisez dans le commentaire)"}/>
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
                                                            <i className="now-ui-icons users_circle-08"/></span>
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
                                                            <i className="now-ui-icons ui-1_email-85"/></span>
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

export default Annoncelocationbycity;
