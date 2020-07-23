import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, NavLink, withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import {Button, UncontrolledTooltip} from "reactstrap";
import NavUserSite from "../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import moment from "moment";
import FootermailmessageUser from "../inc/FootermailmessageUser";
import Skeleton from "react-loading-skeleton";
import ReadMoreAndLess from "react-read-more-less";
import NavlinkmailmessagecontactUserShow from "../inc/NavlinkmailmessagecontactUserShow";
import ButtonctionshowmailmessageUser from "../inc/ButtonctionshowmailmessageUser";


class PersonalmessagescontactShowUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactuser:[],
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.archvementItem = this.archvementItem.bind(this);
        this.unarchvementItem = this.unarchvementItem.bind(this);
        this.activeItem = this.activeItem.bind(this);
        this.unactiveItem = this.unactiveItem.bind(this);
        this.favoriteItem = this.favoriteItem.bind(this);
        this.unfavoriteItem = this.unfavoriteItem.bind(this);
    }

    unfavoriteItem(id){
        const url = route('personal_contactusers_mails_unfavorite.site', [id]);
        dyaxios.get(url).then(() => {
            this.loadItem();
        })
    }

    favoriteItem(id){
        const url = route('personal_contactusers_mails_favorite.site', [id]);
        dyaxios.get(url).then(() => {
            this.loadItem();
        })
    }

    activeItem(id) {
        const url = route('personal_contactusers_mails_active.site', [id]);
        dyaxios.get(url).then(() => {
            this.loadItem();
        })
    }

    unactiveItem(id) {
        const url = route('personal_contactusers_mails_unactive.site', [id]);
        dyaxios.get(url).then(() => {
            this.loadItem();
        })
    }

    unarchvementItem(id){
        const url = route('personal_contactusers_mails_unarchvement.site', [id]);
        dyaxios.get(url).then(() => {
            this.loadItem();
        })
    }

    archvementItem(id){
        const url = route('personal_contactusers_mails_archvement.site', [id]);
        dyaxios.get(url).then(() => {
            this.loadItem();
        })
    }

    loadItem() {
        let itemuser = this.props.match.params.user;
        let itemcontactuser = this.props.match.params.contactuser;
        let url = route('api.personal_mails_contacts_show.site', [itemuser,itemcontactuser]);
        dyaxios.get(url).then(response => this.setState({ contactuser: response.data, }));
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

                const url = route('personal_contactusers_mails_delete.site',id);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update',
                            message: 'Message suprimée avec success'
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
                    this.props.history.push(`/profile/${$userIvemo.slug}/personal_mails/contacts/`);

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

   // Lifecycle Component Method
    componentDidMount() {
        window.scrollTo(0, 0)
        this.loadItem();

    }

    render() {
        const {contactuser} = this.state;
        return (

            <>
                <Helmet>
                    <title>{`${contactuser.subject || 'Messages contact'}`} {`${$userIvemo.first_name}`} - {$name_site}</title>
                </Helmet>

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

                                        <NavlinkmailmessagecontactUserShow/>

                                    </div>

                                    <div className="col-lg-8 col-md-12 mx-auto">

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="card card-plain card-blog">
                                                    <div className="card-header d-flex align-items-center">
                                                        <div className="text-left pull-left">
                                                            <h5 className="ml-auto mr-auto">
                                                                <b>{contactuser.subject ||   <Skeleton width={260} />} </b>
                                                            </h5>
                                                            <small className="ml-auto mr-auto">
                                                            </small>
                                                        </div>
                                                        <div className="text-right ml-auto">

                                                            <h6 className="ml-auto mr-auto">
                                                                {contactuser.created_at ?
                                                                    <strong>{moment(contactuser.created_at).format('DD/MM/YYYY')}</strong>
                                                                    :
                                                                    <Skeleton width={50} />
                                                                }

                                                                <ButtonctionshowmailmessageUser {...contactuser} deleteItem={this.deleteItem}
                                                                                                archvementItem={this.archvementItem} unarchvementItem={this.unarchvementItem}
                                                                                                activeItem={this.activeItem} unactiveItem={this.unactiveItem}
                                                                                                favoriteItem={this.favoriteItem} unfavoriteItem={this.unfavoriteItem}
                                                                />
                                                            </h6>
                                                        </div>
                                                    </div>

                                                    <div className="mb-2 text-justify">
                                                        {contactuser.message ?
                                                            <ReadMoreAndLess
                                                            className="read-more-content"
                                                            charLimit={250}
                                                            readMoreText="(Plus)"
                                                            readLessText=""
                                                        >
                                                            {contactuser.message}
                                                        </ReadMoreAndLess>: <Skeleton count={2}/>}

                                                    </div>

                                                    <hr />
                                                    <div className="media-footer">
                                                        <div className="card-header d-flex align-items-center">
                                                            <div className="text-left pull-left">
                                                                <div className="ml-auto mr-auto">
                                                                    <b>{contactuser.email || <Skeleton width={70} />} </b>
                                                                </div>
                                                                <small className="ml-auto mr-auto">
                                                                </small>
                                                            </div>
                                                            <div className="text-right ml-auto">
                                                                <div className="ml-auto mr-auto">
                                                                    <strong>{contactuser.full_name || <Skeleton width={70} />}</strong>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <a href={`mailto:${contactuser.email}`} className="btn btn-primary pull-left" id="TooltipMail">
                                                            <i className="fas fa-reply-all"></i> Répondre
                                                        </a>
                                                        <UncontrolledTooltip placement="bottom" target="TooltipMail" delay={0}>
                                                            Repondre à {contactuser.email}
                                                        </UncontrolledTooltip>
                                                        {contactuser.phone ?
                                                               <>
                                                                   <a href={`tel:${contactuser.phone}`} title={contactuser.phone}  id="TooltipPhone" className="btn btn-success pull-left">
                                                                       <i className="now-ui-icons tech_mobile" />
                                                                       Phone
                                                                   </a>
                                                                   <UncontrolledTooltip placement="bottom" target="TooltipPhone" delay={0}>
                                                                       {contactuser.phone}
                                                                   </UncontrolledTooltip>
                                                               </>

                                                            :null}

                                                        <Button onClick={() => this.deleteItem(contactuser.id)}
                                                                className="btn btn-danger pull-left"  id="TooltipDelete">
                                                            <i className="far fa-trash-alt"></i> Supprimer
                                                        </Button>{" "}
                                                        <UncontrolledTooltip placement="bottom" target="TooltipDelete" delay={0}>
                                                            Supprimer ce message
                                                        </UncontrolledTooltip>
                                                    </div>

                                                </div>

                                                <FootermailmessageUser />

                                            </div>

                                        </div>
                                        <div className="submit text-left">
                                            <button type="button" className="btn btn-neutral btn-sm" onClick={this.props.history.goBack}>
                                                <i className="now-ui-icons arrows-1_minimal-left"/> <b>Retour à la boite de reception </b>
                                            </button>
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
export default withRouter(PersonalmessagescontactShowUser);
