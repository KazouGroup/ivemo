import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {Button, UncontrolledTooltip} from "reactstrap";
import NavUserSite from "../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import moment from "moment";
import FootermailmessageUser from "../inc/FootermailmessageUser";
import Swal from "sweetalert2";
import ReadMoreAndLess from "react-read-more-less";
import Skeleton from "react-loading-skeleton";
import NavlinkmailmessagecontactonnoceventeUserShow from "../inc/NavlinkmailmessagecontactonnoceventeUserShow";
import ButtonctionshowmailmessageUser from "../inc/ButtonctionshowmailmessageUser";
import LinkValicationEmail from "../../../../inc/user/LinkValicationEmail";


class PersonalmessagesannoncesventesShowUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactuser:{annoncevente:{categoryannoncevente:[],city:[],user:[]}},
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.archvementItem = this.archvementItem.bind(this);
        this.activeItem = this.activeItem.bind(this);
        this.unactiveItem = this.unactiveItem.bind(this);
        this.unarchvementItem = this.unarchvementItem.bind(this);
        this.favoriteItem = this.favoriteItem.bind(this);
        this.unfavoriteItem = this.unfavoriteItem.bind(this);
    }


    unfavoriteItem(id){
        const url = route('personal_contactusersvente_mails_unfavorite.site', [id]);
        dyaxios.get(url).then(() => {
            this.loadItem();
        })
    }

    favoriteItem(id){
        const url = route('personal_contactusersvente_mails_favorite.site', [id]);
        dyaxios.get(url).then(() => {
            this.loadItem();
        })
    }

    activeItem(id) {
        const url = route('personal_contactusersvente_mails_active.site', [id]);
        dyaxios.get(url).then(() => {
            this.loadItem();
        })
    }

    unactiveItem(id) {
        const url = route('personal_contactusersvente_mails_unactive.site', [id]);
        dyaxios.get(url).then(() => {
            this.loadItem();
        })
    }

    unarchvementItem(id){
        const url = route('personal_contactusersvente_mails_unarchvement.site', [id]);
        dyaxios.get(url).then(() => {
            this.loadItem();
        })
    }

    archvementItem(id){
        const url = route('personal_contactusersvente_mails_archvement.site', [id]);
        dyaxios.get(url).then(() => {
            this.loadItem();
        })
    }


    loadItem() {
        let itemuser = this.props.match.params.user;
        let itemcontactusersvente = this.props.match.params.contactusersvente;
        let url = route('api.personal_mails_annonces_ventes_show.site', [itemuser,itemcontactusersvente]);
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

                const url = route('personal_annonces_ventes_mails_delete.site',id);
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
                                enter: 'animated fadeInRight',
                                exit: 'animated fadeOutRight'
                            },
                        });
                    /** End alert ***/
                    this.props.history.push(`/profile/${$userIvemo.slug}/personal_mails/annonces_ventes/`);

                }).catch(() => {
                    //Failled message
                    $.notify("Ooop! Une erreur est survenue", {
                        allow_dismiss: false,
                        type: 'danger',
                        animate: {
                            enter: 'animated bounceInDown',
                            exit: 'animated bounceOutUp'
                        }
                    });
                })
            }
        });
    }


    // lifecycle method
    componentDidMount() {
        window.scrollTo(0, 0);
        this.loadItem();

    }
    render() {
        const {contactuser} = this.state;
        return (

            <>
                <Helmet>
                    <title>{`${contactuser.subject || 'Messages contact annonces ventes'}`} {`${$userIvemo.first_name}`} - Ivemo</title>
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

                                        <NavlinkmailmessagecontactonnoceventeUserShow/>

                                    </div>

                                    <div className="col-lg-8 col-md-12 mx-auto">

                                        {!$guest &&(
                                            <>
                                                {!$userIvemo.email_verified_at &&(
                                                    <LinkValicationEmail/>
                                                )}
                                            </>
                                        )}

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="card card-plain card-blog">
                                                    <div className="card-header d-flex align-items-center">
                                                        <div className="text-left pull-left">
                                                            <h5 className="ml-auto mr-auto">
                                                                <b>{contactuser.subject}</b>
                                                            </h5>
                                                        </div>
                                                        <div className="text-right ml-auto">
                                                            <h6 className="ml-auto mr-auto">
                                                                <strong>{moment(contactuser.created_at).format('DD/MM/YYYY')}</strong>

                                                                <ButtonctionshowmailmessageUser {...contactuser} deleteItem={this.deleteItem}
                                                                  archvementItem={this.archvementItem} unarchvementItem={this.unarchvementItem}
                                                                  activeItem={this.activeItem} unactiveItem={this.unactiveItem}
                                                                  favoriteItem={this.favoriteItem} unfavoriteItem={this.unfavoriteItem}
                                                                />

                                                            </h6>

                                                        </div>
                                                    </div>

                                                    <div className="card">
                                                        <div className="card-body">
                                                            <div className="card card-plain card-blog">
                                                                <div className="row">
                                                                    <div className="col-md-5">
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

                                                                            </div>
                                                                        </div>

                                                                        <div className="text-center">
                                                                            {contactuser.annoncevente.status ?
                                                                                <>
                                                                                    <button type="button" rel="tooltip" title={`Annonce visible`}
                                                                                            className="btn btn-success btn-icon btn-sm">
                                                                                        <i className="now-ui-icons ui-1_check"/>
                                                                                    </button>
                                                                                </>
                                                                                :
                                                                                <>
                                                                                    <button type="button" title={`Annonce non visible`}
                                                                                            className="btn btn-primary btn-icon btn-sm">
                                                                                        <i className="now-ui-icons ui-1_simple-delete"/>
                                                                                    </button>
                                                                                </>
                                                                            }
                                                                        </div>

                                                                    </div>
                                                                    <div className="col-md-7">
                                                                        <div className="card-header d-flex align-items-center">
                                                                            <div className="text-left pull-left">
                                                                                <NavLink to={`/annonces_ventes/ventes/${contactuser.annoncevente.categoryannoncevente.slug}/`} >
                                                                                    <h6 className={`text-${contactuser.annoncevente.categoryannoncevente.color_name} ml-auto mr-auto`}>
                                                                                        {contactuser.annoncevente.categoryannoncevente.name}
                                                                                    </h6>
                                                                                </NavLink>
                                                                            </div>
                                                                            <div className="text-right ml-auto">
                                                                                <h5 className="text-success"><b>{contactuser.annoncevente.price} <small>FCFA/mois</small></b></h5>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-md-5 col-6">
                                                                                <h6 className="text-dark">{contactuser.annoncevente.pieces} p . {contactuser.annoncevente.rooms && (<>{contactuser.annoncevente.rooms} ch</>)}. {contactuser.annoncevente.surface && (<>{contactuser.annoncevente.surface} m<sup>2</sup></>)}</h6>
                                                                            </div>
                                                                            <div className="col-md-7 col-6">
                                                                                <NavLink to={`/annonces_ventes/ventes//${contactuser.annoncevente.categoryannoncevente.slug}/${contactuser.annoncevente.city.slug}/`}>
                                                                                    <span className="ml-auto mr-auto">
                                                                                        <strong>{contactuser.annoncevente.city.name} </strong>
                                                                                    </span>
                                                                                </NavLink>
                                                                                - {contactuser.annoncevente.district}
                                                                            </div>

                                                                        </div>
                                                                        <h6 className="card-title">
                                                                            <Link to={`/annonces_ventes/ventes/${contactuser.annoncevente.categoryannoncevente.slug}/${contactuser.annoncevente.city.slug}/${contactuser.annoncevente.slug}/`} target="_blank">
                                                                                {contactuser.annoncevente.title}
                                                                            </Link>
                                                                        </h6>
                                                                        <div className="card-header d-flex align-items-center">
                                                                            <div className="d-flex align-items-center">
                                                                                <NavLink to={`/@${contactuser.annoncevente.user.slug}/`}>
                                                                                    <img src={contactuser.annoncevente.user.avatar} style={{ height: "40px", width: "80px" }} alt="" className="avatar" />
                                                                                </NavLink>
                                                                                <div className="mx-3">
                                                                                    <NavLink to={`/@${contactuser.annoncevente.user.slug}/`} className="text-dark font-weight-600 text-sm">{contactuser.annoncevente.user.first_name}
                                                                                        <small className="d-block text-muted"><b>{moment(contactuser.annoncevente.created_at).format('LL')}</b></small>
                                                                                    </NavLink>
                                                                                </div>
                                                                            </div>

                                                                            <div className="text-right mx-auto">

                                                                                <UncontrolledTooltip placement="bottom" target="TooltipPhone">
                                                                                    3426712192
                                                                                </UncontrolledTooltip>
                                                                                <Button className="btn btn-icon btn-sm btn-warning" id="TooltipPhone">
                                                                                    <i className="now-ui-icons tech_mobile"/>
                                                                                </Button>
                                                                                <NavLink to={`/annonces_ventes/ventes/${contactuser.annoncevente.categoryannoncevente.slug}/${contactuser.annoncevente.city.slug}/${contactuser.annoncevente.slug}/`} className="btn btn-icon btn-sm btn-primary">
                                                                                    <i className="now-ui-icons location_pin"/>
                                                                                </NavLink>

                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <input type="text" defaultValue={contactuser.full_name} className="form-control"
                                                                    placeholder="Your Name" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <input type="email" defaultValue={contactuser.email} className="form-control"
                                                                    placeholder="Your email" />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="mb-2 text-justify">
                                                        {contactuser.message ?
                                                            <ReadMoreAndLess
                                                                className="read-more-content"
                                                                charLimit={300}
                                                                readMoreText="(Plus)"
                                                                readLessText=""
                                                            >
                                                                {contactuser.message}
                                                            </ReadMoreAndLess>: <Skeleton count={2}/>}
                                                    </div>
                                                    <hr />
                                                    <div className="media-footer">
                                                        <a href={`mailto:${contactuser.email}`} className="btn btn-primary pull-left" id="TooltipMail">
                                                            <i className="fas fa-reply-all"></i> Répondre
                                                        </a>
                                                        <UncontrolledTooltip placement="bottom" target="TooltipMail" delay={0}>
                                                            Repondre à {contactuser.email}
                                                        </UncontrolledTooltip>
                                                        {contactuser.phone ?
                                                            <a href={`tel:${contactuser.phone}`} rel="tooltip" title={contactuser.phone} data-placement="bottom" className="btn btn-success pull-left">
                                                                <i className="now-ui-icons tech_mobile" />
                                                                Phone
                                                            </a>:null}
                                                        <Button onClick={() => this.deleteItem(contactuser.id)} id="TooltipDelete"
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
export default PersonalmessagesannoncesventesShowUser;
