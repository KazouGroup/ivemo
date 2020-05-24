import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import AnnonceventeList from "./inc/AnnonceventeList";
import Categoriesannoncevente from "./inc/Categoriesannoncevente";
import NavannoncecategorySkeleton from "../../../inc/user/NavannoncecategorySkeleton";


class Annoncebycategoryannonceventecity extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annonceventebycity: {annonceventes:[]},
            cityannonceventes:[],

        };
        this.deleteItem = this.deleteItem.bind(this);
        this.unactiveItem = this.unactiveItem.bind(this);
    }

    loadItems(){
        let itemannoncetype = this.props.match.params.annoncetype;
        let itemCategoryannoncevente = this.props.match.params.categoryannoncevente;
        let itemCity = this.props.match.params.city;
        let url = route('api.annonceventebycities_site',[itemannoncetype,itemCategoryannoncevente,itemCity]);
        dyaxios.get(url).then(response => this.setState({annonceventebycity: response.data,}));

        let url1 = route('api.annonceventecategorybycitycount_site',[itemCategoryannoncevente,itemCity]);
        dyaxios.get(url1).then(response => this.setState({cityannonceventes: response.data,}));

    }
    unactiveItem(id){
        Swal.fire({
            title: 'Désactiver l\'annonce?',
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
                let url = route('annonces_locations_unactivated.site',id);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update FAQ',
                            //message: 'Annonce désactiver avec succès',
                            message: "Cette annonce a été masquée au utilisateur <a href=\"/profile/personal_settings/annonces_locations/\" target=\"_blank\">Modifier ici</a>",
                            url: "/profile/personal_settings/annonces_locations/",
                            target: "_blank"
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

                const url = route('annonces_locations_delete.site',[id]);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update',
                            message: 'Annonce suprimée avec success'
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


    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    getcountcategoryannonceString (annonceventes_count) {
        annonceventes_count = annonceventes_count +'';
        if (annonceventes_count < 1000) {
            return annonceventes_count;
        }
        if (annonceventes_count < 10000) {
            return annonceventes_count.charAt(0) + ',' + annonceventes_count.substring(1);
        }
        return (annonceventes_count/1000).toFixed(annonceventes_count % 1000 !== 0)+'k';
    }
    render() {
        const {annonceventebycity,cityannonceventes} = this.state;
        let itemCategoryannoncevente = this.props.match.params.categoryannoncevente;
        const mapAnnonceventes = annonceventebycity.annonceventes.length ? (
            annonceventebycity.annonceventes.map(item => {
                return(
                    <AnnonceventeList key={item.id} {...item} deleteItem={this.deleteItem} unactiveItem={this.unactiveItem}/>
                )
            })
        ):(
            <></>
        );
        return (
            <>
                <Helmet>
                    <title>Ventes {`${itemCategoryannoncevente || "Ivemo"}`} dans la ville de {`${annonceventebycity.name || ""}`} - Ivemo</title>
                </Helmet>

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
                                            <NavLink to={`/annonces_ventes/ventes/${itemCategoryannoncevente}/`} className="btn btn-neutral btn-sm">
                                                <i className="now-ui-icons arrows-1_minimal-left"/> <b>Retour à vos annonces </b>
                                            </NavLink>
                                        </div>
                                        <br/>

                                        {mapAnnonceventes}

                                    </div>


                                    <div className="col-lg-4 col-md-12 mx-auto">

                                        <div className="submit text-center">
                                            <NavLink className="btn btn-danger" to={`/annonce/show/create/`}>
                                                <i className="now-ui-icons ui-1_simple-add"/> <b>Poster votre annonce</b>
                                            </NavLink>
                                        </div>



                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                            <div className="card card-plain">
                                                                <div className="card-header" role="tab" id="headingOne">
                                                                    <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                        <b>Achat à {annonceventebycity.name} </b>
                                                                        <i className="now-ui-icons arrows-1_minimal-down"/>
                                                                    </a>
                                                                </div>
                                                                <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                                                    <div className="card-body">
                                                                        <table>
                                                                            <tbody>

                                                                            {cityannonceventes.length ?
                                                                                <>
                                                                                    {cityannonceventes.map((item) => (
                                                                                        <tr key={item.id}>
                                                                                            <td>
                                                                                                <NavLink to={`/annonces_ventes/ventes/${item.slug}/${annonceventebycity.slug}/`}>
                                                                                                    achat <b style={{ textTransform: "lowercase" }}>{item.name}</b> à <b>{annonceventebycity.name}</b>
                                                                                                </NavLink>
                                                                                            </td>
                                                                                            <td className="text-right"> {this.getcountcategoryannonceString(item.annonceventes_count)} {item.annonceventes_count > 1 ? "annonces" : "annonce"}</td>
                                                                                        </tr>
                                                                                    ))}
                                                                                </>:<NavannoncecategorySkeleton/>}
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <Categoriesannoncevente/>

                                                            {/*
                                                            <div className="card card-plain">
                                                                <div className="card-header" role="tab" id="headingAutre">
                                                                    <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseAutre" aria-expanded="false" aria-controls="collapseAutre">
                                                                        <b>Autres transactions à {`${annonceventebycity.name}`}</b>
                                                                        <i className="now-ui-icons arrows-1_minimal-down"/>
                                                                    </a>
                                                                </div>
                                                                <div id="collapseAutre" className="collapse" role="tabpanel" aria-labelledby="headingAutre">
                                                                    <div className="card-body">
                                                                        <table>
                                                                            <tbody>
                                                                            <tr>
                                                                                <td> <a href="#pablo">Toutes les ventes de maison Douala</a></td>
                                                                                <td className="text-right"> 200 annonces</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td> <a href="#pablo">Toutes les locations de maison Douala</a></td>
                                                                                <td className="text-right"> 1 300 annonces</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td> <a href="#pablo">Tous les achats de maison de prestige Douala</a></td>
                                                                                <td className="text-right"> 380 annonces</td>
                                                                            </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            */}

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

export default Annoncebycategoryannonceventecity;
