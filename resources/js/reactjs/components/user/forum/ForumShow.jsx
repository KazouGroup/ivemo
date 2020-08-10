import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import {Button, Form, FormText, Input, UncontrolledTooltip} from "reactstrap";
import NavUserSite from "../../inc/user/NavUserSite";
import LinkValicationEmail from "../../inc/user/LinkValicationEmail";
import moment from "moment";
import Swal from "sweetalert2";
import HelmetSite from "../../inc/user/HelmetSite";
import ForumcommentIndex from "../comments/ForumcommentIndex";
import ForumShowSkeleton from "../../inc/user/forum/ForumShowSkeleton";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";
import Navlinknewforum from "./treatement/Navlinknewforum";
import SignalFromForumForShow from "./inc/SignalFromForumForShow";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    loadforumshow,
    favoriteItem,
    likeItem,
     unfavoriteItem, unlikeItem,
    unfollowerItem,followerItem,

    unsubscribeItem,subscribeItem,
    loadProfileusersforpublic,
} from "../../../redux/actions/forum/forumshowActions";
import Navforums from "./inc/Navforums";
import ForumInteresse from "./ForumInteresse";
import ButonFollowerUser from "../../inc/vendor/follow/ButonFollowerUser";
import ButonMiniSubscribedForum from "../../inc/vendor/ButonMiniSubscribedForum";
const abbrev = ['', 'k', 'M', 'B', 'T'];


class ForumShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
           //
        };

        this.signalerUser = this.signalerUser.bind(this);
        this.handleCheckClick = this.handleCheckClick.bind(this);
        this.hasErrorFor = this.hasErrorFor.bind(this);
        this.handleFieldChange = this.handleFieldChange.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    handleCheckClick(event){
        this.setState({
            subject: event.target.value
        });

    };

    handleFieldChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
        this.state.errors[event.target.name] = '';
    }

     signalerUser() {
        $('#addNew').modal('show');
    }

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

    deleteItem(forum) {
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

                const url = route('forumsdelete_site',forum.id);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update',
                            message: 'Post suprimée avec success'
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
                    this.props.history.push(`/forums/ab/new/`);
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
        this.props.loadforumshow(this.props);
        this.props.loadProfileusersforpublic(this.props)
    }

   // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();
    }
    getDescription(forum) {
        return { __html: forum.description};
    }

    data_countFormatter(visits_count, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(visits_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (visits_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    data_countfavoriteFormatter(countfavorites, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(countfavorites)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (countfavorites / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    data_countfollowFormatter(countfollowerusers, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(countfollowerusers)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (countfollowerusers / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    data_countlikeFormatter(countlikes, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(countlikes)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (countlikes / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    render() {
        const {forum,profileUser} = this.props;
        return (
            <>
                <HelmetSite title={`${forum.title || $name_site} - ${$name_site}`}/>

                <div className="about-us sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">
                        <div className="main main-raised">
                            <div className="container">
                                <br />
                                <div className="row">

                                    <div className="col-lg-8 col-md-12 mx-auto">
                                        <br/>
                                        {!$guest &&(
                                            <>
                                                {!$userIvemo.email_verified_at &&(
                                                    <LinkValicationEmail/>
                                                )}
                                            </>
                                        )}
                                        <div className="submit text-left">
                                            <button type="button" className="btn btn-neutral btn-sm" onClick={this.props.history.goBack}>
                                                <i className="now-ui-icons arrows-1_minimal-left"/> <b>Retour</b>
                                            </button>
                                        </div>

                                        {forum.title ?

                                            <div className="card">
                                                <div className="card-body">

                                                    <div className="card-header d-flex align-items-center">
                                                        <div className="d-flex align-items-center">

                                                            {forum.user.avatar === null ?
                                                                <img className="avatar" alt={forum.user.first_name}
                                                                     style={{ height: "35px", width: "35px", borderRadius:'35px' }}
                                                                     src={`https://dummyimage.com/wsvga/0077ee/009900&text=qui`}/>
                                                                :
                                                                <img className="avatar"
                                                                     style={{ height: "35px", width: "35px", borderRadius:'35px' }}
                                                                     alt={forum.user.first_name}
                                                                     src={forum.user.avatar}/>
                                                            }
                                                            <div className="mx-3">
                                                                <span className="text-dark font-weight-600 text-sm">
                                                                    <Link to={forum.user.status_profile ? `/pro/${forum.user.slug}/` : `/user/${forum.user.slug}/`}>
                                                                        <b>{forum.user.first_name}</b>
                                                                    </Link>
                                                                    <small className="d-block text-muted">{forum.statusOnline &&(<i className="fas fa-circle text-success"></i>)}  <i className="now-ui-icons tech_watch-time"/> {moment(forum.created_at).format('LL')}</small>
                                                                    <Link to={profileUser.status_profile ? `/pro/${profileUser.slug}/followers/` : `/user/${profileUser.slug}/followers/`}><b>{this.data_countfollowFormatter(profileUser.countfollowerusers || "")} {profileUser.countfollowerusers > 1 ? "abonnés" : "abonné"}</b></Link>
                                                                </span>


                                                            </div>

                                                            {profileUser.followeruser &&(
                                                                <ButonMiniSubscribedForum {...this.props} {...profileUser}
                                                                                          unsubscribeItem={this.props.unsubscribeItem}
                                                                                          subscribeItem={this.props.subscribeItem}/>
                                                            )}

                                                            <ButonFollowerUser {...this.props}{...profileUser}
                                                                               unfollowerItem={this.props.unfollowerItem}
                                                                               followerItem={this.props.followerItem}
                                                                               classNameDanger="btn btn-sm btn-danger"
                                                                               classNameInfo="btn btn-sm btn-info"
                                                                               nameunfollower={`Suivre`}
                                                                               nameununfollower={`Abonné`}/>

                                                        </div>
                                                        <div className="text-right ml-auto">
                                                            <span className="card-title">
                                                                <Link to={`/forums/${forum.categoryforum.slug}/`}><b>{forum.categoryforum.name}</b></Link> - <Link to={`/employments/`}> </Link> <i className="now-ui-icons tech_watch-time"/> {moment(forum.created_at).fromNow()}
                                                            </span>
                                                        </div>
                                                    </div>


                                                    {forum.title && (
                                                        <>
                                                            <h5 className="card-title">
                                                                <b>{forum.title}</b>
                                                            </h5>
                                                        </>
                                                    )}

                                                    <div className="title text-justify" dangerouslySetInnerHTML={this.getDescription(forum)} />

                                                    <div className="card-header d-flex align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <Button className="btn btn-default btn-sm btn-neutral" title={`${forum.visits_count} ${forum.countlikes > 1 ? "Commentaires" : "Commentaire"}`}>
                                                                <i className="far fa-eye"></i> <b>{this.data_countFormatter(forum.visits_count)} {forum.visits_count > 1 ? "Vues" : "Vue"}</b>
                                                            </Button>

                                                            {$guest ?
                                                                <>
                                                                    <Button data-toggle="modal" data-target="#loginModal"
                                                                            className="btn btn-default btn-sm btn-neutral" title={`${forum.countlikes} ${forum.countlikes > 1 ? "Likes" : "Like"}`}>
                                                                        <i className="far fa-heart"></i> <b>{this.data_countlikeFormatter(forum.countlikes)} J'aime</b>
                                                                    </Button>

                                                                    <Button data-toggle="modal" data-target="#loginModal"
                                                                            className="btn btn-default btn-sm btn-neutral" title="Sauvegarder">
                                                                        <i className="far fa-bookmark"></i> <b>{this.data_countfavoriteFormatter(forum.countfavorites)} Enregistrer</b>
                                                                    </Button>
                                                                </>

                                                                :
                                                                <>

                                                                    {forum.likeked ?
                                                                        <>
                                                                            <Button onClick={() => this.props.unlikeItem(forum)}
                                                                                    className="btn btn-danger btn-sm btn-neutral" title={`${forum.countlikes} ${forum.countlikes > 1 ? "Likes" : "Like"}`}>
                                                                                <i className="fas fa-heart"></i> <b>{this.data_countlikeFormatter(forum.countlikes)} J'aime</b>
                                                                            </Button>
                                                                        </>

                                                                        :
                                                                        <>
                                                                            <Button onClick={() => this.props.likeItem(forum)}
                                                                                    className="btn btn-default btn-sm btn-neutral" title={`${forum.countlikes} ${forum.countlikes > 1 ? "Likes" : "Like"}`}>
                                                                                <i className="far fa-heart"></i> <b>{this.data_countlikeFormatter(forum.countlikes)} J'aime</b>
                                                                            </Button>
                                                                        </>
                                                                    }

                                                                    {forum.favoriteted ?
                                                                        <>
                                                                            <Button onClick={() => this.props.unfavoriteItem(forum)}
                                                                                    className="btn btn-info btn-sm btn-neutral" title="Sauvegarder">
                                                                                <i className="fas fa-bookmark"></i> <b>{this.data_countfavoriteFormatter(forum.countfavorites)} Sauvegarder</b>
                                                                            </Button>
                                                                        </>

                                                                        :
                                                                        <>
                                                                            <Button onClick={() => this.props.favoriteItem(forum)}
                                                                                    className="btn btn-default btn-sm btn-neutral" title="Sauvegarder">
                                                                                <i className="far fa-bookmark"></i> <b>{this.data_countfavoriteFormatter(forum.countfavorites)} Sauvegarder</b>
                                                                            </Button>
                                                                        </>
                                                                    }


                                                                </>
                                                            }

                                                        </div>

                                                        <div className="text-right ml-auto">


                                                            {$guest ?
                                                                <>
                                                                    <Button data-toggle="modal" data-target="#loginModal"
                                                                            className="btn btn-default btn-icon btn-sm btn-neutral"
                                                                            title="Signaler ce post ">
                                                                        <i className="far fa-flag"></i>
                                                                    </Button>
                                                                </>
                                                                :
                                                                <>
                                                                    {($userIvemo.id === forum.user_id && $userIvemo.id === forum.user.id) && (
                                                                        <>

                                                                            <NavLink to={`/forums/ab/${forum.slugin}/edit/`} className="btn btn-info btn-neutral" title="Editer ce post">
                                                                                <i className="now-ui-icons ui-2_settings-90"/> Editer
                                                                            </NavLink>

                                                                            <button className="btn btn-danger btn-neutral" onClick={() => this.deleteItem(forum)} title="Supprimer ce post">
                                                                                <i className="now-ui-icons ui-1_simple-remove"></i> Supprimer
                                                                            </button>
                                                                        </>
                                                                    )}

                                                                    <Button className="btn btn-default btn-sm btn-neutral" onClick={() => this.signalerUser()}
                                                                            title="Signaler ce post ">
                                                                        <i className="far fa-flag"></i> <b>{$userIvemoIsadmin.status_user && (<>{forum.countsignals}</>)} Signaler</b>
                                                                    </Button>
                                                                </>
                                                            }

                                                        </div>
                                                    </div>

                                                    <ForumcommentIndex {...this.props} />

                                                </div>
                                            </div>
                                            :
                                            <ForumShowSkeleton/>
                                        }




                                    </div>



                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        <Navlinknewforum/>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">

                                                        <Navforums/>


                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <SignalFromForumForShow {...this.props} {...forum} />

                                    </div>

                                </div>


                                <ForumInteresse {...this.props} />

                            </div>
                        </div>

                        <FooterBigUserSite />
                    </div>
                </div>
            </>



        )
    }
}


ForumShow.propTypes = {
    loadforumshow: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    forum: state.forumshow.item,
    profileUser: state.profile.profiluser
});

export default connect(mapStateToProps, {
    loadforumshow,
    likeItem,unlikeItem,
    favoriteItem,unfavoriteItem,
    unfollowerItem,followerItem,

    unsubscribeItem,subscribeItem,
    loadProfileusersforpublic,
})(ForumShow);


