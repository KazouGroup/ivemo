import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Button } from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import AnnoncereservationList from "./inc/AnnoncereservationList";
import Categoriesannoncereservation from "./inc/Categoriesannoncereservation";
import AnnoncesListSkeleton from "../../../inc/user/annonce/AnnoncesListSkeleton";
import HelmetSite from "../../../inc/user/HelmetSite";
import Swal from "sweetalert2";
import SectionReservationbyCity from "../../../inc/user/section_indexsite/SectionReservationbyCity";


class AnnoncereservationIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annoncereservations:{annoncetype:[],categoryannoncereservation:[],periodeannonce:[],user:{profile:[]},imagereservations:[]},
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.favoriteItem = this.favoriteItem.bind(this);
        this.unfavoriteItem = this.unfavoriteItem.bind(this);
        this.unactiveItem = this.unactiveItem.bind(this);
    }

    favoriteItem(id) {
        const url = route('favoriteannoncereservations_favorite.favorite', [id]);
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
        const url = route('favoriteannoncereservations_unfavorite.unfavorite', [id]);
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

    unactiveItem(id) {
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

                let isNotId = item => item.id !== id;
                let updatedItems = this.state.annoncereservations.filter(isNotId);
                this.setState({ annoncereservations: updatedItems });

                //Envoyer la requet au server
                let url = route('annonces_reservations_unactivated.site', id);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
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


                let isNotId = item => item.id !== id;
                let updatedItems = this.state.annoncereservations.filter(isNotId);
                this.setState({ annoncereservations: updatedItems });

                const url = route('annonces_locations_delete.site', [id]);
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
        let url = route('api.annoncereservationbyannoncetype_site', itemannoncetype);
        dyaxios.get(url).then(response => this.setState({annoncereservations: response.data,}));
    }

    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    render() {
        const {annoncereservations} = this.state;
        const mapAnnoncereservations = annoncereservations.length >= 0 ? (
            annoncereservations.map(item => {
                return(
                    <AnnoncereservationList key={item.id} {...item} favoriteItem={this.favoriteItem} unfavoriteItem={this.unfavoriteItem} deleteItem={this.deleteItem} unactiveItem={this.unactiveItem} />
                )
            })
        ):(
            <AnnoncesListSkeleton/>
        );

        return (
            <>
                <HelmetSite title={`Reservez une chambre d'hotel, un appartement ou une villa - ${$name_site}`}/>

                <div className="landing-page sidebar-collapse">


                    <nav className="navbar ivemoNarbarCustomisation navbar-expand-lg bg-primary fixed-top navbar-transparent" color-on-scroll="400">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">
                        <div className="page-header page-header-mini">
                            <div className="page-header-image" data-parallax="true" style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg32.jpg' + ")" }}>
                            </div>
                            <div className="content-center">
                                <div className="row">
                                    <div className="col-md-8 ml-auto mr-auto">
                                        <h3 className="title">Reservez votre chambre d'hotel ou un appartement </h3>
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

                                        {mapAnnoncereservations}

                                        <div className="text-center">
                                            <button type="button"  className="btn btn-outline-info">
                                                <b>Afficher plus </b>
                                            </button>
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

                                                          <Categoriesannoncereservation/>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <SectionReservationbyCity/>

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

export default AnnoncereservationIndex;
