import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NavUserSite from "../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import AnnoncereservationList from "../../../annonces/annoncereservation/inc/AnnoncereservationList";
import NavLinkPublicAnnonceUser from "../NavLinkPublicAnnonceUser";
import FormContactProfileAccountUser from "../../form/FormContactProfileAccountUser";
import NavLinkPublicBlogannoncesUser from "../../blogs/public/NavLinkPublicBlogannoncesUser";
import FormNewletterSubcribeProfileAccountUser from "../../form/FormNewletterSubcribeProfileAccountUser";
import AnnoncesListSkeleton from "../../../../inc/user/annonce/AnnoncesListSkeleton";
import NavLinkPublicEmploymentUser from "../../employments/public/NavLinkPublicEmploymentUser";
import HelmetSite from "../../../../inc/user/HelmetSite";
import ButonSubscribedAnnonce from "../../../../inc/vendor/ButonSubscribedAnnonce";


class PublicUserAnnonceReservations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annoncereservations:{annoncetype:[],categoryannoncereservation:[],user:{profile:[]},imagereservations:[]},
            useranoncereservationPublick:[],
            visiable: 10,
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.favoriteItem = this.favoriteItem.bind(this);
        this.unfavoriteItem = this.unfavoriteItem.bind(this);
        this.subscribeItem = this.subscribeItem.bind(this);
        this.unsubscribedItem = this.unsubscribedItem.bind(this);
        this.unactiveItem = this.unactiveItem.bind(this);
        this.loadmoresItem = this.loadmoresItem.bind(this);
    }
    loadmoresItem() {
        this.setState((old) => {
            return { visiable: old.visiable + 10 }
        })
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
            $.notify("Ooops! Something wrong. Try later", {
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
            $.notify("Ooops! Something wrong. Try later", {
                type: 'danger',
                animate: {
                    enter: 'animate__animated animate__bounceInDown',
                    exit: 'animate__animated animate__bounceOutUp'
                }
            });
        })
    }

    subscribeItem(id) {
        const url = route('annoncereservations_subscribe.subscribe', [id]);
        dyaxios.post(url).then(() => {
            $.notify({
                    message: "Notifications activée",
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
            $.notify("Ooops! Something wrong. Try later", {
                type: 'danger',
                animate: {
                    enter: 'animate__animated animate__bounceInDown',
                    exit: 'animate__animated animate__bounceOutUp'
                }
            });
        })
    }

    unsubscribedItem(id) {
        const url = route('annoncereservations_unsubscribe.unsubscribe', [id]);
        dyaxios.post(url).then(() => {
            $.notify({
                    message: "Notifications désactivée",
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
            $.notify("Ooops! Something wrong. Try later", {
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


                let isNotId = item => item.id !== id;
                let updatedItems = this.state.annoncereservations.filter(isNotId);
                this.setState({ annoncereservations: updatedItems });

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
                                enter: 'animate__animated animate__fadeInRight',
                                exit: 'animate__animated animate__fadeOutRight'
                            },
                        });
                    /** End alert ***/
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


    loadItems(){
        let itemuser = this.props.match.params.user;
        dyaxios.get(route('api.profilpublique_annoncereservations',[itemuser])).then(response => this.setState({annoncereservations: response.data,}));
        dyaxios.get(route('api.profilpublique',[itemuser])).then(response => this.setState({useranoncereservationPublick: response.data,}));

    }

   // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();
    }

    render() {
        const {useranoncereservationPublick,annoncereservations,visiable} = this.state;
        const mapAnnoncereservations = annoncereservations.length >= 0? (
            annoncereservations.slice(0, visiable).map(item => {
                return(

                    <AnnoncereservationList key={item.id} {...item} favoriteItem={this.favoriteItem} unfavoriteItem={this.unfavoriteItem} deleteItem={this.deleteItem} unactiveItem={this.unactiveItem} />
                )
            })
        ):(
            <AnnoncesListSkeleton/>
        );
        return (
            <>
                <HelmetSite title={`Annonces reservations ${useranoncereservationPublick.first_name || 'Profile'} - ${$name_site}`}/>

                <div className="landing-page sidebar-collapse">
                    <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent" color-on-scroll="400">
                        <NavUserSite />
                    </nav>
                    <div className="wrapper">
                        <div className="page-header page-header-mini">
                            <div className="page-header-image" data-parallax="true" style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg32.jpg' + ")" }}/>
                            <div className="content-center">

                                {useranoncereservationPublick.first_name && (

                                    <div className="content-center">

                                        <h1 className="title">{useranoncereservationPublick.first_name}</h1>
                                        {useranoncereservationPublick.status_profile === 0 ?

                                            <Link to={`/user/${useranoncereservationPublick.slug}/`} className="text-white">
                                                <i className="fa fa-chevron-circle-left" /> <b>Retour au profile de {useranoncereservationPublick.first_name}</b>
                                            </Link>

                                            :
                                            <>
                                                <Link to={`/pro/${useranoncereservationPublick.slug}/`} className="text-white">
                                                    <i className="fa fa-chevron-circle-left" /> <b>Retour au profile de {useranoncereservationPublick.first_name}</b>
                                                </Link>

                                                {useranoncereservationPublick.annoncereservations_count > 0 &&(
                                                    <h5><b>{useranoncereservationPublick.annoncereservations_count}</b> {useranoncereservationPublick.annoncereservations_count > 1 ? "annonces" : "annonce"} posté par {useranoncereservationPublick.first_name} sur la reservation</h5>
                                                )}

                                                <div className="text-center">
                                                    <ButonSubscribedAnnonce namesubscribed={`Recevoir toutes les notifications`} nameunsubscribed={`Ne plus recevoir les notifications`}
                                                                               titleToltipeSubscribed={`Abonnez vous pour recevoir tous annonces des reservations postées par`}
                                                                               titleToltipeUnsubscribed={`Ne plus etre notifier des annonces des reservations postées par`}
                                                                               subscribeItem={this.subscribeItem}
                                                                               unsubscribedItem={this.unsubscribedItem}
                                                                               {...useranoncereservationPublick}/>
                                                </div>
                                            </>
                                        }

                                    </div>

                                )}

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
                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        {useranoncereservationPublick.status_profile === 1 && (
                                            <div className="submit text-center">
                                                {!$guest ?
                                                    <NavLink className="btn btn-danger" to={`/annonce_reservation/reservations/new/`}>
                                                        <i className="now-ui-icons ui-1_simple-add"/> <b>Poster votre bien en reservation</b>
                                                    </NavLink>
                                                    :
                                                    <a href={`/login`} data-toggle="modal" data-target="#loginModal" className="btn btn-danger">
                                                        <i className="now-ui-icons ui-1_simple-add"/> <b>Poster votre bien en reservation</b>
                                                    </a>
                                                }
                                            </div>
                                        )}

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                            <div className="card card-plain">
                                                                <div className="card-header" role="tab" id="headingOne">
                                                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                        <b>Annonce de {useranoncereservationPublick.first_name}</b>
                                                                    </a>
                                                                </div>

                                                                <NavLinkPublicAnnonceUser {...this.props} {...useranoncereservationPublick}/>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                            <div className="card card-plain">
                                                                <div className="card-header" role="tab" id="headingTree">
                                                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseTree" aria-expanded="true" aria-controls="collapseTree">
                                                                        <b>Annonces de {useranoncereservationPublick.first_name}</b>
                                                                    </a>
                                                                </div>

                                                                <NavLinkPublicEmploymentUser {...this.props} {...useranoncereservationPublick}/>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                            <div className="card card-plain">
                                                                <div className="card-header" role="tab" id="headingTwo">
                                                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                                                        <b>Articles de {useranoncereservationPublick.first_name}</b>
                                                                    </a>
                                                                </div>

                                                                <NavLinkPublicBlogannoncesUser {...this.props} {...useranoncereservationPublick}/>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {useranoncereservationPublick.status_profile === 1 && (
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <div className="card-header text-center">
                                                                <h4 className="card-title"><b>Contacter {useranoncereservationPublick.first_name}</b></h4>
                                                            </div>

                                                            <FormContactProfileAccountUser {...this.props} {...useranoncereservationPublick}/>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                    </div>


                                    {useranoncereservationPublick.status_profile === 0 ?

                                        <div className="col-lg-8 col-md-12 mx-auto">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="card-header text-center">
                                                        <h4 className="card-title"><b>Pour poster votre bien </b></h4>
                                                        <a href="#"
                                                           className="btn btn-info btn-lg">
                                                            <b>Devenez professionnel pour poster votre bien</b>
                                                        </a>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className="col-lg-8 col-md-12 mx-auto">

                                            {mapAnnoncereservations}

                                            {visiable < annoncereservations.length && (
                                                <div className="row">
                                                    <div className="col-md-4 ml-auto mr-auto text-center">
                                                        <button type="button" onClick={this.loadmoresItem} className="btn btn-primary btn-block">
                                                            <b>Voir plus </b>
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="card">
                                                <div className="card-body">

                                                    <div className="card-header text-center">
                                                        <h4 className="card-title"><b>Contacter {useranoncereservationPublick.first_name}</b></h4>
                                                    </div>

                                                    <FormContactProfileAccountUser {...this.props} {...useranoncereservationPublick}/>

                                                </div>
                                            </div>

                                            <div className="card card-raised card-form-horizontal">

                                                <div className="card-body">

                                                    <div className="card-header text-center">
                                                        <h4 className="card-title"><b>Restez à l’écoute !</b></h4>
                                                        <p className="card-title">
                                                            Abonnez-vous à la newsletter de <b>{useranoncereservationPublick.first_name}</b> afin d'être notifié des mises à jour
                                                        </p>
                                                    </div>

                                                    <FormNewletterSubcribeProfileAccountUser {...this.props} />

                                                </div>
                                            </div>
                                        </div>
                                    }

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

export default PublicUserAnnonceReservations;
