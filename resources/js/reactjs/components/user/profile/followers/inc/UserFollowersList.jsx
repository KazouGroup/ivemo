import React, {PureComponent} from "react";
import ButonFollowerTableUser from "../../../../inc/vendor/follow/ButonFollowerTableUser";
import {Link} from "react-router-dom";
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
                            <a className="pull-left"
                               href="https://ivemo.test/pro/grayson-reinger">
                                <img className="avatar"
                                     style={{height: "40px", width: "80px"}}
                                     alt="Grayson Reinger"
                                     src={this.props.user.avatar}/>
                            </a>
                            <div className="media-body">
                                <h6 className="media-heading">{this.props.user.first_name}</h6>
                                <div>
                                    <Link
                                        to={this.props.user.status_profile ? `/pro/${this.props.user.slug}/followers/` : `/user/${this.props.user.slug}/followers/`}>
                                        <b>{this.data_countfollowFormatter(this.props.countfollowerusers || "")} {this.props.countfollowerusers > 1 ? "Abonnés" : "Abonné"}</b>
                                    </Link> | <Link
                                    to={this.props.user.status_profile ? `/pro/${this.props.user.slug}/following/` : `/user/${this.props.user.slug}/following/`}>
                                    <b>{this.data_countfollowingFormatter(this.props.countfollowingusers || "")} {this.props.countfollowingusers > 1 ? "Abonnements" : "Abonnement"}</b>
                                </Link>

                                </div>

                                <div className="text-right">
                                    <ButonFollowerTableUser {...this.props}
                                                            unfollowerForTableItem={this.props.unfollowerForTableItem}
                                                            followerForTableItem={this.props.followerForTableItem}
                                                            nameunfollower={`Suivre`}
                                                            nameununfollower={`Abonné`}/>
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
