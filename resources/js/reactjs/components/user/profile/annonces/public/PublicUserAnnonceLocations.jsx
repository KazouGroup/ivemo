import React, {Component} from "react";
import {Link, NavLink} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {Button} from "reactstrap";
import NavUserSite from "../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import AnnonceslocationList from "../../../annonces/annonceloaction/inc/AnnonceslocationList";
import Swal from "sweetalert2";
import NavLinkPublicAnnonceUser from "../NavLinkPublicAnnonceUser";
import FormContactProfileAccountUser from "../../form/FormContactProfileAccountUser";
import NavLinkPublicBlogannoncesUser from "../../blogs/public/NavLinkPublicBlogannoncesUser";
import FormNewletterSubcribeProfileAccountUser from "../../form/FormNewletterSubcribeProfileAccountUser";
import AnnoncesListSkeleton from "../../../../inc/user/annonce/AnnoncesListSkeleton";
import NavLinkPublicEmploymentUser from "../../../../inc/vendor/NavLinkPublicUser";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    deleteItem,
    favoriteItem, unfavoriteItem,
    followerItem, unfollowerItem,
    loadannoncebyuserpublic,
    loadProfileusersforpublic,
    subscribeItem, unsubscribeItem,
    unactiveItem,
} from "../../../../../redux/actions/annoncelocation/annoncelocationActions";
import HelmetSite from "../../../../inc/user/HelmetSite";
import NavLinkPublicUser from "../../../../inc/vendor/NavLinkPublicUser";
import ButonMiniSubscribedEmployment from "../../../../inc/vendor/ButonMiniSubscribedEmployment";
import ButonFollowerUser from "../../../../inc/vendor/follow/ButonFollowerUser";
import Navlinknewannoncelocation from "../../../annonces/annonceloaction/treatment/Navlinknewannoncelocation";
import ButonMiniSubscribedAllAnnonce from "../../../../inc/vendor/ButonMiniSubscribedAllAnnonce";
const abbrev = ['', 'k', 'M', 'B', 'T'];



class PublicUserAnnonceLocations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visiable: 20,
        };

        this.loadmoresItem = this.loadmoresItem.bind(this);
    }

    loadmoresItem() {
        this.setState((old) => {
            return {visiable: old.visiable + 10}
        })
    }

    loadItems() {
        this.props.loadannoncebyuserpublic(this.props);
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
        const {annoncelocations, useranoncelocationPublick} = this.props;
        const {visiable} = this.state;
        const mapAnnoncelocations = annoncelocations.length >= 0 ? (
            annoncelocations.slice(0, visiable).map(item => {
                return (

                    <AnnonceslocationList key={item.id} {...item}
                                          favoriteItem={this.props.favoriteItem}
                                          unfavoriteItem={this.props.unfavoriteItem}
                                          deleteItem={this.props.deleteItem}
                                          unactiveItem={this.props.unactiveItem}
                    />
                )
            })
        ) : (
            <AnnoncesListSkeleton/>
        );
        return (
            <>
                <HelmetSite
                    title={`Annonce locations ${useranoncelocationPublick.first_name || 'Profile'} - ${$name_site}`}/>


                <div className="landing-page sidebar-collapse">


                    <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent"
                         color-on-scroll="400">
                        <NavUserSite/>
                    </nav>

                    <div className="wrapper">
                        <div className="page-header page-header-mini">
                            {useranoncelocationPublick.avatarcover ?
                                <div className="page-header-image" data-parallax="true"
                                     style={{backgroundImage: "url(" + useranoncelocationPublick.avatarcover + ")"}}>
                                </div>
                                :
                                <div className="page-header-image" data-parallax="true"
                                     style={{backgroundImage: "url(" + `${$url_site}/assets/vendor/assets/img/blurredimage1.jpg` + ")"}}>
                                </div>
                            }


                            {useranoncelocationPublick.first_name && (

                                <div className="content-center">

                                    <h2 className="title">{useranoncelocationPublick.first_name}</h2>

                                    <div className="text-center">


                                        {useranoncelocationPublick.followeruser &&(
                                            <ButonMiniSubscribedAllAnnonce {...this.props} {...useranoncelocationPublick}
                                                                           unsubscribeItem={this.props.unsubscribeItem}
                                                                           subscribeItem={this.props.subscribeItem}/>
                                        )}

                                        <ButonFollowerUser {...this.props} {...useranoncelocationPublick}
                                                           unfollowerItem={this.props.unfollowerItem}
                                                           followerItem={this.props.followerItem}
                                                           classNameDanger="btn btn-danger"
                                                           classNameInfo="btn btn-info"
                                                           nameunfollower={`Suivre`}
                                                           nameununfollower={`Abonné`}/>
                                    </div>
                                    <Link to={useranoncelocationPublick.status_profile ? `/pro/${useranoncelocationPublick.slug}/followers/`:`/user/${useranoncelocationPublick.slug}/followers/`} className="text-white"><b>{this.data_countfollowFormatter(useranoncelocationPublick.countfollowerusers || "")} {useranoncelocationPublick.countfollowerusers > 1 ? "Abonnés" : "Abonné"}</b></Link> | <Link to={useranoncelocationPublick.status_profile ? `/pro/${useranoncelocationPublick.slug}/following/`:`/user/${useranoncelocationPublick.slug}/following/`} className="text-white"><b>{this.data_countfollowingFormatter(useranoncelocationPublick.countfollowingusers || "")} {useranoncelocationPublick.countfollowingusers > 1 ? "Abonnements" : "Abonnement"}</b></Link>
                                    <br/>
                                    <Link  className="text-white" to={useranoncelocationPublick.status_profile ?

                                        `/user/${useranoncelocationPublick.slug}/`
                                        :
                                        `/pro/${useranoncelocationPublick.slug}/`}
                                    >
                                        <i className="fa fa-chevron-circle-left" /> <b>Retour au profile de {useranoncelocationPublick.first_name}</b>

                                    </Link>
                                    {useranoncelocationPublick.annoncelocations_count > 0 &&(
                                        <h5><b>{useranoncelocationPublick.annoncelocations_count}</b> {useranoncelocationPublick.annoncelocations_count > 1 ? "annonces" : "annonce"} posté par {useranoncelocationPublick.first_name} sur les locations</h5>
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
                                <br/>
                                <div className="row">
                                    <div className="col-lg-4 col-md-12 mx-auto">


                                        {useranoncelocationPublick.status_profile === 0 ?
                                            <></>
                                            :
                                            <>
                                                <div className="submit text-center">
                                                    <Navlinknewannoncelocation {...this.props} />
                                                </div>

                                                <div className="card">
                                                    <div className="card-body">
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div id="accordion" role="tablist"
                                                                     aria-multiselectable="true"
                                                                     className="card-collapse">
                                                                    <div className="card card-plain">
                                                                        <div className="card-header" role="tab"
                                                                             id="headingTree">
                                                                            <a data-toggle="collapse"
                                                                               data-parent="#accordion"
                                                                               href="#collapseTree" aria-expanded="true"
                                                                               aria-controls="collapseTree">
                                                                                <b>Annonces
                                                                                    de {useranoncelocationPublick.first_name}</b>
                                                                            </a>
                                                                        </div>

                                                                        <NavLinkPublicUser {...this.props} {...useranoncelocationPublick}/>

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
                                                                    <h4 className="card-title">
                                                                        <b>Contacter {useranoncelocationPublick.first_name}</b>
                                                                    </h4>
                                                                </div>

                                                                <FormContactProfileAccountUser {...this.props} {...useranoncelocationPublick}/>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        }


                                    </div>

                                    {useranoncelocationPublick.status_profile === 0 ?

                                        <div className="col-lg-8 col-md-12 mx-auto">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="card-header text-center">
                                                        <h4 className="card-title"><b>Pour poster votre bien !</b></h4>
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

                                            {mapAnnoncelocations}

                                            {visiable < annoncelocations.length && (
                                                <div className="row">
                                                    <div className="col-md-4 ml-auto mr-auto text-center">
                                                        <button type="button" onClick={this.loadmoresItem}
                                                                className="btn btn-primary btn-block">
                                                            <b>Voir plus </b>
                                                        </button>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="card-header text-center">
                                                        <h4 className="card-title">
                                                            <b>Contacter {useranoncelocationPublick.first_name}</b></h4>
                                                    </div>

                                                    <FormContactProfileAccountUser {...this.props} {...useranoncelocationPublick}/>

                                                </div>
                                            </div>

                                            <div className="card card-raised card-form-horizontal">
                                                <div className="card-body">
                                                    <div className="card-header text-center">
                                                        <h4 className="card-title"><b>Restez à l’écoute !</b></h4>
                                                        <p className="card-title">
                                                            Abonnez-vous à la newsletter
                                                            de <b>{useranoncelocationPublick.first_name}</b> afin d'être
                                                            notifié des mises à jour
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

                        <FooterBigUserSite/>

                    </div>
                </div>
            </>

        )
    }
}

PublicUserAnnonceLocations.propTypes = {
    loadannoncebyuserpublic: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    annoncelocations: store.annoncelocations.annoncelocations,
    useranoncelocationPublick: store.profile.profiluser

});

export default connect(mapStoreToProps,
    {
        loadannoncebyuserpublic,
        loadProfileusersforpublic,
        favoriteItem, unfavoriteItem,
        deleteItem, unactiveItem,
        unsubscribeItem, subscribeItem,
        unfollowerItem, followerItem,
    }
)(PublicUserAnnonceLocations);
