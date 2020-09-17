import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button,UncontrolledTooltip } from "reactstrap";
import NavUserSite from "../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import FormContactProfileAccountUser from "../../form/FormContactProfileAccountUser";
import AnnonceventeList from "../../../annonces/annoncevente/inc/AnnonceventeList";
import FormNewletterSubcribeProfileAccountUser from "../../form/FormNewletterSubcribeProfileAccountUser";
import AnnoncesListSkeleton from "../../../../inc/user/annonce/AnnoncesListSkeleton";
import HelmetSite from "../../../../inc/user/HelmetSite";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    deleteItem,
    favoriteItem,unfavoriteItem,
    loadannoncebyuserpublic,
    loadProfileusersforpublic,
    subscribeItem,unsubscribeItem,
    unactiveItem,
    followerItem,unfollowerItem,
} from "../../../../../redux/actions/annoncevente/annonceventeActions";
import ButonMiniSubscribedAllAnnonce from "../../../../inc/vendor/ButonMiniSubscribedAllAnnonce";
import ButonFollowerUser from "../../../../inc/vendor/follow/ButonFollowerUser";
import NavLinkPublicUser from "../../../../inc/vendor/NavLinkPublicUser";
import Navlinknewannoncevente from "../../../annonces/annoncevente/treatment/Navlinknewannoncevente";
const abbrev = ['', 'k', 'M', 'B', 'T'];



class PublicUserAnnonceVentes extends Component {
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
        const {annonceventes,userannonceventePublick} = this.props;
        const {visiable} = this.state;
        const mapAnnonceventes = annonceventes.length >= 0 ? (
            annonceventes.slice(0, visiable).map(item => {
                return(

                    <AnnonceventeList key={item.id} {...item}
                                      deleteItem={this.deleteItem}
                                      favoriteItem={this.props.favoriteItem}
                                      unfavoriteItem={this.props.unfavoriteItem}
                                      unactiveItem={this.props.unactiveItem}/>
                )
            })
        ):(
            <AnnoncesListSkeleton/>
        );
        return (
            <>

                <HelmetSite title={`Annonces ventes ${userannonceventePublick.first_name || 'Profile'} - ${$name_site}`}/>


                <div className="landing-page sidebar-collapse">
                    <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent" color-on-scroll="400">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">
                        <div className="page-header page-header-mini">
                            {userannonceventePublick.avatarcover ?
                                <div className="page-header-image" data-parallax="true"
                                     style={{backgroundImage: "url(" + userannonceventePublick.avatarcover + ")"}}>
                                </div>
                                :
                                <div className="page-header-image" data-parallax="true"
                                     style={{backgroundImage: "url(" + `${$url_site}/assets/vendor/assets/img/blurredimage1.jpg` + ")"}}>
                                </div>
                            }


                            {userannonceventePublick.first_name && (

                                <div className="content-center">

                                    <h2 className="title">{userannonceventePublick.first_name}</h2>

                                    <div className="text-center">


                                        {userannonceventePublick.followeruser &&(
                                            <ButonMiniSubscribedAllAnnonce {...this.props} {...userannonceventePublick}
                                                                           unsubscribeItem={this.props.unsubscribeItem}
                                                                           subscribeItem={this.props.subscribeItem}/>
                                        )}

                                        <ButonFollowerUser {...this.props} {...userannonceventePublick}
                                                           unfollowerItem={this.props.unfollowerItem}
                                                           followerItem={this.props.followerItem}
                                                           classNameDanger="btn btn-danger"
                                                           classNameInfo="btn btn-info"
                                                           nameunfollower={`Suivre`}
                                                           nameununfollower={`Abonné`}/>
                                    </div>
                                    <Link to={userannonceventePublick.status_profile ? `/pro/${userannonceventePublick.slug}/followers/`:`/user/${userannonceventePublick.slug}/followers/`} className="text-white"><b>{this.data_countfollowFormatter(userannonceventePublick.countfollowerusers || "")} {userannonceventePublick.countfollowerusers > 1 ? "Abonnés" : "Abonné"}</b></Link> | <Link to={userannonceventePublick.status_profile ? `/pro/${userannonceventePublick.slug}/following/`:`/user/${userannonceventePublick.slug}/following/`} className="text-white"><b>{this.data_countfollowingFormatter(userannonceventePublick.countfollowingusers || "")} {userannonceventePublick.countfollowingusers > 1 ? "Abonnements" : "Abonnement"}</b></Link>
                                    <br/>
                                    <Link  className="text-white" to={userannonceventePublick.status_profile ?

                                        `/pro/${userannonceventePublick.slug}/`
                                        :
                                        `/user/${userannonceventePublick.slug}/`}
                                    >
                                        <i className="fa fa-chevron-circle-left" /> <b>Retour au profile de {userannonceventePublick.first_name}</b>

                                    </Link>
                                    {userannonceventePublick.annonceventes_count > 0 &&(
                                        <h5><b>{userannonceventePublick.annonceventes_count}</b> {userannonceventePublick.annonceventes_count > 1 ? "annonces" : "annonce"} posté par {userannonceventePublick.first_name} sur les ventes</h5>
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


                                        {userannonceventePublick.status_profile === 0 ?
                                            <></>
                                            :
                                            <>
                                                <div className="submit text-center">
                                                    <Navlinknewannoncevente {...this.props} />
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
                                                                                    de {userannonceventePublick.first_name}</b>
                                                                            </a>
                                                                        </div>

                                                                        <NavLinkPublicUser {...this.props} {...userannonceventePublick}/>

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
                                                                        <b>Contacter {userannonceventePublick.first_name}</b>
                                                                    </h4>
                                                                </div>

                                                                <FormContactProfileAccountUser {...this.props} {...userannonceventePublick}/>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        }


                                    </div>

                                    {userannonceventePublick.status_profile === 0 ?

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

                                            {mapAnnonceventes}

                                            {visiable < annonceventes.length && (
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
                                                            <b>Contacter {userannonceventePublick.first_name}</b></h4>
                                                    </div>

                                                    <FormContactProfileAccountUser {...this.props} {...userannonceventePublick}/>

                                                </div>
                                            </div>

                                            <div className="card card-raised card-form-horizontal">
                                                <div className="card-body">
                                                    <div className="card-header text-center">
                                                        <h4 className="card-title"><b>Restez à l’écoute !</b></h4>
                                                        <p className="card-title">
                                                            Abonnez-vous à la newsletter
                                                            de <b>{userannonceventePublick.first_name}</b> afin d'être
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
PublicUserAnnonceVentes.propTypes = {
    loadannoncebyuserpublic: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    annonceventes: store.annonceventes.annonceventes,
    userannonceventePublick: store.profile.profiluser

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
)(PublicUserAnnonceVentes);
