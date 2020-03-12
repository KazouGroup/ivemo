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


class BlogannonceventeShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogannoncevente: {user:[],categoryannoncevente:[]},
        };

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
    render() {
        const { blogannoncevente } = this.state;
        let itemCategoryannoncevente = this.props.match.params.categoryannoncevente;
        return (
            <Fragment>
                <Helmet>
                    <title>{`${blogannoncevente.title || 'Annonce'}`} - Ivemo</title>
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
                                                                <NavLink to={`/@${blogannoncevente.user.slug}/blogs/annonce_ventes/`}>
                                                                    <img src={blogannoncevente.user.avatar}
                                                                         style={{ height: "40px", width: "80px", borderRadius: "5px" }}
                                                                         alt={blogannoncevente.user.first_name}
                                                                         className="avatar" />
                                                                </NavLink>
                                                                <div className="mx-3">
                                                                    <NavLink to={`/@${blogannoncevente.user.slug}/blogs/annonce_ventes/`} className="text-dark font-weight-600 text-sm"><b>{blogannoncevente.user.first_name}</b>
                                                                        <small className="d-block text-muted">{moment(blogannoncevente.created_at).calendar()}</small>
                                                                    </NavLink>
                                                                </div>
                                                            </div>
                                                            {!$guest && (
                                                                <Fragment>
                                                                    {$userIvemo.id === blogannoncevente.user_id && (
                                                                        <Fragment>
                                                                            <div className="text-right ml-auto">

                                                                                <button className="btn btn-outline-danger btn-sm">supprimer</button>
                                                                                <button className="btn btn-outline-info btn-sm">supprimer</button>

                                                                                <UncontrolledTooltip placement="bottom" target="TooltipEdit">
                                                                                    Editer cet article
                                                                                </UncontrolledTooltip>
                                                                                <NavLink to={`/blogs/annonce_ventes/${blogannoncevente.slugin}/edit/`} className="btn btn-outline-info btn-sm" id="TooltipEdit">
                                                                                    <i className="now-ui-icons ui-2_settings-90" /> editer
                                                                                </NavLink>
                                                                                <UncontrolledTooltip placement="bottom" target="TooltipDelete" delay={0}>
                                                                                    Supprimer cette annonce
                                                                                </UncontrolledTooltip>
                                                                                <Button
                                                                                    className="btn btn-sm btn-icon btn-danger" onClick={() => this.deleteItem(blogannoncevente.id)} color="secondary" id="TooltipDelete">
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
                                                                        <img className="d-block"
                                                                             src={blogannoncevente.photo}
                                                                             style={{ width: "1400px", height: "400px",borderRadius: "5px" }}
                                                                             alt={blogannoncevente.title} />
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

                                                        <h2 className="title text-center">{blogannoncevente.title}</h2>

                                                        <div className="title mb-2 text-justify" dangerouslySetInnerHTML={this.getDescription(blogannoncevente)} />

                                                    </div>
                                                </div>
                                            </div>

                                        </div>


                                    </div>
                                </div>



                                <BlogannonceventeInteresse  {...this.props} />

                                <div className="text-center">
                                    <Link to={`/blogs/annonce_ventes/${itemCategoryannoncevente}/`}
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

export default BlogannonceventeShow;
