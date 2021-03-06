import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Button, Form, FormText } from "reactstrap";
import NavUserSite from "../../inc/user/NavUserSite";
import Skeleton from "react-loading-skeleton";
import LinkValicationEmail from "../../inc/user/LinkValicationEmail";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";
import moment from "moment";
import SignalFromEmployementForShow from "./inc/SignalFromEmployementForShow";
import Swal from "sweetalert2";
import Navlinknewemployment from "./treatement/Navlinknewemployment";
import EmployementInteresse from "./EmployementInteresse";
import HelmetSite from "../../inc/user/HelmetSite";
import EmployementcommentIndex from "../comments/EmployementcommentIndex";
import ProfileForallEmploymentShow from "./inc/ProfileForallEmploymentShow";
import FieldInput from "../../inc/vendor/FieldInput";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
    favoriteItem,
    followerItem,
    likeItem,
    loademploymentshowusersite,
    loadProfileusersforpublic,
    statuscommentaddItem,
    statuscommentremoveItem,
    subscribeItem,
    unfavoriteItem,
    unfollowerItem,
    unlikeItem,
    unsubscribeItem,
} from "../../../redux/actions/employment/employmentshowActions";
import ButonFollowerUser from "../../inc/vendor/follow/ButonFollowerUser";
import ButonMiniSubscribedEmployment from "../../inc/vendor/ButonMiniSubscribedEmployment";
import PrivacyInformationsFormContact from "../../inc/user/PrivacyInformationsFormContact";

const abbrev = ['', 'k', 'M', 'B', 'T'];

class EmployementShowUserSite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            full_name: '',
            subject: '',
            email: '',
            phone: '',
            message: '',
            showPhonenumber: false,
            errors: [],
            employmentItem: [],
        };

        this.sendmessageItem = this.sendmessageItem.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);

        this.deleteItem = this.deleteItem.bind(this);
        this.phoneShow = this.phoneShow.bind(this);
        this.statusItem = this.statusItem.bind(this);
        this.signalerUser = this.signalerUser.bind(this);
        this.showPhonenumberItem = this.showPhonenumberItem.bind(this);

    }

    showPhonenumberItem() {
        this.setState({showPhonenumber: !this.state.showPhonenumber});
    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
        this.state.errors[event.target.name] = '';
    }

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
        //this.setState({
        //    employmentItem: item
        //});
    }

    sendmessageItem(e) {
        e.preventDefault();

        let item = {
            email: this.state.email,
            full_name: this.state.full_name,
            subject: this.state.subject,
            phone: this.state.phone,
            message: this.state.message,
        };

        let itemCategoryemployment = this.props.match.params.categoryemployment;
        let itemCity = this.props.match.params.city;
        let itemEmployment = this.props.match.params.employment;
        let url = route('employmentsendcontactservice_site', [itemCategoryemployment, itemCity, itemEmployment]);
        dyaxios.post(url, item)
            .then(() => {

                $.notify({
                        message: `Votre message a ??t?? bien envoy?? au propri??taire de l'annonce.`
                    },
                    {
                        allow_dismiss: false,
                        type: 'info',
                        placement: {
                            from: 'top',
                            align: 'right'
                        },
                        animate: {
                            enter: "animate__animated animate__fadeInDown",
                            exit: "animate__animated animate__fadeOutUp"
                        },
                    });

                this.setState({
                    full_name: '',
                    subject: '',
                    email: '',
                    phone: '',
                    confirm_send: "",
                    message: '',
                });

                this.loadItems();

            }).catch(error => {
            this.setState({
                errors: error.response.data.errors
            });
            $.notify("Ooop! Quelque chose ne va pas. Essayez plus tard ...", {
                allow_dismiss: false,
                type: 'danger',
                animate: {
                    enter: 'animate__animated animate__bounceInDown',
                    exit: 'animate__animated animate__bounceOutUp'
                }
            });
        })
    }

    copyToClipboard() {
        navigator.clipboard.writeText(window.location.toString());
        //Swal.fire({
        //    title: `Lien copi?? correctement avec succ??s`,
        //    icon: 'success',
        //    showConfirmButton: false,
        //    timer: 1500,
        //});

        $.notify({
                message: "Le lien a ??t?? copi?? avec succ??s.",
            },
            {
                allow_dismiss: false,
                type: 'info',
                placement: {
                    from: 'top',
                    align: 'right'
                },
                animate: {
                    enter: "animate__animated animate__fadeInUp",
                    exit: "animate__animated animate__fadeOutDown"
                },
            });
    }

    phoneShow(employment) {
        Swal.fire({
            title: `${employment.user.phone}`,
            buttonsStyling: false,
            confirmButtonClass: "btn btn-info",
            confirmButtonText: 'Oui, Contacter',
            reverseButtons: true,
        })

    }


    statusItem(id) {
        Swal.fire({
            title: 'Masquer cette annonce?',
            text: "??tes-vous s??r de vouloir ex??cuter cette action",
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
                let url = route('employmentsunactivated_site', id);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            message: "L\'annonce est masqu??e aux utilisateurs.",
                        },
                        {
                            allow_dismiss: false,
                            type: 'info',
                            placement: {
                                from: 'top',
                                align: 'right'
                            },
                            animate: {
                                enter: "animate__animated animate__fadeInUp",
                                exit: "animate__animated animate__fadeOutDown"
                            },
                        });
                    /** End alert ***/
                    // remove from local state
                    this.props.history.push('/employments/');
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
            text: "??tes-vous s??r de vouloir ex??cuter cette action",
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

                const url = route('employmentsdelete_site', [id]);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update',
                            message: 'L\'annonce a ??t?? supprim??e avec succ??s.'
                        },
                        {
                            allow_dismiss: false,
                            type: 'primary',
                            placement: {
                                from: 'top',
                                align: 'right'
                            },
                            animate: {
                                enter: 'animate__animated animate__fadeInRight',
                                exit: 'animate__animated animate__fadeOutRight'
                            },
                        });
                    /** End alert ***/
                    this.props.history.push('/employments/');
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
        this.props.loademploymentshowusersite(this.props);
        this.props.loadProfileusersforpublic(this.props)
    }

    // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();
    }

    getDescription(employment) {
        return {__html: employment.description};
    }

    data_countFormatter(visits_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(visits_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
        const suffix = abbrev[order];
        return (visits_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    data_countfollowFormatter(countfollowerusers, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(countfollowerusers)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
        const suffix = abbrev[order];
        return (countfollowerusers / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    data_countlikeFormatter(countlikes, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(countlikes)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
        const suffix = abbrev[order];
        return (countlikes / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    render() {
        const {employment, profileUser} = this.props;
        return (
            <>
                <HelmetSite title={`${employment.title || $name_site} - ${$name_site}`}/>

                <div className="about-us sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite/>
                    </nav>

                    <div className="wrapper">
                        <div className="main main-raised">
                            <div className="container">
                                <br/>
                                <div className="row">
                                    <div className="col-lg-8 col-md-12 mx-auto">
                                        <div className="submit text-left mb-2">

                                            <NavLink className="btn btn-neutral btn-sm"
                                                     to={`/employments/${employment.categoryemployment.slug}/`}>
                                                <i className="now-ui-icons arrows-1_minimal-left"/> <b
                                                className="ivemoEmptyItemsCta">Retour
                                                ?? {employment.categoryemployment.name}</b>
                                            </NavLink>

                                        </div>
                                        {!$guest && (
                                            <>
                                                {!$userIvemo.email_verified_at && (
                                                    <LinkValicationEmail/>
                                                )}
                                            </>
                                        )}

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="card-header d-flex align-items-center">
                                                    <div className="d-flex align-items-center">
                                                        {employment.user.avatar ?
                                                            <>
                                                                <NavLink
                                                                    to={`/pro/${employment.user.slug}/employments/`}>
                                                                    <img src={employment.user.avatar}
                                                                         style={{height: "40px", width: "80px"}}
                                                                         alt={employment.user.first_name}
                                                                         className="avatar"/>
                                                                </NavLink>
                                                                {profileUser.statusOnline && (
                                                                    <i className="fas fa-circle text-success ivemUserConnected"></i>)}
                                                            </>
                                                            : <img className="avatar"
                                                                   style={{height: "40px", width: "80px"}}
                                                                   src={`/assets/vendor/assets/img/blurredimage1.jpg`}/>}

                                                        {employment.title && (
                                                            <>
                                                                <div className="mx-3">
                                                                    <span className="text-dark font-weight-600 text-sm">
                                                                        <Link
                                                                            to={`/pro/${employment.user.slug}/employments/`}>
                                                                            <b>{employment.user.first_name}</b>
                                                                        </Link>
                                                                        <small
                                                                            className="d-block text-muted">
                                                                            <i className="now-ui-icons tech_watch-time"/> {moment(employment.created_at).format('LL')}</small>
                                                                        <Link
                                                                            to={profileUser.status_profile ? `/pro/${profileUser.slug}/followers/` : `/user/${profileUser.slug}/followers/`}
                                                                        ><b>{this.data_countfollowFormatter(profileUser.countfollowerusers || "")} {profileUser.countfollowerusers > 1 ? "abonn??s" : "abonn??"}</b></Link>
                                                                    </span>
                                                                </div>

                                                                {profileUser.followeruser && (
                                                                    <ButonMiniSubscribedEmployment {...this.props} {...profileUser}
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

                                                        {employment.price && (
                                                            <h5 className="text-dark ivemoColorOrange">
                                                                <b>{employment.price.formatMoney(2, '.', ',') || "0"} {$money_country.length > 2 ?
                                                                    <small>{$money_country}</small> : <>{$money_country}</>}</b>
                                                            </h5>
                                                        )}

                                                    </div>
                                                </div>

                                                {employment.title && (
                                                    <>
                                                        <h5 className="card-title">
                                                            <b>{employment.title}</b>
                                                        </h5>

                                                        <span className="card-title">
                                                            <Link
                                                                to={`/employments/${employment.categoryemployment.slug}/`}><b
                                                                className="ivemoColorOrange">{employment.categoryemployment.name}</b></Link> <span
                                                            className="pull-right"><Link
                                                            to={`/employments/${employment.categoryemployment.slug}/${employment.city.slug}/`}><b>{employment.city.name}</b> - {employment.district}</Link> <i
                                                            className="now-ui-icons tech_watch-time"/> {moment(employment.created_at).format('ll')} {!$guest && (<>{employment.status_user && (<>- <i
                                                            className="far fa-eye"></i> {this.data_countFormatter(employment.visits_count)}</>)}</>)}</span>
                                                        </span>

                                                        {employment.photo !== null ?
                                                            <img alt={employment.title} src={employment.photo}
                                                                 className="img-fluid rounded mt-3"/>
                                                            : null}
                                                        <div className="text-center">
                                                            {$guest ?
                                                                <>
                                                                    <Button data-toggle="modal"
                                                                            data-target="#loginModal"
                                                                            className="btn btn-facebook btn-sm btn-neutral"
                                                                            title={`${employment.countlikes} J\'aime`}>
                                                                        <i className="far fa-heart pr-2"></i>
                                                                        <b>{this.data_countlikeFormatter(employment.countlikes || "0")}</b>
                                                                    </Button>
                                                                    <Button data-toggle="modal"
                                                                            data-target="#loginModal"
                                                                            className="btn btn-facebook btn-sm btn-neutral btn-round"
                                                                            title="Ajouter ?? vos favoris">
                                                                        <i className="far fa-bookmark"></i>
                                                                    </Button>
                                                                </>
                                                                :
                                                                <>

                                                                    {employment.likeked ?
                                                                        <>
                                                                            <Button
                                                                                onClick={() => this.props.unlikeItem(employment)}
                                                                                className="btn btn-info btn-sm"
                                                                                title={`${employment.countlikes} J\'aime`}>
                                                                                <i className="fas fa-heart pr-2"></i>
                                                                                <b>{this.data_countlikeFormatter(employment.countlikes || "0")}</b>
                                                                            </Button>
                                                                        </>
                                                                        :
                                                                        <>
                                                                            <Button
                                                                                onClick={() => this.props.likeItem(employment)}
                                                                                className="btn btn-facebook btn-sm btn-neutral"
                                                                                title={`${employment.countlikes} J\'aime`}>
                                                                                <i className="far fa-heart pr-2"></i>
                                                                                <b>{this.data_countlikeFormatter(employment.countlikes || "0")}</b>
                                                                            </Button>
                                                                        </>
                                                                    }

                                                                    {employment.favoriteted ?

                                                                        <>
                                                                            <Button
                                                                                onClick={() => this.props.unfavoriteItem(employment)}
                                                                                className="btn btn-danger btn-sm"
                                                                                title="Retirer de vos favoris">
                                                                                <i className="fas fa-bookmark"></i>
                                                                            </Button>
                                                                        </>

                                                                        :
                                                                        <>
                                                                            <Button
                                                                                onClick={() => this.props.favoriteItem(employment)}
                                                                                className="btn btn-facebook btn-sm btn-neutral"
                                                                                title="Ajouter ?? vos favoris">
                                                                                <i className="far fa-bookmark"></i>
                                                                            </Button>
                                                                        </>
                                                                    }
                                                                </>
                                                            }
                                                        </div>
                                                    </>
                                                )}

                                                {employment.description ? <div className="title text-justify"
                                                                               dangerouslySetInnerHTML={this.getDescription(employment)}/> :
                                                    <Skeleton count={5}/>}
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-body">

                                                <ProfileForallEmploymentShow {...employment}
                                                                             favoriteItem={this.props.favoriteItem}
                                                                             unfavoriteItem={this.props.unfavoriteItem}
                                                                             statuscommentremoveItem={this.props.statuscommentremoveItem}
                                                                             statuscommentaddItem={this.props.statuscommentaddItem}
                                                                             showPhonenumberItem={this.showPhonenumberItem}
                                                                             showPhonenumber={this.state.showPhonenumber}
                                                                             statusItem={this.statusItem}
                                                                             deleteItem={this.deleteItem}
                                                                             signalerUser={this.signalerUser}
                                                                             copyToClipboard={this.copyToClipboard}/>


                                                {employment.status_link_contact ?
                                                    <div id="accordion" role="tablist" aria-multiselectable="true"
                                                         className="card-collapse mt-3">
                                                        <div className="card card-plain">
                                                            <div className="card-header" role="tab" id="headingOne">
                                                                <a data-toggle="collapse" data-parent="#accordion"
                                                                   href="#collapseOne" aria-expanded="true"
                                                                   aria-controls="collapseOne">
                                                                    <b>Demander plus d'informations</b>
                                                                    <i className="now-ui-icons arrows-1_minimal-down"></i>
                                                                </a>
                                                            </div>
                                                            <div id="collapseOne" className="collapse show"
                                                                 role="tabpanel" aria-labelledby="headingOne">
                                                                <div className="card-body">
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <div id="accordion" role="tablist"
                                                                                 aria-multiselectable="true"
                                                                                 className="card-collapse">

                                                                                <Form role="form" id="contact-form"
                                                                                      onSubmit={this.sendmessageItem}
                                                                                      acceptCharset="UTF-8">

                                                                                    <div className="input-group mb-3">
                                                                                        <div
                                                                                            className="input-group-prepend">
                                                                                            <span
                                                                                                className="input-group-text"><i
                                                                                                className="now-ui-icons users_circle-08"></i></span>
                                                                                        </div>
                                                                                        <FieldInput name="full_name"
                                                                                                    type='text'
                                                                                                    minLength="3"
                                                                                                    maxLength="50"
                                                                                                    placeholder="Votre Nom Complet"
                                                                                                    value={this.state.full_name}
                                                                                                    handleFieldChange={this.handleFieldChange}
                                                                                                    hasErrorFor={this.hasErrorFor}
                                                                                                    renderErrorFor={this.renderErrorFor}/>
                                                                                    </div>
                                                                                    <div className="input-group mb-3">
                                                                                        <div
                                                                                            className="input-group-prepend">
                                                                                            <span
                                                                                                className="input-group-text"><i
                                                                                                className="now-ui-icons ui-1_email-85"></i></span>
                                                                                        </div>
                                                                                        <FieldInput name="email"
                                                                                                    type='email'
                                                                                                    minLength="3"
                                                                                                    maxLength="50"
                                                                                                    placeholder="Votre Email"
                                                                                                    value={this.state.email}
                                                                                                    handleFieldChange={this.handleFieldChange}
                                                                                                    hasErrorFor={this.hasErrorFor}
                                                                                                    renderErrorFor={this.renderErrorFor}/>
                                                                                    </div>
                                                                                    <FormText className="text-muted"
                                                                                              color="default"
                                                                                              id="emailHelp">
                                                                                        <b>Veuillez entrer une adresse
                                                                                            E-mail et un Num??ro de
                                                                                            T??l??phone valide </b>
                                                                                    </FormText>
                                                                                    <div className="input-group">
                                                                                        <div
                                                                                            className="input-group-prepend">
                                                                                            <span
                                                                                                className="input-group-text"><i
                                                                                                className="now-ui-icons tech_mobile"></i></span>
                                                                                        </div>
                                                                                        <FieldInput name="phone"
                                                                                                    type='number'
                                                                                                    minLength="3"
                                                                                                    maxLength="15"
                                                                                                    placeholder="Votre num??ro de T??l??phone"
                                                                                                    value={this.state.phone}
                                                                                                    handleFieldChange={this.handleFieldChange}
                                                                                                    hasErrorFor={this.hasErrorFor}
                                                                                                    renderErrorFor={this.renderErrorFor}/>
                                                                                    </div>
                                                                                    <div className="form-group">
                                                                                        <FieldInput name="message"
                                                                                                    type='textarea'
                                                                                                    minLength="5"
                                                                                                    maxLength="5000"
                                                                                                    placeholder="Bonjour, je suis vivement int??ress??(e) par cette annonce. Merci de me recontacter pour plus d'informations. Bien cordialement"
                                                                                                    value={this.state.message}
                                                                                                    handleFieldChange={this.handleFieldChange}
                                                                                                    hasErrorFor={this.hasErrorFor}
                                                                                                    renderErrorFor={this.renderErrorFor}
                                                                                                    rows="20"/>
                                                                                    </div>
                                                                                    {/*
                 <div
                    className="custom-control custom-checkbox mb-3">
                    <input name="confirm_send" className={`custom-control-input ${this.hasErrorFor('confirm_send') ? 'is-invalid' : ''}`}
                           id="confirm_send" value="1" type="checkbox" onChange={this.handleFieldChange} checked={this.state.confirm_send}/>
                    <label className="custom-control-label"
                           htmlFor="confirm_send">
                      <span>Je suis majeur, j'ai lu et accept??
                          <a className="text-primary" data-action="open-privacy-disclamer"> Informations de confidentialit??</a>
                      </span>
                    </label>
                </div>
                */}
                                                                                    <div className="submit text-center">
                                                                                        {!$guest ?
                                                                                            <>
                                                                                                {employment.iscontactservice ?
                                                                                                    <a style={{cursor: "pointer"}}
                                                                                                       className="btn btn-outline-primary btn-lg">
                                                                                                        <b>Vous avez
                                                                                                            d??j??
                                                                                                            contact?? le
                                                                                                            propri??taire
                                                                                                            de
                                                                                                            l'annonce.</b>
                                                                                                    </a>
                                                                                                    :
                                                                                                    <button
                                                                                                        className="btn btn-primary btn-lg"
                                                                                                        type="submit">
                                                                                                        <i className="now-ui-icons ui-1_send"></i>
                                                                                                        <b>Postuler</b>
                                                                                                    </button>
                                                                                                }
                                                                                            </>
                                                                                            :
                                                                                            <a href={`/login`}
                                                                                               data-toggle="modal"
                                                                                               data-target="#loginModal"
                                                                                               className="btn btn-primary btn-lg">
                                                                                                <i className="now-ui-icons ui-1_send"></i>
                                                                                                <b>Postuler</b>
                                                                                            </a>
                                                                                        }
                                                                                    </div>
                                                                                    <PrivacyInformationsFormContact />
                                                                                </Form>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    :

                                                    <div className="submit text-center">
                                                        {employment.link_contact === null ?
                                                            <a href={route('employments_site')} target="_blank"
                                                               className="btn btn-primary btn-lg">
                                                                <i className="now-ui-icons ui-1_send"></i>
                                                                <b>Postuler</b>
                                                            </a>
                                                            :
                                                            <a href={`${employment.link_contact}`} target="_blank"
                                                               className="btn btn-primary btn-lg">
                                                                <i className="now-ui-icons ui-1_send"></i>
                                                                <b>Postuler</b>
                                                            </a>
                                                        }
                                                    </div>

                                                }

                                            </div>

                                        </div>

                                        {employment.status_comments ?

                                            <EmployementcommentIndex {...this.props} {...employment} />
                                            :
                                            <>
                                                {!$guest && (
                                                    <>
                                                        {($userIvemo.id === employment.user.id || $userIvemo.id === employment.user_id) && (

                                                            <EmployementcommentIndex {...this.props} {...employment} />

                                                        )}
                                                    </>
                                                )}
                                            </>

                                        }

                                    </div>

                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        <Navlinknewemployment/>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">

                                                        {employment.status_link_contact ?
                                                            <div id="accordion" role="tablist"
                                                                 aria-multiselectable="true" className="card-collapse">
                                                                <div className="card-header text-center">
                                                                    <div className="card-title">
                                                                        <b>Contacter le propri??taire</b>
                                                                    </div>
                                                                </div>

                                                                <Form role="form" id="contact-form" className="mb-4"
                                                                      onSubmit={this.sendmessageItem}
                                                                      acceptCharset="UTF-8">

                                                                    <div className="input-group">
                                                                        <div className="input-group-prepend">
                                                                            <span className="input-group-text"><i
                                                                                className="now-ui-icons users_circle-08"></i></span>
                                                                        </div>
                                                                        <FieldInput name="full_name" type='text'
                                                                                    minLength="3" maxLength="50"
                                                                                    placeholder="Votre Nom Complet"
                                                                                    value={this.state.full_name}
                                                                                    handleFieldChange={this.handleFieldChange}
                                                                                    hasErrorFor={this.hasErrorFor}
                                                                                    renderErrorFor={this.renderErrorFor}/>
                                                                    </div>
                                                                    <div className="input-group">
                                                                        <div className="input-group-prepend">
                                                                            <span className="input-group-text"><i
                                                                                className="now-ui-icons ui-1_email-85"></i></span>
                                                                        </div>
                                                                        <FieldInput name="email" type='email'
                                                                                    minLength="3" maxLength="50"
                                                                                    placeholder="Votre Email"
                                                                                    value={this.state.email}
                                                                                    handleFieldChange={this.handleFieldChange}
                                                                                    hasErrorFor={this.hasErrorFor}
                                                                                    renderErrorFor={this.renderErrorFor}/>
                                                                    </div>
                                                                    <FormText className="text-muted" color="default"
                                                                              id="emailHelp">
                                                                        <b>Veuillez entrer une adresse E-mail et un
                                                                            Numero de T??l??phone valide </b>
                                                                    </FormText>
                                                                    <div className="input-group">
                                                                        <div className="input-group-prepend">
                                                                            <span className="input-group-text"><i
                                                                                className="now-ui-icons tech_mobile"></i></span>
                                                                        </div>
                                                                        <FieldInput name="phone" type='number'
                                                                                    minLength="3" maxLength="15"
                                                                                    placeholder="Votre num??ro de T??l??phone"
                                                                                    value={this.state.phone}
                                                                                    handleFieldChange={this.handleFieldChange}
                                                                                    hasErrorFor={this.hasErrorFor}
                                                                                    renderErrorFor={this.renderErrorFor}/>
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <FieldInput name="message" type='textarea'
                                                                                    minLength="5" maxLength="5000"
                                                                                    placeholder="Bonjour, je suis vivement int??ress??(e) par cette annonce. Merci de me recontacter pour plus d'informations. Bien cordialement"
                                                                                    value={this.state.message}
                                                                                    handleFieldChange={this.handleFieldChange}
                                                                                    hasErrorFor={this.hasErrorFor}
                                                                                    renderErrorFor={this.renderErrorFor}
                                                                                    rows="10"/>
                                                                    </div>
                                                                    {/*
                 <div
                    className="custom-control custom-checkbox mb-3">
                    <input name="confirm_send" className={`custom-control-input ${this.hasErrorFor('confirm_send') ? 'is-invalid' : ''}`}
                           id="confirm_send" value="1" type="checkbox" onChange={this.handleFieldChange} checked={this.state.confirm_send}/>
                    <label className="custom-control-label"
                           htmlFor="confirm_send">
                      <span>Je suis majeur, j'ai lu et accept??
                          <a className="text-primary" data-action="open-privacy-disclamer"> Informations de confidentialit??</a>
                      </span>
                    </label>
                </div>
                */}
                                                                    <div className="submit text-center">
                                                                        {!$guest ?
                                                                            <>
                                                                                {employment.iscontactservice ?
                                                                                    <a style={{cursor: "pointer"}}
                                                                                       className="btn btn-outline-primary btn-lg">
                                                                                        <b>Vous avez d??j?? contact?? le
                                                                                            propri??taire de
                                                                                            l'annonce.</b>
                                                                                    </a>
                                                                                    :
                                                                                    <button
                                                                                        className="btn btn-primary btn-lg"
                                                                                        type="submit">
                                                                                        <i className="now-ui-icons ui-1_send"></i>
                                                                                        <b>Postuler</b>
                                                                                    </button>
                                                                                }
                                                                            </>
                                                                            :
                                                                            <a href={`/login`} data-toggle="modal"
                                                                               data-target="#loginModal"
                                                                               className="btn btn-primary btn-lg">
                                                                                <i className="now-ui-icons ui-1_send"></i>
                                                                                <b>Postuler</b>
                                                                            </a>
                                                                        }
                                                                    </div>
                                                                    <PrivacyInformationsFormContact />
                                                                </Form>


                                                            </div>

                                                            :

                                                            <div className="submit text-center">
                                                                {employment.link_contact === null ?
                                                                    <a href={route('employments_site')} target="_blank"
                                                                       className="btn btn-primary btn-lg">
                                                                        <b>Postuler</b>
                                                                    </a>
                                                                    :
                                                                    <a href={`${employment.link_contact}`}
                                                                       target="_blank"
                                                                       className="btn btn-primary btn-lg">
                                                                        <b>Postuler</b>
                                                                    </a>
                                                                }
                                                            </div>
                                                        }

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <SignalFromEmployementForShow {...this.props} {...employment} />

                                </div>

                                <EmployementInteresse {...this.props} />

                            </div>
                        </div>

                        <FooterBigUserSite/>
                    </div>
                </div>
            </>


        )
    }
}

EmployementShowUserSite.propTypes = {
    loademploymentshowusersite: PropTypes.func.isRequired,
    loadProfileusersforpublic: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    employment: store.employmentshow.item,
    profileUser: store.profile.profiluser
});

export default connect(mapStoreToProps, {
    loademploymentshowusersite,
    statuscommentremoveItem,
    statuscommentaddItem,
    likeItem, unlikeItem,
    favoriteItem, unfavoriteItem,
    loadProfileusersforpublic,
    unsubscribeItem, subscribeItem,
    unfollowerItem, followerItem,
})(EmployementShowUserSite);
