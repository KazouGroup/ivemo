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
    loadforums,
    favoriteItem,unfavoriteItem,
    likeItem,unlikeItem,
    deleteItem
} from "../../../redux/actions/forum/forumActions";
import InfiniteScroll from 'react-infinite-scroller';
import EmptyItems from "../../inc/user/EmptyItems";


class ForumIndexSite extends Component {
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
        this.props.loadforums();
    }

   // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();
    }
    render() {
        const {forums} = this.props;
        const {visiable} = this.state;
        const mapForums = forums.length >= 0 ? (
            forums.slice(0, visiable).map(item => {
                return (
                    <>
                    <Link className="btn btn-neutral btn-sm ivemoEmptyItemsCta mb-3" to="/"><i
                        className="now-ui-icons arrows-1_minimal-left"></i> <b>Retour à l'Accueil</b></Link>
                    <ForumList key={item.id} {...item}  unlikeItem={this.props.unlikeItem} likeItem={this.props.likeItem}
                               unfavoriteItem={this.props.unfavoriteItem} favoriteItem={this.props.favoriteItem} deleteItem={this.props.deleteItem}/>
                               </>
                )
            })
        ) : (
            <ForumListSkeleton />
        );

        return (
            <>
                <HelmetSite title={`Forums - ${$name_site}`}/>

                <div className="landing-page sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent" color-on-scroll="400">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">
                        <div className="page-header page-header-mini">
                            <div className="page-header-image" data-parallax="true" style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/project16.jpg' + ")" }}>
                            </div>
                            <div className="content-center">
                                <div className="row">
                                    <div className="col-md-8 ml-auto mr-auto">
                                        {/*<h1 className="title">Forums </h1>*/}
                                        <h3 className="title">Trouvez une réponse à toutes vos questions sur notre Forum. Sentez vous a l'aise nous sommes en famille</h3>
                                    </div>
                                </div>

                                {/*<Navlinknewforum/>*/}

                            </div>
                        </div>
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
                                        
                                        {!$guest &&(
                                            <>
                                                {!$userIvemo.email_verified_at &&(
                                                    <LinkValicationEmail/>
                                                )}
                                            </>
                                        )}

                                        {mapForums.length !== 0 ? <>{mapForums}</> : <EmptyItems syntaxe="de" title="Forums" />}

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

                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                            <Navforums/>
                                                        </div>

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
ForumIndexSite.propTypes = {
    loadforums: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    forums: state.forums.forums,
});

export default connect(mapStateToProps, {
    loadforums,
    favoriteItem,unfavoriteItem,
    likeItem,unlikeItem,
    deleteItem
})(ForumIndexSite);
