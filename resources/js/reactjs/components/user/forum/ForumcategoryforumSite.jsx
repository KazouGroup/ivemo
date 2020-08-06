import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import {Button, Form, FormText, Input, UncontrolledTooltip} from "reactstrap";
import NavUserSite from "../../inc/user/NavUserSite";
import LinkValicationEmail from "../../inc/user/LinkValicationEmail";
import Swal from "sweetalert2";
import HelmetSite from "../../inc/user/HelmetSite";
import ForumList from "./inc/ForumList";
import ForumListSkeleton from "../../inc/user/forum/ForumListSkeleton";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";
import Navforums from "./inc/Navforums";
import Navlinknewforum from "./treatement/Navlinknewforum";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
    deleteItem,
    favoriteItem,
    likeItem,
    loadforumsbycategory,
    loadslugcategoryforum,
    unfavoriteItem,
    unlikeItem
} from "../../../redux/actions/forum/forumActions";


class ForumcategoryforumSite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visiable: 30,
        };

        this.loadmoresItem = this.loadmoresItem.bind(this);

    }

    loadmoresItem() {
        this.setState((old) => {
            return { visiable: old.visiable + 20 }
        })
    }

    loadItems() {
        this.props.loadforumsbycategory(this.props);
        this.props.loadslugcategoryforum(this.props);
    }

   // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();
    }
    render() {
        const {forums,categoryforum} = this.props;
        const {visiable} = this.state;
        const mapForums = forums.length >= 0 ? (
            forums.slice(0, visiable).map(item => {
                return (
                    <ForumList key={item.id} {...item}  unlikeItem={this.props.unlikeItem} likeItem={this.props.likeItem}
                               unfavoriteItem={this.props.unfavoriteItem} favoriteItem={this.props.favoriteItem} deleteItem={this.props.deleteItem}/>
                )
            })
        ) : (
            <ForumListSkeleton />
        );

        return (
            <>
                <HelmetSite title={`${categoryforum.name || $name_site} - ${$name_site}`}/>

                <div className="about-us sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">
                        <div className="main main-raised">
                            <div className="container">
                                <br />
                                <div className="row">

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

                                        <div className="text-center">
                                            {visiable < forums.length && (
                                                <button type="button" onClick={this.loadmoresItem} className="btn btn-primary btn-block">
                                                    <b>Voir plus </b>
                                                </button>
                                            )}
                                        </div>


                                    </div>

                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        <Navlinknewforum/>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">

                                                        <Navforums/>


                                                    </div>
                                                </div>
                                            </div>
                                        </div>

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

ForumcategoryforumSite.propTypes = {
    loadforumsbycategory: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    forums: state.forums.forums,
    categoryforum: state.forums.categoryforum,
});

export default connect(mapStateToProps, {
    loadforumsbycategory,
    loadslugcategoryforum,
    favoriteItem,unfavoriteItem,
    likeItem,unlikeItem,
    deleteItem
})(ForumcategoryforumSite);
