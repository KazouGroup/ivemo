import React, { Component,Fragment } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { Button, UncontrolledTooltip } from "reactstrap";
import Swal from "sweetalert2";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import { Remarkable } from "remarkable";
import moment from "moment";
import AnnoncelocationInteresseforBlog from "./AnnoncelocationInteresseforBlog"
import BlogannoncelocationInteresse from "./BlogannoncelocationInteresse";
import Skeleton from "react-loading-skeleton";


class BlogannoncelocationShow extends Component {
    constructor(props) {
        super(props);

        this.deleteItem = this.deleteItem.bind(this);
        this.state = {
            blogannoncelocation: { user: [], categoryannoncelocation: [] },
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

                const url = route('blogannoncecategorylocationdelete_site',id);
                //Envoyer la requet au server
                dyaxios.delete(url).then(() => {
                    /** Alert notify bootstrapp **/
                    $.notify({
                            // title: 'Update',
                            message: 'Article de blogs supprimée avec success'
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
                    this.props.history.push(`/blogs/annonce_locations/`);
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
        let itemCategoryannoncelocation = this.props.match.params.categoryannoncelocation;
        let itemdate = this.props.match.params.date;
        let itemblogannoncelocation = this.props.match.params.blogannoncelocation;
        let url = route('api.blogannonceblogcategorylocationslug_site', [itemCategoryannoncelocation, itemdate, itemblogannoncelocation]);
        dyaxios.get(url).then(response => this.setState({ blogannoncelocation: response.data, }));
    }


    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }
    getDescription(blogannoncelocation) {
        return { __html: blogannoncelocation.description};
    }
    render() {
        const { blogannoncelocation } = this.state;
        let itemCategoryannoncelocation = this.props.match.params.categoryannoncelocation;
        return (
            <Fragment>
                <Helmet>
                    <title>{`${blogannoncelocation.title || 'Annonce'}`} - Ivemo</title>
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



                                                        <div className="card-header d-flex align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                {blogannoncelocation.user.avatar ?
                                                                    <NavLink to={`/@${blogannoncelocation.user.slug}/blogs/annonce_locations/`}>
                                                                        <img src={blogannoncelocation.user.avatar}
                                                                             style={{ height: "40px", width: "80px", borderRadius: "5px" }}
                                                                             alt={blogannoncelocation.user.first_name}
                                                                             className="avatar" />
                                                                    </NavLink>
                                                                    : <Skeleton circle={false} height={40} width={80} />}

                                                                <div className="mx-3">
                                                                    <NavLink to={`/@${blogannoncelocation.user.slug}/blogs/annonce_locations/`} className="text-dark font-weight-600 text-sm"><b>{blogannoncelocation.user.first_name || <Skeleton width={35} />}</b>
                                                                        <small className="d-block text-muted">{moment(blogannoncelocation.created_at).fromNow()}</small>
                                                                    </NavLink>
                                                                </div>
                                                            </div>
                                                            {!$guest && (
                                                                <Fragment>
                                                                    {$userIvemo.id === blogannoncelocation.user_id && (
                                                                        <Fragment>
                                                                            <div className="text-right ml-auto">
                                                                                <UncontrolledTooltip placement="bottom" target="TooltipEdit">
                                                                                    Editer cet article
                                                                                </UncontrolledTooltip>
                                                                                <NavLink to={`/blogs/annonce_locations/${blogannoncelocation.slugin}/edit/`} className="btn btn-sm btn-icon btn-info" id="TooltipEdit">
                                                                                    <i className="now-ui-icons ui-2_settings-90" />
                                                                                </NavLink>
                                                                                <UncontrolledTooltip placement="bottom" target="TooltipDelete" delay={0}>
                                                                                    Supprimer cette annonce
                                                                                </UncontrolledTooltip>
                                                                                <Button
                                                                                    className="btn btn-sm btn-icon btn-danger" onClick={() => this.deleteItem(blogannoncelocation.id)} color="secondary" id="TooltipDelete">
                                                                                    <i className="now-ui-icons ui-1_simple-remove" />
                                                                                </Button>{" "}
                                                                            </div>
                                                                        </Fragment>
                                                                    )}

                                                                </Fragment>
                                                            )}
                                                        </div>

                                                        <div className="carousel slide" data-ride="carousel">

                                                            <div className="carousel-inner" role="listbox">
                                                                <div className="carousel-item active">
                                                                    <Zoom>
                                                                        <div>
                                                                            {blogannoncelocation.photo ?
                                                                                <img className="d-block"
                                                                                     src={blogannoncelocation.photo}
                                                                                     style={{ width: "1400px", height: "400px", borderRadius: "2px" }}
                                                                                     alt={blogannoncelocation.title} />
                                                                                     :<Skeleton circle={false} height={400} width={1040} />}

                                                                        </div>

                                                                    </Zoom>

                                                                </div>

                                                            </div>

                                                        </div>


                                                    </div>
                                                </div>
                                            </div>


                                            <div className="container">
                                                <div className="row justify-content-center ">
                                                    <div className="col-lg-11 ml-auto mr-auto">

                                                        <h2 className="title text-center">{blogannoncelocation.title || <Skeleton width={300} />}</h2>

                                                        {blogannoncelocation.description ? <div className="title text-justify" dangerouslySetInnerHTML={this.getDescription(blogannoncelocation)} />: <Skeleton count={5}/>}



                                                    </div>


                                                </div>

                                            </div>

                                        </div>


                                    </div>
                                </div>

                                <AnnoncelocationInteresseforBlog {...this.props} />


                                <BlogannoncelocationInteresse {...this.props} />

                                <div className="text-center">
                                    <Link to={`/blogs/annonce_locations/${itemCategoryannoncelocation}/`}
                                        className="btn btn-outline-info">Voir plus d'articles ici
                                    </Link>
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

export default BlogannoncelocationShow;
