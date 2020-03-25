import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import Swal from "sweetalert2";
import BlogannoncelocationList from "./BlogannoncelocationList";
import Navblogannoncelocations from "./inc/Navblogannoncelocations";
import Navlinknewblogannoncelocation from "./treatement/Navlinknewblogannoncelocation";
import Skeleton from "react-loading-skeleton";
import LinkValicationEmail from "../../../inc/user/LinkValicationEmail";


class BlogannoncelocationBycategorylocation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogannoncelocation: {blogannoncelocations:[]},
        };

        this.deleteItem = this.deleteItem.bind(this);
        this.unactiveItem = this.unactiveItem.bind(this);
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
                let url = route('blogannoncecategorylocationunactive_site.site',id);
                dyaxios.get(url).then(() => {

                    /** Alert notify bootstrapp **/
                    $.notify({
                            message: "Cette annonce a été masquée <a href=\"/profile/"+$userIvemo.slug+"/personal_settings/blogs/annonce_locations//\" target=\"_blank\" class=\"btn btn-info btn-sm\">Modifier ici</a>",
                            url: "/profile/"+$userIvemo.slug+"/personal_settings/blogs/annonce_locations/",
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

                const url = route('blogannoncecategorylocationdelete_site',id);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {
                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update',
                            message: 'Article de blogs suprimée avec success'
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
        let itemCategoryannoncelocation = this.props.match.params.categoryannoncelocation;
        let url = route('api.blogannonceblogcategorylocations_site', [itemCategoryannoncelocation]);
        dyaxios.get(url).then(response => this.setState({ blogannoncelocation: response.data, }));
    }

    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }

    render() {
        const {blogannoncelocation} = this.state;
        const blogannoncelocationsbycategorylocations = blogannoncelocation.blogannoncelocations;
        const mapAnnoncelocations = blogannoncelocationsbycategorylocations.length ? (
            blogannoncelocationsbycategorylocations.map(item => {
                return(
                    <BlogannoncelocationList key={item.id} {...item} deleteItem={this.deleteItem} unactiveItem={this.unactiveItem}/>
                )
            })
        ):(
            <></>
        );
        return (
            <>
                <Helmet>
                    <title>Guides et conseils locations {`${blogannoncelocation.name || 'Annonce'}`} - Ivemo</title>
                </Helmet>

                <div className="about-us sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary fixed-top navbar-transparent" color-on-scroll="500">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">
                        <div className="page-header page-header-mini">
                            <div className="page-header-image" data-parallax="true" style={{ backgroundImage: "url(" + blogannoncelocation.photo + ")" }}>
                            </div>
                            <div className="content-center">

                                <h1 className="title">{blogannoncelocation.name || <Skeleton width={300} />}</h1>

                                {blogannoncelocation.name ?
                                    <Link to={`/blogs/annonce_locations/`} className="text-white">
                                        <i className="fa fa-chevron-circle-left" /> <b>Retour aux articles</b>
                                    </Link>
                                    :
                                    <Skeleton width={270}/>
                                }


                                {blogannoncelocation.blogannoncelocations_count >= 0 ?
                                    <h5><b>{blogannoncelocation.blogannoncelocations_count}</b> {blogannoncelocation.blogannoncelocations_count > 1 ? "articles" : "article"} posté sur la location</h5>
                                    :
                                   <h5> <Skeleton width={200}/></h5>
                                }

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
                                        <div className="submit text-left">
                                            <Link to={`/blogs/annonce_locations/`} className="btn btn-neutral btn-sm">
                                                <i className="now-ui-icons arrows-1_minimal-left"/> <b>Retour aux articles</b>
                                            </Link>
                                        </div>
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

                                        <Navlinknewblogannoncelocation/>

                                        <div className="card">
                                            <div className="card-body">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div id="accordion" role="tablist" aria-multiselectable="true" className="card-collapse">

                                                            <Navblogannoncelocations/>


                                                            <div className="card card-plain">
                                                                <div className="card-header" role="tab" id="headingThree">
                                                                    <a className="collapsed" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                                        <b>Annonces locations populaire</b>
                                                                    </a>
                                                                </div>
                                                                <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                                                    <div className="card-body">
                                                                        <table>
                                                                            <tbody>
                                                                            <tr>
                                                                                <td>
                                                                                    <a href="#pablo">
                                                                                        <span className="title">
                                                                                            MateLabs mixes machine learning model
                                                                                      </span>
                                                                                    </a>

                                                                                </td>
                                                                                <td className="text-right">
                                                                                    <NavLink to={`/`}>
                                                                                        <img src="/assets/vendor/assets/img/julie.jpg" style={{ height: "50px", width: "70px" }} alt="#" className="avatar" />
                                                                                    </NavLink>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>
                                                                                    <a href="#pablo">
                                                                                        <span className="title">
                                                                                            Temgoua mixes machine learning model
                                                                                      </span>
                                                                                    </a>
                                                                                </td>
                                                                                <td className="text-right">
                                                                                    <NavLink to={`/`}>
                                                                                        <img src="/assets/vendor/assets/img/examples/card-blog11.jpg" style={{ height: "50px", width: "70px" }} alt="#" className="avatar" />
                                                                                    </NavLink>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>
                                                                                    <a href="#pablo">
                                                                                        <span className="title">
                                                                                            Bokino mixes machine learning model
                                                                                      </span>
                                                                                    </a>
                                                                                </td>
                                                                                <td className="text-right">
                                                                                    <NavLink to={`/`}>
                                                                                        <img src="/assets/vendor/assets/img/examples/card-blog11.jpg" style={{ height: "50px", width: "70px" }} alt="#" className="avatar" />
                                                                                    </NavLink>
                                                                                </td>
                                                                            </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </div>

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
export default BlogannoncelocationBycategorylocation;
