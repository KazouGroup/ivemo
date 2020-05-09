import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button,Row } from "reactstrap";
import NavUserSite from "../../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import LazyLoad from "react-lazyload";
import FormContactProfileAccountUser from "../../form/FormContactProfileAccountUser";
import NavLinkPublicBlogannoncesUser from "./NavLinkPublicBlogannoncesUser";
import NavLinkPublicAnnonceUser from "../../annonces/NavLinkPublicAnnonceUser";
import PublicUserBlogannonceventeList from "./inc/PublicUserBlogannonceventeList";
import FormNewletterSubcribeProfileAccountUser from "../../form/FormNewletterSubcribeProfileAccountUser";
import Navlinknewblogannoncevente from "../../../blog/blognnoncevente/treatement/Navlinknewblogannoncevente";
import Skeleton from "react-loading-skeleton";
import BlogannoncePublicuserSkeleton from "../../../../inc/user/blog/BlogannoncePublicuserSkeleton";
import LinkValicationEmail from "../../../../inc/user/LinkValicationEmail";


class PublicUserBlogannonceVente extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userblogventePublick:{blogannonceventes: []},
            isLoading: false,
            visiable: 20,
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.loadmoresItem = this.loadmoresItem.bind(this);
    }
    loadmoresItem(){
        this.setState((old) =>{
            return {visiable: old.visiable + 20}
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

                const url = route('blogannoncecategoryventedelete_site',[id]);
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
        this.setState({ isLoading: true });
        let itemuser = this.props.match.params.user;
        dyaxios.get(route('api.profilpublique_blogannonceventes',[itemuser])).then(response => this.setState({userblogventePublick: response.data,isLoading: false,}));
    }

    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    render() {
        const {userblogventePublick,visiable,isLoading} = this.state;
        const mapBlogannonceventes = isLoading ? (
            <BlogannoncePublicuserSkeleton/>
        ):(
            userblogventePublick.blogannonceventes.slice(0,visiable).map(item => {
                return(
                    <PublicUserBlogannonceventeList key={item.id} {...item} deleteItem={this.deleteItem}/>
                )
            })
        );
        return (
            <>
                <Helmet>
                    <title>Articles sur la locations {`${userblogventePublick.first_name || 'Profile'}`} - {$name_site}</title>
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

                                <div className="card-body">

                                    <h1 className="title">{userblogventePublick.first_name || <Skeleton width={300} />}</h1>
                                    {userblogventePublick.slug ?
                                        <Link to={`/pro/${userblogventePublick.slug}/`} className="text-white">
                                            <i className="fa fa-chevron-circle-left" /> <b>Retour au profile de {userblogventePublick.first_name}</b>
                                        </Link>
                                        :
                                        <Skeleton width={270}/>
                                    }
                                    {userblogventePublick.blogannonceventes_count >= 0 ?
                                        <h5><b>{userblogventePublick.blogannonceventes_count}</b> {userblogventePublick.blogannonceventes_count > 1 ? "articles" : "article"} posté par {userblogventePublick.first_name} sur la vente et l'achat</h5>
                                    :<h5> <Skeleton width={200}/></h5>}

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

                                        {/**<div className="submit text-center">
                                            <NavLink className="btn btn-danger" to={`/annonce/show/create/`}>
                                                <i className="now-ui-icons ui-1_simple-add"/> <b>Poster votre article</b>
                                            </NavLink>
                                        </div> */}


                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                            <div className="card card-plain">
                                                                <div className="card-header" role="tab" id="headingOne">
                                                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                                        <b>Annonces de {userblogventePublick.first_name}</b>
                                                                    </a>
                                                                </div>

                                                                <NavLinkPublicAnnonceUser {...this.props} {...userblogventePublick}/>

                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <Navlinknewblogannoncevente/>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">
                                                            <div className="card card-plain">
                                                                <div className="card-header" role="tab" id="headingTwo">
                                                                    <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                                                                        <b>Articles de {userblogventePublick.first_name}</b>
                                                                    </a>
                                                                </div>

                                                                <NavLinkPublicBlogannoncesUser {...this.props} {...userblogventePublick}/>

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
                                                            <h4 className="card-title"><b>Contacter {userblogventePublick.first_name}</b></h4>
                                                        </div>

                                                        <FormContactProfileAccountUser {...this.props}/>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="col-lg-8 col-md-12 mx-auto">
                                        {!$guest &&(
                                            <>
                                                {!$userIvemo.email_verified_at &&(
                                                    <LinkValicationEmail/>
                                                )}
                                            </>
                                        )}

                                        <Row>

                                            {mapBlogannonceventes}

                                        </Row>

                                        {visiable < userblogventePublick.blogannonceventes.length && (
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
                                                    <h4 className="card-title"><b>Contacter {userblogventePublick.first_name}</b></h4>
                                                </div>

                                                <FormContactProfileAccountUser {...this.props}/>

                                            </div>
                                        </div>

                                        <div className="card card-raised card-form-horizontal">

                                            <div className="card-body">

                                                <div className="card-header text-center">
                                                    <h4 className="card-title"><b>Restez à l’écoute !</b></h4>
                                                    <p className="card-title">
                                                        Abonnez-vous à la newsletter de <b>{userblogventePublick.first_name}</b> afin d'être notifié des mises à jour
                                                    </p>
                                                </div>

                                                <FormNewletterSubcribeProfileAccountUser {...this.props}/>

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

export default PublicUserBlogannonceVente;
