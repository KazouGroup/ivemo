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
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    loadContactserviceemploymentsredmessage,
    loadAllcontactservices,
    activecontactaddItem,activecontactremoveItem,
    activeItem,unactiveprivateItem,
} from "../../../../../redux/actions/contactserviceActions";
import NavlinkmailmessageUser from "../../mail/inc/NavlinkmailmessageUser";


class ContactserviceEmploymentContactShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPhonenumber: false
        };

        this.deletecontactItem = this.deletecontactItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);

        this.showPhonenumberItem = this.showPhonenumberItem.bind(this);

    }

    showPhonenumberItem() {
        this.setState({showPhonenumber: true});
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
                    this.props.history.push(`/profile/${$userIvemo.slug}/statistics/employments/${this.props.match.params.employment}/`);
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
    this.props.loadContactserviceemploymentsredmessage(this.props);
    //this.props.loadAllcontactservices(this.props);
   }

    componentDidMount() {
        this.loadItems();
    }

    render() {
        const {contactservice,contactusersprofile} = this.props;
        const avatar_style = {
            height: "35px",
            width: "35px",
            borderRadius: '35px'
        };
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

                                                            <NavlinkmailmessageUser {...this.props} {...contactusersprofile}/>

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

                                                            {contactservice.from_id === null ?
                                                                <>
                                                                    <img className="avatar" alt={contactservice.full_name}
                                                                         style={avatar_style}
                                                                         src={`/assets/vendor/assets/img/blurredimage1.jpg`}/>
                                                                    <div className="mx-3">
                                                                        {contactservice.full_name}
                                                                    </div>
                                                                </>
                                                                :
                                                                <>
                                                                    {contactservice.from.avatar === null ?
                                                                        <img className="avatar"
                                                                             style={avatar_style}
                                                                             alt={contactservice.from.first_name}
                                                                             src={`/assets/vendor/assets/img/blurredimage1.jpg`}/>
                                                                        :
                                                                        <img style={avatar_style}
                                                                             alt={contactservice.from.first_name}
                                                                             src={contactservice.from.avatar}/>
                                                                    }
                                                                    <div className="mx-3">
                                                                        {contactservice.from.first_name}
                                                                    </div>
                                                                </>
                                                            }
                                                        </div>
                                                        <div className="text-right ml-auto">
                                                            <span className="ml-auto mr-auto">
                                                                {contactservice.slug && (
                                                                    <>
                                                                        {this.state.showPhonenumber ?
                                                                                <b>{contactservice.phone !== null ? contactservice.phone : <>absent</>}</b>
                                                                            :
                                                                            <a style={{ cursor: "pointer" }} onClick={() => this.showPhonenumberItem()}>
                                                                                Afficher le téléphone
                                                                            </a>
                                                                        }
                                                                        - <strong>{moment(contactservice.created_at).format('DD/MM/YYYY')}</strong>

                                                                        <Buttonctionshowmailcontactservice {...contactservice} deletecontactItem={this.deletecontactItem}
                                                                                                           activecontactaddItem={this.props.activecontactaddItem}
                                                                                                           activecontactremoveItem={this.props.activecontactremoveItem}
                                                                        />
                                                                    </>
                                                                )}
                                                            </span>

                                                        </div>
                                                    </div>

                                                    {contactservice.contactserviceable.title ?

                                                        <PrivateUserEmployementList {...this.props} {...contactservice.contactserviceable} deleteItem={this.deleteItem} unactiveprivateItem={this.props.unactiveprivateItem} activeItem={this.props.activeItem}/>
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

ContactserviceEmploymentContactShow.propTypes = {
    loadContactserviceemploymentsredmessage: PropTypes.func.isRequired,
    loadAllcontactservices: PropTypes.func.isRequired,

};

const mapStateToProps = state => ({

    contactservice: state.contactserviceannonceshow.item,
    contactusersprofile: state.contactusers.contactservices


});

export default connect(mapStateToProps, {
    loadContactserviceemploymentsredmessage,
    loadAllcontactservices,
    activecontactaddItem,activecontactremoveItem,
    activeItem,unactiveprivateItem,
})(ContactserviceEmploymentContactShow);
