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


class ForumcategoryforumSite extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryforum:[],
            forums:{user:[],categoryforum:[]}
        };

        this.likeItem = this.likeItem.bind(this);
        this.unlikeItem = this.unlikeItem.bind(this);
        this.favoriteItem = this.favoriteItem.bind(this);
        this.unfavoriteItem = this.unfavoriteItem.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    likeItem(item) {
        //console.log(item)
        const url = route('forums_likes.active', [item.id]);
        dyaxios.get(url).then(() => {

            this.loadItems();

        }).catch(() => {
            //Failled message
            $.notify("Ooop! Something wrong. Try later", {
                type: 'danger',
                animate: {
                    enter: 'animate__animated animate__bounceInDown',
                    exit: 'animate__animated animate__bounceOutUp'
                }
            });
        })
    }

    unlikeItem(item) {
        //console.log(item)
        const url = route('forums_likes.unactive', [item.id]);
        dyaxios.get(url).then(() => {

            this.loadItems();

        }).catch(() => {
            //Failled message
            $.notify("Ooop! Something wrong. Try later", {
                type: 'danger',
                animate: {
                    enter: 'animate__animated animate__bounceInDown',
                    exit: 'animate__animated animate__bounceOutUp'
                }
            });
        })
    }

    favoriteItem(item) {
        //console.log(item)
        const url = route('forums_favorites.active', [item.id]);
        dyaxios.get(url).then(() => {

            this.loadItems();

        }).catch(() => {
            //Failled message
            $.notify("Ooop! Something wrong. Try later", {
                type: 'danger',
                animate: {
                    enter: 'animate__animated animate__bounceInDown',
                    exit: 'animate__animated animate__bounceOutUp'
                }
            });
        })
    }

    unfavoriteItem(item) {
        //console.log(item)
        const url = route('forums_favorites.unactive', [item.id]);
        dyaxios.get(url).then(() => {

            this.loadItems();

        }).catch(() => {
            //Failled message
            $.notify("Ooop! Something wrong. Try later", {
                type: 'danger',
                animate: {
                    enter: 'animate__animated animate__bounceInDown',
                    exit: 'animate__animated animate__bounceOutUp'
                }
            });
        })
    }


    deleteItem(item) {
        Swal.fire({
            title: 'Confirmer la supression?',
            text: "êtes-vous sûr de vouloir executer cette action",
            type: 'warning',
            buttonsStyling: false,
            confirmButtonClass: "btn btn-success",
            cancelButtonClass: 'btn btn-danger',
            confirmButtonText: 'Oui, confirmer',
            cancelButtonText: 'Non, annuller',
            showCancelButton: true,
            reverseButtons: true,
        }).then((result) => {
            if (result.value) {


                let isNotId = data => data.id !== item.id;
                let updatedItems = this.state.forums.filter(isNotId);
                this.setState({forums: updatedItems});

                const url = route('forumsdelete_site',item.id);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update',
                            message: 'Post suprimée avec success'
                        },
                        {
                            allow_dismiss: false,
                            type: 'primary',
                            placement: {
                                from: 'bottom',
                                align: 'right'
                            },
                            animate: {
                                enter: 'animate__animated animate__fadeInRight',
                                exit: 'animate__animated animate__fadeOutRight'
                            },
                        });
                    /** End alert ***/

                }).catch(() => {
                    //Failled message
                    $.notify("Ooop! Une erreur est survenue", {
                        allow_dismiss: false,
                        type: 'danger',
                        animate: {
                            enter: 'animate__animated animate__bounceInDown',
                            exit: 'animate__animated animate__bounceOutUp'
                        }
                    });
                })
            }
        });
    }


    loadItems() {
        let itemCategoryforum = this.props.match.params.categoryforum;
        let url = route('api.forumscategory_site',[itemCategoryforum]);
        dyaxios.get(url).then(response => this.setState({ forums: response.data, }));
        dyaxios.get(route('api.forumscategorycount_site',[itemCategoryforum])).then(response => this.setState({ categoryforum: response.data, }));
    }

   // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();
    }
    render() {
        const {forums,categoryforum} = this.state;
        const mapForums = forums.length >= 0 ? (
            forums.map(item => {
                return (
                    <ForumList key={item.id} {...item}  unlikeItem={this.unlikeItem} likeItem={this.likeItem}
                               unfavoriteItem={this.unfavoriteItem} favoriteItem={this.favoriteItem} deleteItem={this.deleteItem}/>
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
                                        <div className="submit text-left">
                                            <input className="form-control" name="search" placeholder="Recherche + de 4000 questions posé chaque mois"/>
                                        </div>
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

export default ForumcategoryforumSite;
