import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import BlogannoncereservationIntesseAnnonseShow
    from "../../blog/blogannoncereservation/BlogannoncereservationIntesseAnnonseShow";
import AnnonceservationInteresse from "./AnnonceservationInteresse";
import FormContactAnnoncereservationUser from "./inc/FormContactAnnoncereservationUser";
import FormcontactuseronreservationShow from "./inc/FormcontactuseronreservationShow";
import ProfileForallAnnonceShow from "../ProfileForallAnnonceShow";
import HelmetSite from "../../../inc/user/HelmetSite";
import Swal from "sweetalert2";
import AnnoncereservationcommentIndex from "../../comments/AnnoncereservationcommentIndex";
import moment from "moment";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    favoriteItem,followerItem,
    likeItem,unlikeItem,
    loadannoncereservationshowusersite, loadProfileusersforpublic,
    statuscommentaddItem, statuscommentremoveItem,
    subscribeItem,unsubscribeItem,
    unfavoriteItem, unfollowerItem,
} from "../../../../redux/actions/annoncereservation/annoncereservationshowActions";
import Skeleton from "react-loading-skeleton";
import ButonMiniSubscribedAllAnnonce from "../../../inc/vendor/ButonMiniSubscribedAllAnnonce";
import ButonFollowerUser from "../../../inc/vendor/follow/ButonFollowerUser";
const abbrev = ['', 'k', 'M', 'B', 'T'];

class Annoncebycategoryannoncereservationcityshow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPhonenumber: false
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.statusItem = this.statusItem.bind(this);

        this.showPhonenumberItem = this.showPhonenumberItem.bind(this);
    }

    showPhonenumberItem() {
        this.setState({showPhonenumber: true});
    }

    statusItem(annoncereservation) {
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
                let url = route('annonces_reservations_status.site', annoncereservation.id);
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

                    this.props.history.push("/annonces_reservations/"+ this.props.match.params.annoncetype +"/");

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
        this.props.loadannoncereservationshowusersite(this.props);
        this.props.loadProfileusersforpublic(this.props);
    }

   // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();
    }


    data_countfollowFormatter(countfollowerusers, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(countfollowerusers)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (countfollowerusers / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    data_countFormatter(visits_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(visits_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
        const suffix = abbrev[order];
        return (visits_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    render() {
        const {annoncereservation,profileUser} = this.props;
        return (
            <>
                <HelmetSite title={`${annoncereservation.title || $name_site} - ${$name_site}`}/>

                <div className="about-us sidebar-collapse">

                    <nav className="navbar ivemoNarbarCustomisation navbar-expand-lg bg-primary">
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

                                            {/*
                                              <div className="card-image">

                                                <div id="carouselAnnonceIndicators" className="carousel slide" data-ride="carousel">
                                                    <ol className="carousel-indicators">
                                                        {annoncereservation.imagereservations.map((value,index) => {
                                                            return <li key={value.id} data-target={`#carouselAnnonceIndicators`} data-slide-to={index} className={index === 0 ? "active" : ""}/>
                                                        })}
                                                    </ol>
                                                    <div className="carousel-inner" role="listbox">

                                                        {annoncereservation.imagereservations.map((item,index) => (
                                                            <div key={item.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                                                                <img className="d-block"
                                                                     src={item.photo}
                                                                     alt={item.title}/>
                                                            </div>
                                                        ))}

                                                    </div>
                                                    <a className="carousel-control-prev" href="#carouselAnnonceIndicators" role="button" data-slide="prev">
                                                        <i className="now-ui-icons arrows-1_minimal-left"/>
                                                    </a>
                                                    <a className="carousel-control-next" href="#carouselAnnonceIndicators" role="button" data-slide="next">
                                                        <i className="now-ui-icons arrows-1_minimal-right"/>
                                                    </a>
                                                </div>
                                            </div>
                                            */}


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
                                                    {annoncereservation.categoryannoncereservation.name ?
                                                        <h6 className={`text-${annoncereservation.categoryannoncereservation.color_name} ml-auto mr-auto`}>
                                                            {annoncereservation.categoryannoncereservation.name}
                                                        </h6>
                                                        :
                                                        null
                                                    }
                                                </div>

                                                <div className="text-center ml-auto">
                                                    <h6 className="text-dark">{annoncereservation.pieces > 0 ?<>{annoncereservation.pieces} p.</>:null } {annoncereservation.rooms > 0 ? <>{annoncereservation.rooms} ch.</>:null} {annoncereservation.surface > 0 ? <>{annoncereservation.surface} m<sup>2</sup></>:null}</h6>
                                                </div>

                                                <div className="text-right ml-auto">
                                                    {annoncereservation.price ?
                                                        <h5 className="text-dark"><b>{annoncereservation.price.formatMoney(2,'.',',') || "0"} {$money_country.length > 2 ? <small><b>{$money_country} - {annoncereservation.periodeannonce.name}</b></small> : <>{$money_country}<small><b> - {annoncereservation.periodeannonce.name}</b></small></>}</b></h5>
                                                        :
                                                        null
                                                    }
                                                </div>
                                            </div>


                                            <div className="text-center">
                                                {$guest ?
                                                    <>
                                                        <Button data-toggle="modal" data-target="#loginModal"
                                                                className="btn btn-facebook btn-sm btn-neutral" title="J'aime">
                                                            <i className="far fa-heart"></i> <b>J'aime</b>
                                                        </Button>
                                                        <Button data-toggle="modal" data-target="#loginModal"
                                                                className="btn btn-facebook btn-sm btn-neutral btn-round" title="Ajouter à vos favoris">
                                                            <i className="far fa-bookmark"></i> <b>Sauvegarder</b>
                                                        </Button>
                                                    </>
                                                    :
                                                    <>
                                                        {annoncereservation.likeked ?
                                                            <>
                                                                <Button onClick={() => this.props.unlikeItem(annoncereservation)}
                                                                        className="btn btn-info btn-sm" title="Je n'aime plus">
                                                                    <i className="fas fa-heart"></i> <b>J'aime</b>
                                                                </Button>
                                                            </>

                                                            :
                                                            <>
                                                                <Button onClick={() => this.props.likeItem(annoncereservation)}
                                                                        className="btn btn-facebook btn-sm btn-neutral" title="J'aime">
                                                                    <i className="far fa-heart"></i> <b>J'aime</b>
                                                                </Button>
                                                            </>
                                                        }


                                                        {annoncereservation.favoriteted ?

                                                            <>
                                                                <Button onClick={() => this.props.unfavoriteItem(annoncereservation)}
                                                                        className="btn btn-danger btn-sm" title="Retirer de vos favoris">
                                                                    <i className="fas fa-bookmark"></i> <b>Sauvegardé</b>
                                                                </Button>
                                                            </>

                                                            :
                                                            <>
                                                                <Button onClick={() => this.props.favoriteItem(annoncereservation)}
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
                                                    Déscription
                                                </h6>
                                                <span>Eres' daring 'Grigri Fortune' swimsuit has
                                                    the fit and coverage of a bikini in a one-piece silhouette.
                                                    This fuchsia style is crafted from the label's sculpting peau
                                                    douce fabric and has flattering
                                                    cutouts through the torso and back. Wear yours with mirrored sunglasses on vacation.
                                                </span>
                                                <hr />
                                                <h6 className="card-title">
                                                    A L'intérieur
                                                </h6>
                                                <span>Eres' daring 'Grigri Fortune' swimsuit has
                                                    the fit and coverage of a bikini in a one-piece silhouette.
                                                    This fuchsia style is crafted from the label's sculpting peau
                                                    douce fabric and has flattering
                                                    cutouts through the torso and back. Wear yours with mirrored sunglasses on vacation.
                                                </span>



                                            </div>
                                        </div>


                                        <div className="card">
                                            <div className="card-body">

                                                <>
                                                    <div className="card-title">
                                                        <b>Contacter l'agence</b>
                                                    </div>
                                                    <div className="card-header d-flex align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            {annoncereservation.user.avatar ?
                                                                <NavLink to={`/pro/${annoncereservation.user.slug}/annonces_annoncereservations/`}>
                                                                    <img src={annoncereservation.user.avatar}
                                                                         style={{ height: "40px", width: "80px" }}
                                                                         alt={annoncereservation.user.first_name}
                                                                         className="avatar" />
                                                                </NavLink>
                                                                : <Skeleton circle={false} height={40} width={80} />}

                                                            {annoncereservation.title && (
                                                                <>
                                                                    <div className="mx-3">
                                                                            <span className="text-dark font-weight-600 text-sm">
                                                                                <Link to={`/pro/${annoncereservation.user.slug}/annonces_annoncereservations/`} ><b>{annoncereservation.user.first_name}</b></Link>
                                                                                <small className="d-block text-muted">{annoncereservation.statusOnline &&(<i className="fas fa-circle text-success"></i>)} {moment(annoncereservation.created_at).format('LL')}</small>
                                                                                <Link to={`/pro/${profileUser.slug}/followers/`}><b>{this.data_countfollowFormatter(profileUser.countfollowerusers || "")} {profileUser.countfollowerusers > 1 ? "abonnés" : "abonné"}</b></Link>
                                                                            </span>
                                                                    </div>

                                                                    {profileUser.followeruser &&(
                                                                        <ButonMiniSubscribedAllAnnonce {...this.props} {...profileUser}
                                                                                                       unsubscribeItem={this.props.unsubscribeItem}
                                                                                                       subscribeItem={this.props.subscribeItem}/>
                                                                    )}

                                                                    <ButonFollowerUser {...this.props} {...profileUser}
                                                                                       unfollowerItem={this.props.unfollowerItem}
                                                                                       followerItem={this.props.followerItem}
                                                                                       nameunfollower={`Suivre`}
                                                                                       nameununfollower={`Abonné`}/>
                                                                </>
                                                            )}
                                                        </div>
                                                        <div className="text-right ml-auto">
                                                            {$guest ?
                                                                <Button data-toggle="modal" data-target="#loginModal"
                                                                        className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Ajouter à vos favoris">
                                                                    <i className="far fa-bookmark"></i>
                                                                </Button>
                                                                :
                                                                <>
                                                                    {annoncereservation.favoriteted ?
                                                                        <Button onClick={() => this.props.unfavoriteItem(annoncereservation)}
                                                                                className="btn btn-danger btn-icon btn-sm" title="Retirer de vos favoris">
                                                                            <i className="fas fa-bookmark"></i>
                                                                        </Button>

                                                                        :
                                                                        <Button onClick={() => this.props.favoriteItem(annoncereservation)}
                                                                                className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Ajouter à vos favoris">
                                                                            <i className="far fa-bookmark"></i>
                                                                        </Button>
                                                                    }
                                                                </>
                                                            }
                                                            <Button className="btn btn-icon btn-sm btn-facebook" title="Copier le lien" onClick={() => this.copyToClipboard()}>
                                                                <i className="fas fa-copy"></i>
                                                            </Button>

                                                            {this.state.showPhonenumber ?
                                                                <button type="button" className="btn btn-sm btn-outline-primary">
                                                                    <i className="now-ui-icons tech_mobile"/><b>{annoncereservation.user.phone !== null ? annoncereservation.user.phone : <>absent</>}</b>
                                                                </button>
                                                                :
                                                                <button type="button" onClick={() => this.showPhonenumberItem()} className="btn btn-icon btn-sm btn-primary">
                                                                    <i className="now-ui-icons tech_mobile"/>
                                                                </button>
                                                            }


                                                            {annoncereservation.user.profile.site_internet && (
                                                                <a href={`${annoncereservation.user.profile.site_internet}`} className="btn btn-icon btn-sm btn-primary" target="_banck">
                                                                    <i className="now-ui-icons objects_globe" />
                                                                </a>
                                                            )}

                                                            {$guest ?

                                                                <button type="button" data-toggle="modal" data-target="#loginModal" title="Signaler"
                                                                        className="btn btn-instagram btn-icon btn-sm">
                                                                    <i className="far fa-flag"></i>
                                                                </button>
                                                                :
                                                                <>
                                                                    {($userIvemo.id === annoncereservation.user.id && $userIvemo.id === annoncereservation.user_id) && (
                                                                        <>
                                                                            <a href={`#${annoncereservation.visits_count}`}
                                                                               className="btn btn-sm btn-secondary" title={`${annoncereservation.visits_count} ${annoncereservation.visits_count > 1 ? "vues" : "vue"}`}>
                                                                                <i className="far fa-eye"></i> <b>{this.data_countFormatter(annoncereservation.visits_count)}</b>
                                                                            </a>
                                                                            <button type="button" rel="tooltip" onClick={() => this.statusItem(annoncereservation)}
                                                                                    className="btn btn-success btn-icon btn-sm" title="Désactiver cette annonce">
                                                                                <i className="now-ui-icons ui-1_check" />
                                                                            </button>
                                                                            {annoncereservation.status_comments ?
                                                                                <Button onClick={() => this.props.statuscommentremoveItem(annoncereservation)}
                                                                                        className="btn btn-primary btn-icon btn-sm" title="Commentaire activé">
                                                                                    <i className="fas fa-comments" />
                                                                                </Button>
                                                                                :
                                                                                <Button onClick={() => this.props.statuscommentaddItem(annoncereservation)}
                                                                                        className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Commentaire désactivé">
                                                                                    <i className="far fa-comments" />
                                                                                </Button>

                                                                            }
                                                                            <NavLink to={`/annonce_annoncereservation/${annoncereservation.annoncetype.slug}/${annoncereservation.slugin}/edit/`} className="btn btn-sm btn-info btn-icon btn-sm" title="Editer cette annonce">
                                                                                <i className="now-ui-icons ui-2_settings-90" />
                                                                            </NavLink>
                                                                            <Button onClick={() => this.deleteItem(annoncereservation.id)}
                                                                                    className="btn btn-icon btn-sm btn-danger" title="Supprimer cette annonce">
                                                                                <i className="now-ui-icons ui-1_simple-remove" />
                                                                            </Button>
                                                                        </>
                                                                    )}
                                                                    <button type="button" title="Signaler l'annonce" onClick={() => this.signalerUser(this.props)}
                                                                            className="btn btn-instagram btn-sm" >
                                                                        <i className="far fa-flag"></i> <b>{$userIvemoIsadmin.status_user && (<>{annoncereservation.countsignals}</>)}</b>
                                                                    </button>
                                                                </>
                                                            }

                                                        </div>
                                                    </div>
                                                    <div className="card-title">
                                                        {annoncereservation.user.profile.address && (
                                                            <>
                                                                <i className="now-ui-icons location_pin" />
                                                                <b>{annoncereservation.user.profile.address}</b>
                                                            </>
                                                        )}
                                                        <br />
                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="col-md-6 col-6">
                                                                    <Link to={`/pro/${annoncereservation.user.slug}/`} title={`Profile de ${annoncereservation.user.first_name}`}>
                                                                        <small><b>Consulter le profil de l'utilisateur</b></small>
                                                                    </Link>
                                                                </div>
                                                                {annoncereservation.user.profile.site_internet && (
                                                                    <div className="col-md-6 col-6">
                                                                        <a href={`${annoncereservation.user.profile.site_internet}`} target="_blank" title={annoncereservation.user.profile.site_internet}>
                                                                            <small><b>Consulter le site web de l'utilisateur</b></small>
                                                                        </a>
                                                                    </div>
                                                                )}

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    {annoncereservation.user.profile.description && (
                                                        <>
                                                            <b>Informations légales de l'utilisateur</b>
                                                            <br />
                                                            <b dangerouslySetInnerHTML={{ __html: (annoncereservation.user.profile.description) }} />
                                                        </>
                                                    )}
                                                </>

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

                                                                        <FormContactAnnoncereservationUser {...this.props}/>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>


                                        {annoncereservation.status_comments ?

                                            <AnnoncereservationcommentIndex {...this.props} {...annoncereservation} />
                                            :
                                            <>
                                                {!$guest && (
                                                    <>
                                                        {($userIvemo.id === annoncereservation.user.id || $userIvemo.id === annoncereservation.user_id)  && (

                                                            <AnnoncereservationcommentIndex {...this.props} {...annoncereservation} />

                                                        )}
                                                    </>
                                                )}
                                            </>

                                        }


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
                                                            <div className="card-header d-flex align-items-center">
                                                                <div className="d-flex align-items-center">

                                                                    {annoncereservation.user.avatar ?
                                                                        <NavLink to={`/pro/${annoncereservation.user.slug}/annonces_reservations/`}>
                                                                            <img src={annoncereservation.user.avatar}
                                                                                 style={{ height: "40px", width: "80px" }}
                                                                                 alt={annoncereservation.user.first_name}
                                                                                 className="avatar" />
                                                                        </NavLink>
                                                                        : <Skeleton circle={false} height={40} width={80} />}

                                                                    {annoncereservation.title && (
                                                                        <>
                                                                            <div className="mx-3">
                                                                                <span className="text-dark font-weight-600 text-sm">
                                                                                    <Link to={`/pro/${annoncereservation.user.slug}/annonces_annoncereservations/`} ><b>{annoncereservation.user.first_name}</b></Link>
                                                                                    <small className="d-block text-muted">{annoncereservation.statusOnline &&(<i className="fas fa-circle text-success"></i>)} {moment(annoncereservation.created_at).format('LL')}</small>
                                                                                    <Link to={`/pro/${profileUser.slug}/followers/`}><b>{this.data_countfollowFormatter(profileUser.countfollowerusers || "")} {profileUser.countfollowerusers > 1 ? "abonnés" : "abonné"}</b></Link>
                                                                                </span>



                                                                            </div>

                                                                            {profileUser.followeruser &&(
                                                                                <ButonMiniSubscribedAllAnnonce {...this.props} {...profileUser}
                                                                                                               unsubscribeItem={this.props.unsubscribeItem}
                                                                                                               subscribeItem={this.props.subscribeItem}/>
                                                                            )}

                                                                            <ButonFollowerUser {...this.props} {...profileUser}
                                                                                               unfollowerItem={this.props.unfollowerItem}
                                                                                               followerItem={this.props.followerItem}
                                                                                               nameunfollower={`Suivre`}
                                                                                               nameununfollower={`Abonné`}/>
                                                                        </>
                                                                    )}

                                                                </div>

                                                            </div>
                                                            <div className="card-header text-center">
                                                                <div className="card-title">
                                                                    <button type="button" onClick={() => this.showPhonenumberItem()} className="btn btn-sm btn-outline-primary">
                                                                        <i className="now-ui-icons tech_mobile"/>
                                                                        <b>{this.state.showPhonenumber ? <>{annoncereservation.user.phone !== null ? annoncereservation.user.phone : <>absent</>}</>:<>Afficher le téléphone</>}</b>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className="card-header text-center">
                                                                <div className="card-title">
                                                                    Contacter <b>{annoncereservation.user.first_name} </b>
                                                                </div>
                                                            </div>

                                                           <FormcontactuseronreservationShow {...this.props}/>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>



                                <AnnonceservationInteresse {...this.props}/>

                                <BlogannoncereservationIntesseAnnonseShow {...this.props} />

                            </div>

                        </div>

                        <FooterBigUserSite />
                    </div>
                </div>
            </>

        )
    }
}

Annoncebycategoryannoncereservationcityshow.propTypes = {
    loadannoncereservationshowusersite: PropTypes.func.isRequired,
    loadProfileusersforpublic: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    annoncereservation: store.annoncereservationshow.item,
    profileUser: store.profile.profiluser
});

export default connect(mapStoreToProps, {
    loadannoncereservationshowusersite,
    statuscommentremoveItem,
    statuscommentaddItem,
    likeItem,unlikeItem,
    favoriteItem,unfavoriteItem,

    loadProfileusersforpublic,
    unsubscribeItem,subscribeItem,
    unfollowerItem,followerItem,
})(Annoncebycategoryannoncereservationcityshow);
