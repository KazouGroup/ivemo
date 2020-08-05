import React, {PureComponent} from "react";
import ButonFollowerTableUser from "../../../../inc/vendor/follow/ButonFollowerTableUser";
import ButonFollowingTableUser from "../../../../inc/vendor/follow/ButonFollowingTableUser";
import {Link} from "react-router-dom";
const abbrev = ['', 'k', 'M', 'B', 'T'];

class UserFollowingsList extends PureComponent {


    data_countfollowFormatter(countfollowinguser_followerusers, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(countfollowinguser_followerusers)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
        const suffix = abbrev[order];
        return (countfollowinguser_followerusers / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }

    data_countfollowingFormatter(countfollowinguser_followingusers, precision) {
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(countfollowinguser_followingusers)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length - 1));
        const suffix = abbrev[order];
        return (countfollowinguser_followingusers / Math.pow(10, order * 3)).toFixed(precision) + suffix;
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
                                     src={this.props.member.avatar}/>
                            </a>
                            <div className="media-body">
                                <h6 className="media-heading">{this.props.member.first_name}</h6>
                                <div>
                                 <span className="short-text">
                                     <Link to={this.props.member.status_profile ? `/pro/${this.props.member.slug}/followers/` : `/user/${this.props.member.slug}/followers/`}>
                                         <b>{this.data_countfollowFormatter(this.props.countfollowinguser_followerusers || "")} {this.props.countfollowinguser_followerusers > 1 ? "Abonnés" : "Abonné"}</b>
                                     </Link> | <Link to={this.props.member.status_profile ? `/pro/${this.props.member.slug}/following/` : `/user/${this.props.member.slug}/following/`}>
                                         <b>{this.data_countfollowingFormatter(this.props.countfollowinguser_followingusers || "")} {this.props.countfollowinguser_followingusers > 1 ? "Abonnements" : "Abonnement"}</b>
                                     </Link>

                                     {/*Mettre le texte ici*/}
                                 </span>
                                </div>

                                <div className="text-right">
                                    <ButonFollowingTableUser {...this.props}
                                                             unfolloweringForTableItem={this.props.unfolloweringForTableItem}
                                                             followeringForTableItem={this.props.followeringForTableItem}
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

export default UserFollowingsList;
