import React, {Component, Fragment, Suspense} from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import {Button, Form, UncontrolledTooltip} from "reactstrap";
import NavUserSite from "../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import FootermailmessageUser from "../../mail/inc/FootermailmessageUser";
import Swal from "sweetalert2";
import ReadMoreAndLess from "react-read-more-less";
import LinkValicationEmail from "../../../../inc/user/LinkValicationEmail";
import {connect} from "react-redux";
import {
    activearsItem, unactiveprivatearsItem,
    activecommentcontactaddItem,
    loadAllcontactservices,
    loadContactserviceannoncereservationsredmessage,
} from "../../../../../redux/actions/contactserviceActions";
import HelmetSite from "../../../../inc/user/HelmetSite";
import NavlinkmailmessageUser from "../../mail/inc/NavlinkmailmessageUser";
import AnnoncesListOnSkeleton from "../../../../inc/user/annonce/AnnoncesListOnSkeleton";
import PrivateUserAnnoncereservationList from "../../../annonces/annoncereservation/inc/PrivateUserAnnoncereservationList";
import moment from "moment";
import FormCommentContactPivate from "../../../../inc/vendor/comment/FormCommentContactPivate";
import NavlinkmailmessagesendUser from "../../mail/inc/NavlinkmailmessagesendUser";


class PersonalmessagesannoncesreservationsShowUser extends Component {
    constructor(props) {
        super(props);
        //itemData correspont a une variable aleatoire donner pour faire le traitement
        this.state = {
            message: '',
            visiable: 6,
            responsecontactservices: 2,
            editcontactservice: false,
            responsecontactservice: false,
            editresponsecontactservice: false,
            itemData:[],
            errors: [],
        };

        this.sendcommentItem = this.sendcommentItem.bind(this);
        this.sendresponsecommentItem = this.sendresponsecommentItem.bind(this);
        this.cancelresponseCourse = this.cancelresponseCourse.bind(this);
        this.responsecontactserviceFromItem = this.responsecontactserviceFromItem.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.renderErrorFor = this.renderErrorFor.bind(this);


        this.loadmoresItem = this.loadmoresItem.bind(this);
        this.loadmoresresponseItem = this.loadmoresresponseItem.bind(this);

    }

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
        this.state.errors[event.target.name] = '';
    }

    // Handle Errors
    hasErrorFor(field) {
        return !!this.state.errors[field];
    }

    renderErrorFor(field) {
        if (this.hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{this.state.errors[field][0]}</strong>
                </span>
            )
        }
    }

    cancelresponseCourse(){
        this.setState({message: "",editcontactservice: false,responsecontactservice: false,editresponsecontactservice:false});
    };

    responsecontactserviceFromItem(item) {
        this.setState({
            responsecontactservice: true,
            id:item.id,
            itemData: item
        });
    }

    loadmoresItem() {
        this.setState((old) => {
            return { visiable: old.visiable + 6 }
        })
    }

    loadmoresresponseItem() {
        this.setState((old) => {
            return { responsecontactservices: old.responsecontactservices + 2 }
        })
    }

    sendresponsecommentItem(e) {
        e.preventDefault();

        let item = {
            message: this.state.message,
        };

        let itemuser = this.props.match.params.user;
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemannoncereservation = this.props.match.params.annoncereservation;
        let Id = this.state.itemData.id;
        let url = route('contactservicesarssendresponsecomment_site',[itemuser,itemannoncetype,itemannoncereservation,Id]);
        dyaxios.post(url, item)
            .then(() => {

                $.notify({
                        message: `Réponse sauvegarder`
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

                this.setState({message: "",responsecontactservice: false,});

                this.loadItems();

            }).catch(error => {
            this.setState({
                errors: error.response.data.errors
            });
        })
    }

    sendcommentItem(e) {
        e.preventDefault();

        let item = {
            message: this.state.message,
        };
        let itemuser = this.props.match.params.user;
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemannoncereservation = this.props.match.params.annoncereservation;
        let url = route('contactservicesarssendcomment_site',[itemuser,itemannoncetype,itemannoncereservation]);
        dyaxios.post(url, item)
            .then((response) => {

                //console.log(res.status)
                $.notify({
                        message: `Message envoyé`
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

                this.setState({message: "",});

                this.loadItems();

            }).catch(error => {
            //window.location.reload(true);
            this.setState({
                errors: error.response.data.errors
            });
        })
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
        const {itemData,editcontactservice,responsecontactservice,editresponsecontactservice,visiable,responsecontactservices} = this.state;
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


                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                            <NavlinkmailmessagesendUser {...this.props} {...contactusersprofile}/>

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




                                                    {$userIvemo.slug !== this.props.match.params.user && (
                                                        <h5 className="title text-center">
                                                            <b>{annoncereservation.contactservices_count > 1 ? `${annoncereservation.contactservices_count || ""} Messages non lus` : `${annoncereservation.contactservices_count || ""} Message non lu`}</b>
                                                        </h5>

                                                    )}

                                                    <div className="media-area">

                                                        {$userIvemo.slug === this.props.match.params.user && (
                                                            <>
                                                                {!editcontactservice && !responsecontactservice && !editresponsecontactservice && (
                                                                    <Form onSubmit={this.sendcommentItem} acceptCharset="UTF-8">

                                                                        <FormCommentContactPivate value={this.state.message} disabled={!this.state.message} cancelresponseCourse={this.cancelresponseCourse}
                                                                                                  renderErrorFor={this.renderErrorFor} hasErrorFor={this.hasErrorFor}
                                                                                                  handleFieldChange={this.handleFieldChange} namesubmit={`POSTER VOTRE MESSAGE`}/>

                                                                    </Form>
                                                                )}
                                                            </>
                                                        )}

                                                        {annoncereservation.contactservices.length >= 0 ?
                                                            <>
                                                                {annoncereservation.contactservices.slice(0, visiable).map((item) => (

                                                                    <Fragment key={item.id}>

                                                                        <div className="media">

                                                                            <div className="author">
                                                                                {item.from.avatar === null ?
                                                                                    <img className="avatar" alt={item.from.first_name}
                                                                                         src={`/assets/vendor/assets/img/blurredimage1.jpg`}/>
                                                                                    :
                                                                                    <img className="avatar" alt={item.from.first_name}
                                                                                         src={item.from.avatar}/>
                                                                                }
                                                                            </div>

                                                                            <div className="media-body">
                                                                                {item.status_red ?
                                                                                <>
                                                                                    <h6 className={`media-heading ${item.status_red ? "" : "text-primary"}`}>{item.from.first_name}
                                                                                        <small
                                                                                            className="text-muted">· {moment(item.created_at).fromNow()}</small>
                                                                                    </h6>
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
                                                                                </>
                                                                                :
                                                                                <>
                                                                                <a href={void (0)} style={{cursor: "pointer"}} onClick={() => this.props.activecommentcontactaddItem(item)}>
                                                                                    <h6 className={`media-heading ${item.status_red ? "" : "text-primary"}`}>{item.from.first_name}
                                                                                        <small
                                                                                            className="text-muted">· {moment(item.created_at).fromNow()}</small>
                                                                                    </h6>
                                                                                </a>
                                                                                <a href={void (0)} style={{cursor: "pointer"}} onClick={() => this.props.activecommentcontactaddItem(item)}
                                                                                   className={`${item.status_red ? "" : "text-primary"}`}>
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
                                                                                </>
                                                                                }


                                                                                <div className="media-footer">
                                                                                    <Button className="btn btn-default btn-neutral pull-right"/>

                                                                                    {responsecontactservice ?
                                                                                        <>
                                                                                            {(item.id === itemData.id) && (
                                                                                                <>
                                                                                                    <button type="button" onClick={this.cancelresponseCourse}
                                                                                                            className="btn btn-default btn-neutral pull-right" title="Repondre a ce message">
                                                                                                        <i className="now-ui-icons files_single-copy-04"></i> Annuler
                                                                                                    </button>

                                                                                                </>
                                                                                            )}
                                                                                        </>
                                                                                        :
                                                                                        <>
                                                                                            {$userIvemo.slug !== this.props.match.params.user && (

                                                                                                <button type="button" onClick={() => this.responsecontactserviceFromItem(item)}
                                                                                                        className="btn btn-default btn-neutral pull-right" title="Repondre a ce message">
                                                                                                    <i className="now-ui-icons files_single-copy-04"></i> Repondre
                                                                                                </button>
                                                                                            )}
                                                                                        </>
                                                                                    }

                                                                                </div>

                                                                                {(item.id === itemData.id) && (
                                                                                    <>
                                                                                        {responsecontactservice && (

                                                                                            <Form onSubmit={this.sendresponsecommentItem} acceptCharset="UTF-8">

                                                                                                <FormCommentContactPivate value={this.state.message} disabled={!this.state.message} cancelresponseCourse={this.cancelresponseCourse}
                                                                                                                          renderErrorFor={this.renderErrorFor} hasErrorFor={this.hasErrorFor}
                                                                                                                          handleFieldChange={this.handleFieldChange} namesubmit={`POSTER UNE RÉPONSE`}/>

                                                                                            </Form>

                                                                                        )}

                                                                                    </>
                                                                                )}

                                                                                <Suspense fallback={<p>loading...</p>}>

                                                                                    {item.responsecontactservices.slice(0, responsecontactservices).map((lk) =>

                                                                                        <Fragment key={lk.id}>

                                                                                            <div className="media">

                                                                                                <div className="author">
                                                                                                    {item.to.avatar === null ?
                                                                                                        <img className="avatar" alt={item.to.first_name}
                                                                                                             src={`/assets/vendor/assets/img/blurredimage1.jpg`}/>
                                                                                                        :
                                                                                                        <img className="avatar" alt={item.to.first_name}
                                                                                                             src={item.to.avatar}/>
                                                                                                    }
                                                                                                </div>
                                                                                                <div className="media-body">
                                                                                                    <h6 className="media-heading">{lk.user.first_name}
                                                                                                        <small
                                                                                                            className="text-muted">· {moment(lk.updated_at).fromNow()} {lk.created_at !== lk.updated_at && ("(Modifié)")}</small>
                                                                                                    </h6>
                                                                                                    <ReadMoreAndLess
                                                                                                        className="read-more-content"
                                                                                                        charLimit={250}
                                                                                                        readMoreText="lire plus"
                                                                                                        readLessText=""
                                                                                                    >
                                                                                                        {lk.message || ""}
                                                                                                    </ReadMoreAndLess>

                                                                                                    <div className="media-footer">
                                                                                                        <Button className="btn btn-default btn-neutral pull-right"/>



                                                                                                    </div>

                                                                                                </div>

                                                                                            </div>



                                                                                        </Fragment>
                                                                                    )}

                                                                                    {responsecontactservices < item.responsecontactservices.length && (
                                                                                        <div className="col-md-8 ml-auto mr-auto text-center">
                                                                                            <a style={{cursor:"pointer"}} onClick={this.loadmoresresponseItem} className="text-info">
                                                                                                <b>{item.responsecontactservices.length} Afficher plus de réponses</b>
                                                                                            </a>
                                                                                        </div>
                                                                                    )}

                                                                                </Suspense>


                                                                            </div>
                                                                        </div>

                                                                    </Fragment>

                                                                ))}
                                                            </>
                                                            : null}


                                                        <br/>


                                                        {visiable < annoncereservation.contactservices.length && (
                                                            <div className="col-md-8 ml-auto mr-auto text-center">
                                                                <a style={{cursor:"pointer"}} onClick={this.loadmoresItem} className="text-info">
                                                                    <b>Afficher plus de message</b>
                                                                </a>
                                                            </div>
                                                        )}

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
    activecommentcontactaddItem,
    activearsItem, unactiveprivatearsItem,
})(PersonalmessagesannoncesreservationsShowUser);
