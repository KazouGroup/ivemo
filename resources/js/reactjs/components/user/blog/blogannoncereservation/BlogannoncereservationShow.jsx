import React, { Component } from "react";
import { Link, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button } from "reactstrap";
import NavUserSite from "../../../inc/user/NavUserSite";
import FooterBigUserSite from "../../../inc/user/FooterBigUserSite";
import {Remarkable} from "remarkable";
import BlogannoncereservationInteresse from "./BlogannoncereservationInteresse";


class BlogannoncereservationShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogannoncereservation:[],
        };

    }

    loadItems(){
        let itemCategoryannoncereservation = this.props.match.params.categoryannoncereservation;
        let itemdate = this.props.match.params.date;
        let itemblogannoncereservation = this.props.match.params.blogannoncereservation;
        let url = route('api.blogannoncecategoryreservationslug_site',[itemCategoryannoncereservation,itemdate,itemblogannoncereservation]);
        dyaxios.get(url).then(response => this.setState({blogannoncereservation: response.data,}));
    }


    // lifecycle method
    componentDidMount() {
        this.loadItems();
    }
    getDescription(blogannoncereservation) {
        const md = new Remarkable();
        return { __html: md.render(blogannoncereservation.description) };
    }
    render() {
        const {blogannoncereservation} = this.state;
        return (
            <>
                <Helmet>
                    <title>{`${blogannoncereservation.title}`}- Ivemo</title>
                </Helmet>

                <div className="about-us sidebar-collapse">

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
                                                        <div id="carouselExampleIndicators"
                                                             className="carousel slide" data-ride="carousel">

                                                            <div className="carousel-inner" role="listbox">
                                                                <div className="carousel-item active">
                                                                    <img className="d-block"
                                                                         src={blogannoncereservation.photo} alt={blogannoncereservation.title}/>
                                                                </div>

                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="container">
                                                <div className="row justify-content-center ">
                                                    <div className="col-lg-11 ml-auto mr-auto">

                                                        <h2 className="title text-center">{blogannoncereservation.title}</h2>

                                                        <div className="title mb-2 text-justify" dangerouslySetInnerHTML={this.getDescription(blogannoncereservation)}/>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>


                                    </div>
                                </div>

                                <BlogannoncereservationInteresse  {...this.props}/>

                                <div className="text-center">
                                    <Link to={`/blog/`}
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

export default BlogannoncereservationShow;
