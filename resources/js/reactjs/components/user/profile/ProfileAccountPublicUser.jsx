import React, { PureComponent, Fragment } from "react";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button, Navbar, UncontrolledTooltip } from "reactstrap";
import NavUserSite from "../../inc/user/NavUserSite";
import FooterUserSite from "../../inc/user/FooterUserSite";
import FormContactProfileAccountUser from "./form/FormContactProfileAccountUser";
import ProfileAccountTeamUser from "./file_public/ProfileAccountTeamUser";
import NavLinkPublicAnnonceUser from "./annonces/NavLinkPublicAnnonceUser";
import NavNavigatePivateUser from "./NavNavigatePivateUser";
import NavLinkPublicBlogannoncesUser from "./blogs/public/NavLinkPublicBlogannoncesUser";
import FormNewletterSubcribeProfileAccountUser from "./form/FormNewletterSubcribeProfileAccountUser";
import Skeleton from "react-loading-skeleton";
import ReadMoreAndLess from "react-read-more-less";
import ProfileAccountAvisUser from "./file_public/ProfileAccountAvisUser";
import HelmetSite from "../../inc/user/HelmetSite";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { loadProfileusersforpublic,unfollowerItem,followerItem} from "../../../redux/actions/profileActions";
import ButonFollowerUser from "../../inc/vendor/follow/ButonFollowerUser";
import NavLinkPublicEmploymentUser from "../../inc/vendor/NavLinkPublicUser";
const abbrev = ['', 'k', 'M', 'B', 'T'];


class ProfileAccountPublicUser extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            //
        };
    }

    loadItems(){
        this.props.loadProfileusersforpublic(this.props);
    }

    // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();
    }

    getDescription(userPublick) {
        return {__html: userPublick.profile.description};
    }


    data_countfollowFormatter(countfollowerusers, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(countfollowerusers)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (countfollowerusers / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {
        const {userPublick} = this.props;
        return (
            <>
                <HelmetSite title={`${userPublick.first_name || 'Profile'}` - $name_site}/>

                <div className="about-us sidebar-collapse">

                    <Navbar className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent"
                            color-on-scroll="500">
                        <NavUserSite/>
                    </Navbar>

                    <div className="wrapper">

                        <div className="page-header page-header-mini">
                            <div className="page-header-image" data-parallax="true" style={{ backgroundImage: "url(" + userPublick.avatarcover + ")" }}/>

                            <div className="container">
                                <div className="mt-lg-5 text-left">
                                    <img src={userPublick.avatar} style={{height: "50px", width: "90px"}}
                                         alt={userPublick.first_name}/>

                                    <div className="media-footer">
                                        <h3><b>{userPublick.first_name || <Skeleton width={100}/>}</b></h3>

                                        {userPublick.profile.facebook_link && (
                                            <a href={`${userPublick.profile.facebook_link}`} target="_blank"
                                               className="btn btn-icon btn-sm btn-facebook">
                                                <i className="fab fa-facebook-square"/>
                                            </a>
                                        )}

                                        {userPublick.profile.twitter_link && (
                                            <a href={`${userPublick.profile.twitter_link}`} target="_blank"
                                               className="btn btn-icon btn-sm btn-twitter">
                                                <i className="fab fa-twitter"/>
                                            </a>
                                        )}

                                        {userPublick.profile.instagram_link && (
                                            <a href={`${userPublick.profile.instagram_link}`} target="_blank"
                                               className="btn btn-icon btn-sm btn-instagram">
                                                <i className="fab fa-instagram"/>
                                            </a>
                                        )}

                                        {userPublick.profile.youtube_link && (
                                            <a href={`${userPublick.profile.youtube_link}`} target="_blank"
                                               className="btn btn-icon btn-sm btn-youtube">
                                                <i className="fab fa-youtube"/>
                                            </a>
                                        )}

                                        {userPublick.profile.linkedin_link && (
                                            <a href={`${userPublick.profile.linkedin_link}`} target="_blank"
                                               className="btn btn-icon btn-sm btn-linkedin">
                                                <i className="fab fa-linkedin"/>
                                            </a>
                                        )}

                                        {userPublick.profile.site_internet && (
                                            <>
                                                <UncontrolledTooltip placement="bottom" target="userSiteInternet">
                                                    Visitez mon Site Internet
                                                </UncontrolledTooltip>
                                                <a href={`${userPublick.profile.site_internet}`} id={'userSiteInternet'}
                                                   className="btn btn-sm btn-secondary" target="_blank">
                                                    <i className="now-ui-icons business_globe"/>
                                                </a>
                                            </>
                                        )}

                                        {userPublick.phone && (
                                            <>
                                                <UncontrolledTooltip placement="bottom" target="userPhone">
                                                    {userPublick.phone}
                                                </UncontrolledTooltip>
                                                <Button className="btn btn-sm btn-primary" id={'userPhone'}>
                                                    <i className="now-ui-icons tech_mobile"/>
                                                </Button>
                                            </>
                                        )}
                                        <UncontrolledTooltip placement="bottom" target="userContact">
                                            Me Contacter
                                        </UncontrolledTooltip>
                                        <a href="#contact" className="btn btn-sm btn-success" id={'userContact'}>
                                            <i className="now-ui-icons ui-2_chat-round"/>
                                        </a>

                                        {!$guest && (
                                            <Fragment>
                                                {$userIvemo.id === userPublick.id && (
                                                    <>
                                                        <UncontrolledTooltip placement="bottom" target="userProfile">
                                                            Mon Profil
                                                        </UncontrolledTooltip>
                                                        <Link to={`/profile/account/`} className="btn btn-sm btn-info" id={'userProfile'}>
                                                            <i className="now-ui-icons users_single-02"/>
                                                        </Link>
                                                    </>
                                                )}
                                            </Fragment>
                                        )}

                                        <div className="pull-right">

                                            {userPublick.first_name && (

                                                <ButonFollowerUser {...userPublick}
                                                                   unfollowerItem={this.props.unfollowerItem}
                                                                   followerItem={this.props.followerItem}
                                                                   classNameDanger="btn btn-danger"
                                                                   classNameInfo="btn btn-info"
                                                                   nameunfollower={`${this.data_countfollowFormatter(userPublick.countfollowerusers || "")} Suivre`}
                                                                   nameununfollower={`${this.data_countfollowFormatter(userPublick.countfollowerusers || "")} Abonné`}/>
                                            )}


                                        </div>
                                    </div>
                                </div>
                            </div>

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
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true"
                                                             className="card-collapse">
                                                            <div className="card card-plain">
                                                                <div className="card-header" role="tab"
                                                                     id="headingFour">
                                                                    <a data-toggle="collapse" data-parent="#accordion"
                                                                       href="#collapseFour" aria-expanded="true"
                                                                       aria-controls="collapseFour">
                                                                        <b>Menu Rapide</b>
                                                                    </a>
                                                                </div>

                                                                <div id="collapseFour" className="collapse show"
                                                                     role="tabpanel" aria-labelledby="headingFour">
                                                                    <div className="card-body">
                                                                        <table>
                                                                            <tbody>
                                                                            <tr>
                                                                                <td><Link to={`/`}>Acceuil</Link></td>
                                                                            </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {!$guest && (
                                            <Fragment>
                                                {$userIvemo.id === userPublick.id && (
                                                    <NavNavigatePivateUser/>
                                                )}
                                            </Fragment>
                                        )}

                                        {userPublick.status_profile === 1 && (
                                            <Fragment>
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

                                                                        <NavLinkPublicEmploymentUser {...this.props} {...userPublick}/>

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
                                                                        <b>Contactez {userPublick.first_name}</b></h4>
                                                                </div>
                                                                <FormContactProfileAccountUser {...this.props} {...userPublick}/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </Fragment>
                                        )}
                                    </div>

                                    <div className="col-lg-8 col-md-12 mx-auto">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <h5><b>A Propos de Moi</b></h5>
                                                        <ReadMoreAndLess
                                                            className="read-more-content"
                                                            charLimit={250}
                                                            readMoreText="(Plus)"
                                                            readLessText=""
                                                        >
                                                            {userPublick.profile.description || ""}
                                                        </ReadMoreAndLess>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {userPublick.status_profile === 1 && (
                                            <Fragment>

                                                {!userPublick.profile.status_team_user ? <></> :
                                                    <ProfileAccountTeamUser {...this.props}/>}

                                                {!userPublick.profile.status_avis ? <></> : <ProfileAccountAvisUser {...this.props} {...userPublick}/>}

                                                <div className="card" id="contact">
                                                    <div className="card-body">
                                                        <div className="card-header text-center">
                                                            <h4 className="card-title"><b>Contactez {userPublick.first_name}</b></h4>
                                                        </div>
                                                        <FormContactProfileAccountUser {...this.props} {...userPublick}/>
                                                    </div>
                                                </div>
                                                <div className="card card-raised card-form-horizontal">
                                                    <div className="card-body mb-4">
                                                        <div className="card-header text-center mb-4">
                                                            <h4 className="card-title"><b>Restez à l’écoute des dernières nouveautés !</b></h4>
                                                            <p className="card-title">
                                                                Abonnez-vous à la newsletter
                                                                de <b>{userPublick.first_name}</b> afin d'être averti
                                                                de ses activités.
                                                            </p>
                                                        </div>
                                                        <FormNewletterSubcribeProfileAccountUser {...this.props}/>
                                                    </div>
                                                </div>
                                            </Fragment>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <FooterUserSite/>
                    </div>
                </div>
            </>
        )
    }
}

ProfileAccountPublicUser.propTypes = {
    loadProfileusersforpublic: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    userPublick: store.profile.profiluser
});

export default connect(mapStoreToProps, {
    loadProfileusersforpublic,unfollowerItem,followerItem
})(ProfileAccountPublicUser);
