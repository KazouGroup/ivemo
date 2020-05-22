import React, { Component,Fragment } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {Button, Form, Input} from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import AnnonceventeList from "./inc/AnnonceventeList";
import Categoriesannoncevente from "./inc/Categoriesannoncevente";
import NavannoncecategorySkeleton from "../../../inc/user/NavannoncecategorySkeleton";
import AnnoncesListSkeleton from "../../../inc/user/annonce/AnnoncesListSkeleton";
import LinkValicationEmail from "../../../inc/user/LinkValicationEmail";
import FormModalContactannonceUser from "../../../inc/user/annonce/FormModalContactannonceUser";
import Navlinknewannoncevente from "./treatment/Navlinknewannoncevente";


class Annoncebycategoryannoncevente extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            full_name: '',
            message: '',
            subject: '',
            object: 'Annonce double',
            errors: [],
            annonceItem: {user:[]},
            annonceventebycategory: {annonceventes:{annoncetype:[],categoryannoncevente:[],city:[],user:[]}},
            cityannonceventes:{user:[]},
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.unactiveItem = this.unactiveItem.bind(this);
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

    handleCheckClick(event){
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

                $.notify({
                        message: `Votre message a été bien envoyé à cette utilisateur`
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

                //Masquer le modal après la création
                $('#contactNew').modal('hide');
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



    loadItems(){
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemCategoryannoncevente = this.props.match.params.categoryannoncevente;
        let url = route('api.annonceventebycategoryannonceventes_site',[itemannoncetype,itemCategoryannoncevente]);
        dyaxios.get(url).then(response => this.setState({annonceventebycategory: response.data}));
        let url1 = route('api.annonceventebycategorycitycount_site',[itemCategoryannoncevente]);
        dyaxios.get(url1).then(response => this.setState({cityannonceventes: response.data,}));

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
                let url = route('annonces_ventes_unactivated.site',id);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            //message: 'Annonce désactiver avec succès',
                            message: "Cette annonce a été masquée au utilisateurs",
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

                const url = route('annonces_ventes_delete.site',id);
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

    getcountcategoryannonceString (annonceventes_count) {
        annonceventes_count = annonceventes_count +'';
        if (annonceventes_count < 1000) {
            return annonceventes_count;
        }
        if (annonceventes_count < 10000) {
            return annonceventes_count.charAt(0) + ',' + annonceventes_count.substring(1);
        }
        return (annonceventes_count/1000).toFixed(annonceventes_count % 1000 !== 0)+'k';
    }
    render() {
        const {annonceventebycategory,cityannonceventes,annonceItem} = this.state;
        const mapAnnonceventes = annonceventebycategory.annonceventes.length >= 0 ? (
            annonceventebycategory.annonceventes.map(item => {
                return(
                    <AnnonceventeList key={item.id} {...item}  deleteItem={this.deleteItem} unactiveItem={this.unactiveItem} signalerUser={this.signalerUser} contactUser={this.contactUser}/>
                )
            })
        ):(
            <AnnoncesListSkeleton/>
        );
        return (
            <Fragment>
                <Helmet title={`Vente ${annonceventebycategory.name || $name_site} - ${$name_site}`}/>



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
                                            <Link to={`/annonces_ventes/ventes/`} >
                                                <i className="now-ui-icons arrows-1_minimal-left"/> <b>Retour à vos annonces </b>
                                            </Link>
                                        </div>
                                        {!$guest &&(
                                            <>
                                                {!$userIvemo.email_verified_at &&(
                                                    <LinkValicationEmail/>
                                                )}
                                            </>
                                        )}

                                        {mapAnnonceventes}

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


                                                            <div className="card card-plain">
                                                                <div className="card-header" role="tab" id="headingThree">
                                                                    <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                                                        <b>Ventes {annonceventebycategory.name} </b>
                                                                        <i className="now-ui-icons arrows-1_minimal-down"/>
                                                                    </a>
                                                                </div>

                                                                <div id="collapseThree" className="collapse show" role="tabpanel" aria-labelledby="headingThree">
                                                                    <div className="card-body">
                                                                        <table>
                                                                            <tbody>

                                                                            {cityannonceventes.length >= 0 ?
                                                                                <>
                                                                                    {cityannonceventes.map((item) => (
                                                                                        <tr key={item.id}>
                                                                                            <td>
                                                                                                <NavLink to={`/annonces_ventes/ventes/${annonceventebycategory.slug}/${item.slug}/`}>
                                                                                                    achat <b style={{ textTransform: "lowercase" }}>{annonceventebycategory.name}</b> à <b>{item.name}</b>
                                                                                                </NavLink>
                                                                                            </td>
                                                                                            <td className="text-right"> {this.getcountcategoryannonceString(item.annonceventes_count)}  {item.annonceventes_count > 1 ? "annonces" : "annonce"}</td>
                                                                                        </tr>
                                                                                    ))}
                                                                                </>
                                                                                :
                                                                                <NavannoncecategorySkeleton/>}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>


                                                            </div>

                                                            <Categoriesannoncevente/>

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
                                                                                   name="object" id="object"
                                                                                   value="Annonce double" onChange={this.handleCheckClick} checked={this.state.object === "Annonce double"}/>
                                                                            <span className="form-check-sign"></span>
                                                                            Annonce double
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check form-check-radio">
                                                                        <label className="form-check-label">
                                                                            <input className="form-check-input" type="radio"
                                                                                   name="object" id="object"
                                                                                   value="Mauvaise catégorie" onChange={this.handleCheckClick} checked={this.state.object === "Mauvaise catégorie"}/>
                                                                            <span className="form-check-sign"></span>
                                                                            Mauvaise catégorie
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check form-check-radio">
                                                                        <label className="form-check-label">
                                                                            <input className="form-check-input" type="radio"
                                                                                   name="object" id="object"
                                                                                   value="Mauvaise ville" onChange={this.handleCheckClick} checked={this.state.object === "Mauvaise ville"}/>
                                                                            <span className="form-check-sign"></span>
                                                                            Mauvaise ville
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check form-check-radio">
                                                                        <label className="form-check-label">
                                                                            <Input className="form-check-input" type="radio"
                                                                                   name="object" id="object"
                                                                                   value="Téléphone / e-mail incorrect" onChange={this.handleCheckClick} checked={this.state.object === "Téléphone / e-mail incorrect"}/>
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
                                                                                   value="Erreur d'adresse / de carte" onChange={this.handleCheckClick} checked={this.state.object === "Erreur d'adresse / de carte"}/>
                                                                            <span className="form-check-sign"></span>
                                                                            Erreur d'adresse / de carte
                                                                        </label>
                                                                    </div>

                                                                    <div className="form-check form-check-radio">
                                                                        <label className="form-check-label">
                                                                            <Input className="form-check-input" type="radio"
                                                                                   name="object" id="object"
                                                                                   value="Propriété inexistante" onChange={this.handleCheckClick} checked={this.state.object === "Propriété inexistante"}/>
                                                                            <span className="form-check-sign"></span>
                                                                            Propriété inexistante
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check form-check-radio">
                                                                        <label className="form-check-label">
                                                                            <Input className="form-check-input" type="radio"
                                                                                   name="object" id="object"
                                                                                   value="Arnaque possible" onChange={this.handleCheckClick} checked={this.state.object === "Arnaque possible"}/>
                                                                            <span className="form-check-sign"></span>
                                                                            Arnaque possible
                                                                        </label>
                                                                    </div>
                                                                    <div className="form-check form-check-radio">
                                                                        <label className="form-check-label">
                                                                            <Input className="form-check-input" type="radio"
                                                                                   name="object" id="object"
                                                                                   value="Autre (précisez dans le commentaire)" onChange={this.handleCheckClick} checked={this.state.object === "Autre (précisez dans le commentaire)"}/>
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


                                    <FormModalContactannonceUser {...this.props} {...annonceItem}
                                                                 renderErrorFor={this.renderErrorFor}
                                                                 handleFieldChange={this.handleFieldChange}
                                                                 hasErrorFor={this.hasErrorFor}
                                                                 sendmessageItem={this.sendmessageItem}/>

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

export default Annoncebycategoryannoncevente;
