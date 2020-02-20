import React, { Component } from "react";
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
import BlogannoncelocationInteresse from "./BlogannoncelocationInteresse";


class BlogannoncelocationShow extends Component {
    constructor(props) {
        super(props);

        this.deleteItem = this.deleteItem.bind(this);
        this.state = {
            blogannoncelocation: { user: [], categoryannoncelocation: [] },
        };

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
                            message: 'Article de blog suprimée avec success'
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
                    this.props.history.goBack();
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
        const md = new Remarkable();
        return { __html: md.render(blogannoncelocation.description) };
    }
    render() {
        const { blogannoncelocation } = this.state;
        let itemCategoryannoncelocation = this.props.match.params.categoryannoncelocation;
        return (
            <>
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
                                                                <NavLink to={`/annonce/show/`}>
                                                                    <img src={blogannoncelocation.user.avatar}
                                                                        style={{ height: "40px", width: "80px", borderRadius: "5px" }}
                                                                        alt={blogannoncelocation.user.first_name}
                                                                        className="avatar" />
                                                                </NavLink>
                                                                <div className="mx-3">
                                                                    <NavLink to={`/annonce/show/`} className="text-dark font-weight-600 text-sm"><b>{blogannoncelocation.user.first_name}</b>
                                                                        <small className="d-block text-muted">{moment(blogannoncelocation.created_at).calendar()}</small>
                                                                    </NavLink>
                                                                </div>
                                                            </div>
                                                            {!$guest && (
                                                                <>
                                                                    {$userIvemo.id === blogannoncelocation.user_id && (
                                                                        <>
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
                                                                        </>
                                                                    )}

                                                                </>
                                                            )}
                                                        </div>

                                                        <div className="carousel slide" data-ride="carousel">

                                                            <div className="carousel-inner" role="listbox">
                                                                <div className="carousel-item active">
                                                                    <Zoom>
                                                                        <img className="d-block"
                                                                            src={blogannoncelocation.photo}
                                                                            style={{ width: "1400px", height: "400px", borderRadius: "5px" }}
                                                                            alt={blogannoncelocation.title} />
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

                                                        <h2 className="title text-center">{blogannoncelocation.title}</h2>

                                                        <div className="title mb-2 text-justify" dangerouslySetInnerHTML={this.getDescription(blogannoncelocation)} />


                                                    </div>


                                                </div>

                                            </div>

                                        </div>


                                    </div>
                                </div>


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
            </>



        )
    }
}

export default BlogannoncelocationShow;
