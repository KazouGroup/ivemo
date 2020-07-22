import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Button, Form, Input } from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import PropTypes from "prop-types";
import AnnonceslocationList from "./inc/AnnonceslocationList";
import Categoriesannoncereselocation from "./inc/Categoriesannoncereselocation";
import Swal from "sweetalert2";
import NavannoncecategorySkeleton from "../../../inc/user/NavannoncecategorySkeleton";
import LinkValicationEmail from "../../../inc/user/LinkValicationEmail";
import FormModalContactannonceUser from "../../../inc/user/annonce/FormModalContactannonceUser";
import AnnoncesListSkeleton from "../../../inc/user/annonce/AnnoncesListSkeleton";
import Navlinknewannoncelocation from "./treatment/Navlinknewannoncelocation";
import HelmetSite from "../../../inc/user/HelmetSite";


class Annoncelocationbycity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            full_name: '',
            message: '',
            subject: '',
            errors: [],
            annonceItem: { user: [] },
            annoncelocationbycity: [] ,
            cityannoncelocations: { user: [] },
            annoncelocations: { categoryannoncelocation: [], city: [], user: [] }

        };
        this.deleteItem = this.deleteItem.bind(this);
        this.favoriteItem = this.favoriteItem.bind(this);
        this.statusItem = this.statusItem.bind(this);
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
        const url = route('favoriteannoncelocations_favorite.favorite', [item.id]);
        dyaxios.get(url).then(() => {

            if(item.bookmarked){
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
            $.notify("Ooops! Something wrong. Try later", {
                type: 'danger',
                animate: {
                    enter: 'animate__animated animate__bounceInDown',
                    exit: 'animate__animated animate__bounceOutUp'
                }
            });
        })
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
            annoncelocation_id: this.state.annonceItem.id,
            message: this.state.message,
        };
        let url = route('contactuserslocactions.site');
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


    loadItems() {
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemCategoryannoncelocation = this.props.match.params.categoryannoncelocation;
        let itemCity = this.props.match.params.city;

        dyaxios.get(route('api.annoncelocationbycitiescount_site', [itemannoncetype, itemCategoryannoncelocation, itemCity])).then(response => this.setState({ annoncelocationbycity: response.data, }));
        dyaxios.get(route('api.annoncelocationbycities_site', [itemannoncetype, itemCategoryannoncelocation, itemCity])).then(response => this.setState({ annoncelocations: response.data, }));

        let url1 = route('api.annoncelocationcategorybycitycount_site', [itemCategoryannoncelocation, itemCity]);
        dyaxios.get(url1).then(response => this.setState({ cityannoncelocations: response.data, }));

    }

    statusItem(item){
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

                let isNotId = data => data.id !== item.id;
                let updatedItems = this.state.annoncelocations.filter(isNotId);
                this.setState({ annoncelocations: updatedItems });

                //Envoyer la requet au server
                let url = route('annonces_locations_status.site',item.id);
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
                }).catch(() => {
                    //Failled message
                    $.notify("Ooops! Something wrong. Try later", {
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

                const url = route('annonces_locations_delete.site', [id]);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                        // title: 'Update',
                        message: 'Annonce supprimée avec succès'
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
                    $.notify("Ooops! Une erreur est survenue", {
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

    getcountcategoryannonceString(annoncelocations_count) {
        annoncelocations_count = annoncelocations_count + '';
        if (annoncelocations_count < 1000) {
            return annoncelocations_count;
        }
        if (annoncelocations_count < 10000) {
            return annoncelocations_count.charAt(0) + ',' + annoncelocations_count.substring(1);
        }
        return (annoncelocations_count / 1000).toFixed(annoncelocations_count % 1000 !== 0) + 'k';
    }
    render() {
        const {annoncelocations, annoncelocationbycity, cityannoncelocations, annonceItem } = this.state;
        let itemCategoryannoncelocation = this.props.match.params.categoryannoncelocation;
        const mapAnnoncelocations = annoncelocations.length >= 0 ? (
            annoncelocations.map(item => {
                return (
                    <AnnonceslocationList key={item.id} {...item} favoriteItem={this.favoriteItem} deleteItem={this.deleteItem} statusItem={this.statusItem} contactUser={this.contactUser} />
                )
            })
        ) : (
                <AnnoncesListSkeleton />
            );
        return (
            <>
                <HelmetSite title={`Locations ${itemCategoryannoncelocation || $name_site} dans la ville de ${annoncelocationbycity.name || ""} - ${$name_site}`} />

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
                                                <i className="now-ui-icons arrows-1_minimal-left" /> <b>Retour à vos résultats </b>
                                            </button>
                                        </div>
                                        {!$guest && (
                                            <>
                                                {!$userIvemo.email_verified_at && (
                                                    <LinkValicationEmail />
                                                )}
                                            </>
                                        )}

                                        {mapAnnoncelocations}

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
                                                            <div className="card card-plain">
                                                                <div className="card-header" role="tab" id="headingThree">
                                                                    <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                                                        <b>Locations à {annoncelocationbycity.name} </b>
                                                                        <i className="now-ui-icons arrows-1_minimal-down" />
                                                                    </a>
                                                                </div>
                                                                <div id="collapseThree" className="collapse show" role="tabpanel" aria-labelledby="headingThree">
                                                                    <div className="card-body">
                                                                        <table>
                                                                            <tbody>

                                                                                {cityannoncelocations.length >= 0 ?
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
                                                                                    </> : <NavannoncecategorySkeleton />}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <Categoriesannoncereselocation />

                                                            <div className="card card-plain">
                                                                <div className="card-header" role="tab" id="headingAutre">
                                                                    <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseAutre" aria-expanded="false" aria-controls="collapseAutre">
                                                                        <b>Autres transactions à {`${annoncelocationbycity.name}`}</b>
                                                                        <i className="now-ui-icons arrows-1_minimal-down" />
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
            </>

        )
    }
}

export default Annoncelocationbycity;
