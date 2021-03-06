import React, {PureComponent} from "react";
import ButonFollowerTableUser from "../../../../inc/vendor/follow/ButonFollowerTableUser";
import {Link, NavLink} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import LazyLoad from 'react-lazyload';
const abbrev = ['', 'k', 'M', 'B', 'T'];

class UserFollowList extends PureComponent {


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

        return (
            <>

                <div className="card">
                    <div className="card-body">
                        <div className="media">
                            {this.props.user.avatar ?
                                <NavLink to={`/pro/${this.props.user.slug}/`}>
                                    <LazyLoad>
                                        <img src={this.props.user.avatar}
                                             style={{height: "40px", width: "80px"}}
                                             alt={this.props.user.first_name}
                                             className="avatar"/>
                                    </LazyLoad>

                                </NavLink>
                                : <img style={{ height: "40px", width: "80px" }} alt={this.props.user.first_name}
                                       src={`/assets/vendor/assets/img/blurredimage1.jpg`}/>}
                            <div className="media-body">
                                <h6 className="media-heading">{this.props.user.first_name}</h6>
                                <div>
                                    <Link
                                            to={this.props.user.status_profile ? `/pro/${this.props.user.slug}/followers/` : `/user/${this.props.user.slug}/followers/`}>
                                            <b>{this.data_countfollowFormatter(this.props.countfollowerusers || "")} {this.props.countfollowerusers > 1 ? "Abonn??s" : "Abonn??"}</b>
                                        </Link> | <Link
                                        to={this.props.user.status_profile ? `/pro/${this.props.user.slug}/following/` : `/user/${this.props.user.slug}/following/`}>
                                        <b>{this.data_countfollowingFormatter(this.props.countfollowingusers || "")} {this.props.countfollowingusers > 1 ? "Abonnements" : "Abonnement"}</b>
                                    </Link>

                                    <div className="text-right">
                                        <ButonFollowerTableUser {...this.props}
                                                                unfollowerForTableItem={this.props.unfollowerForTableItem}
                                                                followerForTableItem={this.props.followerForTableItem}
                                                                nameunfollower={`Suivre`}
                                                                nameununfollower={`Abonn??`}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>

        )
    }
}

export default UserFollowList;
