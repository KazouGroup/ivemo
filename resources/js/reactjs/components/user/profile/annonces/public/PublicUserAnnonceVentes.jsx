import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button,UncontrolledTooltip } from "reactstrap";
import NavUserSite from "../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import AnnoncereservationList from "../../../annoncereservation/inc/AnnoncereservationList";
import NavLinkPublicAnnonceUser from "../NavLinkPublicAnnonceUser";
import FormContactProfileAccountUser from "../../form/FormContactProfileAccountUser";
import NavLinkPublicBlogannoncesUser from "../../blogs/public/NavLinkPublicBlogannoncesUser";
import AnnonceventeList from "../../../annoncevente/inc/AnnonceventeList";


class PublicUserAnnonceVentes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userannonceventePublick:{annonceventes:[]},
        };

        this.deleteItem = this.deleteItem.bind(this);
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

                const url = route('annonces_ventes_delete.site',[id]);
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

    loadItems(){
        let itemuser = this.props.match.params.user;
        fetch(route('api.profilpublique_annonceventes',[itemuser])).then(res => res.json()).then((result) => {this.setState({userannonceventePublick: result})})
    }

    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    render() {
        const {userannonceventePublick} = this.state;
        const mapAnnonceventes = userannonceventePublick.annonceventes.length ? (
            userannonceventePublick.annonceventes.map(item => {
                return(

                    <AnnonceventeList key={item.id} {...item} deleteItem={this.deleteItem}/>
                )
            })
        ):(
            <></>
        );
        return (
            <>
                <Helmet>
                    <title>Annonces ventes {`${userannonceventePublick.first_name || 'Profile'}`} - Ivemo</title>
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
                                        <h3 className="title">Annonce ventes de {userannonceventePublick.first_name}</h3>
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
                                                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                        <b>Annonce de {userannonceventePublick.first_name}</b>
                                                                    </a>
                                                                </div>

                                                                <NavLinkPublicAnnonceUser {...this.props} {...userannonceventePublick}/>


                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                            <div className="card card-plain">
                                                                <div className="card-header" role="tab" id="headingTwo">
                                                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                                                        <b>Articles de {userannonceventePublick.first_name}</b>
                                                                    </a>
                                                                </div>

                                                                <NavLinkPublicBlogannoncesUser {...this.props} {...userannonceventePublick}/>

                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">

                                                        <div className="card-header text-center">
                                                            <h4 className="card-title"><b>Contacter {userannonceventePublick.first_name}</b></h4>
                                                        </div>

                                                        <FormContactProfileAccountUser {...this.props}/>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>


                                    </div>

                                    <div className="col-lg-8 col-md-12 mx-auto">

                                        {mapAnnonceventes}


                                        <div className="card">
                                            <div className="card-body">

                                                <div className="card-header text-center">
                                                    <h4 className="card-title"><b>Contacter {userannonceventePublick.first_name}</b></h4>
                                                </div>

                                                <FormContactProfileAccountUser {...this.props}/>

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

export default PublicUserAnnonceVentes;
