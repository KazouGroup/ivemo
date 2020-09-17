import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import AnnonceslocationList from "./inc/AnnonceslocationList";
import Categoriesannoncereselocation from "./inc/Categoriesannoncereselocation";
import Swal from "sweetalert2";
import NavannoncecategorySkeleton from "../../../inc/user/NavannoncecategorySkeleton";
import AnnoncesListSkeleton from "../../../inc/user/annonce/AnnoncesListSkeleton";
import {Form, Input} from "reactstrap";
import LinkValicationEmail from "../../../inc/user/LinkValicationEmail";
import FormModalContactannonceUser from "../../../inc/user/annonce/FormModalContactannonceUser";
import Navlinknewannoncelocation from "./treatment/Navlinknewannoncelocation";
import HelmetSite from "../../../inc/user/HelmetSite";


class Annoncebycategoryannoncelocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annoncelocations:{categoryannoncelocation:[],city:[],user:[]},
            annoncelocationbycategory: [],
            cityannoncelocations:{user:[]},
        };
        this.deleteItem = this.deleteItem.bind(this);
        this.favoriteItem = this.favoriteItem.bind(this);
        this.statusItem = this.statusItem.bind(this);
    }

    favoriteItem(item) {
        const url = route('favoriteannoncelocations_favorite.favorite', [item.id]);
        dyaxios.get(url).then(() => {

            if(item.bookmarked){
                $.notify({
                        message: "Annonce ajoutée à vos favoris",
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
            }else {
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
            }
            this.loadItems();

        }).catch(() => {
            //Failled message
            $.notify("Ooops! Something wrong. Try later", {
                type: 'danger',
                animate: {
                    enter: 'animate__animated animate__bounceInDown',
                    exit: 'animate__animated animate__bounceOutUp'
                }
            });
        })
    }


    statusItem(item){
        Swal.fire({
            title: 'Changer le status l\'annonce?',
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

                let isNotId = data => data.id !== item.id;
                let updatedItems = this.state.annoncelocations.filter(isNotId);
                this.setState({ annoncelocations: updatedItems });

                //Envoyer la requet au server
                let url = route('annonces_locations_status.site',item.id);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({

                            //message: 'Annonce désactiver avec succès',
                            message: "Cette annonce a été masquée au utilisateur",
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
                }).catch(() => {
                    //Failled message
                    $.notify("Ooops! Something wrong. Try later", {
                        type: 'danger',
                        animate: {
                            enter: 'animate__animated animate__bounceInDown',
                            exit: 'animate__animated animate__bounceOutUp'
                        }
                    });
                })
            }
        })

    }

    deleteItem(id) {
        Swal.fire({
            title: 'Confirmer la supression?',
            text: "êtes-vous sûr de vouloir executer cette action?",
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

                let isNotId = item => item.id !== id;
                let updatedItems = this.state.annoncelocations.filter(isNotId);
                this.setState({ annoncelocations: updatedItems });

                const url = route('annonces_locations_delete.site',id);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update',
                            message: 'Annonce supprimée avec succès'
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
                    this.loadItems();
                }).catch(() => {

                    //Failled message
                    $.notify("Ooops! Une erreur est survenue", {
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

    loadItems(){
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemCategoryannoncelocation = this.props.match.params.categoryannoncelocation;
        dyaxios.get(route('api.annoncelocationbycategoryannoncelocations_site',[itemannoncetype,itemCategoryannoncelocation])).then(response => this.setState({annoncelocations: response.data,}));
        dyaxios.get(route('api.annoncelocationbycategoryannoncelocationscount_site',[itemannoncetype,itemCategoryannoncelocation])).then(response => this.setState({annoncelocationbycategory: response.data,}));
        dyaxios.get(route('api.annoncelocationbycategorycitycount_site',[itemCategoryannoncelocation])).then(response => this.setState({cityannoncelocations: response.data,}));

    }

   // Lifecycle Component Method
    componentDidMount() {
        this.loadItems();
    }

    getcountcategoryannonceString(annoncelocations_count, precision) {
        const abbrev = ['', 'k', 'M', 'B', 'T'];
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(annoncelocations_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (annoncelocations_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {
        const {annoncelocations,annoncelocationbycategory,cityannoncelocations} = this.state;
        const mapAnnoncelocations = annoncelocations.length >= 0 ? (
            annoncelocations.map(item => {
                return(
                    <AnnonceslocationList key={item.id} {...item} favoriteItem={this.favoriteItem} deleteItem={this.deleteItem} statusItem={this.statusItem} contactUser={this.contactUser}/>
                )
            })
        ):(
            <AnnoncesListSkeleton/>
        );
        return (
            <>
                <HelmetSite title={`Locations ${annoncelocationbycategory.name || $name_site} - ${$name_site}`}/>

                <div className="about-us sidebar-collapse">
                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">
                        <div className="main main-raised">
                            <div className="container">
                                <div className="row">
                                </div>
                            </div>
                            <div className="container">
                                <br />
                                <div className="row">
                                    <div className="col-lg-8 col-md-12 mx-auto">
                                        <div className="submit text-left">
                                            <Link to={`/als/${this.props.match.params.annoncetype}/`} >
                                                <i className="now-ui-icons arrows-1_minimal-left"/> <b>Retour à vos résultats </b>
                                            </Link>
                                        </div>
                                        <br/>

                                        {!$guest &&(
                                            <>
                                                {!$userIvemo.email_verified_at &&(
                                                    <LinkValicationEmail/>
                                                )}
                                            </>
                                        )}

                                        {mapAnnoncelocations}

                                    </div>

                                    <div className="col-lg-4 col-md-12 mx-auto">
                                        <div className="submit text-center">
                                            <Navlinknewannoncelocation {...this.props} />
                                        </div>
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                            <div className="card card-plain">
                                                                <div className="card-header" role="tab" id="headingThree">
                                                                    <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                                                                        <b>Locations {annoncelocationbycategory.name} </b>
                                                                        <i className="now-ui-icons arrows-1_minimal-down"/>
                                                                    </a>
                                                                </div>

                                                                <div id="collapseThree" className="collapse show" role="tabpanel" aria-labelledby="headingThree">
                                                                    <div className="card-body">
                                                                        <table>
                                                                            <tbody>

                                                                            {cityannoncelocations.length >= 0 ?
                                                                                <>
                                                                                    {cityannoncelocations.map((item) => (
                                                                                    <tr key={item.id}>
                                                                                        <td>
                                                                                            <NavLink to={`/als/locations/${annoncelocationbycategory.slug}/${item.slug}/`}>
                                                                                                locations <b style={{ textTransform: "lowercase" }}>{annoncelocationbycategory.name}</b> à <b>{item.name}</b>
                                                                                            </NavLink>
                                                                                        </td>
                                                                                        <td className="text-right"> {this.getcountcategoryannonceString(item.annoncelocations_count)} {item.annoncelocations_count > 1 ? "annonces" : "annonce"}</td>
                                                                                    </tr>
                                                                                ))}
                                                                                </>
                                                                                :
                                                                                <NavannoncecategorySkeleton/>}

                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <Categoriesannoncereselocation/>

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

export default Annoncebycategoryannoncelocation;
