import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import AnnonceservationInteresse from "./AnnonceservationInteresse";
import FormContactAnnoncereservationUser from "./inc/FormContactAnnoncereservationUser";
import FormcontactuseronreservationShow from "./inc/FormcontactuseronreservationShow";
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
import AnnoncereservationuploadimageIndex from "../../uploadimages/AnnoncereservationuploadimageIndex";
import Navlinknewannoncereservation from "./treatment/Navlinknewannoncereservation";
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
            title: 'D??sactiver l\'annonce?',
            text: "??tes vous sure de vouloir confirmer cette action?",
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
                let url = route('annonces_reservations_status.site', annoncereservation.slugin);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/

                    if(item.status){
                        $.notify({

                                //message: 'Annonce d??sactiver avec succ??s',
                                message: "Annonce masqu??e aux utilisateurs",
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

                                //message: 'Annonce d??sactiver avec succ??s',
                                message: "Annonce masqu??e visible aux utilisateurs",
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

                    this.props.history.push("/ars/"+ this.props.match.params.annoncetype +"/");

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
            text: "??tes-vous s??r de vouloir executer cette action?",
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
                            message: 'Annonce suprim??e avec succ??s'
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
    getDescription(annoncereservation) {
        return { __html: annoncereservation.description};
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
                                            <div className="d-flex align-items-center">
                                                <div className="text-left pull-left">
                                                    <button type="button" className="btn btn-neutral btn-sm" onClick={this.props.history.goBack}>
                                                        <i className="now-ui-icons arrows-1_minimal-left"/> <b>Retour au annonces </b>
                                                    </button>
                                                </div>

                                                <div className="text-right ml-auto">
                                                    {annoncereservation.title ?
                                                        <>
                                                            {annoncereservation.expired_at <= 6 && (
                                                                <Button className="btn btn-success btn-sm">
                                                                    <b>New</b>
                                                                </Button>
                                                            )}

                                                            <Button className="btn btn-dark btn-sm">
                                                                <i className="now-ui-icons media-1_album"></i>
                                                                <b>{annoncereservation.uploadimages_count || "0"}</b>
                                                            </Button>
                                                            {annoncereservation.link_video && (
                                                                <Button className="btn btn-dark btn-sm">
                                                                    <b>video</b>
                                                                </Button>
                                                            )}

                                                            {($userIvemoIsadmin.status_user) && (

                                                                <NavLink to={`/ar_data/${annoncereservation.annoncetype.slug}/${annoncereservation.slugin}/edit/`} className="btn btn-sm btn-primary btn-icon btn-sm" title="Editer cette annonce">
                                                                    <i className="now-ui-icons education_atom" />
                                                                </NavLink>
                                                            )}
                                                        </>
                                                        :
                                                        <h5 className="text-dark"><b><Skeleton width={150} /></b></h5>
                                                    }
                                                </div>
                                            </div>


                                            <AnnoncereservationuploadimageIndex {...this.props}/>

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
                                                                className="btn btn-facebook btn-sm btn-neutral btn-round" title="Ajouter ?? vos favoris">
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
                                                                    <i className="fas fa-bookmark"></i> <b>Sauvegard??</b>
                                                                </Button>
                                                            </>

                                                            :
                                                            <>
                                                                <Button onClick={() => this.props.favoriteItem(annoncereservation)}
                                                                        className="btn btn-facebook btn-sm btn-neutral" title="Ajouter ?? vos favoris">
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

                                                {annoncereservation.status_wifi && (
                                                    <Button
                                                        className="btn btn-facebook btn-sm btn-neutral" title="Wi-Fi gratuit">
                                                        <i className="fas fa-wifi"></i> Wi-Fi gratuit
                                                    </Button>
                                                )}
                                                {annoncereservation.status_lunch && (
                                                    <Button
                                                        className="btn btn-facebook btn-sm btn-neutral" title="Petit-d??jeuner compris">
                                                        <i className="fas fa-coffee"></i> Petit-d??jeuner compris
                                                    </Button>
                                                )}
                                               {annoncereservation.status_car_sharing && (
                                                            <Button className="btn btn-facebook btn-sm btn-neutral" title="Service voituri??">
                                                                <i className="fas fa-car"></i> Service voituri??
                                                            </Button>
                                                )}
                                                {annoncereservation.status_parking && (
                                                            <Button className="btn btn-facebook btn-sm btn-neutral" title="Parking compris">
                                                                <i className="fas fa-parking"></i> Parking compris
                                                            </Button>
                                                )}


                                                {annoncereservation.dry_cleaning && (
                                                    <Button
                                                        className="btn btn-facebook btn-sm btn-neutral" title="Pressing">
                                                        <i className="fas fa-tshirt"></i> Pressing
                                                    </Button>
                                                )}

                                                {annoncereservation.elevator && (
                                                    <Button
                                                        className="btn btn-facebook btn-sm btn-neutral" title="Ascenceur">
                                                        <i className="fas fa-square"></i> Ascenceur
                                                    </Button>
                                                )}

                                                {annoncereservation.status_consiegerie && (
                                                    <Button
                                                        className="btn btn-facebook btn-sm btn-neutral" title="Bagagerie : laissez en d??p??t vos valises et bagages gratuitement le jour d'arriv??e ou de d??part et profitez librement de votre journ??e ?? yaounde.">
                                                        <i className="fas fa-luggage-cart"></i> Bagagerie
                                                    </Button>
                                                )}

                                                <h6 className="card-title">
                                                    D??scription
                                                </h6>
                                                {annoncereservation.description ? <span className="title text-justify" dangerouslySetInnerHTML={this.getDescription(annoncereservation)} />: <Skeleton count={5}/>}




                                            </div>
                                        </div>

                                        {annoncereservation.link_video && (

                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-12 mx-auto">
                                                            <h5><b>Description en vid??o</b></h5>

                                                            <iframe border="2px solid #ccc" width="100%" height="315"
                                                                    src={annoncereservation.link_video}
                                                                    frameBorder="0"
                                                                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                                    allowFullScreen></iframe>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className="card">
                                            <div className="social-line social-line-big-icons">
                                                <div className="container">
                                                    <div className="row">

                                                        {annoncereservation.price && (
                                                            <div className="col-md-8 mx-auto">
                                                                <h5 className="info-title"><b><span style={{ textTransform: "capitalize" }}>{annoncereservation.categoryannoncereservation.label}</span> revient ??</b></h5>

                                                                <h2 className="ivemoColorOrange"><b>{annoncereservation.price.formatMoney(2,'.',',')} {$money_country.length > 2 ? <small><b>{$money_country} {annoncereservation.periodeannonce_id !== null && (" - " + annoncereservation.periodeannonce.name)}</b></small> : <>{$money_country}<small><b> {annoncereservation.periodeannonce_id !== null && (" - " + annoncereservation.periodeannonce.name)}</b></small></>}</b></h2>
                                                            </div>
                                                        )}


                                                    </div>
                                                </div>
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
                                                                <NavLink to={`/pro/${annoncereservation.user.slug}/ars/${annoncereservation.annoncetype.slug}/`}>
                                                                    <img src={annoncereservation.user.avatar}
                                                                         style={{ height: "40px", width: "80px" }}
                                                                         alt={annoncereservation.user.first_name}
                                                                         className="avatar" />
                                                                </NavLink>
                                                                :  <img className="avatar" style={{ height: "40px", width: "80px" }}
                                                                        src={`/assets/vendor/assets/img/blurredimage1.jpg`}/>}

                                                            {annoncereservation.title && (
                                                                <>
                                                                    <div className="mx-3">
                                                                            <span className="text-dark font-weight-600 text-sm">
                                                                                <Link to={`/pro/${annoncereservation.user.slug}/ars/${annoncereservation.annoncetype.slug}/`} ><b>{annoncereservation.user.first_name}</b></Link>
                                                                                <small className="d-block text-muted">{annoncereservation.statusOnline &&(<i className="fas fa-circle text-success"></i>)} {moment(annoncereservation.created_at).format('LL')}</small>
                                                                                <Link to={`/pro/${profileUser.slug}/followers/`}><b>{this.data_countfollowFormatter(profileUser.countfollowerusers || "")} {profileUser.countfollowerusers > 1 ? "abonn??s" : "abonn??"}</b></Link>
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
                                                                                       classNameDanger="btn btn-sm btn-danger"
                                                                                       classNameInfo="btn btn-sm btn-info"
                                                                                       nameunfollower={`Suivre`}
                                                                                       nameununfollower={`Abonn??`}/>
                                                                </>
                                                            )}
                                                        </div>
                                                        <div className="text-right ml-auto">
                                                            {$guest ?
                                                                <Button data-toggle="modal" data-target="#loginModal"
                                                                        className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Ajouter ?? vos favoris">
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
                                                                                className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Ajouter ?? vos favoris">
                                                                            <i className="far fa-bookmark"></i>
                                                                        </Button>
                                                                    }
                                                                     <NavLink to={`/messages/ars/${$userIvemo.slug}/${annoncereservation.annoncetype.slug}/${annoncereservation.slugin}`} title="Laisser un message" className="btn btn-sm btn-icon btn-primary">
                                                                        <i className="now-ui-icons ui-1_send" />
                                                                     </NavLink>
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
                                                                                    className="btn btn-success btn-icon btn-sm" title="D??sactiver cette annonce">
                                                                                <i className="now-ui-icons ui-1_check" />
                                                                            </button>
                                                                            {annoncereservation.status_comments ?
                                                                                <Button onClick={() => this.props.statuscommentremoveItem(annoncereservation)}
                                                                                        className="btn btn-primary btn-icon btn-sm" title="Commentaire activ??">
                                                                                    <i className="fas fa-comments" />
                                                                                </Button>
                                                                                :
                                                                                <Button onClick={() => this.props.statuscommentaddItem(annoncereservation)}
                                                                                        className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Commentaire d??sactiv??">
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
                                                            <b>Informations l??gales de l'utilisateur</b>
                                                            <br />
                                                            <b dangerouslySetInnerHTML={{ __html: (annoncereservation.user.profile.description) }} />
                                                        </>
                                                    )}
                                                </>

                                                <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                    <div className="card card-plain">
                                                        <div className="card-header" role="tab" id="headingOne">
                                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                <b>Reserver {annoncereservation.categoryannoncereservation.label} ?</b>
                                                                <i className="now-ui-icons arrows-1_minimal-down"/>
                                                            </a>
                                                        </div>
                                                        <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                                            <div className="card-body">
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                                        <FormContactAnnoncereservationUser {...this.props} {...annoncereservation}/>

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
                                            <Navlinknewannoncereservation {...this.props} />
                                        </div>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                            <div className="card-header d-flex align-items-center">
                                                                <div className="d-flex align-items-center">

                                                                    {annoncereservation.user.avatar ?
                                                                        <NavLink to={`/pro/${annoncereservation.user.slug}/ars/${annoncereservation.annoncetype.slug}/`}>
                                                                            <img src={annoncereservation.user.avatar}
                                                                                 style={{ height: "40px", width: "80px" }}
                                                                                 alt={annoncereservation.user.first_name}
                                                                                 className="avatar" />
                                                                        </NavLink>
                                                                        :  <img className="avatar" style={{ height: "40px", width: "80px" }}
                                                                                src={`/assets/vendor/assets/img/blurredimage1.jpg`}/>}

                                                                    {annoncereservation.title && (
                                                                        <>
                                                                            <div className="mx-3">
                                                                                <span className="text-dark font-weight-600 text-sm">
                                                                                    <Link to={`/pro/${annoncereservation.user.slug}/ars/${annoncereservation.annoncetype.slug}/`} >
                                                                                        <b>{annoncereservation.user.first_name} {/*<i className="fas fa-certificate text-info"></i>*/}</b>
                                                                                    </Link>
                                                                                    <small className="d-block text-muted">{annoncereservation.statusOnline &&(<i className="fas fa-circle text-success"></i>)} {moment(annoncereservation.created_at).format('LL')}</small>
                                                                                    <Link to={`/pro/${profileUser.slug}/followers/`}><b>{this.data_countfollowFormatter(profileUser.countfollowerusers || "")} {profileUser.countfollowerusers > 1 ? "abonn??s" : "abonn??"}</b></Link>
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
                                                                                               classNameDanger="btn btn-sm btn-danger"
                                                                                               classNameInfo="btn btn-sm btn-info"
                                                                                               nameunfollower={`Suivre`}
                                                                                               nameununfollower={`Abonn??`}/>
                                                                        </>
                                                                    )}

                                                                </div>

                                                            </div>
                                                            <div className="card-header text-center">
                                                                <div className="card-title">
                                                                    <button type="button" onClick={() => this.showPhonenumberItem()} className="btn btn-sm btn-outline-primary">
                                                                        <i className="now-ui-icons tech_mobile"/>
                                                                        <b>{this.state.showPhonenumber ? <>{annoncereservation.user.phone !== null ? annoncereservation.user.phone : <>absent</>}</>:<>Afficher le t??l??phone</>}</b>
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

                                {/*<BlogannoncereservationIntesseAnnonseShow {...this.props} />*/}

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
