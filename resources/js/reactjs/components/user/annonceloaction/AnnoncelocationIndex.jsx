import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from "reactstrap";
import NavUserSite from "../../inc/user/NavUserSite";
import FooterBigUserSite from "../../inc/user/FooterBigUserSite";
import Categoriesannoncereselocation from "./inc/Categoriesannoncereselocation";
import AnnonceslocationList from "./inc/AnnonceslocationList";
import Swal from "sweetalert2";


class AnnoncelocationIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            annoncelocationbytype: {annoncelocations:[]},
        };

        this.deleteItem = this.deleteItem.bind(this);
    }

    loadItems(){
        let itemAnnoncelocation = this.props.match.params.annoncetype;
        let url = route('api.annoncelocationbyannoncetype_site', itemAnnoncelocation);
        dyaxios.get(url).then(response => this.setState({annoncelocationbytype: response.data,}));
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


                    let isNotId = item => item.id !== id;
                    let updatedItems = this.state.annoncelocationbytype.annoncelocations.filter(isNotId);
                    this.setState({annoncelocationbytype: updatedItems});

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

    render() {
        const {annoncelocationbytype} = this.state;
        const mapAnnoncelocations = annoncelocationbytype.annoncelocations.length ? (
            annoncelocationbytype.annoncelocations.map(item => {
                return(
                    <AnnonceslocationList key={item.id} {...item} deleteItem={this.deleteItem}/>
                )
            })
        ):(
            <></>
        );



        return (
            <>
                <Helmet>
                    <title>Bon plan de location de chambre, studio un appartement, maison ou une villa - Ivemo</title>
                </Helmet>

                <div className="landing-page sidebar-collapse">


                    <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent" color-on-scroll="400">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">
                        <div className="page-header page-header-mini">
                            <div className="page-header-image" data-parallax="true" style={{ backgroundImage: "url(" + '/assets/vendor/assets/img/bg32.jpg' + ")" }}>
                            </div>
                            <div className="content-center">
                                <div className="row">
                                    <div className="col-md-8 ml-auto mr-auto">
                                        <h3 className="title">Touver une maison ou chambre a louer </h3>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="main main-raised">
                            <div className="container">
                                <div className="row">

                                </div>
                            </div>

                            <div className="container">
                                <br />
                                <div className="row">


                                    <div className="col-lg-8 col-md-12 mx-auto">

                                        {mapAnnoncelocations}

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

export default AnnoncelocationIndex;
