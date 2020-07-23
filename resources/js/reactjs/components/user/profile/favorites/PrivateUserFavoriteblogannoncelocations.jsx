import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import LinkValicationEmail from "../../../inc/user/LinkValicationEmail";
import HelmetSite from "../../../inc/user/HelmetSite";
import NavlinkfavoritesconfigurationUser from "./NavlinkfavoritesconfigurationUser";
import BlogannonceListSkeleton from "../../../inc/user/blog/BlogannonceListSkeleton";
import PrivateFavoriteBlogannoncelocationList
    from "../../blog/blogannoncelocation/inc/PrivateFavoriteBlogannoncelocationList";


class PrivateUserFavoriteblogannoncelocations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userfavorites:{profile:[]},
            favoritesdata:{blogannoncelocations:{categoryannoncelocation:[],user:[]}},
            visiable: 20,

        };

        this.unfavoriteItem = this.unfavoriteItem.bind(this);
        this.loadmoresItem = this.loadmoresItem.bind(this);
    }

    loadmoresItem(){
        this.setState((old) =>{
            return {visiable: old.visiable + 20}
        })
    }

    unfavoriteItem(id){
        Swal.fire({
            title: 'Retirer cette annonce?',
            text: "êtes vous sure de vouloir retirer cette article de vos favoris?",
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
                let url = route('favoriteblogannoncelocations_unfavorite.unfavorite',id);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            message: "Article retirée de vos favoris",
                        },
                        {
                            allow_dismiss: false,
                            type: 'info',
                            placement: {
                                from: 'bottom',
                                align: 'center'
                            },
                            animate: {
                                enter: "animate__animated animate__fadeInUp",
                                exit: "animate__animated animate__fadeOutDown"
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

    loadItems(){
        let itemuser = this.props.match.params.user;
        dyaxios.get(route('api.userdatafavoriteblogannoncelocation',[itemuser])).then(response => this.setState({ favoritesdata: response.data, }));
        dyaxios.get(route('api.userfavorites',[itemuser])).then(response => this.setState({userfavorites: response.data,}));
    }

   // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();
    }

    render() {
        const {favoritesdata,visiable,userfavorites} = this.state;
        const mapEmployments = favoritesdata.length >= 0 ? (
            favoritesdata.slice(0,visiable).map(item => {
                return(
                    <PrivateFavoriteBlogannoncelocationList key={item.id} {...item} unfavoriteItem={this.unfavoriteItem}/>
                )
            })
        ):(
            <BlogannonceListSkeleton/>
        );
        return (
            <>
                <HelmetSite title={`Mes favoris Conseils tout savoir sur les locations ${$userIvemo.first_name || 'Profile'} - ${$name_site}`}/>

                <div className="landing-page sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>


                    <div className="wrapper">

                        <div className="main main-raised">

                            <div className="container">
                                <br />

                                <div className="row">

                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        <NavlinkfavoritesconfigurationUser {...userfavorites} />

                                    </div>

                                    <div className="col-lg-8 col-md-12 mx-auto">
                                        {!$guest &&(
                                            <>
                                                {!$userIvemo.email_verified_at &&(
                                                    <LinkValicationEmail/>
                                                )}
                                            </>
                                        )}

                                        {mapEmployments}

                                        {visiable < favoritesdata.length && (
                                            <div className="row">
                                                <div className="col-md-4 ml-auto mr-auto text-center">
                                                    <button type="button" onClick={this.loadmoresItem} className="btn btn-primary btn-block">
                                                        <b>Voir plus </b>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

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

export default PrivateUserFavoriteblogannoncelocations;
