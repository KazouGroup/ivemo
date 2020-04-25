import React, { Component } from "react";
import { Link,NavLink } from 'react-router-dom';


class SectionBlogannonce extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    loadItems(){

    }

    componentDidMount() {
       //
    }


    render() {
        const {annoncesbycities} = this.state;

        return (

            <>
                <div className="row d-flex align-items-end">
                    <div className="col-md-12 mx-auto">
                        <h5 className="title">News depuis le blog </h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="card card-plain card-blog">
                            <div className="card-image">
                                <a href="#pablo">
                                    <img className="img rounded img-raised"
                                         src="/assets/vendor/assets/img/examples/card-blog15.jpg"/>
                                </a>
                            </div>
                            <div className="card-body">
                                <h6 className="category text-info">Enterprise</h6>
                                <h5 className="card-title">
                                    <a href="#pablo">Autodesk looks to future of 3D printing with
                                        Project Escher</a>
                                </h5>
                                <p className="card-description">
                                    Like so many organizations these days, Autodesk is a company in
                                    transition. It was until recently a traditional boxed software
                                    company selling licenses.
                                    <a href="#pablo"> Read More </a>
                                </p>
                                <p></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card card-plain card-blog">
                            <div className="card-image">
                                <a href="#pablo">
                                    <img className="img rounded img-raised"
                                         src="/assets/vendor/assets/img/examples/card-blog15.jpg"/>
                                </a>
                            </div>
                            <div className="card-body">
                                <h6 className="category text-success">
                                    Startups
                                </h6>
                                <h5 className="card-title">
                                    <a href="#pablo">Lyft launching cross-platform service this
                                        week</a>
                                </h5>
                                <p className="card-description">
                                    Like so many organizations these days, Autodesk is a company in
                                    transition. It was until recently a traditional boxed software
                                    company selling licenses.
                                    <a href="#pablo"> Read More </a>
                                </p>
                                <p></p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card card-plain card-blog">
                            <div className="card-image">
                                <a href="#pablo">
                                    <img className="img rounded img-raised"
                                         src="/assets/vendor/assets/img/examples/card-blog15.jpg"/>
                                </a>
                            </div>
                            <div className="card-body">
                                <h6 className="category text-danger">
                                    Enterprise
                                </h6>
                                <h5 className="card-title">
                                    <a href="#pablo">6 insights into the French Fashion
                                        landscape</a>
                                </h5>
                                <p className="card-description">
                                    Like so many organizations these days, Autodesk is a company in
                                    transition. It was until recently a traditional boxed software
                                    company selling licenses.
                                    <a href="#pablo"> Read More </a>
                                </p>
                                <p></p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <Link to={`/blogs/`} className="btn btn-danger btn-lg">
                        <b>Voir plus d'articles</b>
                    </Link>
                </div>
            </>

        )
    }
}
export default SectionBlogannonce;
