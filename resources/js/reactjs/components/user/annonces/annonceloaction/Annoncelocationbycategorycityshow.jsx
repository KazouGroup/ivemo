import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import {Button, Form, Input, Navbar, UncontrolledTooltip} from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import FormcontactuseronlocationShow from "./inc/FormcontactuseronlocationShow";
import BlogannoncelocationIntesseAnnonseShow from "../../blog/blogannoncelocation/BlogannoncelocationIntesseAnnonseShow";
import Swal from "sweetalert2";
import AnnoncelocationInteresse from "./AnnoncelocationInteresse";
import Skeleton from "react-loading-skeleton";
import SignalFromAnnoncelocationShow from "./inc/SignalFromAnnoncelocationShow";
import Navlinknewannoncelocation from "./treatment/Navlinknewannoncelocation";
import HelmetSite from "../../../inc/user/HelmetSite";
import AnnoncelocationcommentIndex from "../../comments/AnnoncelocationcommentIndex";
import moment from "moment";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    favoriteItem,
    likeItem,
    loadannoncelocationshowusersite, statuscommentaddItem,
    statuscommentremoveItem, unfavoriteItem, unlikeItem,

    loadProfileusersforpublic,
    unsubscribeItem,subscribeItem,
    unfollowerItem,followerItem,
} from "../../../../redux/actions/annoncelocation/annoncelocationshowActions";
import ButonFollowerUser from "../../../inc/vendor/follow/ButonFollowerUser";
import ButonMiniSubscribedAllAnnonce from "../../../inc/vendor/ButonMiniSubscribedAllAnnonce";
import AnnoncelocactionuploadimageIndex from "../../uploadimages/AnnoncelocactionuploadimageIndex";
const abbrev = ['', 'k', 'M', 'B', 'T'];


class Annoncelocationbycategorycityshow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPhonenumber: false
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.statusItem = this.statusItem.bind(this);
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

    statusItem(annoncelocation){
        Swal.fire({
            title: 'Masquer cette annonce ?',
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
                let url = route('annonces_locations_status.site',id);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    if(annoncelocation.status){
                        $.notify({
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
                                message: "Annonce activée avec succès",
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
                    this.props.history.push("/annonces_locations/"+ this.props.match.params.annoncetype +"/");
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

                const url = route('annonces_locations_delete.site',[id]);
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
                    this.props.history.push('/annonces_locations/locations/');
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
        this.props.loadannoncelocationshowusersite(this.props);
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
    getDescription(annoncelocation) {
        return { __html: (annoncelocation.description) };
    }
    render() {
        const {annoncelocation,profileUser} = this.props;
        return (
            <>
                <HelmetSite title={`${annoncelocation.title || $name_site} - ${$name_site}`}/>

                <div className="landing-page sidebar-collapse">
                    <Navbar className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </Navbar>

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
                                                    {annoncelocation.title ?
                                                            <>
                                                                {annoncelocation.expired_at <= 6 && (
                                                                    <Button className="btn btn-success btn-sm">
                                                                        <b>New</b>
                                                                    </Button>
                                                                )}

                                                                <Button className="btn btn-dark btn-sm">
                                                                    <i className="now-ui-icons media-1_album"></i>
                                                                    <b>{annoncelocation.countuploadimages || "0"}</b>
                                                                </Button>
                                                                {annoncelocation.link_video && (
                                                                    <Button className="btn btn-dark btn-sm">
                                                                        <b>video</b>
                                                                    </Button>
                                                                )}
                                                            </>
                                                        :
                                                        <h5 className="text-dark"><b><Skeleton width={150} /></b></h5>
                                                    }
                                                </div>
                                            </div>

                                            <AnnoncelocactionuploadimageIndex {...this.props}/>

                                            <br />
                                            <div className="d-flex align-items-center">
                                                <div className="text-left pull-left">
                                                    {annoncelocation.categoryannoncelocation.name ?
                                                        <h6 className={`text-${annoncelocation.categoryannoncelocation.color_name} ml-auto mr-auto`}>
                                                            {annoncelocation.categoryannoncelocation.name}
                                                        </h6>
                                                        :
                                                        <h6 className={`ml-auto mr-auto`}>
                                                            <Skeleton width={150} />
                                                        </h6>
                                                    }
                                                </div>

                                                <div className="text-center ml-auto">
                                                    <h6 className="text-dark"> {annoncelocation.pieces} p . {annoncelocation.rooms && (<>{annoncelocation.rooms} ch</>)}. {annoncelocation.surface && (<>{annoncelocation.surface} m<sup>2</sup></>)}</h6>
                                                </div>

                                                <div className="text-right ml-auto">
                                                    {annoncelocation.price ?
                                                        <h5 className="text-dark"><b>{annoncelocation.price.formatMoney(2,'.',',')} <small><b>{$money_country} - le mois</b></small></b></h5>
                                                        :
                                                        <h5 className="text-dark"><b><Skeleton width={150} /></b></h5>
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
                                                        {annoncelocation.likeked ?
                                                            <>
                                                                <Button onClick={() => this.props.unlikeItem(annoncelocation)}
                                                                        className="btn btn-info btn-sm" title="Je n'aime plus">
                                                                    <i className="fas fa-heart"></i> <b>J'aime</b>
                                                                </Button>
                                                            </>

                                                            :
                                                            <>
                                                                <Button onClick={() => this.props.likeItem(annoncelocation)}
                                                                        className="btn btn-facebook btn-sm btn-neutral" title="J'aime">
                                                                    <i className="far fa-heart"></i> <b>J'aime</b>
                                                                </Button>
                                                            </>
                                                        }

                                                        {annoncelocation.favoriteted ?

                                                            <>
                                                                <Button onClick={() => this.props.unfavoriteItem(annoncelocation)}
                                                                        className="btn btn-danger btn-sm" title="Retirer de vos favoris">
                                                                    <i className="fas fa-bookmark"></i> <b>Sauvegarder</b>
                                                                </Button>
                                                            </>
                                                            :
                                                            <>
                                                                <Button onClick={() => this.props.favoriteItem(annoncelocation)}
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
                                                <h5 className="card-title">
                                                    À propos de <b>{annoncelocation.categoryannoncelocation.label} {annoncelocation.pieces} pièces à {annoncelocation.district}</b>
                                                </h5>

                                                {annoncelocation.description ? <span className="title text-justify" dangerouslySetInnerHTML={this.getDescription(annoncelocation)} /> : <Skeleton count={3}/>}

                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="social-line social-line-big-icons">
                                                <div className="container">
                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <h5 className="info-title"><b>Le loyer est de</b></h5>
                                                            {annoncelocation.price && (

                                                                <h3 className="text-dark"><b>{annoncelocation.price.formatMoney(2,'.',',')} {$money_country.length > 2 ? <small><b>{$money_country} - le mois</b></small> : <>{$money_country}<small><b> - le mois</b></small></>}</b></h3>
                                                            )}
                                                        </div>
                                                        <div className="col-md-6">
                                                            <h5 className="info-title"><b>Informations suplementaires</b></h5>
                                                            {annoncelocation.award_price && (
                                                                <p>
                                                                    <b>Dépôt de garantie :</b>
                                                                    <span className="title text-dark"><b> {annoncelocation.award_price ? <>{annoncelocation.award_price.formatMoney(2,'.',',')} {$money_country.length > 2 ? <small><b>{$money_country}</b></small> : <>{$money_country}</>}</>:null} </b></span>
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
                                                            {annoncelocation.user.avatar ?
                                                                <NavLink to={`/pro/${annoncelocation.user.slug}/annonces_locations/`}>
                                                                    <img src={annoncelocation.user.avatar}
                                                                         style={{ height: "40px", width: "80px" }}
                                                                         alt={annoncelocation.user.first_name}
                                                                         className="avatar" />
                                                                </NavLink>
                                                                : <img className="avatar" style={{ height: "40px", width: "80px" }}
                                                                       src={`/assets/vendor/assets/img/blurredimage1.jpg`}/>}

                                                            {annoncelocation.title && (
                                                                <>
                                                                    <div className="mx-3">
                                                                         <span className="text-dark font-weight-600 text-sm">
                                                                                <Link to={`/pro/${annoncelocation.user.slug}/annonces_locations/`} ><b>{annoncelocation.user.first_name}</b></Link>
                                                                                <small className="d-block text-muted">{annoncelocation.statusOnline &&(<i className="fas fa-circle text-success"></i>)} {moment(annoncelocation.created_at).format('LL')}</small>
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
                                                                    {annoncelocation.favoriteted ?
                                                                        <Button onClick={() => this.props.unfavoriteItem(annoncelocation)}
                                                                                className="btn btn-danger btn-icon btn-sm" title="Retirer de vos favoris">
                                                                            <i className="fas fa-bookmark"></i>
                                                                        </Button>

                                                                        :
                                                                        <Button onClick={() => this.props.favoriteItem(annoncelocation)}
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
                                                                    <i className="now-ui-icons tech_mobile"/><b>{annoncelocation.user.phone !== null ? annoncelocation.user.phone : <>absent</>}</b>
                                                                </button>
                                                                :
                                                                <button type="button" onClick={() => this.showPhonenumberItem()} className="btn btn-icon btn-sm btn-primary">
                                                                    <i className="now-ui-icons tech_mobile"/>
                                                                </button>
                                                            }


                                                            {annoncelocation.user.profile.site_internet && (
                                                                <a href={`${annoncelocation.user.profile.site_internet}`} className="btn btn-icon btn-sm btn-primary" target="_banck">
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
                                                                    {($userIvemo.id === annoncelocation.user.id && $userIvemo.id === annoncelocation.user_id) && (
                                                                        <>
                                                                            <a href={`#${annoncelocation.visits_count}`}
                                                                               className="btn btn-sm btn-secondary" title={`${annoncelocation.visits_count} ${annoncelocation.visits_count > 1 ? "vues" : "vue"}`}>
                                                                                <i className="far fa-eye"></i> <b>{this.data_countFormatter(annoncelocation.visits_count)}</b>
                                                                            </a>
                                                                            <button type="button" rel="tooltip" onClick={() => this.statusItem(annoncelocation)}
                                                                                    className="btn btn-success btn-icon btn-sm" title="Désactiver cette annonce">
                                                                                <i className="now-ui-icons ui-1_check" />
                                                                            </button>
                                                                            {annoncelocation.status_comments ?
                                                                                <Button onClick={() => this.props.statuscommentremoveItem(annoncelocation)}
                                                                                        className="btn btn-primary btn-icon btn-sm" title="Commentaire activé">
                                                                                    <i className="fas fa-comments" />
                                                                                </Button>
                                                                                :
                                                                                <Button onClick={() => this.props.statuscommentaddItem(annoncelocation)}
                                                                                        className="btn btn-facebook btn-icon btn-sm btn-neutral" title="Commentaire désactivé">
                                                                                    <i className="far fa-comments" />
                                                                                </Button>

                                                                            }
                                                                            <NavLink to={`/annonce_location/${annoncelocation.annoncetype.slug}/${annoncelocation.slugin}/edit/`} className="btn btn-sm btn-info btn-icon btn-sm" title="Editer cette annonce">
                                                                                <i className="now-ui-icons ui-2_settings-90" />
                                                                            </NavLink>
                                                                            <Button onClick={() => this.deleteItem(annoncelocation.id)}
                                                                                    className="btn btn-icon btn-sm btn-danger" title="Supprimer cette annonce">
                                                                                <i className="now-ui-icons ui-1_simple-remove" />
                                                                            </Button>
                                                                        </>
                                                                    )}
                                                                    <button type="button" title="Signaler l'annonce" onClick={() => this.signalerUser(this.props)}
                                                                            className="btn btn-instagram btn-sm" >
                                                                        <i className="far fa-flag"></i> <b>{$userIvemoIsadmin.status_user && (<>{annoncelocation.countsignals}</>)}</b>
                                                                    </button>
                                                                </>
                                                            }

                                                        </div>
                                                    </div>
                                                    <div className="card-title">
                                                        {annoncelocation.user.profile.address && (
                                                            <>
                                                                <i className="now-ui-icons location_pin" />
                                                                <b>{annoncelocation.user.profile.address}</b>
                                                            </>
                                                        )}
                                                        <br />
                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="col-md-6 col-6">
                                                                    <Link to={`/pro/${annoncelocation.user.slug}/`} title={`Profile de ${annoncelocation.user.first_name}`}>
                                                                        <small><b>Consulter le profil de l'utilisateur</b></small>
                                                                    </Link>
                                                                </div>
                                                                {annoncelocation.user.profile.site_internet && (
                                                                    <div className="col-md-6 col-6">
                                                                        <a href={`${annoncelocation.user.profile.site_internet}`} target="_blank" title={annoncelocation.user.profile.site_internet}>
                                                                            <small><b>Consulter le site web de l'utilisateur</b></small>
                                                                        </a>
                                                                    </div>
                                                                )}

                                                            </div>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    {annoncelocation.user.profile.description && (
                                                        <>
                                                            <b>Informations légales de l'utilisateur</b>
                                                            <br />
                                                            <b dangerouslySetInnerHTML={{ __html: (annoncelocation.user.profile.description) }} />
                                                        </>
                                                    )}
                                                </>

                                                <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                    <div className="card card-plain">
                                                        <div className="card-header" role="tab" id="headingOne">
                                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                <b>Envie de visiter ? Une question sur cet(te) {annoncelocation.categoryannoncelocation.name} ?</b>
                                                                <i className="now-ui-icons arrows-1_minimal-down"></i>
                                                            </a>
                                                        </div>
                                                        <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                                            <div className="card-body">
                                                                <div className="row">
                                                                    <div className="col-md-12">
                                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                                            <FormcontactuseronlocationShow {...this.props}/>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {annoncelocation.status_comments ?

                                            <AnnoncelocationcommentIndex {...this.props} {...annoncelocation} />
                                            :
                                            <>
                                                {!$guest && (
                                                    <>
                                                        {($userIvemo.id === annoncelocation.user.id || $userIvemo.id === annoncelocation.user_id)  && (

                                                            <AnnoncelocationcommentIndex {...this.props} {...annoncelocation} />

                                                        )}
                                                    </>
                                                )}
                                            </>

                                        }

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
                                                            <div className="card-header d-flex align-items-center">
                                                                <div className="d-flex align-items-center">
                                                                    {annoncelocation.user.avatar ?
                                                                        <NavLink to={`/pro/${annoncelocation.user.slug}/annonces_locations/`}>
                                                                            <img src={annoncelocation.user.avatar}
                                                                                 style={{ height: "40px", width: "80px" }}
                                                                                 alt={annoncelocation.user.first_name}
                                                                                 className="avatar" />
                                                                        </NavLink>
                                                                        : <img className="avatar" style={{ height: "40px", width: "80px" }}
                                                                               src={`/assets/vendor/assets/img/blurredimage1.jpg`}/>}

                                                                    {annoncelocation.title && (
                                                                        <>
                                                                        <div className="mx-3">
                                                                            <span className="text-dark font-weight-600 text-sm">
                                                                                <Link to={`/pro/${annoncelocation.user.slug}/annonces_locations/`} ><b>{annoncelocation.user.first_name}</b></Link>
                                                                                <small className="d-block text-muted">{annoncelocation.statusOnline &&(<i className="fas fa-circle text-success"></i>)} {moment(annoncelocation.created_at).format('LL')}</small>
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
                                                                    <button type="button" onClick={() => this.showPhonenumberItem()} className="btn btn-sm btn-outline-primary">
                                                                        <i className="now-ui-icons tech_mobile"/>
                                                                        <b>{this.state.showPhonenumber ? <>{annoncelocation.user.phone !== null ? annoncelocation.user.phone : <>absent</>}</>:<>Afficher le téléphone</>}</b>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className="card-header text-center">
                                                                <div className="card-title">
                                                                    Contacter <b>{annoncelocation.user.first_name}</b> pour ce bien
                                                                </div>
                                                            </div>

                                                            <FormcontactuseronlocationShow {...this.props}/>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <SignalFromAnnoncelocationShow {...this.props} {...annoncelocation} />

                                <AnnoncelocationInteresse {...this.props}/>

                                {/*
                                 <BlogannoncelocationIntesseAnnonseShow {...this.props} />
                                */}


                            </div>
                        </div>

                        <FooterBigUserSite />
                    </div>
                </div>
            </>

        )
    }
}

Annoncelocationbycategorycityshow.propTypes = {
    loadannoncelocationshowusersite: PropTypes.func.isRequired,
    loadProfileusersforpublic: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    annoncelocation: store.annoncelocationshow.item,
    profileUser: store.profile.profiluser
});

export default connect(mapStoreToProps, {
    loadannoncelocationshowusersite,
    statuscommentremoveItem,
    statuscommentaddItem,
    likeItem,unlikeItem,
    favoriteItem,unfavoriteItem,

    loadProfileusersforpublic,
    unsubscribeItem,subscribeItem,
    unfollowerItem,followerItem,
})(Annoncelocationbycategorycityshow);
