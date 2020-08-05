import React, {Component, Fragment} from "react";
import {Link, NavLink} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {Button} from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    loadProfileusersforpublic,
    loadFollowersusers,
    unfollowerItem, followerItem,
    followerForTableItem, unfollowerForTableItem,
} from "../../../../redux/actions/profileActions";
import ButonFollowerUser from "../../../inc/vendor/follow/ButonFollowerUser";
import HelmetSite from "../../../inc/user/HelmetSite";
import UserFollowSkeleton from "../../../inc/user/UserFollowSkeleton";
import UserFollowersList from "./inc/UserFollowersList";
import Skeleton from "react-loading-skeleton";
import NavprofileFollowesusers from "./inc/NavprofileFollowesusers";

const abbrev = ['', 'k', 'M', 'B', 'T'];

class PublicUserFollowers extends Component {
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
        this.props.loadProfileusersforpublic(this.props);
        this.props.loadFollowersusers(this.props);
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
        const {users,useremploymentPublick} = this.props;
        const mapUsers = users.length >= 0 ? (
            users.map(item => {
                return(

                    <UserFollowersList key={item.id} {...item}
                                    unfollowerForTableItem={this.props.unfollowerForTableItem}
                                    followerForTableItem={this.props.followerForTableItem}/>
                )
            })
        ):(
            <UserFollowSkeleton />
        );
        return (
            <>
                <HelmetSite
                    title={`Personnes qui suivent ${useremploymentPublick.first_name || 'Profile'} - ${$name_site}`}/>

                <div className="about-us sidebar-collapse">


                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite/>
                    </nav>

                    <div className="wrapper">

                        <div className="main main-raised">
                            <div className="container">
                                <div className="row">
                                    <NavprofileFollowesusers {...this.props} {...useremploymentPublick} />
                                </div>
                            </div>

                            <div className="container">
                                <br/>
                                <div className="row">


                                    <div className="col-lg-8 col-md-12 mx-auto">


                                        {mapUsers}


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

PublicUserFollowers.propTypes = {
    loadProfileusersforpublic: PropTypes.func.isRequired,
    loadFollowersusers: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    useremploymentPublick: store.profile.profiluser,
    users: store.profile.userfollowers

});

export default connect(mapStoreToProps,
    {
        loadProfileusersforpublic,
        loadFollowersusers,
        unfollowerItem, followerItem,
        followerForTableItem,unfollowerForTableItem,
    }
)(PublicUserFollowers);
