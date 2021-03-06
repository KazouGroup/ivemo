import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import LinkValicationEmail from "../../../inc/user/LinkValicationEmail";
import EmploymentListSkeleton from "../../../inc/user/employment/EmploymentListSkeleton";
import HelmetSite from "../../../inc/user/HelmetSite";
import PrivateUserFavoritEmployementList from "../../employment/inc/PrivateUserFavoritEmployementList";
import NavlinkfavoritesconfigurationUser from "./NavlinkfavoritesconfigurationUser";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    loadAllfovoriteuser,unfavoritemploymentItem,
} from "../../../../redux/actions/forumsActions";


class PrivateUserFavoritEmployments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visiable: 20,

        };

        this.loadmoresItem = this.loadmoresItem.bind(this);
    }

    loadmoresItem(){
        this.setState((old) =>{
            return {visiable: old.visiable + 20}
        })
    }

   // Lifecycle Component Method
    componentDidMount() {
        this.props.loadAllfovoriteuser();
    }

    render() {
        const {favoritesdata} = this.props;
        const {visiable} = this.state;
        const mapEmployments = favoritesdata.favoritesemployments.length >= 0 ? (
            favoritesdata.favoritesemployments.slice(0,visiable).map(item => {
                return(
                    <PrivateUserFavoritEmployementList key={item.id} {...item} unfavoritemploymentItem={this.props.unfavoritemploymentItem}/>
                )
            })
        ):(
            <EmploymentListSkeleton/>
        );
        return (
            <>
                <HelmetSite title={`Favoris ${$userIvemo.first_name || 'Profile'} - ${$name_site}`}/>

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

                                        <NavlinkfavoritesconfigurationUser {...favoritesdata} />

                                    </div>

                                    <div className="col-lg-8 col-md-12 mx-auto">
                                        {!$guest &&(
                                            <>
                                                {!$userIvemo.email_verified_at &&(
                                                    <LinkValicationEmail/>
                                                )}
                                            </>
                                        )}

                                        {mapEmployments}

                                        {visiable < favoritesdata.favoritesemployments.length && (
                                            <div className="row">
                                                <div className="col-md-4 ml-auto mr-auto text-center">
                                                    <button type="button" onClick={this.loadmoresItem} className="btn btn-primary btn-block">
                                                        <b>Voir plus </b>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

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

PrivateUserFavoritEmployments.propTypes = {
    loadAllfovoriteuser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    favoritesdata: state.favorites.favorites,

});

export default connect(mapStateToProps, {
    loadAllfovoriteuser,unfavoritemploymentItem,
})(PrivateUserFavoritEmployments);
