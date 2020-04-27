import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button,UncontrolledTooltip } from "reactstrap";
import NavUserSite from "../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import AnnoncereservationList from "../../../annonces/annoncereservation/inc/AnnoncereservationList";
import NavLinkPublicAnnonceUser from "../NavLinkPublicAnnonceUser";
import FormContactProfileAccountUser from "../../form/FormContactProfileAccountUser";
import NavLinkPublicBlogannoncesUser from "../../blogs/public/NavLinkPublicBlogannoncesUser";
import AnnonceventeList from "../../../annonces/annoncevente/inc/AnnonceventeList";
import FormNewletterSubcribeProfileAccountUser from "../../form/FormNewletterSubcribeProfileAccountUser";


class PublicUserAnnonceVentes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userannonceventePublick:{annonceventes:[]},
            visiable: 10,
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.loadmoresItem = this.loadmoresItem.bind(this);
    }
    loadmoresItem() {
        this.setState((old) => {
            return { visiable: old.visiable + 10 }
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
        const {userannonceventePublick,visiable} = this.state;
        const mapAnnonceventes = userannonceventePublick.annonceventes.length ? (
            userannonceventePublick.annonceventes.slice(0, visiable).map(item => {
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

                                <h1 className="title">{userannonceventePublick.first_name}</h1>
                                <Link to={`/@${userannonceventePublick.slug}/`} className="text-white">
                                    <i className="fa fa-chevron-circle-left" /> <b>Retour au profile de {userannonceventePublick.first_name}</b>
                                </Link>
                                {userannonceventePublick.annonceventes_count > 0 &&(
                                    <h5><b>{userannonceventePublick.annonceventes_count}</b> {userannonceventePublick.annonceventes_count > 1 ? "annonces" : "annonce"} posté par {userannonceventePublick.first_name} sur la vente et l'achat</h5>
                                )}

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
                                                <i className="now-ui-icons ui-1_simple-add"/> <b>Poster un article </b>
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

                                        {visiable < userannonceventePublick.annonceventes.length && (
                                            <div className="row">
                                                <div className="col-md-4 ml-auto mr-auto text-center">
                                                    <button type="button" onClick={this.loadmoresItem} className="btn btn-primary btn-block">
                                                        <b>Voir plus </b>
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        <div className="card">
                                            <div className="card-body">

                                                <div className="card-header text-center">
                                                    <h4 className="card-title"><b>Contacter {userannonceventePublick.first_name}</b></h4>
                                                </div>

                                                <FormContactProfileAccountUser {...this.props}/>

                                            </div>
                                        </div>

                                        <div className="card card-raised card-form-horizontal">

                                            <div className="card-body">

                                                <div className="card-header text-center">
                                                    <h4 className="card-title"><b>Restez à l’écoute !</b></h4>
                                                    <p className="card-title">
                                                        Abonnez-vous à la newsletter de <b>{userannonceventePublick.first_name}</b> afin d'être notifié des mises à jour
                                                    </p>
                                                </div>

                                                <FormNewletterSubcribeProfileAccountUser {...this.props} />

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