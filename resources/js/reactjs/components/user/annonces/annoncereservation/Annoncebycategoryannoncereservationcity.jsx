import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Button } from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import AnnoncereservationList from "./inc/AnnoncereservationList";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import Categoriesannoncereservation from "./inc/Categoriesannoncereservation";
import NavannoncecategorySkeleton from "../../../inc/user/NavannoncecategorySkeleton";
import HelmetSite from "../../../inc/user/HelmetSite";
import AnnoncesListSkeleton from "../../../inc/user/annonce/AnnoncesListSkeleton";


class Annoncebycategoryannoncereservationcity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annoncereservations: {annoncetype:[],categoryannoncereservation:[],periodeannonce:[],user:{profile:[]},imagereservations:[]},
            annoncereservationbycity: [] ,
            categoryannoncereservations: {user:[]},
            citiesannoncesreservations: [],
            annoncereservationbycategory: [],
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.favoriteItem = this.favoriteItem.bind(this);
        this.statusItem = this.statusItem.bind(this);
    }

    favoriteItem(item) {
        const url = route('favoriteannoncereservations_favorite.favorite', [item.id]);
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
            $.notify("Ooop! Something wrong. Try later", {
                type: 'danger',
                animate: {
                    enter: 'animate__animated animate__bounceInDown',
                    exit: 'animate__animated animate__bounceOutUp'
                }
            });
        })
    }

    statusItem(item) {
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

                let isNotId = data => data.id !== item.id;
                let updatedItems = this.state.annoncereservations.filter(isNotId);
                this.setState({ annoncereservations: updatedItems });

                //Envoyer la requet au server
                let url = route('annonces_reservations_status.site', item.id);
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


    loadItems() {
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemCategoryannoncereservation = this.props.match.params.categoryannoncereservation;
        let itemcityannonce = this.props.match.params.city;
        /*Ici c'est pour recuperer les annonce par villes*/
        dyaxios.get(route('api.annoncereservationbycities_site', [itemannoncetype, itemCategoryannoncereservation, itemcityannonce])).then(response => this.setState({ annoncereservations: response.data, }));
        dyaxios.get(route('api.annoncereservationbycitiescount_site', [itemannoncetype, itemCategoryannoncereservation, itemcityannonce])).then(response => this.setState({ annoncereservationbycity: response.data, }));
        /* Ici c'est le lien pour recuperer les annonces par categorie */
        let lien = route('api.annoncelocationbycategoryannoncereservations_site', [itemannoncetype, itemCategoryannoncereservation]);
        dyaxios.get(lien).then(response => this.setState({ annoncereservationbycategory: response.data, }));
        /* Ici c'est pour recuperer les categories*/
        dyaxios.get(route('api.annoncereservationcategorybycitycount_site', [itemCategoryannoncereservation, itemcityannonce])).then(response => this.setState({ categoryannoncereservations: response.data, }));
        /* Ici c'est pour recuperer les articles par annonces decroissant*/
        fetch(route('api.annoncereservationcategorybycitycount_site', [itemCategoryannoncereservation, itemcityannonce])).then(res => res.json()).then((result) => {
            this.setState({
                citiesannoncesreservations: [...result]
            });
        }).catch(error => {
            this.setState({
                error: true
            });
        })
    }

    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    getcountcategoryannonceString(annoncereservations_count) {
        annoncereservations_count = annoncereservations_count + '';
        if (annoncereservations_count < 1000) {
            return annoncereservations_count;
        }
        if (annoncereservations_count < 10000) {
            return annoncereservations_count.charAt(0) + ',' + annoncereservations_count.substring(1);
        }
        return (annoncereservations_count / 1000).toFixed(annoncereservations_count % 1000 !== 0) + 'k';
    }

    render() {
        const {annoncereservations, annoncereservationbycity, categoryannoncereservations } = this.state;
        let SlugCategoryannoncereservation = this.props.match.params.categoryannoncereservation;

        const mapAnnoncereservations = annoncereservations.length >= 0 ? (
            annoncereservations.map(item => {
                return(
                    <AnnoncereservationList key={item.id} {...item} favoriteItem={this.favoriteItem} deleteItem={this.deleteItem} statusItem={this.statusItem} />
                )
            })
        ):(
            <AnnoncesListSkeleton/>
        );
        return (
            <>
                <HelmetSite title={`Reservations ${SlugCategoryannoncereservation || $name_site} dans la ville de ${annoncereservationbycity.name || ""} - ${$name_site}`}/>

                <div className="about-us sidebar-collapse">

                    <nav className="navbar ivemoNarbarCustomisation navbar-expand-lg bg-primary">
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
                                                <i className="now-ui-icons arrows-1_minimal-left" /> <b>Retour aux annonces</b>
                                            </button>
                                        </div>

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
                                                <i className="now-ui-icons ui-1_simple-add" /> <b>Poster votre annonce</b>
                                            </NavLink>
                                        </div>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                            <div className="card card-plain">
                                                                <div className="card-header" role="tab" id="headingOne">
                                                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                        <b>Faites vos reservations à {annoncereservationbycity.name}</b>
                                                                        <i className="now-ui-icons arrows-1_minimal-down" />
                                                                    </a>
                                                                </div>
                                                                <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                                                    <div className="card-body">
                                                                        <table>
                                                                            <tbody>

                                                                            {categoryannoncereservations.length >= 0 ?
                                                                                <>{categoryannoncereservations.map((item) => (
                                                                                    <tr key={item.id}>
                                                                                        <td>
                                                                                            <NavLink to={`/annonces_reservations/reservations/${item.slug}/${annoncereservationbycity.slug}/`} >
                                                                                                Reserver un(e) <b style={{ textTransform: "lowercase" }}>{item.name}</b> à <strong> {annoncereservationbycity.name}</strong>
                                                                                            </NavLink>
                                                                                        </td>
                                                                                        <td className="text-right"> {this.getcountcategoryannonceString(item.annoncereservations_count)} annonces</td>
                                                                                    </tr>
                                                                                ))}</>:<NavannoncecategorySkeleton/>}

                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <Categoriesannoncereservation />
                                                        </div>
                                                    </div>
                                                </div>
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
export default Annoncebycategoryannoncereservationcity;
