import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import NavUserSite from "../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import HelmetSite from "../../../../inc/user/HelmetSite";
import LinkValicationEmail from "../../../../inc/user/LinkValicationEmail";
import moment from "moment";
import {Button, UncontrolledTooltip} from "reactstrap";
import ReadMoreAndLess from "react-read-more-less";
import Skeleton from "react-loading-skeleton";
import FootermailmessageUser from "../../mail/inc/FootermailmessageUser";
import PrivateUserEmployementList from "../../../employment/inc/PrivateUserEmployementList";
import EmploymentListOnSkeleton from "../../../../inc/user/employment/EmploymentListOnSkeleton";
import Buttonctionshowmailcontactservice from "../inc/Buttonctionshowmailcontactservice";
import Navlinknewemployment from "../../../employment/treatement/Navlinknewemployment";
import Navemploymentsbyuser from "../../../employment/inc/Navemploymentsbyuser";
const abbrev = ['', 'k', 'M', 'B', 'T'];


class ContactserviceEmploymentContactShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactservice:{contactserviceable:{categoryemployment:[],user:{profile:[]},city:[]},from:[]},
        };


        this.favoritecontactItem = this.favoritecontactItem.bind(this);
        this.activecontactItem = this.activecontactItem.bind(this);
        this.archvementcontactItem = this.archvementcontactItem.bind(this);
        this.deletecontactItem = this.deletecontactItem.bind(this);

        this.deleteItem = this.deleteItem.bind(this);
        this.activeItem = this.activeItem.bind(this);
        this.unactiveItem = this.unactiveItem.bind(this);

    }

    favoritecontactItem(id){
        const url = route('contactservice_statusfavorite', [id]);
        dyaxios.post(url).then(() => {
            this.loadItems();
        })
    }

    activecontactItem(id){
        const url = route('contactservice_statusred', [id]);
        dyaxios.post(url).then(() => {
            this.loadItems();
        })
    }

    archvementcontactItem(id){
        const url = route('contactservice_statusarchvement', [id]);
        dyaxios.post(url).then(() => {
            this.loadItems();
        })
    }

    deletecontactItem(id){
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

                const url = route('contactservicedelete',[id]);
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
                    this.props.history.push(`/profile/${$userIvemo.slug}/personal_mails/employments/${this.state.contactservice.contactserviceable.slugin}/`);
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


    activeItem(id){
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
                let url = route('employmentsactivated_site',id);
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

    unactiveItem(id){
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
                let url = route('employmentsunactivated_site',id);
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

                const url = route('employmentsdelete_site',[id]);
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


    loadItems(){

        let itemUser = this.props.match.params.user;
        let itemEmployment = this.props.match.params.employment;
        let itemContactservice = this.props.match.params.contactservice;
        let url = route('api.contactservice_employmentsbyuserbystatistiqueshow_site',[itemUser,itemEmployment,itemContactservice]);
        dyaxios.get(url).then(response => this.setState({ contactservice: response.data, }));
    }

    componentDidMount() {
        this.loadItems()
    }

    render() {
        const {contactservice} = this.state;
        return (
            <>
                <HelmetSite title={`${contactservice.contactserviceable.title || $name_site} - ${$name_site}`}/>

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

                                        <Navlinknewemployment/>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                            <Navemploymentsbyuser/>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>



                                    </div>

                                    <div className="col-lg-8 col-md-12 mx-auto">

                                        {!$guest &&(
                                            <>
                                                {!$userIvemo.email_verified_at &&(
                                                    <LinkValicationEmail/>
                                                )}
                                            </>
                                        )}

                                        <div className="submit text-left">
                                            <button type="button" className="btn btn-neutral btn-sm" onClick={this.props.history.goBack}>
                                                <i className="now-ui-icons arrows-1_minimal-left"/> <b>Retour à la boite de reception </b>
                                            </button>
                                        </div>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="card card-plain card-blog">
                                                    <div className="card-header d-flex align-items-center">
                                                        <div className="d-flex align-items-center">

                                                            {contactservice.from.avatar === null ?
                                                                <img className="avatar" alt={contactservice.from.first_name}
                                                                     style={{ height: "35px", width: "35px", borderRadius:'35px' }}
                                                                     src={`https://dummyimage.com/wsvga/0077ee/009900&text=qui`}/>
                                                                :
                                                                <img className="avatar"
                                                                     style={{ height: "35px", width: "35px", borderRadius:'35px' }}
                                                                     alt={contactservice.from.first_name}
                                                                     src={contactservice.from.avatar}/>
                                                            }
                                                            <div className="mx-3">
                                                                {contactservice.from.first_name}
                                                            </div>
                                                        </div>
                                                        <div className="text-right ml-auto">
                                                            <h6 className="ml-auto mr-auto">
                                                                <strong>{moment(contactservice.created_at).format('DD/MM/YYYY')}</strong>

                                                                <Buttonctionshowmailcontactservice {...contactservice} deletecontactItem={this.deletecontactItem}
                                                                                                   favoritecontactItem={this.favoritecontactItem}
                                                                                                   archvementcontactItem={this.archvementcontactItem}
                                                                                                   activecontactItem={this.activecontactItem}/>
                                                            </h6>

                                                        </div>
                                                    </div>

                                                    {contactservice.contactserviceable.title ?

                                                        <PrivateUserEmployementList {...this.props} {...contactservice.contactserviceable} deleteItem={this.deleteItem} unactiveItem={this.unactiveItem} activeItem={this.activeItem}/>
                                                        :
                                                        <EmploymentListOnSkeleton />

                                                    }


                                                    {contactservice.message ?
                                                        <>
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <input type="text" defaultValue={contactservice.full_name || ""} className="form-control"
                                                                               placeholder="Name" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <input type="email" defaultValue={contactservice.email || ""} className="form-control"
                                                                               placeholder="Email" />
                                                                    </div>
                                                                </div>

                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <input type="email" defaultValue={contactservice.phone || ""} className="form-control"
                                                                               placeholder="Phone" />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="mb-2 text-justify">

                                                                <ReadMoreAndLess
                                                                    className="read-more-content"
                                                                    charLimit={300}
                                                                    readMoreText="(Plus)"
                                                                    readLessText=""
                                                                >
                                                                    {contactservice.message}
                                                                </ReadMoreAndLess>
                                                            </div>
                                                        </>
                                                    :
                                                    <Skeleton count={2}/>
                                                    }
                                                    <hr />
                                                    <div className="media-footer">
                                                        <a href={`mailto:${contactservice.email}`} className="btn btn-primary pull-left" id="TooltipMail">
                                                            <i className="fas fa-reply-all"></i> Répondre
                                                        </a>
                                                        <UncontrolledTooltip placement="bottom" target="TooltipMail" delay={0}>
                                                            Repondre à {contactservice.email}
                                                        </UncontrolledTooltip>
                                                        {contactservice.phone ?
                                                            <a href={`tel:${contactservice.phone}`} rel="tooltip" title={contactservice.phone} data-placement="bottom" className="btn btn-success pull-left">
                                                                <i className="now-ui-icons tech_mobile" />
                                                                Phone
                                                            </a>:null}
                                                        <Button onClick={() => this.deletecontactItem(contactservice.id)} id="TooltipDelete"
                                                                className="btn btn-danger pull-left" title="Supprimer">
                                                            <i className="far fa-trash-alt"></i> Supprimer
                                                        </Button>
                                                        <UncontrolledTooltip placement="bottom" target="TooltipDelete" delay={0}>
                                                            Supprimer ce message
                                                        </UncontrolledTooltip>
                                                    </div>

                                                </div>

                                                <FootermailmessageUser />

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

export default ContactserviceEmploymentContactShow;
