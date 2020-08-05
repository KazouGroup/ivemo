import React, {PureComponent} from "react";
import ButonFollowerTableUser from "../../../../inc/vendor/follow/ButonFollowerTableUser";
import {Link, NavLink} from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import ButonFollowerUser from "../../../../inc/vendor/follow/ButonFollowerUser";

const abbrev = ['', 'k', 'M', 'B', 'T'];

class NavprofileFollowesusers extends PureComponent {


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

                <div className="col-lg-10 col-md-12 mx-auto">
                    <div className="card">
                        <div className="card-body">
                            <div className="media">
                                {this.props.avatar ?
                                    <NavLink to={`/pro/${this.props.slug}/`}>
                                        <img src={this.props.avatar}
                                             style={{height: "60px", width: "110px"}}
                                             alt={this.props.first_name}
                                             className="avatar"/>
                                    </NavLink>
                                    : <Skeleton circle={false} height={60} width={110}/>}

                                <div className="media-body">
                                    {this.props.first_name ?
                                        <h6 className="media-heading">{this.props.first_name}</h6> :
                                        <Skeleton width={200}/>}
                                    <div>
                                                         <span className="short-text">
                                                             {this.props.first_name ?
                                                                 <>
                                                                     <Link
                                                                         to={this.props.status_profile ? `/pro/${this.props.slug}/followers/` : `/user/${this.props.slug}/followers/`}
                                                                         className="text-dark"><b>{this.data_countfollowFormatter(this.props.countfollowerusers || "")} {this.props.countfollowerusers > 1 ? "Abonnés" : "Abonné"}</b></Link> | <Link
                                                                     to={this.props.status_profile ? `/pro/${this.props.slug}/following/` : `/user/${this.props.slug}/following/`}
                                                                     className="text-dark"><b>{this.data_countfollowingFormatter(this.props.countfollowingusers || "")} {this.props.countfollowingusers > 1 ? "Abonnements" : "Abonnement"}</b></Link>

                                                                     {/*Mettre le texte ici*/}

                                                                     <br/>
                                                                     {this.props.status_profile === 0 ?
                                                                         <>
                                                                             <Link to={`/user/${this.props.slug}/`}>
                                                                                 <i className="fa fa-chevron-circle-left"/>
                                                                                 <b>Retour au profile
                                                                                     de {this.props.first_name}</b>
                                                                             </Link>
                                                                         </>

                                                                         :
                                                                         <>
                                                                             <Link to={`/pro/${this.props.slug}/`}>
                                                                                 <i className="fa fa-chevron-circle-left"/>
                                                                                 <b>Retour au profile
                                                                                     de {this.props.first_name}</b>
                                                                             </Link>
                                                                         </>
                                                                     }
                                                                 </>
                                                                 :
                                                                 <><Skeleton width={40}/> <Skeleton width={10}/> <Skeleton width={40}/></>
                                                             }
                                                         </span>
                                    </div>

                                    <div className="text-right">
                                        {this.props.first_name ?
                                            <ButonFollowerUser {...this.props}
                                                               unfollowerItem={this.props.unfollowerItem}
                                                               followerItem={this.props.followerItem}
                                                               nameunfollower={`Suivre`}
                                                               nameununfollower={`Abonné`}/>
                                            : <Skeleton height={20} width={50}/>}

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

export default NavprofileFollowesusers;
