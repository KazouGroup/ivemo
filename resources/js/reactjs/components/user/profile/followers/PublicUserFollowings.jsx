import React, { Component } from "react";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    loadProfileusersforpublic,
    loadFollowingsusers,
    followeringForTableItem, unfolloweringForTableItem,
    unfollowerItem, followerItem,
} from "../../../../redux/actions/profileActions";
import HelmetSite from "../../../inc/user/HelmetSite";
import UserFollowingsList from "./inc/UserFollowingsList";
import UserFollowSkeleton from "../../../inc/user/UserFollowSkeleton";
import NavprofileFollowesusers from "./inc/NavprofileFollowesusers";
const abbrev = ['', 'k', 'M', 'B', 'T'];

class PublicUserFollowings extends Component {
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
        this.props.loadProfileusersforpublic(this.props);
        this.props.loadFollowingsusers(this.props);
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


    render() {
        const {users,useremploymentPublick} = this.props;
        const mapUsers = users.length >= 0 ? (
            users.map(item => {
                return(

                    <UserFollowingsList key={item.id} {...item}
                                        unfolloweringForTableItem={this.props.unfolloweringForTableItem}
                                        followeringForTableItem={this.props.followeringForTableItem}/>
                )
            })
        ):(
            <UserFollowSkeleton />
        );
        return (
            <>
                <HelmetSite title={`Personnes suivies par ${useremploymentPublick.first_name || 'Profile'} - ${$name_site}`}/>

                <div className="about-us sidebar-collapse">


                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">


                        <div className="main main-raised">

                            <div className="container">
                                <div className="row">

                                    <NavprofileFollowesusers {...this.props} {...useremploymentPublick} />

                                </div>
                            </div>

                            <div className="container">
                                <br />
                                <div className="row">

                                    <div className="col-lg-8 col-md-12 mx-auto">


                                        {mapUsers}


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
PublicUserFollowings.propTypes = {
    loadProfileusersforpublic: PropTypes.func.isRequired,
    loadFollowingsusers: PropTypes.func.isRequired,
};

const mapStoreToProps = store => ({
    useremploymentPublick: store.profile.profiluser,
    users: store.profile.userfollowers


});

export default connect(mapStoreToProps,
    {
        loadProfileusersforpublic,
        loadFollowingsusers,
        unfollowerItem, followerItem,
        followeringForTableItem, unfolloweringForTableItem,
    }
)(PublicUserFollowings);
