import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NavUserSite from "../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import NavlinkconfigurationUser from "../../../configurations/inc/NavlinkconfigurationUser";
import BlogannoncelocationList from "../../../blog/blogannoncelocation/BlogannoncelocationList";
import BlogannoncereservationList from "../../../blog/blogannoncereservation/BlogannoncereservationList";


class PrivateUserBlogannonceReservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userblogannoncereservationsPrivate:{blogannoncereservations:[]},
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.activeItem = this.activeItem.bind(this);
        this.unactiveItem = this.unactiveItem.bind(this);
    }
    activeItem(id){
        Swal.fire({
            title: 'Afficher cette article?',
            text: "êtes vous sure de vouloir confirmer cette action?",
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

                //Envoyer la requet au server
                let url = route('blogannoncecategoryreservationactivated_site',id);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            message: "Cette articles est desormais visible aux utilisateurs",
                        },
                        {
                            allow_dismiss: false,
                            type: 'info',
                            placement: {
                                from: 'bottom',
                                align: 'center'
                            },
                            animate: {
                                enter: "animated fadeInUp",
                                exit: "animated fadeOutDown"
                            },
                        });
                    /** End alert ***/
                    this.loadItems();
                }).catch(() => {
                    //Failled message
                    $.notify("Ooop! Something wrong. Try later", {
                        type: 'danger',
                        animate: {
                            enter: 'animated bounceInDown',
                            exit: 'animated bounceOutUp'
                        }
                    });
                })
            }
        })

    }

    unactiveItem(id){
        Swal.fire({
            title: 'Masquer cette article?',
            text: "êtes vous sure de vouloir confirmer cette action?",
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

                //Envoyer la requet au server
                let url = route('blogannoncecategoryreservationunactivated_site',id);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            message: "Cette article a été masquée aux utilisateurs",
                        },
                        {
                            allow_dismiss: false,
                            type: 'info',
                            placement: {
                                from: 'bottom',
                                align: 'center'
                            },
                            animate: {
                                enter: "animated fadeInUp",
                                exit: "animated fadeOutDown"
                            },
                        });
                    /** End alert ***/
                    this.loadItems();
                }).catch(() => {
                    //Failled message
                    $.notify("Ooop! Something wrong. Try later", {
                        type: 'danger',
                        animate: {
                            enter: 'animated bounceInDown',
                            exit: 'animated bounceOutUp'
                        }
                    });
                })
            }
        })

    }

    deleteItem(id) {
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

                const url = route('blogannoncecategoryreservationdelete_site',[id]);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update',
                            message: 'Articles suprimée avec success'
                        },
                        {
                            allow_dismiss: false,
                            type: 'primary',
                            placement: {
                                from: 'bottom',
                                align: 'right'
                            },
                            animate: {
                                enter: 'animated fadeInRight',
                                exit: 'animated fadeOutRight'
                            },
                        });
                    /** End alert ***/
                    this.loadItems();
                }).catch(() => {
                    //Failled message
                    $.notify("Ooop! Une erreur est survenue", {
                        allow_dismiss: false,
                        type: 'danger',
                        animate: {
                            enter: 'animated bounceInDown',
                            exit: 'animated bounceOutUp'
                        }
                    });
                })
            }
        });
    }

    loadItems(){
        let itemuser = this.props.match.params.user;
        dyaxios.get(route('api.blogannoncesreservationsbyuser_site',[itemuser])).then(response => this.setState({userblogannoncereservationsPrivate: response.data,}));
    }

    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    render() {
        const {userblogannoncereservationsPrivate} = this.state;
        const mapBlogannoncereservations = userblogannoncereservationsPrivate.blogannoncereservations.length ? (
            userblogannoncereservationsPrivate.blogannoncereservations.map(item => {
                return(
                    <BlogannoncereservationList key={item.id} {...item} deleteItem={this.deleteItem} unactiveItem={this.unactiveItem} activeItem={this.activeItem}/>
                )
            })
        ):(
            <></>
        );
        return (
            <>
                <Helmet>
                    <title>Articles sur la locations {`${$userIvemo.first_name || 'Profile'}`} - Ivemo</title>
                </Helmet>

                <div className="landing-page sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>


                    <div className="wrapper">

                        <div className="main main-raised">

                            <div className="container">
                                <br />

                                <div className="row">

                                    <NavlinkconfigurationUser {...this.props} {...userblogannoncereservationsPrivate}/>

                                    <div className="col-lg-8 col-md-12 mx-auto">

                                        {mapBlogannoncereservations}

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

export default PrivateUserBlogannonceReservation;
