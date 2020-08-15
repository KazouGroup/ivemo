import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import {Button, Form, FormText, Input, UncontrolledTooltip} from "reactstrap";
import Swal from "sweetalert2";
import Navforumbyuser from "../../../forum/inc/Navforumbyuser";
import Navlinknewforum from "../../../forum/treatement/Navlinknewforum";
import LinkValicationEmail from "../../../../inc/user/LinkValicationEmail";
import NavUserSite from "../../../../inc/user/NavUserSite";
import HelmetSite from "../../../../inc/user/HelmetSite";
import ForumListSkeleton from "../../../../inc/user/forum/ForumListSkeleton";
import ForumList from "../../../forum/inc/ForumList";
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    loadforumsbyuserprivate,
    loadProfileusersforprivate,
    favoriteItem,unfavoriteItem,
    likeItem,unlikeItem,
    deleteItem
} from "../../../../../redux/actions/forum/forumActions";
import NavlinkconfigurationUser from "../../../configurations/inc/NavlinkconfigurationUser";


class PrivateUserForum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //
        };

    }

    loadItems() {
       this.props.loadforumsbyuserprivate(this.props);
       this.props.loadProfileusersforprivate(this.props);
    }

   // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();
    }
    render() {
        const {forums,userPrivate} = this.props;
        const mapForums = forums.length >= 0 ? (
            forums.map(item => {
                return (
                    <ForumList key={item.id} {...item}  unlikeItem={this.props.unlikeItem} likeItem={this.props.likeItem}
                               unfavoriteItem={this.props.unfavoriteItem} favoriteItem={this.props.favoriteItem}
                               deleteItem={this.props.deleteItem}/>
                )
            })
        ) : (
            <ForumListSkeleton />
        );

        return (
            <>
                <HelmetSite title={`Forum ${$userIvemo.first_name} - ${$name_site}`}/>

                <div className="about-us sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">
                        <div className="main main-raised">
                            <div className="container">
                                <br />
                                <div className="row">

                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        <Navlinknewforum/>

                                        <NavlinkconfigurationUser {...this.props} {...userPrivate} />

                                        {$userIvemo.status_profile && (
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-12">

                                                            <Navforumbyuser />

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                    </div>

                                    <div className="col-lg-8 col-md-12 mx-auto">
                                        {/*
                                            <div className="submit text-left">
                                                <input className="form-control" name="search" placeholder="Recherche + de 4000 questions posé chaque mois"/>
                                            </div>

                                        */}

                                        <br/>
                                        {!$guest &&(
                                            <>
                                                {!$userIvemo.email_verified_at &&(
                                                    <LinkValicationEmail/>
                                                )}
                                            </>
                                        )}


                                        {mapForums}


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
PrivateUserForum.propTypes = {
    loadforumsbyuserprivate: PropTypes.func.isRequired,
    loadProfileusersforprivate: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    forums: state.forums.forums,
    userPrivate: state.profile.profiluser,
});

export default connect(mapStateToProps, {
    loadforumsbyuserprivate,
    loadProfileusersforprivate,
    favoriteItem,unfavoriteItem,
    likeItem,unlikeItem,
    deleteItem
})(PrivateUserForum);
