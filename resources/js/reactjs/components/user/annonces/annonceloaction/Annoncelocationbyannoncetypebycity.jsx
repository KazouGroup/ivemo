import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Button, Form, Input } from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import PropTypes from "prop-types";
import AnnonceslocationList from "./inc/AnnonceslocationList";
import Swal from "sweetalert2";
import AnnoncesListSkeleton from "../../../inc/user/annonce/AnnoncesListSkeleton";
import LinkValicationEmail from "../../../inc/user/LinkValicationEmail";
import Navlinknewannoncelocation from "./treatment/Navlinknewannoncelocation";
import HelmetSite from "../../../inc/user/HelmetSite";
import SectionLocationbyCity from "../../../inc/user/section_indexsite/SectionLocationbyCity";


class Annoncelocationbyannoncetypebycity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annoncelocationbycity: [] ,
            annoncelocations: { categoryannoncelocation: [], city: [], user: [] }

        };
        this.deleteItem = this.deleteItem.bind(this);
        this.favoriteItem = this.favoriteItem.bind(this);
        this.statusItem = this.statusItem.bind(this);
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

                let isNotId = item => item.id !== id;
                let updatedItems = this.state.annoncelocations.filter(isNotId);
                this.setState({ annoncelocations: updatedItems });

                const url = route('annonces_locations_delete.site', [id]);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update',
                            message: 'Annonce supprimée avec success'
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
                    this.loadItems();

                }).catch(() => {
                    //Failled message
                    $.notify("Ooops! Une erreur est survenue", {
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

    loadItems() {
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemCity = this.props.match.params.city;
        dyaxios.get(route('api.annoncelocationsbyannoncetypebycity_site', [itemannoncetype, itemCity])).then(response => this.setState({ annoncelocations: response.data }));
        dyaxios.get(route('api.annoncelocationsbyannoncetypebycitycount_site', [itemannoncetype, itemCity])).then(response => this.setState({ annoncelocationbycity: response.data }));

    }
   // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();
    }

    render() {
        const {annoncelocations, annoncelocationbycity } = this.state;
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
                <HelmetSite title={`Locations d'appartements, villa, chambres et bien d'autres dans la ville de ${annoncelocationbycity.name || $name_site} - ${$name_site}`} />

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

                                        <SectionLocationbyCity/>

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

export default Annoncelocationbyannoncetypebycity;
