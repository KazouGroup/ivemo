import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import LinkValicationEmail from "../../../inc/user/LinkValicationEmail";
import HelmetSite from "../../../inc/user/HelmetSite";
import NavlinkfavoritesconfigurationUser from "./NavlinkfavoritesconfigurationUser";
import PrivateUserForumList from "../../forum/inc/PrivateUserForumList";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {loadAllfovoriteuser, unfavoriteforumItem} from "../../../../redux/actions/forumsActions";
import ForumListSkeleton from "../../../inc/user/forum/ForumListSkeleton";


class PrivateUserFavoritForums extends Component {
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

    loadItems(){
        this.props.loadAllfovoriteuser();
    }

   // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();
    }

    render() {
        const {favoritesdata} = this.props;
        const {visiable} = this.state;
        const mapForums = favoritesdata.favoritesforums.length >= 0 ? (
            favoritesdata.favoritesforums.slice(0,visiable).map(item => {
                return(
                    <PrivateUserForumList key={item.id} {...item} unfavoriteforumItem={this.props.unfavoriteforumItem}/>
                )
            })
        ):(
            <ForumListSkeleton/>
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

                                        {mapForums}

                                        {visiable < favoritesdata.favoritesforums.length && (
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

PrivateUserFavoritForums.propTypes = {
    loadAllfovoriteuser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    favoritesdata: state.favorites.favorites,
});

export default connect(mapStateToProps, {
    loadAllfovoriteuser,unfavoriteforumItem,
})(PrivateUserFavoritForums);
