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
import NavlinkmailmessageUserShow from "../inc/NavlinkmailmessageUserShow";
import NavNavigatePivateUser from "../../NavNavigatePivateUser";
import ReadMoreAndLess from "react-read-more-less";
import Skeleton from "react-loading-skeleton";
import AnnonceslocationList from "../../../annonces/annonceloaction/inc/AnnonceslocationList";


class PersonalmessagesannonceslocationsShowUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactuser:{annoncelocation:{categoryannoncelocation:[],city:[],user:[]}},
        };

        this.deleteItem = this.deleteItem.bind(this);
    }


    loadItem() {
        let itemuser = this.props.match.params.user;
        let itemcontactuserslocation = this.props.match.params.contactuserslocation;
        let url = route('api.personal_mails_annonces_locations_show.site', [itemuser,itemcontactuserslocation]);
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

                const url = route('personal_annonces_locations_mails_delete.site',id);
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
                    this.props.history.push(`/profile/${$userIvemo.slug}/personal_mails/annonces_locations/`);

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
        this.loadItem();

    }
    render() {
        const {contactuser} = this.state;
        return (

            <>
                <Helmet>
                    <title>{`${contactuser.subject || 'Messages contact annonces locations'}`} {`${$userIvemo.first_name}`} - Ivemo</title>
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

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                            <NavlinkmailmessageUserShow/>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="col-lg-8 col-md-12 mx-auto">

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

                                                                    </div>
                                                                    <div className="col-md-7">
                                                                        <div className="card-header d-flex align-items-center">
                                                                            <div className="text-left pull-left">
                                                                                <NavLink to={`/annonces_locations/locations/${contactuser.annoncelocation.categoryannoncelocation.slug}/`}>
                                                                                    <h6 className={`text-${contactuser.annoncelocation.categoryannoncelocation.color_name} ml-auto mr-auto`}>
                                                                                        {contactuser.annoncelocation.categoryannoncelocation.name}
                                                                                    </h6>
                                                                                </NavLink>
                                                                            </div>
                                                                            <div className="text-right ml-auto">
                                                                                <h5 className="text-success"><b>{contactuser.annoncelocation.price} <small>FCFA/mois</small></b></h5>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-md-5 col-6">
                                                                                <h6 className="text-dark">{contactuser.annoncelocation.pieces} p . {contactuser.annoncelocation.rooms && (<>{contactuser.annoncelocation.rooms} ch</>)}. {contactuser.annoncelocation.surface && (<>{contactuser.annoncelocation.surface} m<sup>2</sup></>)}</h6>
                                                                            </div>
                                                                            <div className="col-md-7 col-6">
                                                                                <NavLink to={`/annonces_locations/locations/${contactuser.annoncelocation.categoryannoncelocation.slug}/${contactuser.annoncelocation.city.slug}/`}>
                                                                                    <span className="ml-auto mr-auto">
                                                                                        <strong>{contactuser.annoncelocation.city.name} </strong>
                                                                                    </span>
                                                                                </NavLink>
                                                                                - {contactuser.annoncelocation.district}
                                                                            </div>

                                                                        </div>
                                                                        <h6 className="card-title">
                                                                            <Link to={`/annonces_locations/locations/${contactuser.annoncelocation.categoryannoncelocation.slug}/${contactuser.annoncelocation.city.slug}/${contactuser.annoncelocation.slug}/`}>
                                                                                {contactuser.annoncelocation.title}
                                                                            </Link>
                                                                        </h6>
                                                                        <div className="card-header d-flex align-items-center">
                                                                            <div className="d-flex align-items-center">
                                                                                <NavLink to={`/@${contactuser.annoncelocation.user.slug}/`}>
                                                                                    <img src={contactuser.annoncelocation.user.avatar} style={{ height: "40px", width: "80px" }} alt="" className="avatar" />
                                                                                </NavLink>
                                                                                <div className="mx-3">
                                                                                    <NavLink to={`/@${contactuser.annoncelocation.user.slug}/`} className="text-dark font-weight-600 text-sm">{contactuser.annoncelocation.user.first_name}
                                                                                        <small className="d-block text-muted"><b>{moment(contactuser.annoncelocation.created_at).format('LL')}</b></small>
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
                                                                                <NavLink to={`/annonces_locations/locations/${contactuser.annoncelocation.categoryannoncelocation.slug}/${contactuser.annoncelocation.city.slug}/${contactuser.annoncelocation.slug}/`} className="btn btn-icon btn-sm btn-primary">
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
                                                        <a href={`mailto:${contactuser.email}`} className="btn btn-primary pull-left">
                                                            <i className="now-ui-icons text_caps-small" />
                                                            Répondre
                                                        </a>
                                                        {contactuser.phone ?
                                                            <a href={`tel:${contactuser.phone}`} rel="tooltip" title={contactuser.phone} data-placement="bottom" className="btn btn-success pull-left">
                                                                <i className="now-ui-icons tech_mobile" />
                                                                Phone
                                                            </a>:null}
                                                        <Button onClick={() => this.deleteItem(contactuser.id)}
                                                                className="btn btn-danger pull-left" rel="tooltip" title="Supprimer" data-placement="bottom">
                                                            <i className="now-ui-icons ui-1_simple-remove" />
                                                            Supprimer
                                                        </Button>{" "}
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
export default PersonalmessagesannonceslocationsShowUser;
