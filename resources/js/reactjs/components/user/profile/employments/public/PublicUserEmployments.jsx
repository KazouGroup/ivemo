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
        const {employments,useremploymentPublick} = this.props;
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
                <HelmetSite title={`Emplois, Formation & Services ${useremploymentPublick.first_name || 'Profile'} - ${$name_site}`}/>

                <div className="landing-page sidebar-collapse">


                    <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent" color-on-scroll="400">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">
                        <div className="page-header page-header-mini">
                            <div className="page-header-image" data-parallax="true" style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg32.jpg' + ")" }}/>

                            {useremploymentPublick.first_name && (

                                <div className="content-center">

                                    <h2 className="title">{useremploymentPublick.first_name}</h2>

                                    <div className="text-center">


                                        {useremploymentPublick.followeruser &&(
                                            <ButonMiniSubscribedEmployment {...this.props} {...useremploymentPublick}
                                                                           unsubscribeItem={this.props.unsubscribeItem}
                                                                           subscribeItem={this.props.subscribeItem}/>
                                        )}

                                        <ButonFollowerUser {...this.props} {...useremploymentPublick}
                                                           unfollowerItem={this.props.unfollowerItem}
                                                           followerItem={this.props.followerItem}
                                                           classNameDanger="btn btn-danger"
                                                           classNameInfo="btn btn-info"
                                                           nameunfollower={`Suivre`}
                                                           nameununfollower={`Abonné`}/>
                                    </div>
                                    <Link to={useremploymentPublick.status_profile ? `/pro/${useremploymentPublick.slug}/followers/`:`/user/${useremploymentPublick.slug}/followers/`} className="text-white"><b>{this.data_countfollowFormatter(useremploymentPublick.countfollowerusers || "")} {useremploymentPublick.countfollowerusers > 1 ? "Abonnés" : "Abonné"}</b></Link> | <Link to={useremploymentPublick.status_profile ? `/pro/${useremploymentPublick.slug}/following/`:`/user/${useremploymentPublick.slug}/following/`} className="text-white"><b>{this.data_countfollowingFormatter(useremploymentPublick.countfollowingusers || "")} {useremploymentPublick.countfollowingusers > 1 ? "Abonnements" : "Abonnement"}</b></Link>
                                    <br/>
                                    <Link  className="text-white" to={useremploymentPublick.status_profile ?

                                        `/user/${useremploymentPublick.slug}/`
                                        :
                                        `/pro/${useremploymentPublick.slug}/`}
                                    >
                                        <i className="fa fa-chevron-circle-left" /> <b>Retour au profile de {useremploymentPublick.first_name}</b>

                                    </Link>
                                    {useremploymentPublick.employments_count > 0 &&(
                                        <h5><b>{useremploymentPublick.employments_count}</b> {useremploymentPublick.employments_count > 1 ? "annonces" : "annonce"} posté par {useremploymentPublick.first_name} sur les emploies et services</h5>
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


                                        {!useremploymentPublick.status_profile ?
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
                                                                                <b>Articles de {useremploymentPublick.first_name}</b>
                                                                            </a>
                                                                        </div>

                                                                        <NavLinkPublicBlogannoncesUser {...this.props} {...useremploymentPublick}/>

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
                                                                                <b>Annonces de {useremploymentPublick.first_name}</b>
                                                                            </a>
                                                                        </div>

                                                                        <NavLinkPublicUser {...this.props} {...useremploymentPublick}/>

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
                                                                    <h4 className="card-title"><b>Contacter {useremploymentPublick.first_name}</b></h4>
                                                                </div>

                                                                <FormContactProfileAccountUser {...this.props} {...useremploymentPublick}/>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>

                                        }

                                    </div>

                                    {!useremploymentPublick.status_profile ?

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
                                                    <ButonSubscribedEmployment namesubscribed={`Recevoir toutes les notifications`} nameunsubscribed={`Ne plus recevoir les notifications`}
                                                                               titleToltipeSubscribed={`Abonnez vous pour recevoir tous annonces des emploies et services postées par`}
                                                                               titleToltipeUnsubscribed={`Ne plus etre notifier des annonces des emploies et services postées par`}
                                                                               subscribeItem={this.props.subscribeItem} unsubscribeItem={this.props.unsubscribeItem}
                                                                               {...useremploymentPublick}/>

                                                }
                                            </div>

                                            <div className="card">
                                                <div className="card-body">

                                                    <div className="card-header text-center">
                                                        <h4 className="card-title"><b>Contacter {useremploymentPublick.first_name}</b></h4>
                                                    </div>

                                                    <FormContactProfileAccountUser {...this.props} {...useremploymentPublick}/>

                                                </div>
                                            </div>

                                            <div className="card">

                                                <div className="card-body">

                                                    <div className="card-header text-center">
                                                        <h4 className="card-title"><b>Restez à l’écoute !</b></h4>
                                                        <p className="card-title">
                                                            Abonnez-vous à la newsletter de <b>{useremploymentPublick.first_name}</b> afin d'être notifié des mises à jour
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
    useremploymentPublick: store.profile.profiluser

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
