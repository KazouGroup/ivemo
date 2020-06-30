import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import LinkValicationEmail from "../../../inc/user/LinkValicationEmail";
import HelmetSite from "../../../inc/user/HelmetSite";
import NavlinkfavoritesconfigurationUser from "./NavlinkfavoritesconfigurationUser";
import PrivateUserFavoriteAnnonceventeList from "../../annonces/annoncevente/inc/PrivateUserFavoriteAnnonceventeList";
import AnnoncesListSkeleton from "../../../inc/user/annonce/AnnoncesListSkeleton";
import PrivateUserFavoriteAnnonceslocationList
    from "../../annonces/annonceloaction/inc/PrivateUserFavoriteAnnonceslocationList";


class PrivateUserFavoriteannoncelocations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userfavorites:{profile:[]},
            favoritesdata:{annoncelocation:{annoncetype: [], categoryannoncelocation: [], city: [], user: []}},
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
            text: "êtes vous sure de vouloir retirer cette annonce de vos favoris?",
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
                let url = route('favoriteannoncelocations_unfavorite.unfavorite',id);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            message: "Annonce retirée de vos favoris",
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
        dyaxios.get(route('api.userdatafavoriteannoncelocation',[itemuser])).then(response => this.setState({ favoritesdata: response.data, }));
        dyaxios.get(route('api.userfavorites',[itemuser])).then(response => this.setState({userfavorites: response.data,}));
    }

    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    render() {
        const {favoritesdata,visiable,userfavorites} = this.state;
        const mapEmployments = favoritesdata.length >= 0 ? (
            favoritesdata.slice(0,visiable).map(item => {
                return(
                    <PrivateUserFavoriteAnnonceslocationList key={item.id} {...item} unfavoriteItem={this.unfavoriteItem}/>
                )
            })
        ):(
            <AnnoncesListSkeleton/>
        );
        return (
            <>
                <HelmetSite title={`Mes favoris de tous annonces ${$userIvemo.first_name || 'Profile'} - {$name_site}`}/>

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

export default PrivateUserFavoriteannoncelocations;
