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
import { Button, FormText } from "reactstrap";
import MailcontactserviceList from "../inc/MailcontactserviceList";
import EmploymentListOnSkeleton from "../../../../inc/user/employment/EmploymentListOnSkeleton";
import {connect} from "react-redux";
import {
    activecontactaddItem, activecontactremoveItem,
    unactiveprivateItem, activeItem,
    archvementaddItem, archvementremoveItem,
    favoriteaddItem, favoriteremoveItem,
    loadContactserviceemploymentshow,deletecontactItem
} from "../../../../../redux/actions/contactserviceActions";
import PropTypes from "prop-types";


class ContactserviceEmploymentShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        };

        this.readItem = this.readItem.bind(this);

        this.deleteItem = this.deleteItem.bind(this);
        this.reloadItem = this.reloadItem.bind(this);
    }

    readItem(item) {
        const url = route('contactservice_red', [item.id]);
        dyaxios.get(url).then(() => {
            this.props.history.push(`/messages/employments/${item.slug}/`);
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
        this.props.loadContactserviceemploymentshow(this.props);
    }

    reloadItem(){
        this.loadItems()
    }

    componentDidMount() {
        this.loadItems()
    }

    render() {
        const { employment } = this.props;
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
                                            <Link to={`/statistics/employments/`} className="btn btn-neutral btn-sm">
                                                <i className="now-ui-icons arrows-1_minimal-left" /> <b>Retour à vos annonces</b>
                                            </Link>

                                            <Button onClick={() => this.reloadItem()}
                                                className="btn btn-secondary btn-sm pull-right" title="mettre à jour les donnés">
                                                 <i className="fa fa-sync-alt" />
                                            </Button>
                                        </div>

                                        {employment.title ?

                                            <>
                                                <PrivateUserEmployementList {...this.props} {...employment} deleteItem={this.deleteItem} unactiveprivateItem={this.props.unactiveprivateItem} activeItem={this.props.activeItem} />

                                                <div className="card">
                                                    <div className="social-line social-line-big-icons">
                                                        <div className="container">
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <h5 className="info-title"><b>{employment.countcomments > 1 ? "Commentaires" : "Commentaire"}</b></h5>
                                                                    {employment.countcomments}
                                                                </div>
                                                                <div className="col-md-2">
                                                                    <h5 className="info-title"><b> {employment.visits_count > 1 ? "Vues" : "Vue"}</b></h5>
                                                                    {employment.visits_count}
                                                                </div>
                                                                <div className="col-md-2">
                                                                    <h5 className="info-title"><b> {employment.countlikes > 1 ? "Likes" : "Like"}</b></h5>
                                                                    {employment.countlikes}
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <h5 className="info-title"><b>  {employment.contactservices_count > 1 ? "Messages non lus" : "Message non lu"}</b></h5>
                                                                    {employment.contactservices_count}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                                {employment.contactservices.length >= 1 && (
                                                    <>
                                                     <a href={`${route('contactservice_employmentsbyuserbyexport_site',[employment.slugin])}`} className="btn btn-primary btn-sm pull-right" title="Télécharger vos contacts">
                                                         <i className="fa fa-file-excel" />
                                                     </a>
                                                    <div className="card">

                                                        <div className="card-body">
                                                            <table>
                                                                <tbody>

                                                                    {employment.contactservices.map(item => (
                                                                        <MailcontactserviceList key={item.id} {...item}
                                                                                                favoriteaddItem={this.props.favoriteaddItem}
                                                                                                favoriteremoveItem={this.props.favoriteremoveItem}
                                                                                                archvementaddItem={this.props.archvementaddItem}
                                                                                                archvementremoveItem={this.props.archvementremoveItem}
                                                                                                activecontactaddItem={this.props.activecontactaddItem}
                                                                                                activecontactremoveItem={this.props.activecontactremoveItem}
                                                                            readItem={this.readItem} deletecontactItem={this.props.deletecontactItem} />
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
ContactserviceEmploymentShow.propTypes = {
    loadContactserviceemploymentshow: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({

    employment: state.contactserviceannoncestatistiqueshow.annonce

});

export default connect(mapStateToProps, {
    loadContactserviceemploymentshow,
    favoriteaddItem,favoriteremoveItem,
    archvementaddItem,archvementremoveItem,
    activecontactaddItem,activecontactremoveItem,
    unactiveprivateItem,activeItem,deletecontactItem
})(ContactserviceEmploymentShow);
