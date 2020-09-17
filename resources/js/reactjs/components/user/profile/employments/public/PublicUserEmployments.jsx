import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Button } from "reactstrap";
import NavUserSite from "../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import FormContactProfileAccountUser from "../../form/FormContactProfileAccountUser";
import FormNewletterSubcribeProfileAccountUser from "../../form/FormNewletterSubcribeProfileAccountUser";
import EmploymentListSkeleton from "../../../../inc/user/employment/EmploymentListSkeleton";
import Navlinknewemployment from "../../../employment/treatement/Navlinknewemployment";
import ButonSubscribedEmployment from "../../../../inc/vendor/ButonSubscribedEmployment";
import HelmetSite from "../../../../inc/user/HelmetSite";
import EmployementList from "../../../employment/inc/EmployementList";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    deleteItem,
    favoriteItem,
    loademploymentbyuserpublic,loadProfileusersforpublic, unactiveItem,
    unfavoriteItem,
    unsubscribeItem,subscribeItem,
    unfollowerItem,followerItem,
} from "../../../../../redux/actions/employment/employmentActions";
import ButonMiniSubscribedEmployment from "../../../../inc/vendor/ButonMiniSubscribedEmployment";
import ButonFollowerUser from "../../../../inc/vendor/follow/ButonFollowerUser";
import NavLinkPublicUser from "../../../../inc/vendor/NavLinkPublicUser";
const abbrev = ['', 'k', 'M', 'B', 'T'];

class PublicUserEmployments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visiable: 20,
        };

        this.loadmoresItem = this.loadmoresItem.bind(this);
    }

    loadmoresItem() {
        this.setState((old) => {
            return { visiable: old.visiable + 10 }
        })
    }

    loadItems(){
        this.props.loademploymentbyuserpublic(this.props);
        this.props.loadProfileusersforpublic(this.props);
    }

   // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();
    }


    data_countfollowFormatter(countfollowerusers, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(countfollowerusers)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
        const suffix = abbrev[order];
        return (countfollowerusers / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    data_countfollowingFormatter(countfollowingusers, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(countfollowingusers)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
        const suffix = abbrev[order];
        return (countfollowingusers / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }


    render() {
        const {employments,userPublick} = this.props;
        const {visiable} = this.state;
        const mapEmployments = employments.length >= 0 ? (
            employments.slice(0, visiable).map(item => {
                return(

                    <EmployementList key={item.id} {...item}
                                     favoriteItem={this.props.favoriteItem}
                                     unfavoriteItem={this.props.unfavoriteItem}
                                     deleteItem={this.props.deleteItem}
                                     unactiveItem={this.props.unactiveItem} />
                )
            })
        ):(
            <EmploymentListSkeleton/>
        );
        return (
            <>
                <HelmetSite title={`Emplois, Formation & Services ${userPublick.first_name || 'Profile'} - ${$name_site}`}/>

                <div className="landing-page sidebar-collapse">


                    <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent" color-on-scroll="400">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">
                        <div className="page-header page-header-mini">

                            {userPublick.avatarcover ?
                                <div className="page-header-image" data-parallax="true"
                                     style={{backgroundImage: "url(" + userPublick.avatarcover + ")"}}>
                                </div>
                                :
                                <div className="page-header-image" data-parallax="true"
                                     style={{backgroundImage: "url(" + `${$url_site}/assets/vendor/assets/img/blurredimage1.jpg` + ")"}}>
                                </div>
                            }

                            {userPublick.first_name && (

                                <div className="content-center">

                                    <h2 className="title">{userPublick.first_name}</h2>

                                    <div className="text-center">


                                        {userPublick.followeruser &&(
                                            <ButonMiniSubscribedEmployment {...this.props} {...userPublick}
                                                                           unsubscribeItem={this.props.unsubscribeItem}
                                                                           subscribeItem={this.props.subscribeItem}/>
                                        )}

                                        <ButonFollowerUser {...this.props} {...userPublick}
                                                           unfollowerItem={this.props.unfollowerItem}
                                                           followerItem={this.props.followerItem}
                                                           classNameDanger="btn btn-danger"
                                                           classNameInfo="btn btn-info"
                                                           nameunfollower={`Suivre`}
                                                           nameununfollower={`Abonné`}/>
                                    </div>
                                    <Link to={userPublick.status_profile ? `/pro/${userPublick.slug}/followers/`:`/user/${userPublick.slug}/followers/`} className="text-white"><b>{this.data_countfollowFormatter(userPublick.countfollowerusers || "")} {userPublick.countfollowerusers > 1 ? "Abonnés" : "Abonné"}</b></Link> | <Link to={userPublick.status_profile ? `/pro/${userPublick.slug}/following/`:`/user/${userPublick.slug}/following/`} className="text-white"><b>{this.data_countfollowingFormatter(userPublick.countfollowingusers || "")} {userPublick.countfollowingusers > 1 ? "Abonnements" : "Abonnement"}</b></Link>
                                    <br/>
                                    <Link  className="text-white" to={userPublick.status_profile ?

                                        `/pro/${userPublick.slug}/`
                                        :
                                        `/user/${userPublick.slug}/`}
                                    >
                                        <i className="fa fa-chevron-circle-left" /> <b>Retour au profile de {userPublick.first_name}</b>

                                    </Link>
                                    {userPublick.employments_count > 0 &&(
                                        <h5><b>{userPublick.employments_count}</b> {userPublick.employments_count > 1 ? "annonces" : "annonce"} posté par {userPublick.first_name} sur les emploies et services</h5>
                                    )}

                                </div>

                            )}

                        </div>

                        <div className="main main-raised">
                            <div className="container">
                                <div className="row">
                                </div>
                            </div>

                            <div className="container">
                                <br />
                                <div className="row">

                                    <div className="col-lg-4 col-md-12 mx-auto">


                                        {!userPublick.status_profile ?
                                            <>

                                            </>
                                            :
                                            <>

                                                {/**
                                                 <div className="card">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                                    <div className="card card-plain">
                                                                        <div className="card-header" role="tab" id="headingTwo">
                                                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                                                                <b>Articles de {userPublick.first_name}</b>
                                                                            </a>
                                                                        </div>

                                                                        <NavLinkPublicBlogannoncesUser {...this.props} {...userPublick}/>

                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                 */}

                                                <Navlinknewemployment/>


                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                                    <div className="card card-plain">
                                                                        <div className="card-header" role="tab" id="headingTree">
                                                                            <a data-toggle="collapse" data-parent="#accordion" href="#collapseTree" aria-expanded="true" aria-controls="collapseTree">
                                                                                <b>Annonces de {userPublick.first_name}</b>
                                                                            </a>
                                                                        </div>

                                                                        <NavLinkPublicUser {...this.props} {...userPublick}/>

                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-md-12">

                                                                <div className="card-header text-center">
                                                                    <h4 className="card-title"><b>Contacter {userPublick.first_name}</b></h4>
                                                                </div>

                                                                <FormContactProfileAccountUser {...this.props} {...userPublick}/>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>

                                        }

                                    </div>

                                    {!userPublick.status_profile ?

                                        <div className="col-lg-8 col-md-12 mx-auto">
                                            <div className="card">

                                                <div className="card-body">

                                                    <div className="card-header text-center">
                                                        <h4 className="card-title"><b>Pour poster votre bien !</b></h4>
                                                        <a href="#"
                                                           className="btn btn-info btn-lg">
                                                            <b>Devenez professionnel pour poster votre bien</b>
                                                        </a>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        :
                                        <div className="col-lg-8 col-md-12 mx-auto">

                                            {mapEmployments}

                                            <div className="text-center">
                                                {visiable < employments.length ?
                                                    <button type="button" onClick={this.loadmoresItem} className="btn btn-primary btn-block">
                                                        <b>Voir plus </b>
                                                    </button>
                                                    :
                                                    <>
                                                        {userPublick.followeruser && (
                                                            <ButonSubscribedEmployment namesubscribed={`Recevoir toutes les notifications`} nameunsubscribed={`Ne plus recevoir les notifications`}
                                                                                       titleToltipeSubscribed={`Abonnez vous pour recevoir tous annonces des emploies et services postées par`}
                                                                                       titleToltipeUnsubscribed={`Ne plus etre notifier des annonces des emploies et services postées par`}
                                                                                       subscribeItem={this.props.subscribeItem} unsubscribeItem={this.props.unsubscribeItem}
                                                                                       {...userPublick}/>
                                                        )}

                                                    </>


                                                }
                                            </div>

                                            <div className="card">
                                                <div className="card-body">

                                                    <div className="card-header text-center">
                                                        <h4 className="card-title"><b>Contacter {userPublick.first_name}</b></h4>
                                                    </div>

                                                    <FormContactProfileAccountUser {...this.props} {...userPublick}/>

                                                </div>
                                            </div>

                                            <div className="card">

                                                <div className="card-body">

                                                    <div className="card-header text-center">
                                                        <h4 className="card-title"><b>Restez à l’écoute !</b></h4>
                                                        <p className="card-title">
                                                            Abonnez-vous à la newsletter de <b>{userPublick.first_name}</b> afin d'être notifié des mises à jour
                                                        </p>
                                                    </div>

                                                    <FormNewletterSubcribeProfileAccountUser {...this.props} />

                                                </div>
                                            </div>

                                        </div>
                                    }

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
PublicUserEmployments.propTypes = {
    loademploymentbyuserpublic: PropTypes.func.isRequired,
    loadProfileusersforpublic: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    employments: store.employments.items,
    userPublick: store.profile.profiluser

});

export default connect(mapStoreToProps,
    {
        loademploymentbyuserpublic,
        loadProfileusersforpublic,
        favoriteItem,unfavoriteItem,
        deleteItem,unactiveItem,
        unsubscribeItem,subscribeItem,
        unfollowerItem,followerItem,
    }
)(PublicUserEmployments);
