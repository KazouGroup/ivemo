import React, { Component,Fragment } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import {Button, UncontrolledTooltip} from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import { Remarkable } from "remarkable";
import moment from "moment";
import BlogannonceventeInteresse from "./BlogannonceventeInteresse";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import LinkValicationEmail from "../../../inc/user/LinkValicationEmail";
import AnnoncelocationVenteforBlog from "./AnnoncelocationVenteforBlog";


class BlogannonceventeShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogannoncevente: {user:[],categoryannoncevente:[]},
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

                const url = route('blogannoncecategoryventedelete_site',id);
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
                    this.props.history.push(`/blogs/annonce_ventes/`);
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

    loadItems() {
        let itemCategoryannoncevente = this.props.match.params.categoryannoncevente;
        let itemdate = this.props.match.params.date;
        let itemblogannonvente = this.props.match.params.blogannoncevente;
        let url = route('api.blogannoncecategoryventeslug_site', [itemCategoryannoncevente, itemdate, itemblogannonvente]);
        dyaxios.get(url).then(response => this.setState({ blogannoncevente: response.data, }));
    }


    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }
    getDescription(blogannoncevente) {
        return { __html: (blogannoncevente.description) };
    }
    data_countFormatter(visits_count, precision) {
        const abbrev = ['', 'k', 'M', 'B', 'T'];
        const unrangifiedOrder = Math.floor(Math.log10(Math.abs(visits_count)) / 3);
        const order = Math.max(0, Math.min(unrangifiedOrder, abbrev.length -1 ));
        const suffix = abbrev[order];
        return (visits_count / Math.pow(10, order * 3)).toFixed(precision) + suffix;
    }
    render() {
        const { blogannoncevente } = this.state;
        let itemCategoryannoncevente = this.props.match.params.categoryannoncevente;
        return (
            <Fragment>
                <Helmet>
                    <title>{`${blogannoncevente.title || 'Annonce'}`} - {$name_site}</title>
                </Helmet>

                <div className="landing-page sidebar-collapse">

                    <nav className="navbar navbar-expand-lg bg-primary">
                        <NavUserSite />
                    </nav>

                    <div className="wrapper">

                        <div className="main main-raised">

                            <div className="container">
                                <br />

                                <div className="card">
                                    <div className="card-body">

                                        <div className="card card-plain ">

                                            <div className="container">
                                                <div className="row justify-content-center">
                                                    <div className="col-md-12 ml-auto mr-auto">
                                                        {!$guest &&(
                                                            <>
                                                                {!$userIvemo.email_verified_at &&(
                                                                    <LinkValicationEmail/>
                                                                )}
                                                            </>
                                                        )}


                                                        <div className="card-header d-flex align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                {blogannoncevente.user.avatar ?
                                                                    <NavLink to={`/pro/${blogannoncevente.user.slug}/blogs/annonce_ventes/`}>
                                                                        <img src={blogannoncevente.user.avatar}
                                                                             style={{ height: "40px", width: "80px", borderRadius: "5px" }}
                                                                             alt={blogannoncevente.user.first_name}
                                                                             className="avatar" />
                                                                    </NavLink>
                                                                    : <Skeleton height={40} width={80} />}
                                                                <div className="mx-3">
                                                                    <NavLink to={`/pro/${blogannoncevente.user.slug}/blogs/annonce_ventes/`} className="text-dark font-weight-600 text-sm"><b>{blogannoncevente.user.first_name || <Skeleton width={35} />}</b>
                                                                        <small className="d-block text-muted">{moment(blogannoncevente.created_at).fromNow()}</small>
                                                                    </NavLink>
                                                                </div>
                                                            </div>
                                                            {!$guest && (
                                                                <Fragment>
                                                                    {$userIvemo.id === blogannoncevente.user_id && (
                                                                        <Fragment>
                                                                            <div className="text-right ml-auto">
                                                                                <a href={`#${blogannoncevente.visits_count}`} className="btn btn-sm btn-secondary">
                                                                                    <i class="far fa-eye"></i> <b>{this.data_countFormatter(blogannoncevente.visits_count)}</b>
                                                                                </a>
                                                                                <UncontrolledTooltip placement="bottom" target="TooltipEdit">
                                                                                    Editer cet article
                                                                                </UncontrolledTooltip>
                                                                                <NavLink to={`/blogs/annonce_ventes/${blogannoncevente.slugin}/edit/`} className="btn btn-sm btn-icon btn-info" id="TooltipEdit">
                                                                                    <i className="now-ui-icons ui-2_settings-90" />
                                                                                </NavLink>
                                                                                <UncontrolledTooltip placement="bottom" target="TooltipDelete" delay={0}>
                                                                                    Supprimer cette annonce
                                                                                </UncontrolledTooltip>
                                                                                <Button
                                                                                    className="btn btn-sm btn-icon btn-danger" onClick={() => this.deleteItem(blogannoncevente.id)} color="secondary" id="TooltipDelete">
                                                                                    <i className="now-ui-icons ui-1_simple-remove" />
                                                                                </Button>
                                                                            </div>
                                                                        </Fragment>
                                                                    )}

                                                                </Fragment>
                                                            )}
                                                        </div>

                                                        <div className="carousel-inner">
                                                            <div className="carousel-item active">
                                                                <Zoom>
                                                                    {blogannoncevente.photo ?
                                                                        <img className="d-block"
                                                                             src={blogannoncevente.photo}
                                                                             style={{ width: "1400px", height: "600px",borderRadius: "5px" }}
                                                                             alt={blogannoncevente.title} />
                                                                        : <Skeleton height={600} width={1400} />}
                                                                </Zoom>

                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>


                                            <div className="container">
                                                <div className="row justify-content-center ">
                                                    <div className="col-lg-11 ml-auto mr-auto">

                                                        <h2 className="title text-center">{blogannoncevente.title || <Skeleton width={300} />}</h2>

                                                        {blogannoncevente.description ? <div className="title text-justify" dangerouslySetInnerHTML={this.getDescription(blogannoncevente)} />: <Skeleton count={5}/>}

                                                    </div>
                                                </div>
                                            </div>

                                        </div>


                                    </div>
                                </div>


                                <AnnoncelocationVenteforBlog {...this.props}/>

                                <BlogannonceventeInteresse  {...this.props} />

                                <div className="text-center">
                                    <a href={`/blogs/annonce_ventes/${itemCategoryannoncevente}/`}
                                        className="btn btn-outline-info">Voir plus d'articles ici
                                    </a>
                                </div>





                            </div>



                        </div>




                        <FooterBigUserSite />
                    </div>
                </div>
            </Fragment>



        )
    }
}

export default BlogannonceventeShow;
