import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import moment from "moment";
import { Remarkable } from "remarkable";
import FootermailmessageUser from "./inc/FootermailmessageUser";
import NavlinkmailmessageUser from "./inc/NavlinkmailmessageUser";
import Swal from "sweetalert2";


class PersonalmessagesannonceslocationsShowUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactuser:{annoncelocation:{categoryannoncelocation:[],city:[]}},
        };

        this.deleteItem = this.deleteItem.bind(this);
    }


    loadItem() {
        let itemcontactuser = this.props.match.params.contactuser;
        let url = route('api.personal_mails_annonces_locations_show.site', [itemcontactuser]);
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

                const url = route('personal_mails_delete.site',id);
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
                    this.props.history.push('/profile/personal_mails/annonces_locations/');

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
    getMessageDescription(contactuser) {
        const md = new Remarkable();
        return { __html: md.render(contactuser.message) };
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

                                    <NavlinkmailmessageUser />

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
                                                                            <Link to={`/annonce/show/`}>
                                                                                <img className="d-block" src="/assets/vendor/assets/img/bg1.jpg" alt="First slide" />
                                                                            </Link>
                                                                        </div>
                                                                        <div className="carousel-item">
                                                                            <Link to={`/annonce/show/`}>
                                                                                <img className="d-block" src="/assets/vendor/assets/img/bg3.jpg" alt="Second slide" />
                                                                            </Link>
                                                                        </div>
                                                                        <div className="carousel-item active">
                                                                            <Link to={`/annonce/show/`}>
                                                                                <img className="d-block" src="/assets/vendor/assets/img/bg4.jpg" alt="Third slide" />
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                    <a className="carousel-control-prev" href="#carouselAnnonceIndicators" role="button" data-slide="prev">
                                                                        <i className="now-ui-icons arrows-1_minimal-left"></i>
                                                                    </a>
                                                                    <a className="carousel-control-next" href="#carouselAnnonceIndicators" role="button" data-slide="next">
                                                                        <i className="now-ui-icons arrows-1_minimal-right"></i>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>


                                                        <div className="col-md-7">
                                                            <div className="card-header d-flex align-items-center">
                                                                <div className="text-left pull-left">
                                                                    <NavLink to={`/annonce/show/`}>
                                                                        <h6 className="text-info ml-auto mr-auto">
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
                                                                    <h6 className="category text-dark">{contactuser.annoncelocation.pieces} p . {contactuser.annoncelocation.rooms} ch . {contactuser.annoncelocation.surface} m<sup>2</sup> </h6>
                                                                </div>
                                                                <div className="col-md-7 col-6">
                                                                    <span className="title ml-auto mr-auto">
                                                                        {contactuser.annoncelocation.city.name} - {contactuser.annoncelocation.district}
                                                                    </span>
                                                                </div>

                                                            </div>
                                                            <h6 className="card-title">
                                                                <Link to={`/annonces_locations/locations/${contactuser.annoncelocation.categoryannoncelocation.slug}/${contactuser.annoncelocation.city.slug}/${moment(contactuser.annoncelocation.created_at).format('YYYY-MM-DD')}/${contactuser.annoncelocation.slug}/`}>
                                                                    {contactuser.annoncelocation.title}
                                                                </Link>
                                                            </h6>
                                                        </div>

                                                    </div>

                                                    <h5 className="title text-center">Message</h5>
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

                                                    <div className="title mb-2 text-justify" dangerouslySetInnerHTML={this.getMessageDescription(contactuser)} />
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
