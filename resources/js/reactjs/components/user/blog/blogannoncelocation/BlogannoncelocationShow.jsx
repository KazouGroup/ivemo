import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { Button } from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import { Remarkable } from "remarkable";
import moment from "moment";
import BlogannoncelocationInteresse from "./BlogannoncelocationInteresse";


class BlogannoncelocationShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogannoncelocation: {user:[],categoryannoncelocation:[]},
        };

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

                                                        <div className="carousel slide" data-ride="carousel">

                                                            <div className="carousel-inner" role="listbox">
                                                                <div className="carousel-item active">
                                                                    <Zoom>
                                                                        <img className="d-block"
                                                                             src={blogannoncelocation.photo}
                                                                             style={{ width: "1400px", height: "400px",borderRadius: "5px" }}
                                                                             alt={blogannoncelocation.title} />
                                                                    </Zoom>

                                                                </div>

                                                            </div>

                                                        </div>

                                                        {/*
                                                        <div className="card-header d-flex align-items-center">
                                                            <div className="d-flex align-items-center">
                                                                <NavLink to={`/annonce/show/`}>
                                                                    <img src={blogannoncelocation.user.avatar}
                                                                         style={{ height: "40px", width: "80px",borderRadius: "5px" }}
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
                                                                                <NavLink to={`/annonces/`} className="btn btn-sm btn-success" rel="tooltip" title="Editer cette article de blog" data-placement="bottom">
                                                                                    <i className="now-ui-icons ui-1_simple-delete"/>
                                                                                </NavLink>
                                                                                <Button
                                                                                    className="btn btn-sm btn-danger" rel="tooltip" title="Supprimer cette article de blog" data-placement="bottom">
                                                                                    <i className="now-ui-icons ui-1_simple-remove"/>
                                                                                </Button>{" "}
                                                                            </div>
                                                                        </>
                                                                    )}

                                                                </>
                                                            )}
                                                        </div>
                                                         */}

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


                                <BlogannoncelocationInteresse {...this.props}/>

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
