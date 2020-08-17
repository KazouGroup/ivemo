import React, { PureComponent } from "react";
import {Link, NavLink, withRouter} from 'react-router-dom';
import { Button } from "reactstrap";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    loadAllcontactservices
} from "../../../redux/actions/employment/contactuseremploymentActions";
import Swal from "sweetalert2";
const abbrev = ['', 'k', 'M', 'B', 'T'];


class NavUserSite extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {};

        this.navLogout = this.navLogout.bind(this);
        this.infoItem = this.infoItem.bind(this);
        this.verifyItem = this.verifyItem.bind(this);
    }

    verifyItem() {
        Swal.fire({
            title: 'Confirmer votre adresse e-mail',
            text: "Avant de continuer, veuillez vérifier votre e-mail pour un lien de vérification. Si vous n'avez pas reçu l'e-mail",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-info",
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'Oui, confirmer l\'envoie',
            cancelButtonText: 'Non, annuller',
            showCancelButton: true,
            reverseButtons: true,
        }).then((result) => {
            if (result.value) {

                dyaxios.post(route('verification.resend')).then(() => {

                    Swal.fire({
                        text: `Un nouveau lien de vérification a été envoyé à votre adresse e-mail ${$userIvemo.email}`,
                        icon: 'success',
                        buttonsStyling: false,
                        confirmButtonClass: "btn btn-info",
                        confirmButtonText: 'Ok, compris',
                        reverseButtons: true,
                    });

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

    infoItem() {
        Swal.fire({
            title: 'Bon à savoir',
            text: "Pour poster une offre, vueillez passer au status professionel",
            buttonsStyling: false,
            confirmButtonClass: "btn btn-info",
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'Oui, modifier le profile',
            cancelButtonText: 'Non, annuller',
            showCancelButton: true,
            reverseButtons: true,
        }).then((result) => {
            if (result.value) {
                window.location = "/profile/account";
            }
        });
    }

    navLogout(e) {
        axios.post('/logout')
            .then(() => {
                window.location.reload(true);
            });
    }

    componentDidMount() {
        this.props.loadAllcontactservices();
    }

    data_countunread_notifications_countFormatter(unreadnotificationsTotal, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(unreadnotificationsTotal)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
        const suffix = abbrev[order];
        return (unreadnotificationsTotal / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    data_countnotificationFormatter(unreadmailTotal, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(unreadmailTotal)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
        const suffix = abbrev[order];
        return (unreadmailTotal / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    render() {
        const {contactusersprofile} = this.props;
        let unreadmailTotal = (
            contactusersprofile.contactusers_count +
            contactusersprofile.contactservicesemployments_count
        );
        let unreadnotificationsTotal = contactusersprofile.unread_notifications_count;
        return (

            <div className="container">

                <div className="navbar-translate">
                    <Link to={'/'} className="navbar-brand" >
                        <img src=".." />
                        {$name_site}
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navigation" aria-controls="navigation-index" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-bar top-bar"></span>
                        <span className="navbar-toggler-bar middle-bar"></span>
                        <span className="navbar-toggler-bar bottom-bar"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse" data-nav-image="../assets/img/blurred-image-1.jpg" data-color="orange">
                    <ul className="navbar-nav ml-auto">
                        {/*
                         <li className="nav-item">
                            <NavLink to={'/'} className="nav-link">
                                <i className="now-ui-icons shopping_shop"/>
                                <b>Accueil</b>
                            </NavLink>
                        </li>
                        */}


                        {/**
                         <li className={`nav-item dropdown`}>
                            <a href="#" className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown">
                                <i className="now-ui-icons files_paper" aria-hidden="true"/>
                                <b>Annonces</b>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                <a href={`/annonces_locations/locations/`} className="dropdown-item">
                                    <i className="now-ui-icons files_paper"/> Locations
                                </a>
                                <a href={`/annonces_reservations/reservations/`} className="dropdown-item">
                                    <i className="now-ui-icons business_money-coins"/> Reservations
                                </a>
                                <a href={`/annonces_ventes/ventes/`} className="dropdown-item">
                                    <i className="now-ui-icons business_money-coins"/> Ventes
                                </a>
                            </div>
                        </li>

                        */}

                      {/** <li className="nav-item dropdown">
                            <a href="#" className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown">
                                <i className="now-ui-icons text_align-left" aria-hidden="true"/>
                                <b>Conseils</b>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                <a href={`/blogs/annonce_locations/`} className="dropdown-item">
                                    <i className="now-ui-icons files_paper"/> Locations
                                </a>
                                <a href={`/blogs/annonce_reservations/`} className="dropdown-item">
                                    <i className="now-ui-icons business_money-coins"/> Reservations
                                </a>
                                <a href={`/blogs/annonce_ventes/`} className="dropdown-item">
                                    <i className="now-ui-icons business_money-coins"/> Ventes
                                </a>
                            </div>
                        </li> */}

                        <li className="nav-item">
                            <NavLink to={'/employments/'} className="nav-link">
                                <i className="now-ui-icons business_briefcase-24"/>
                                <b>Emplois & Services</b>
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to={'/forums/'} className="nav-link">
                                <i className="now-ui-icons text_align-left"/>
                                <b>Forums</b>
                            </NavLink>
                        </li>



                        {$guest ?

                            <>
                                <li className="nav-item">
                                    <a href={`/login`} data-toggle="modal" data-target="#loginModal" className="nav-link">
                                        <i className="now-ui-icons users_circle-08"/>
                                        <b>Login</b>
                                    </a>
                                </li>

                                <li className="nav-item">
                                    <Link to={`/register/`} className="nav-link btn btn-primary text-left">
                                        <i className="now-ui-icons tech_mobile"/>
                                        <b>Signup</b>
                                    </Link>
                                </li>
                            </>
                            :
                            <>
                                { $userIvemo.status_profile ?
                                    <>
                                        {$userIvemo.email_verified_at ?
                                            <>
                                                {$userIvemo.status_profile ?
                                                    <>
                                                        <li className="nav-item">
                                                            <NavLink to={`/profile/${$userIvemo.slug}/personal_mails/contacts/`} className="nav-link">
                                                                <i className="now-ui-icons ui-1_email-85"/>
                                                                <span className="notification"><b>{unreadmailTotal >= 1 &&(this.data_countnotificationFormatter(unreadmailTotal || ""))}</b></span>
                                                            </NavLink>
                                                        </li>
                                                        <li className="nav-item">
                                                            <NavLink to={`/profile/${$userIvemo.slug}/notifications/`} className="nav-link">
                                                                <i className="now-ui-icons ui-1_bell-53"/>
                                                                <span className="notification"><b>{unreadnotificationsTotal >= 1 &&(this.data_countunread_notifications_countFormatter(unreadnotificationsTotal || ""))}</b></span>
                                                            </NavLink>
                                                        </li>
                                                    </>
                                                    :
                                                    <>

                                                        <li className="nav-item">
                                                            <NavLink to={`/profile/${$userIvemo.slug}/notifications/`} className="nav-link">
                                                                <i className="now-ui-icons ui-1_bell-53"/>
                                                                <span className="notification"><b>{unreadnotificationsTotal >= 1 &&(this.data_countunread_notifications_countFormatter(unreadnotificationsTotal || ""))}</b></span>
                                                            </NavLink>
                                                        </li>

                                                        <li className="nav-item">
                                                            <a href={void(0)} onClick={() => this.infoItem()} className="nav-link">
                                                                <i className="now-ui-icons ui-1_email-85"/>
                                                                <span className="notification"><b>{unreadmailTotal >= 1 &&(this.data_countnotificationFormatter(unreadmailTotal || ""))}</b></span>
                                                            </a>
                                                        </li>
                                                    </>
                                                }
                                            </>
                                            :
                                            <>
                                                <li className="nav-item">
                                                    <a href={void(0)} onClick={() => this.verifyItem()} className="nav-link">
                                                        <i className="now-ui-icons ui-1_email-85"/>
                                                        <span className="notification"><b>{unreadmailTotal >= 1 &&(this.data_countnotificationFormatter(unreadmailTotal || ""))}</b></span>
                                                    </a>
                                                </li>
                                            </>

                                        }

                                        <li className="nav-item dropdown">
                                            <a href="#" className="nav-link" id="navbarDropdownMenuLink" data-toggle="dropdown">
                                                <i className="now-ui-icons business_chart-pie-36"/>
                                            </a>
                                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
                                                {/*
                                        <a href={`/profile/personal_reservations/`} className="dropdown-item">
                                            <i className="now-ui-icons shopping_tag-content"/>Mes reservations
                                        </a>

                                         <a href={`/profile/${$userIvemo.slug}/personal_settings/annonces_locations/`} className="dropdown-item">
                                            <i className="now-ui-icons text_align-left"/>Annonces
                                        </a>

                                        <a href={`/profile/${$userIvemo.slug}/personal_settings/blogs/annonce_ventes/`} className="dropdown-item">
                                            <i className="now-ui-icons text_align-center"/>Blog annonces
                                        </a>
                                        <a href={`/profile/annonces_reservations_booked/`} className="dropdown-item">
                                            <i className="now-ui-icons shopping_bag-16"/>Reservations
                                        </a>
                                        */}

                                                <NavLink to={`/profile/${$userIvemo.slug}/personal_settings/employments/`} className="dropdown-item">
                                                    <i className="now-ui-icons business_briefcase-24"/>Emplois & services
                                                </NavLink>
                                                <NavLink to={`/profile/${$userIvemo.slug}/personal_settings/forums/`} className="dropdown-item">
                                                    <i className="now-ui-icons text_align-left"/>Forums
                                                </NavLink>

                                                {/*
                                         <a href={`/profile/${$userIvemo.slug}/personal_settings/teams/`} className="dropdown-item">
                                            <i className="now-ui-icons users_circle-08"/>Team
                                        </a>
                                        */}

                                                <NavLink to={`/profile/${$userIvemo.slug}/personal_mails/contacts/`} className="dropdown-item">
                                                    <i className="now-ui-icons ui-1_email-85"/>Messages
                                                </NavLink>
                                            </div>
                                        </li>
                                    </>
                                :
                                    <>
                                        <li className="nav-item">
                                            <NavLink to={`/profile/${$userIvemo.slug}/personal_settings/favorite_employments/`} className="nav-link">
                                                <i className="now-ui-icons location_bookmark"/>
                                            </NavLink>
                                        </li>

                                        <li className="nav-item">
                                            <NavLink to={`/profile/${$userIvemo.slug}/notifications/`} className="nav-link">
                                                <i className="now-ui-icons ui-1_bell-53"/>
                                                <span className="notification"><b>{unreadnotificationsTotal >= 1 &&(this.data_countunread_notifications_countFormatter(unreadnotificationsTotal || ""))}</b></span>
                                            </NavLink>
                                        </li>
                                    </>
                                }

                                <li className="nav-item dropdown">
                                    <a href=".." className="nav-link dropdown-toggle" id="navbarDropdownMenuLink" data-toggle="dropdown">
                                        <i className="now-ui-icons users_single-02"/>
                                        <b>{$userIvemo.first_name}</b>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">

                                        {$userIvemoIsadmin.status_user && (
                                            <a href="/dashboard" className="dropdown-item">
                                                <i className="now-ui-icons business_bulb-63" /> Dashboard
                                            </a>
                                        )}
                                        {/*
                                         {$userIvemo.status_profile === 1 && (
                                            <a href={`/dashboard/premium/${$userIvemo.slug}/`} className="dropdown-item">
                                                <i className="now-ui-icons design_app"/>
                                                <b>Premium dashboard</b>
                                            </a>
                                        )}
                                        */}

                                        {$userIvemo.status_profile ?
                                            <>
                                                <NavLink to={`/profile/${$userIvemo.slug}/personal_settings/favorite_employments/`} className="dropdown-item">
                                                    <i className="now-ui-icons location_bookmark"/>Mes favoris
                                                </NavLink>
                                                <NavLink to={`/pro/${$userIvemo.slug}/`} className="dropdown-item">
                                                    <i className="now-ui-icons users_single-02"/> Profile
                                                </NavLink>
                                            </>
                                            :
                                            <NavLink to={`/user/${$userIvemo.slug}/`} className="dropdown-item">
                                                <i className="now-ui-icons users_single-02"/> Profile
                                            </NavLink>
                                        }
                                        <NavLink to={`/profile/account/`}  className="dropdown-item">
                                            <i className="now-ui-icons users_circle-08"/> Editer mon profile
                                        </NavLink>
                                        <NavLink to={`/profile/${$userIvemo.slug}/personal_settings/forums/`} className="dropdown-item">
                                            <i className="now-ui-icons travel_info"/> Post forums
                                        </NavLink>
                                        {/*<a style={{ cursor: "pointer" }} className="dropdown-item" onClick={() => this.navLogout()}>
                                            <i className="now-ui-icons ui-1_simple-remove" /> Déconnexion
                                        </a>*/}
                                        <a style={{ cursor: "pointer" }} className="dropdown-item" data-toggle="modal" data-target="#logoutModal">
                                            <i className="now-ui-icons media-1_button-power" /> Déconnexion
                                        </a>
                                    </div>
                                </li>

                            </>

                        }

                    </ul>
                </div>
            </div>



        )
    }
}

NavUserSite.propTypes = {
    loadAllcontactservices: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({

    contactusersprofile: state.contactusers.contactservices

});

export default connect(mapStateToProps, {
    loadAllcontactservices,
})(withRouter(NavUserSite));
