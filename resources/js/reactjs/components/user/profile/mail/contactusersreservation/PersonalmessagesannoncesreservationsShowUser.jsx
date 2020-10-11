import React, {Component, Fragment, Suspense} from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {Button, Form, UncontrolledTooltip} from "reactstrap";
import NavUserSite from "../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import FootermailmessageUser from "../inc/FootermailmessageUser";
import Swal from "sweetalert2";
import ReadMoreAndLess from "react-read-more-less";
import Skeleton from "react-loading-skeleton";
import LinkValicationEmail from "../../../../inc/user/LinkValicationEmail";
import {connect} from "react-redux";
import {
    activearsItem, unactiveprivatearsItem,
    activecontactaddItem, activecontactremoveItem,
    archvementaddItem, archvementremoveItem,
    favoriteaddItem, favoriteremoveItem,
    loadAllcontactservices,
    loadContactserviceannoncereservationsredmessage,
} from "../../../../../redux/actions/contactserviceActions";
import HelmetSite from "../../../../inc/user/HelmetSite";
import NavlinkmailmessageUser from "../inc/NavlinkmailmessageUser";
import AnnoncesListOnSkeleton from "../../../../inc/user/annonce/AnnoncesListOnSkeleton";
import PrivateUserAnnoncereservationList from "../../../annonces/annoncereservation/inc/PrivateUserAnnoncereservationList";
import FormComment from "../../../../inc/vendor/comment/FormComment";
import ProfileUserComment from "../../../../inc/vendor/comment/ProfileUserComment";
import CommentViewList from "../../../comments/inc/CommentViewList";
import moment from "moment";


class PersonalmessagesannoncesreservationsShowUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPhonenumber: false
        };


    }


    loadItems() {
        this.props.loadContactserviceannoncereservationsredmessage(this.props);
        this.props.loadAllcontactservices(this.props);
    }

    componentDidMount() {
        this.loadItems();
    }
    render() {
        const {annoncereservation, contactusersprofile} = this.props;
        const avatar_style = {
            height: "35px",
            width: "35px",
            borderRadius: '35px'
        };
        return (

            <>
                <HelmetSite
                    title={`${annoncereservation.title || 'Messages contact annonces reservations'} ${$userIvemo.first_name} - ${$name_site}`}/>

                <div className="landing-page sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite/>
                    </nav>


                    <div className="wrapper">

                        <div className="main main-raised">

                            <div className="container">
                                <br/>

                                <div className="row">

                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true"
                                                             className="card-collapse">

                                                            <NavlinkmailmessageUser {...this.props} {...contactusersprofile}/>

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
                                                    <LinkValicationEmail/>
                                                )}
                                            </>
                                        )}

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="card card-plain card-blog">
                                                    <div className="card-header d-flex align-items-center">


                                                        <div className="text-right ml-auto">


                                                        </div>
                                                    </div>

                                                    {annoncereservation.title ?

                                                        <PrivateUserAnnoncereservationList {...this.props} {...annoncereservation}
                                                                                         unactiveprivatearsItem={this.props.unactiveprivatearsItem}
                                                                                         activearsItem={this.props.activearsItem}
                                                                                         deleteItem={this.deleteItem}/>
                                                        :
                                                        <AnnoncesListOnSkeleton/>}




                                                    <h5 className="title text-center">
                                                        <b>{annoncereservation.contactservices_count > 1 ? `${annoncereservation.contactservices_count || ""} Messages non lus` : `${annoncereservation.contactservices_count || ""} Message non lu`}</b>
                                                    </h5>

                                                    <div className="media-area">

                                                        {annoncereservation.contactservices.length >= 0 ?
                                                            <>
                                                                {annoncereservation.contactservices.map((item) => (

                                                                    <Fragment key={item.id}>

                                                                        <div className="media">



                                                                            <a className="pull-left" href={item.from.status_profile ?

                                                                                `${route('public_profile.site',[item.from.slug])}`
                                                                                :
                                                                                `${route('userpublic_profile.site',[item.from.slug])}`}
                                                                            >
                                                                                <div className="author">
                                                                                    {item.from.avatar === null ?
                                                                                        <img className="avatar" alt={item.from.first_name}
                                                                                             src={`/assets/vendor/assets/img/blurredimage1.jpg`}/>
                                                                                        :
                                                                                        <img className="avatar" alt={item.from.first_name}
                                                                                             src={item.from.avatar}/>
                                                                                    }
                                                                                </div>
                                                                            </a>

                                                                            <div className="media-body">

                                                                                <a href={void(0)} style={{cursor:"pointer"}}>
                                                                                    <h6 className={`media-heading ${item.status_red ? "" : "text-primary"}`}>{item.from.first_name}
                                                                                        <small className="text-muted">· {moment(item.created_at).fromNow()}</small>
                                                                                    </h6>
                                                                                </a>
                                                                                <a href={void(0)} style={{cursor:"pointer"}} className={`${item.status_red ? "" : "text-primary"}`}>
                                                                                    {/*<span dangerouslySetInnerHTML={this.getDescription()}/>**/}
                                                                                    <span>
                                                                                                <ReadMoreAndLess
                                                                                                    className="read-more-content"
                                                                                                    charLimit={100}
                                                                                                    readMoreText="lire plus"
                                                                                                    readLessText="lire moins"
                                                                                                >
                                                                                                {item.message || ""}
                                                                                            </ReadMoreAndLess>
                                                                                    </span>
                                                                                </a>

                                                                                <div className="media-footer">


                                                                                    <button type="button"
                                                                                            className="btn btn-default btn-neutral pull-right" title="Repondre a ce commentaire">
                                                                                        <i className="now-ui-icons files_single-copy-04"></i> Repondre
                                                                                    </button>

                                                                                </div>





                                                                            </div>
                                                                        </div>

                                                                    </Fragment>

                                                                ))}
                                                            </>
                                                            :null}



                                                        <br/>


                                                    </div>

                                                </div>

                                                <FootermailmessageUser/>

                                            </div>
                                        </div>
                                        <div className="submit text-left">
                                            <button type="button" className="btn btn-neutral btn-sm"
                                                    onClick={this.props.history.goBack}>
                                                <i className="now-ui-icons arrows-1_minimal-left"/> <b>Retour à la boite
                                                de reception </b>
                                            </button>
                                        </div>


                                    </div>


                                </div>


                            </div>


                        </div>


                        <FooterBigUserSite/>
                    </div>
                </div>

            </>

        )
    }
}
PersonalmessagesannoncesreservationsShowUser.propTypes = {
    loadContactserviceannoncereservationsredmessage: PropTypes.func.isRequired,
    loadAllcontactservices: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({

    annoncereservation: state.contactserviceannonceshow.itemreservation,
    contactusersprofile: state.contactusers.contactservices

});

export default connect(mapStateToProps, {
    loadContactserviceannoncereservationsredmessage,
    loadAllcontactservices,
    favoriteaddItem, favoriteremoveItem,
    archvementaddItem, archvementremoveItem,
    activecontactaddItem, activecontactremoveItem,
    activearsItem, unactiveprivatearsItem,
})(PersonalmessagesannoncesreservationsShowUser);
