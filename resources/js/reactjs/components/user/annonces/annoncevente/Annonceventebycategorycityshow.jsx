import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import {Button, Form, Input} from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FormcontactuseronannonceventeShow from "./inc/FormcontactuseronannonceventShow";
import AnnonceventeInteresse from "./AnnonceventeInteresse";
import Skeleton from "react-loading-skeleton";
import Swal from "sweetalert2";
import Navlinknewannoncevente from "./treatment/Navlinknewannoncevente";
import SignalFromAnnonceventeShow from "./inc/SignalFromAnnonceventeShow";
import HelmetSite from "../../../inc/user/HelmetSite";
import AnnoncereseventecommentIndex from "../../comments/AnnoncereseventecommentIndex";
import moment from "moment";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    favoriteItem, followerItem,
    likeItem,
    loadannonceventeshowusersite, loadProfileusersforpublic, statuscommentaddItem,
    statuscommentremoveItem,
    subscribeItem, unsubscribeItem,
    unfavoriteItem, unfollowerItem, unlikeItem,
} from "../../../../redux/actions/annoncevente/annonceventeshowActions";
import ButonMiniSubscribedAllAnnonce from "../../../inc/vendor/ButonMiniSubscribedAllAnnonce";
import ButonFollowerUser from "../../../inc/vendor/follow/ButonFollowerUser";
import AnnonceventeuploadimageIndex from "../../uploadimages/AnnonceventeuploadimageIndex";
import FooterUserSite from "../../../inc/user/FooterUserSite";
const abbrev = ['', 'k', 'M', 'B', 'T'];


class Annonceventebycategorycityshow extends Component {
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

            showPhonenumber: false
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.statusItem = this.statusItem.bind(this);
        this.statuscommentItem = this.statuscommentItem.bind(this);
        this.signalerUser = this.signalerUser.bind(this);


        this.showPhonenumberItem = this.showPhonenumberItem.bind(this);
    }

    showPhonenumberItem() {
        this.setState({showPhonenumber: true});
    }

    signalerUser(item) {
        $('#addNew').modal('show');
        //this.setState({
          //  annonceItem: item
        //});
    }

    copyToClipboard(){
        navigator.clipboard.writeText(window.location.toString());
        $.notify({
            message: "Lien copié correctement avec succès",
        },{
            allow_dismiss: false,
            type: 'success',
            placement: {
                from: 'top',
                align: 'center'
            },
            animate: {
                enter: "animate__animated animate__fadeInDown",
                exit: "animate__animated animate__fadeOutUp"
            },
        });
    }

    statuscommentItem(annoncevente){
        Swal.fire({
            text: "êtes vous sure de vouloir changer le status des commentaires de cette annonce?",
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
                let url = route('annonces_ventes_status_comments.site',annoncevente.id);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    if(annoncevente.status_comments){
                        $.notify({

                                message: "Commentaire desactivé sur cette annonce",
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

                                message: "Commentaire activés sur cette annonce",
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
        })

    }

    statusItem(annoncevente){
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

                //Envoyer la requet au server
                let url = route('annonces_ventes_status.site',annoncevente.id);
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
                    this.props.history.push("/annonces_ventes/"+ this.props.match.params.annoncetype +"/");
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

                let isNotId = data => data.id !== id;
                let updatedItems = this.state.annoncevente.filter(isNotId);
                this.setState({ annoncevente: updatedItems });

                let itemannoncetype = this.props.match.params.annoncetype;
                const url = route('annonces_ventes_delete.site',[id]);
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
                    this.props.history.push(`/av_data/${itemannoncetype}/new/`);

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
        this.props.loadannonceventeshowusersite(this.props);
        this.props.loadProfileusersforpublic(this.props);
    }

   // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();
    }

    getDescription(annoncevente) {
        return { __html: (annoncevente.description) };
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
        const {annoncevente,profileUser} = this.props;
        return (
            <>
                <HelmetSite title={`${annoncevente.title || $name_site} - ${$name_site}`}/>

                <div className="about-us sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary">
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
                                                    {annoncevente.title ?
                                                        <>
                                                            {annoncevente.expired_at <= 6 && (
                                                                <Button className="btn btn-success btn-sm">
                                                                    <b>New</b>
                                                                </Button>
                                                            )}

                                                            <Button className="btn btn-dark btn-sm">
                                                                <i className="now-ui-icons media-1_album"></i>
                                                                <b>{annoncevente.uploadimages_count || "0"}</b>
                                                            </Button>
                                                            {annoncevente.link_video && (
                                                                <Button className="btn btn-dark btn-sm">
                                                                    <b>video</b>
                                                                </Button>
                                                            )}

                                                            {($userIvemoIsadmin.status_user) && (

                                                                <NavLink to={`/av_data/${annoncevente.annoncetype.slug}/${annoncevente.slugin}/edit/`} className="btn btn-sm btn-primary btn-icon btn-sm" title="Editer cette annonce">
                                                                    <i className="now-ui-icons education_atom" />
                                                                </NavLink>
                                                            )}
                                                        </>
                                                        :
                                                        <h5 className="text-dark"><b><Skeleton width={150} /></b></h5>
                                                    }
                                                </div>
                                            </div>

                                            <AnnonceventeuploadimageIndex {...this.props}/>
                                            <br />
                                            <div className="d-flex align-items-center">
                                                <div className="text-left pull-left">
                                                    {annoncevente.slug ?
                                                        <h6 className={`text-${annoncevente.categoryannoncevente.color_name} ml-auto mr-auto`}>
                                                            {annoncevente.categoryannoncevente.name}
                                                        </h6>
                                                        :
                                                        <h6 className={`ml-auto mr-auto`}>
                                                            <Skeleton width={150}/>
                                                        </h6>
                                                    }

                                                </div>

                                                {/*
                                                <div className="text-center ml-auto">
                                                    <a href="#pablo" className="btn btn-primary btn-round">
                                                        <i className="now-ui-icons ui-2_favourite-28"/> Dejà sauvegarder
                                                    </a>
                                                </div>
                                                */}

                                                <div className="text-center ml-auto">
                                                    {annoncevente.slug ?
                                                        <h6 className="text-dark">{annoncevente.pieces && (<>{annoncevente.pieces} p .</>)} {annoncevente.rooms && (<>{annoncevente.rooms} ch .</>)} {annoncevente.surface && (<>{annoncevente.surface} m<sup>2</sup></>)}</h6>

                                                        :
                                                        <h6 className={`ml-auto mr-auto`}>
                                                            <Skeleton width={150} />
                                                        </h6>
                                                    }
                                                </div>

                                                <div className="text-right ml-auto">
                                                {annoncevente.price ?
                                                    <h5 className="ivemoColorOrange"><b>{annoncevente.price.formatMoney(2,'.',',')} {$money_country.length > 2 ? <small><b>{$money_country}</b></small> : <>{$money_country}</>}</b></h5>
                                                        :
                                                    <h5 className="text-dark"><b><Skeleton width={150} /></b></h5>
                                                }
                                                </div>
                                            </div>

                                            <div className="text-center">
                                                {annoncevente.slug && (
                                                    <>
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
                                                                {annoncevente.likeked ?
                                                                    <>
                                                                        <Button onClick={() => this.props.unlikeItem(annoncevente)}
                                                                                className="btn btn-info btn-sm" title="Je n'aime plus">
                                                                            <i className="fas fa-heart"></i> <b>J'aime</b>
                                                                        </Button>
                                                                    </>

                                                                    :
                                                                    <>
                                                                        <Button onClick={() => this.props.likeItem(annoncevente)}
                                                                                className="btn btn-facebook btn-sm btn-neutral" title="J'aime">
                                                                            <i className="far fa-heart"></i> <b>J'aime</b>
                                                                        </Button>
                                                                    </>
                                                                }

                                                                {annoncevente.favoriteted ?

                                                                    <>
                                                                        <Button onClick={() => this.props.unfavoriteItem(annoncevente)}
                                                                                className="btn btn-danger btn-sm" title="Retirer de vos favoris">
                                                                            <i className="fas fa-bookmark"></i> <b>Sauvegarder</b>
                                                                        </Button>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <Button onClick={() => this.props.favoriteItem(annoncevente)}
                                                                                className="btn btn-facebook btn-sm btn-neutral" title="Ajouter à vos favoris">
                                                                            <i className="far fa-bookmark"></i> <b>Sauvegarder</b>
                                                                        </Button>
                                                                    </>
                                                                }
                                                            </>
                                                        }
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-body">

                                                <div className="text-center ml-auto">
                                                    {annoncevente.slug ?
                                                        <>
                                                            <h6 className="text-dark">{annoncevente.pieces && (<>{annoncevente.pieces} {annoncevente.pieces >= 2 ? "pieces " : "piece "}</>)}  {annoncevente.rooms && (<> - {annoncevente.rooms} {annoncevente.rooms >= 2 ? "chambres " : "chambre "}</>)}  {annoncevente.surface && (<> - {annoncevente.surface} m<sup>2</sup></>)}</h6>
                                                            <h6 className="text-dark">
                                                                {annoncevente.furniture && ("meublé -")}
                                                                {annoncevente.terrace && (<> {annoncevente.terrace_number} {annoncevente.terrace_number >= 2 ? "terrasses" : "terrasse"}</>)}
                                                                {annoncevente.balcony && (<> - {annoncevente.balcony_number} {annoncevente.balcony_number >= 2 ? "balcons" : "balcon"}</>)}
                                                                {annoncevente.elevator && (" - ascenseur")}
                                                            </h6>
                                                        </>
                                                        :
                                                        <h6 className={`ml-auto mr-auto`}>
                                                            <Skeleton width={150} />
                                                        </h6>
                                                    }
                                                </div>
                                                {annoncevente.slug && (
                                                    <h5 className="card-title">
                                                        À propos de <b><span style={{ textTransform: "lowercase" }}>{annoncevente.categoryannoncevente.label} </span>{annoncevente.pieces && (<>{annoncevente.pieces} {annoncevente.pieces >= 2 ? "pieces" : "piece"}</>)} en vente à {annoncevente.city.name} - {annoncevente.district}</b>
                                                    </h5>
                                                )}

                                                {annoncevente.description ? <span className="title text-justify" dangerouslySetInnerHTML={this.getDescription(annoncevente)} />: <Skeleton count={3}/>}

                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="social-line social-line-big-icons">
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <h5 className="info-title"><b><span style={{ textTransform: "capitalize" }}>{annoncevente.categoryannoncevente.label || "Ce bien"}</span> revient à</b></h5>
                                                            {annoncevente.price && (
                                                                <h2 className="ivemoColorOrange"><b>{annoncevente.price.formatMoney(2,'.',',')} {$money_country.length > 2 ? <small><b>{$money_country}</b></small> : <>{$money_country}</>}</b></h2>
                                                            )}
                                                        </div>
                                                        <div className="col-md-6">
                                                            <h5 className="info-title"><b>Informations suplementaires</b></h5>
                                                            {annoncevente.award_price && (
                                                                <p>
                                                                    <b>Ce bien revient a :</b>
                                                                    <span className="title"><b> {annoncevente.award_price ? <>{annoncevente.award_price.formatMoney(2,'.',',')} {$money_country.length > 2 ? <small><b>{$money_country} - le m<sup>2</sup></b></small> : <>{$money_country}<small><b> - le m<sup>2</sup></b></small></>}</>:null} </b></span>
                                                                </p>
                                                            )}

                                                        </div>
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
                                                            {annoncevente.user.avatar ?
                                                                <NavLink to={`/pro/${annoncevente.user.slug}/avs/${annoncevente.annoncetype.slug}/`}>
                                                                    <img src={annoncevente.user.avatar}
                                                                         style={{ height: "40px", width: "80px" }}
                                                                         alt={annoncevente.user.first_name}
                                                                         className="avatar" />
                                                                </NavLink>
                                                                : <img className="avatar" style={{ height: "40px", width: "80px" }}
                                                                       src={`/assets/vendor/assets/img/blurredimage1.jpg`}/>}

                                                            {annoncevente.title && (
                                                                <>
                                                                    <div className="mx-3">
                                                                            <span className="text-dark font-weight-600 text-sm">
                                                                                <Link to={`/pro/${annoncevente.user.slug}/avs/${annoncevente.annoncetype.slug}/`} ><b>{annoncevente.user.first_name}</b></Link>
                                                                                <small className="d-block text-muted">{annoncevente.statusOnline &&(<i className="fas fa-circle text-success"></i>)} {moment(annoncevente.created_at).format('LL')}</small>
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
                                                                                       classNameDanger="btn btn-sm btn-danger"
                                                                                       classNameInfo="btn btn-sm btn-info"
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
                                                                    {annoncevente.favoriteted ?
                                                                        <Button onClick={() => this.props.unfavoriteItem(annoncevente)}
                                                                                className="btn btn-danger btn-icon btn-sm" title="Retirer de vos favoris">
                                                                            <i className="fas fa-bookmark"></i>
                                                                        </Button>

                                                                        :
                                                                        <Button onClick={() => this.props.favoriteItem(annoncevente)}
                                                                                className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Ajouter à vos favoris">
                                                                            <i className="far fa-bookmark"></i>
                                                                        </Button>
                                                                    }
                                                                </>
                                                            }
                                                            <Button className="btn btn-icon btn-sm btn-facebook" title="Copier le lien" onClick={() => this.copyToClipboard()}>
                                                                <i className="far fa-share-square"></i>
                                                            </Button>

                                                            {this.state.showPhonenumber ?
                                                                <button type="button" className="btn btn-sm btn-outline-success">
                                                                    <i className="now-ui-icons tech_mobile"/><b>
                                                                    {annoncevente.phone_seller !== null ?
                                                                    <>{annoncevente.phone_seller}</>
                                                                    :
                                                                    <>
                                                                        {annoncevente.user.phone !== null ? annoncevente.user.phone : <>absent</>}
                                                                    </>
                                                                }</b>
                                                                </button>
                                                                :
                                                                <button type="button" onClick={() => this.showPhonenumberItem()} className="btn btn-icon btn-sm btn-primary">
                                                                    <i className="now-ui-icons tech_mobile"/>
                                                                </button>
                                                            }


                                                            {annoncevente.user.profile.site_internet && (
                                                                <a href={`${annoncevente.user.profile.site_internet}`} className="btn btn-icon btn-sm btn-primary" target="_banck">
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
                                                                    {($userIvemo.id === annoncevente.user.id && $userIvemo.id === annoncevente.user_id) && (
                                                                        <>
                                                                            <a href={`#${annoncevente.visits_count}`}
                                                                               className="btn btn-sm btn-secondary" title={`${annoncevente.visits_count} ${annoncevente.visits_count > 1 ? "vues" : "vue"}`}>
                                                                                <i className="far fa-eye"></i> <b>{this.data_countFormatter(annoncevente.visits_count)}</b>
                                                                            </a>
                                                                            <NavLink to={`/profile/${annoncevente.user.slug}/statistics/avs/${annoncevente.annoncetype.slug}/${annoncevente.slugin}/`} className="btn btn-sm btn-icon btn-secondary" title="Statistiques">
                                                                                <i className="now-ui-icons business_chart-bar-32"/>
                                                                            </NavLink>
                                                                            <button type="button" rel="tooltip" onClick={() => this.statusItem(annoncevente)}
                                                                                    className="btn btn-success btn-icon btn-sm" title="Désactiver cette annonce">
                                                                                <i className="now-ui-icons ui-1_check" />
                                                                            </button>
                                                                            {annoncevente.status_comments ?
                                                                                <Button onClick={() => this.props.statuscommentremoveItem(annoncevente)}
                                                                                        className="btn btn-primary btn-icon btn-sm" title="Commentaire activé">
                                                                                    <i className="fas fa-comments" />
                                                                                </Button>
                                                                                :
                                                                                <Button onClick={() => this.props.statuscommentaddItem(annoncevente)}
                                                                                        className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Commentaire désactivé">
                                                                                    <i className="far fa-comments" />
                                                                                </Button>

                                                                            }
                                                                            <NavLink to={`/av_data/${annoncevente.annoncetype.slug}/${annoncevente.slugin}/edit/`} className="btn btn-sm btn-info btn-icon btn-sm" title="Editer cette annonce">
                                                                                <i className="now-ui-icons ui-2_settings-90" />
                                                                            </NavLink>
                                                                            <Button onClick={() => this.deleteItem(annoncevente.id)}
                                                                                    className="btn btn-icon btn-sm btn-danger" title="Supprimer cette annonce">
                                                                                <i className="now-ui-icons ui-1_simple-remove" />
                                                                            </Button>
                                                                        </>
                                                                    )}
                                                                    <button type="button" title="Signaler l'annonce" onClick={() => this.signalerUser(this.props)}
                                                                            className="btn btn-instagram btn-sm" >
                                                                        <i className="far fa-flag"></i> <b>{$userIvemoIsadmin.status_user && (<>{annoncevente.countsignals}</>)}</b>
                                                                    </button>
                                                                </>
                                                            }

                                                        </div>
                                                    </div>
                                                    <div className="card-title">
                                                        {annoncevente.user.profile.address && (
                                                            <>
                                                                <i className="now-ui-icons location_pin" />
                                                                <b>{annoncevente.user.profile.address}</b>
                                                            </>
                                                        )}
                                                        <br />
                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="col-md-6 col-6">
                                                                    <Link to={`/pro/${annoncevente.user.slug}/`} title={`Profile de ${annoncevente.user.first_name}`}>
                                                                        <small><b>Consulter le profil de l'utilisateur</b></small>
                                                                    </Link>
                                                                </div>
                                                                {annoncevente.user.profile.site_internet && (
                                                                    <div className="col-md-6 col-6">
                                                                        <a href={`${annoncevente.user.profile.site_internet}`} target="_blank" title={annoncevente.user.profile.site_internet}>
                                                                            <small><b>Consulter le site web de l'utilisateur</b></small>
                                                                        </a>
                                                                    </div>
                                                                )}

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    {annoncevente.user.profile.description && (
                                                        <>
                                                            <b>Informations légales de l'utilisateur</b>
                                                            <br />
                                                            <b dangerouslySetInnerHTML={{ __html: (annoncevente.user.profile.description) }} />
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

                                                                            <FormcontactuseronannonceventeShow {... this.props}/>


                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>

                                        {/* Ici l'utilisateur peux masquer le commentaire*/}

                                        {annoncevente.status_comments ?

                                            <AnnoncereseventecommentIndex {...this.props} {...annoncevente} />
                                            :
                                            <>
                                                {!$guest && (
                                                   <>
                                                       {($userIvemo.id === annoncevente.user.id || $userIvemo.id === annoncevente.user_id)  && (

                                                           <AnnoncereseventecommentIndex {...this.props} {...annoncevente} />

                                                       )}
                                                   </>
                                                )}
                                            </>

                                        }

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
                                                            <div className="card-header d-flex align-items-center">
                                                                <div className="d-flex align-items-center">
                                                                    {annoncevente.user.avatar ?
                                                                        <NavLink to={`/pro/${annoncevente.user.slug}/avs/${annoncevente.annoncetype.slug}/`}>
                                                                            <img src={annoncevente.user.avatar}
                                                                                 style={{ height: "40px", width: "80px" }}
                                                                                 alt={annoncevente.user.first_name}
                                                                                 className="avatar" />
                                                                        </NavLink>
                                                                        : <img className="avatar" style={{ height: "40px", width: "80px" }}
                                                                               src={`/assets/vendor/assets/img/blurredimage1.jpg`}/>}

                                                                    {annoncevente.title && (
                                                                        <>
                                                                            <div className="mx-3">
                                                                            <span className="text-dark font-weight-600 text-sm">
                                                                                <Link to={`/pro/${annoncevente.user.slug}/avs/${annoncevente.annoncetype.slug}/`} ><b>{annoncevente.user.first_name}</b></Link>
                                                                                <small className="d-block text-muted">{annoncevente.statusOnline &&(<i className="fas fa-circle text-success"></i>)} {moment(annoncevente.created_at).format('LL')}</small>
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
                                                                                               classNameDanger="btn btn-sm btn-danger"
                                                                                               classNameInfo="btn btn-sm btn-info"
                                                                                               nameunfollower={`Suivre`}
                                                                                               nameununfollower={`Abonné`}/>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="card-header text-center">
                                                                <div className="card-title">
                                                                <button type="button" onClick={() => this.showPhonenumberItem()} className="btn btn-sm btn-outline-success">
                                                                        <i className="now-ui-icons tech_mobile"/>
                                                                        <b>{this.state.showPhonenumber ? <>
                                                                            {annoncevente.phone_seller !== null ?
                                                                                <>{annoncevente.phone_seller}</>
                                                                                :
                                                                                <>
                                                                                    {annoncevente.user.phone !== null ? annoncevente.user.phone : <>absent</>}
                                                                                </>
                                                                            }
                                                                            </>:<>Afficher le téléphone</>}</b>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className="card-header text-center">
                                                                <div className="card-title">
                                                                    Contacter <b>{annoncevente.user.first_name}</b> pour ce bien
                                                                </div>
                                                            </div>

                                                                    <FormcontactuseronannonceventeShow {... this.props}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <AnnonceventeInteresse {...this.props} {...annoncevente}/>

                                {/* <BlogannonceventeIntesseAnnonseShow {...this.props} />*/}

                                <SignalFromAnnonceventeShow {...this.props} {...annoncevente} />

                            </div>
                        </div>

                        <FooterUserSite />

                    </div>
                </div>
            </>

        )
    }
}

Annonceventebycategorycityshow.propTypes = {
    loadannonceventeshowusersite: PropTypes.func.isRequired,
    loadProfileusersforpublic: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    annoncevente: store.annonceventeshow.item,
    profileUser: store.profile.profiluser
});

export default connect(mapStoreToProps, {
    loadannonceventeshowusersite,
    statuscommentremoveItem,
    statuscommentaddItem,
    likeItem,unlikeItem,
    favoriteItem,unfavoriteItem,

    loadProfileusersforpublic,
    unsubscribeItem,subscribeItem,
    unfollowerItem,followerItem,
})(Annonceventebycategorycityshow);
