import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NavUserSite from "../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import moment from "moment";
import HelmetSite from "../../../../inc/user/HelmetSite";
import Navlinknewemployment from "../../../employment/treatement/Navlinknewemployment";
import Navemploymentsbyuser from "../../../employment/inc/Navemploymentsbyuser";
import LinkValicationEmail from "../../../../inc/user/LinkValicationEmail";
import PrivateUserEmployementList from "../../../employment/inc/PrivateUserEmployementList";
import Skeleton from "react-loading-skeleton";
import { Button, FormText } from "reactstrap";
import MailcontactserviceList from "../inc/MailcontactserviceList";
import EmploymentListOnSkeleton from "../../../../inc/user/employment/EmploymentListOnSkeleton";
const abbrev = ['', 'k', 'M', 'B', 'T'];


class ContactserviceEmploymentShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employment: { categoryemployment: [], user: { profile: [] }, city: [], contactservices: [] },
        };

        this.readItem = this.readItem.bind(this);
        this.favoritecontactItem = this.favoritecontactItem.bind(this);
        this.activecontactItem = this.activecontactItem.bind(this);
        this.archvementcontactItem = this.archvementcontactItem.bind(this);
        this.deletecontactItem = this.deletecontactItem.bind(this);

        this.deleteItem = this.deleteItem.bind(this);
        this.activeItem = this.activeItem.bind(this);
        this.unactiveItem = this.unactiveItem.bind(this);
        this.reloadItem = this.reloadItem.bind(this);
    }

    favoritecontactItem(id) {
        const url = route('contactservice_statusfavorite', [id]);
        dyaxios.post(url).then(() => {
            this.loadItems();
        })
    }

    activecontactItem(id) {
        const url = route('contactservice_statusred', [id]);
        dyaxios.post(url).then(() => {
            this.loadItems();
        })
    }

    archvementcontactItem(id) {
        const url = route('contactservice_statusarchvement', [id]);
        dyaxios.post(url).then(() => {
            this.loadItems();
        })
    }

    deletecontactItem(id) {
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

                const url = route('contactservicedelete', [id]);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                        // title: 'Update',
                        message: 'Annonce suprimée avec success'
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

    readItem(item) {
        const url = route('contactservice_red', [item.id]);
        dyaxios.get(url).then(() => {
            this.props.history.push(`/profile/${$userIvemo.slug}/personal_mails/employments/${this.props.match.params.employment}/${item.slug}/`);
        })

    }

    activeItem(id) {
        Swal.fire({
            title: 'Afficher cette annonce?',
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
                let url = route('employmentsactivated_site', id);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                        message: "Cette annonce est desormais visible aux utilisateurs",
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

    unactiveItem(id) {
        Swal.fire({
            title: 'Masquer cette annonce?',
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
                let url = route('employmentsunactivated_site', id);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                        message: "Cette annonce a été masquée aux utilisateurs",
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
                    this.loadItems();
                }).catch(() => {
                    //Failled message
                    $.notify("Ooop! Something wrong. Try later", {
                        type: 'danger',
                        animate: {
                            enter: 'animated bounceInDown',
                            exit: 'animated bounceOutUp'
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

                const url = route('employmentsdelete_site', [id]);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                        // title: 'Update',
                        message: 'Annonce suprimée avec success'
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
                    this.props.history.push(`/profile/${$userIvemo.slug}/personal_settings/employments/`);
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

        let itemUser = this.props.match.params.user;
        let itemEmployment = this.props.match.params.employment;
        let url = route('api.contactservice_employmentsbyuserbystatistique_site', [itemUser, itemEmployment]);
        dyaxios.get(url).then(response => this.setState({ employment: response.data, }));
    }

    reloadItem(){
        this.loadItems()
    }

    componentDidMount() {
        this.loadItems()
    }

    render() {
        const { employment } = this.state;
        return (
            <>
                <HelmetSite title={`${employment.title || $name_site} - ${$name_site}`} />

                <div className="landing-page sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>


                    <div className="wrapper">

                        <div className="main main-raised">

                            <div className="container">
                                <br />

                                <div className="row">

                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        <Navlinknewemployment />

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                            <Navemploymentsbyuser />

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>






                                    </div>

                                    <div className="col-lg-8 col-md-12 mx-auto">

                                        {!$guest && (
                                            <>
                                                {!$userIvemo.email_verified_at && (
                                                    <LinkValicationEmail />
                                                )}
                                            </>
                                        )}

                                        <div className="submit text-left">
                                            <Link to={`/profile/${$userIvemo.slug}/personal_mails/employments/`} className="btn btn-neutral btn-sm">
                                                <i className="now-ui-icons arrows-1_minimal-left" /> <b>Retour à vos annonces</b>
                                            </Link>

                                            <Button onClick={() => this.reloadItem()}
                                                className="btn btn-secondary btn-sm pull-right" title="mettre à jour les donnés">
                                                 <i className="fa fa-sync-alt" /> 
                                            </Button>
                                        </div>

                                        {employment.title ?

                                            <>
                                                <PrivateUserEmployementList {...this.props} {...employment} deleteItem={this.deleteItem} unactiveItem={this.unactiveItem} activeItem={this.activeItem} />

                                                <div className="card">
                                                    <div className="social-line social-line-big-icons">
                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <h5 className="info-title"><b>{employment.countcomments > 1 ? "Total commentaires" : "Total commentaire"}</b></h5>
                                                                    {employment.countcomments}
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <h5 className="info-title"><b>Total vues</b></h5>
                                                                    {employment.visits_count}
                                                                </div>
                                                                <div className="col-md-5">
                                                                    <h5 className="info-title"><b>  {employment.contactservices_count > 1 ? "Total messages non lus" : "Total message non lu"}</b></h5>
                                                                    {employment.contactservices_count}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                                {employment.contactservices.length >= 1 && (
                                                    <>
                                                     <a href={`${route('contactservice_employmentsbyuserbyexport_site',[employment.user.slug, employment.slugin])}`} className="btn btn-primary btn-sm pull-right" title="Télécharger vos contacts">
                                                         <i className="fa fa-file-excel" /> 
                                                     </a>
                                                    <div className="card">

                                                        <div className="card-body">
                                                            <table>
                                                                <tbody>

                                                                    {employment.contactservices.map(item => (
                                                                        <MailcontactserviceList key={item.id} {...item} activecontactItem={this.activecontactItem}
                                                                            favoritecontactItem={this.favoritecontactItem} archvementcontactItem={this.archvementcontactItem}
                                                                            readItem={this.readItem} deletecontactItem={this.deletecontactItem} />
                                                                    ))}


                                                                </tbody>
                                                            </table>
                                                        </div>

                                                    </div>
                                                    </>
                                                )}


                                            </>



                                            :

                                            <EmploymentListOnSkeleton />
                                        }

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

export default ContactserviceEmploymentShow;
