import React, {Fragment, PureComponent} from "react";
import {Link, NavLink} from 'react-router-dom';
import {Helmet} from 'react-helmet';
import {Button} from "reactstrap";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import ButonFollowerUser from "../../../../inc/vendor/ButonFollowerUser";

class UserFollowList extends PureComponent {


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
                                     src={`https://dummyimage.com/wsvga/0077ee/009900&text=qui`}/>
                            </a>
                            <div className="media-body">
                                <h6 className="media-heading">{this.props.user.first_name}</h6>
                                <div>
                                                            <span className="short-text">
                                                                That your eye was as long as there was room for her. 'I wish the creatures argue.
                                                            </span>
                                </div>

                                <div className="text-right">
                                    <ButonFollowerUser {...this.props}
                                        unfollowerItem={this.props.unfollowerItem}
                                        followerItem={this.props.followerItem}
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
